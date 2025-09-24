"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Box, Button, Flex } from "@radix-ui/themes";
import { TGroupParameter } from "@/common/types";
import { Option } from "@/common/option";
import { XInputSelect } from "@/radix/input/inpselect";
import { CanvasImageData } from "@/lib/graph2d/components/canvasimagedata";
import { applyTextureEdition } from "@/universo3d/planets/editionfunct";

import { RdxThContainers } from "@/radix/rdxthcontainers";
import { OpConstants } from "@/common/constants";
import { LIB_ICON } from "@/radix/rdxthicons";
import { ButtonsStyle, TextStyle } from "@/radix/rdxtheme";
import { XButton } from "@/radix/buttons/xbutton";
import { XText } from "@/radix/data/xtext";
import { GlSystem3d } from "@/zone3d/glsystem3d";
import { PlanetsConfig } from "../planetcfg";
import { PanelEditionParams } from "./editionparams";
import { PlanetsMonitor } from "../planetsmonitor";


interface PlanetaryTextureEditorProps {
    initialTextureData?: ImageData | null;
};

export function PlanetaryTextureEditor({ initialTextureData }: PlanetaryTextureEditorProps) {

    const [textureData, setTextureData] = useState<ImageData | null>(initialTextureData || null);
    const [exportFormat, setExportFormat] = useState<"png" | "jpg" | "json">("png");

    const [parameters, setParameters] = useState({
        baseColorHue: 200,
        baseColorSaturation: 60,
        baseColorLightness: 40,
        metallicness: 50,
        roughness: 30,
    })

    //const textureCanvasRef = useRef<{ exportTexture: (format: string) => void }>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (initialTextureData) {
            setTextureData(initialTextureData);
        }
    }, [initialTextureData]);

    const handleParameterChange = (key: string, value: number) => {
        setParameters((prev) => ({ ...prev, [key]: value }));
    };

    const handleImport = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                // Create canvas to convert image to ImageData
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                if (!ctx) return;

                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

                setTextureData(imageData);
                setParameters({
                    baseColorHue: 0,
                    baseColorSaturation: 0,
                    baseColorLightness: 0,
                    metallicness: 0,
                    roughness: 0,
                })
            }
            img.src = e.target?.result as string;
        }
        reader.readAsDataURL(file);
    };//end

    const handleApplyEdition = () => {
        if (!textureData) return;
        const baseColorGroup: TGroupParameter = {
            id: "baseColor",
            parameters: [
                { id: "hue", range: { min: 0, max: 360 }, value: parameters.baseColorHue },
                { id: "saturation", range: { min: 0, max: 100 }, value: parameters.baseColorSaturation },
                { id: "lightness", range: { min: 10, max: 90 }, value: parameters.baseColorLightness },
            ]
        };
        const materialGroup: TGroupParameter = {
            id: "material",
            parameters: [
                { id: "metallicness", range: { min: 30, max: 70 }, value: parameters.metallicness },
                { id: "roughness", range: { min: 20, max: 40 }, value: parameters.roughness },
            ],
        };
        const editedTexture = applyTextureEdition(textureData, baseColorGroup, materialGroup);
        setTextureData(editedTexture);
    };//end

    const handleExport = () => {
        //console.log("Export clicked in editor (dummy mode)");
        //console.log("Format:", exportFormat);
        //console.log("Parameters:", parameters);
        if (exportFormat === "json") {
            const exportData = {
                type: "edited_texture_parameters",
                parameters: parameters,
                timestamp: new Date().toISOString(),
            }
            console.log("JSON Export Data:", JSON.stringify(exportData, null, 2));
        }
        else {
            console.log(`${exportFormat.toUpperCase()} export would happen here`);
        }
    };//end

    const renderMainHeader = () => {
        return (
            <Flex width="100%" direction="row" justify="between" align="center" px="2"
                style={RdxThContainers.BORDER_SIMPLE}>

                <Box width="auto">
                    <XText value="Planets Editor"
                        style={TextStyle.ST_CONT_HEADER_COLOR} />
                </Box>

                <Flex width="auto" direction="row" justify="end" align="center"
                    px="2" gapX="2" >
                    <XButton text={OpConstants.OP_TEXT_IMPORT}
                        icon={LIB_ICON.IMPORT}
                        color={ButtonsStyle.COLOR_IMPORT}
                        onclick={handleImport} />
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept={GlSystem3d.UPLOAD_FILES_FORMATS}
                        onChange={handleFileChange}
                        className="hidden" />

                    <XInputSelect collection={GlSystem3d.IMAGE_FORMATS}
                        value={GlSystem3d.IMAGE_FORMATS[0].id}
                        onchange={(value) => setExportFormat(value.id)} />

                    <XButton text={OpConstants.OP_TEXT_EXPORT}
                        icon={LIB_ICON.EXPORT}
                        color={ButtonsStyle.COLOR_EDIT}
                        onclick={handleExport}
                        disabled={!textureData} />
                </Flex>
            </Flex>
        )
    };//end

    return (

        <Flex width="100%" direction="row">

            <Flex width="20%" direction="column">
                <PanelEditionParams
                    parameters={parameters}
                    onParameterChange={handleParameterChange}
                    onApplyEdition={handleApplyEdition} />
            </Flex>

            <Flex width="80%" direction="column" pl="2">

                {/* Main Header */}
                {renderMainHeader()}

                <Flex width="100%" direction="row" pt="1">
                    <Flex width="50%" justify="center" >
                        <CanvasImageData format="jpg" 
                                         textureData={textureData}
                                         width={PlanetsConfig.EXP_IMAGE_DIMENSION.width} 
                                         height={PlanetsConfig.EXP_IMAGE_DIMENSION.height}  />
                    </Flex>
                    <Flex width="50%" justify="center" >
                        <PlanetsMonitor
                            textureData={textureData}
                            width={480}
                            height={480}
                            metallicness={parameters.metallicness / 100}
                            roughness={parameters.roughness / 100} />
                    </Flex>
                </Flex>

            </Flex>

        </Flex>
    )

}//end component


/*
<Select value={exportFormat} 
        onValueChange={(value: "png" | "jpg" | "json") => setExportFormat(value)}>

    <SelectTrigger className="w-20 h-8 text-xs">
        <SelectValue />""
    </SelectTrigger>
    <SelectContent>
        <SelectItem value="png">PNG</SelectItem>
        <SelectItem value="jpg">JPG</SelectItem>
        <SelectItem value="json">JSON</SelectItem>
    </SelectContent>
</Select>
*/


