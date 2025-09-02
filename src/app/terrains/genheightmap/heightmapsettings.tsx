//src\app\terrains3d\genmodel\components\pnlgeneratenew.tsx

import { useEffect, useState } from "react";
import { Box, Flex } from "@radix-ui/themes";
import { HeightMapTerrainConfig } from "@/terrains/model/heightmapterrcfg";


import { NumberParameter } from "@/common/numberparam";
import { SliderNumber } from "@/radix/sliders/slidernumber";
import { InfoNotdata } from "@/radix/data/infonotdata";
import { XOuputText } from "@/radix/data/outputtext";
import { Terrains3dConfig } from "../terrains3dcfg";

interface PanelSettingsProps {
    onterrconfigchange: (newConfig:HeightMapTerrainConfig) =>void;
    ontexturesizechange: (size: number) => void;
    imagesizeinit: number;
};
export function PanelSettings({ imagesizeinit, ontexturesizechange, onterrconfigchange }: PanelSettingsProps) {

    const [paramImageSize, setParamImageSize] = useState<NumberParameter | null>(null);
    const [imageCountPixels, setImageCountPixels] = useState<number>(imagesizeinit);
    const [imageSize, setImageSize] = useState<number>(imagesizeinit);
    const [config, setConfig] = useState<HeightMapTerrainConfig>(Terrains3dConfig.DEF_TERRAIN_CONFIG);
    const [terrainCountVertex, setTerrainCountVertex] = useState<number>(imagesizeinit);

    const grparams:NumberParameter[] = config.getAsArrayParams();

    useEffect(() => {
        const paramImageSize: NumberParameter
            = new NumberParameter("image_size", "Image Size",
                Terrains3dConfig.IMAGE_SIZE_RANGE,
                imagesizeinit,
                Terrains3dConfig.IMAGE_SIZE_STEP);
        const cnt_pixeles:number = imagesizeinit * imagesizeinit;
        setImageCountPixels(cnt_pixeles);
        setParamImageSize(paramImageSize);        
        setTerrainCountVertex(Math.pow(config.subdivisions + 1, 2));

    }, [imagesizeinit]);

    const onTextureSizeChange = (index: number, value: number) => {
        setImageSize(value);
        ontexturesizechange(value);
    };

    const onTerrConfigChange= (index:number,value:number) => {
       const update_config:HeightMapTerrainConfig = config;
       if(index===0){ update_config.sideLength = value;}
       if(index===1){ update_config.subdivisions = value;}
       if(index===2){ update_config.maxHeight = value;}
       setConfig(update_config);
       setTerrainCountVertex(Math.pow(update_config.subdivisions + 1, 2));
    };//end

    if (paramImageSize === null) return (
        <InfoNotdata message="loading..." />
    );

    return (
        <Flex direction="column" width="100%" gapY="2">
            <Flex direction="row" width="100%" gapX="2">
                <Box width="60%" >
                    <SliderNumber index={0}
                        params={paramImageSize}
                        onchange={onTextureSizeChange} />
                </Box>
                <Box width="40%" >
                     <XOuputText label="Count Pixels" 
                                 value={imageCountPixels.toString()} />
                </Box>
            </Flex>
            
            <Flex width="100%" direction="row" >

                <Flex width="60%" direction="column" gapY="2">
                    <SliderNumber index={0}
                                params={grparams[0]} 
                                onchange={onTerrConfigChange} />
                    <SliderNumber index={1}
                                params={grparams[1]} 
                                onchange={onTerrConfigChange} />                                
                    <SliderNumber index={2}
                                params={grparams[2]} 
                                onchange={onTerrConfigChange} />
                </Flex>

                <Flex width="40%" direction="column" gapY="2">
                    <XOuputText label="Count Vertex" 
                                value={terrainCountVertex.toString()} />    
                </Flex>
            </Flex>
        </Flex>
    )

}//end component