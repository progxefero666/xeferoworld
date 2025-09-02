//src\app\terrains3d\gentexture\textureeditor.tsx

import React, { useEffect, useRef, useState } from "react";
import { Flex, Box, Grid } from "@radix-ui/themes";
import { HeightMapTerrainConfig } from "@/terrains/model/heightmapterrcfg";
import { TDimension, TRange } from "@/common/types";
import { XText } from "@/radix/data/xtext";
import { TextStyle } from "@/radix/rdxtheme";
import { RangeConfig } from "@/common/rangeconfig";
import { SliderSimple } from "@/radix/sliders/slidersimple";
import { FtRangesColor } from "@/radix/future/ftrangescolor";
import { Terrains3dConfig } from "src/app/terrains/terrains3dcfg";
import { genTextureHeightmap } from "@/terrains/functions/generatortexture";



const colorRangesCfg:RangeConfig = new RangeConfig({min:0,max:100},50,1);

const listColors:string[] = [
    'rgb(250,202,139)',
    'rgb( 26,175, 88)',
    'rgb(149, 95, 24)'
];
//    'rgb( 47, 30,  7)',

interface TextureEditorProps {
    terrainConfig: HeightMapTerrainConfig;
    imagedimension: TDimension;
    imagedata: ImageData | null;
    onCreatedTextureColor: (imgColorData: ImageData) => void;
};
export function TextureEditor({ terrainConfig,imagedimension, imagedata,
                                onCreatedTextureColor}: TextureEditorProps) {

    const [rangeBias, setRangeBias] = useState<number[]>([]);

    useEffect(() => { 
        if(imagedata){
            genTextureColor();
        }
    },[]); 

    const genTextureColor = () => {
        const colorBack:string= Terrains3dConfig.WATER_COLOR;
    
        const colorImageData:ImageData 
            = genTextureHeightmap(imagedata!,colorBack,listColors,0.5,false);
        onCreatedTextureColor(colorImageData);
    };

    const onColorChange = (id:string,rgbcolor:string) => {       
        /*
        const newColors: any[] = [...colorRanges];
        if (id === '0') { newColors[0] = rgbcolor; }
        else if (id === '1') { newColors[1] = rgbcolor; }
        else if (id === '2') { newColors[2] = rgbcolor; }
        setcolorRanges(newColors);
        */
    };

    const onRangesChanges = (colors: string[], biases: number[]) => {

    };


    return (
        <Flex width="100%" direction="column" gapY="2">
            <Box>
                <XText value="Texture Editor" style={TextStyle.ST_CONT_HEADER_COLOR} />
            </Box>

            <Flex>
                <FtRangesColor colorsinit={listColors} onchange={onRangesChanges} />                
            </Flex>
        </Flex>
    )

}//end component

/*
const onBiasChange = (id:string,value:number) => {
    if(id==='bias_01'){
        console.log('bias 01:' + value) 
    }
};
<SliderSimple id="bias_01"
                config={colorRangesConfig}
                onchange={onBiasChange} />
*/