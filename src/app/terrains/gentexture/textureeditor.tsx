//src\app\terrains3d\gentexture\textureeditor.tsx

import React, { useEffect, useRef, useState } from "react";
import { Flex, Box, Grid } from "@radix-ui/themes";
import { HeightMapTerrainConfig } from "@/terrains/model/heightmapterrcfg";
import { TDimension, TRange } from "@/common/types";
import { XText } from "@/radix/data/xtext";
import { TextStyle } from "@/radix/rdxtheme";
import { TextureConfig } from "@/terrains/model/textureconfig";
import { Terrains3dConfig } from "../terrains3dcfg";
import { InputColor, InputColorRef } from "@/radix/input/inpcolor";
import { genTextureFromHeightmap } from "@/terrains/functions/generatortexture";
import { ColorRamp } from "@/terrains/model/colorramp";

import { RangeConfig } from "@/common/rangeconfig";
import { SliderSimple } from "@/radix/sliders/slidersimple";
import { FtRangesColor } from "@/radix/future/ftrangescolor";


const colorRangesConfig:RangeConfig = new RangeConfig({min:0,max:100},50,1);


interface TextureEditorProps {
    terrainConfig: HeightMapTerrainConfig;
    textColorCfg: TextureConfig;
    imagedimension: TDimension;
    imagedata: ImageData | null;
    onCreatedTextureColor: (imgColorData: ImageData) => void;
};
export function TextureEditor({ terrainConfig, 
                                imagedimension, imagedata,
                                textColorCfg, onCreatedTextureColor}: TextureEditorProps) {

    const [coloRangesBias, setcoloRangesBias] = useState<number>(textColorCfg.bias);
    const [colorRanges, setcolorRanges] = useState<any[]>(
        [
            textColorCfg.rampcolor.start,
            textColorCfg.rampcolor.middle,
            textColorCfg.rampcolor.end
        ]
    );

    const colorsRef = useRef<Array<React.RefObject<InputColorRef | null>>>([]);
    if (colorsRef.current.length === 0) {
        colorsRef.current = [
            React.createRef<InputColorRef>(),
            React.createRef<InputColorRef>(),
            React.createRef<InputColorRef>()
        ];
    }

    const listColors:string[] = [
        textColorCfg.rampcolor.start,
        textColorCfg.rampcolor.middle,
        textColorCfg.rampcolor.end
    ];

    useEffect(() => { 
        if(imagedata){
            genTextureColor();
        }
    },[]); 

    const genTextureColor = () => {
        const colorBack:string= Terrains3dConfig.WATER_COLOR;
        const colorRamp:ColorRamp 
            = new ColorRamp(colorRanges[0],colorRanges[1],colorRanges[2]);    
        const colorImageData:ImageData 
            = genTextureFromHeightmap(imagedata!,colorRamp,coloRangesBias,colorBack);
        onCreatedTextureColor(colorImageData);
    };

    const onColorChange = (id:string,rgbcolor:string) => {
       
        const newColors: any[] = [...colorRanges];
        if (id === '0') { newColors[0] = rgbcolor; }
        else if (id === '1') { newColors[1] = rgbcolor; }
        else if (id === '2') { newColors[2] = rgbcolor; }
        setcolorRanges(newColors);
    };

    const onRangesChanges = (colors: string[], biases: number[]) => {

    };


    return (
        <Flex width="100%" direction="column" >
            <Box>
                <XText value="Texture Editor" style={TextStyle.ST_CONT_HEADER_COLOR} />
            </Box>
            <Grid columns="25% 25% 25%" gapX="2" >

                <Box gridRow="1" gridColumn="1">
                    <InputColor id="0" ref={colorsRef.current[0]} label="start"
                                colorinit={colorRanges[0]} onchange={onColorChange} />
                </Box>

                <Box gridRow="1" gridColumn="2">
                    <InputColor id="1" ref={colorsRef.current[1]} label="middle"
                                colorinit={colorRanges[1]} onchange={onColorChange} />
                </Box>

                <Box gridRow="1" gridColumn="3">
                    <InputColor id="2" ref={colorsRef.current[2]} label="end"
                                colorinit={colorRanges[2]} onchange={onColorChange} />
                </Box>

            </Grid>

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