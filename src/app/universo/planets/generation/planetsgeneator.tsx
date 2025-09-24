"use client";

import { useState, useEffect, useRef } from "react";
import { Box, Flex,} from "@radix-ui/themes";
import { ReloadIcon } from "@radix-ui/react-icons";
import { LIB_ICON } from "@/radix/rdxthicons";
import { RdxThContainers } from "@/radix/rdxthcontainers";
import { XInputSelect } from "@/radix/input/inpselect";
import { XButton } from "@/radix/buttons/xbutton";
import { OpConstants } from "@/common/constants";
import { ButtonsStyle } from "@/radix/rdxtheme";

import { ImageDataFunc } from "@/lib/graph2d/functions/imagedatafunc";
import { CanvasImageData } from "@/lib/graph2d/components/canvasimagedata";
import { ImageUtil } from "@/lib/graph2d/util/imageutil";

import { GlSystem3d } from "@/zone3d/glsystem3d";
import { TextureParameters } from "@/universo3d/planets/textureplanetsparams";
import { generatePlanetaryTexture } from "@/universo3d/planets/genplanetmatunct";
import { GenMaterial } from "@/app/universo/planets/genmaterial";
import { PlanetsConfig } from "../planetcfg";
import { PanelGeneration } from "./panelgeneration";
import { PlanetsMonitor } from "../planetsmonitor";

interface PlanetaryTextureGeneratorProps {
    onEnableEdition?: (textureData: ImageData | null) => void;
};

export function PlanetaryTextureGenerator({ onEnableEdition }: PlanetaryTextureGeneratorProps) {
    
    const [parameters, setParameters] = useState<TextureParameters>(PlanetsConfig.defaultParameters);
    const [exportFormat, setExportFormat] = useState<string>(PlanetsConfig.DEF_IMAGE_FORMAT);
    const [processing, setProcessing] = useState(false);
    const [textureData, setTextureData] = useState<ImageData | null>(null);
    const [exportImageURL, setExportImageURL] = useState<string | null>(null);

    useEffect(() => {
        generateTexture();
    }, [])

    const generateTexture = async () => {
        setProcessing(true);
        try {
            const imageData = await generatePlanetaryTexture(parameters);
            setTextureData(imageData);
            const imageURL = await ImageUtil.getImageUrlFromImageData(imageData, exportFormat);
            setExportImageURL(imageURL);            
        } 
        catch (error) {alert("Error generating texture:");} 
        setProcessing(false);
    };

    const handleEdit = () => {
        if (onEnableEdition) {
            onEnableEdition(textureData);
        }
    };

    const onExportImageReady =(imageURL:string) => {
        setExportImageURL(imageURL);
    };//end

    const handleExport = () => {
        if (exportFormat !== "json") {
           const fileName = "undefined.jpg"; 
           ImageDataFunc.exportCanvasImage(fileName, exportImageURL!);
        }
        else {
            const material = new GenMaterial(
                "undefined",
                parameters.baseColorHue.toString(),
                parameters.baseColorSaturation,
                parameters.baseColorLightness,
                parameters.metallicness,
                parameters.roughness,
            )
            const jsonString = material.toJsonString();
        } 
   
    };//end

    const renderMainHeader = () => {
        return (           
            <Flex width="100%" justify="between" align="center" px="2" 
                  style={RdxThContainers.BORDER_SIMPLE}>

                <Flex width="auto"direction="row" gapX="2">          

                    {!processing ? 
                    <XButton text={OpConstants.OP_TEXT_GENERATE} 
                            color={ButtonsStyle.COLOR_GENERATE}
                            icon={LIB_ICON.RUN} 
                            onclick={generateTexture}/>: 
                    <Flex align="center" gap="2">
                        <ReloadIcon className="animate-spin" />
                        Generating...
                    </Flex>}
                
                    <XButton text={OpConstants.OP_TEXT_EDIT}
                            icon={LIB_ICON.EDIT}
                            color={ButtonsStyle.COLOR_EDIT}
                            onclick={handleEdit}
                            disabled={!textureData}/>
                </Flex>

                <Flex width="auto" align="center" gapX="2">                              
                    <XInputSelect label="Export:"
                                    collection={GlSystem3d.IMAGE_FORMATS}                     
                                    value={GlSystem3d.IMAGE_FORMATS[0].id}
                                    onchange={(value) => setExportFormat(value.id)} />

                    <XButton  text={OpConstants.OP_TEXT_EXPORT}
                            icon={LIB_ICON.EXPORT}
                            color={ButtonsStyle.COLOR_EDIT}
                            onclick={handleExport}
                            disabled={!textureData}/>
                </Flex>
            </Flex>        
        )
    };//end

    return (
        <Flex width="100%" direction="row">

            <Flex width="20%" direction="column">
                <PanelGeneration
                    parameters={parameters}
                    onParametersChange={setParameters}
                    isGenerating={processing}/>                   
            </Flex>
            
            <Flex width="80%" direction="column" px="2" gapY="2">
                {renderMainHeader()}
                <Flex width="100%" direction="row" pt="1">
                    <Flex width="50%" justify="center" >
                        <CanvasImageData format={exportFormat}
                                         onimageready={onExportImageReady}
                                         textureData={textureData} 
                                         width={PlanetsConfig.EXP_IMAGE_DIMENSION.width} 
                                         height={PlanetsConfig.EXP_IMAGE_DIMENSION.height} />
                    </Flex>
                    <Flex width="50%" justify="center" >
                        <PlanetsMonitor
                            textureData={textureData}
                            width={480}
                            height={480}
                            metallicness={parameters.metallicness / 100}
                            roughness={parameters.roughness / 100}/>
                    </Flex>                    
                </Flex>

            </Flex>

        </Flex>
    )

};//end component
