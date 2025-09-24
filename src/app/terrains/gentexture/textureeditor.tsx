//src\app\terrains3d\gentexture\textureeditor.tsx

import React, { useEffect, useRef, useState } from "react";
import { Flex, Box, Grid } from "@radix-ui/themes";
import { HeightMapTerrainConfig } from "@/terrains/model/heightmapterrcfg";
import { TDimension } from "@/common/types";
import { XText } from "@/radix/data/xtext";
import { TextStyle } from "@/radix/rdxtheme";
import { TextureConfig } from "@/terrains/model/textureconfig";
import { Terrains3dConfig } from "../terrains3dcfg";
import { InputColor, InputColorRef } from "@/radix/input/inpcolor";
import { genTextureFromHeightmap } from "@/terrains/functions/generatortexture";
import { ColorRamp } from "@/terrains/model/colorramp";
import { XColorGradient } from "@/radix/future/xcolorgradient";
import { RdxThContainers } from "@/radix/rdxthcontainers";
import { ColorItem } from "@/lib/graph2d/model/coloritem";



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

    const coll:ColorItem[] = [
        new ColorItem("#ff0000",0),
        new ColorItem("#248affff",25),
        new ColorItem("#00ff00",75),
        new ColorItem("#333333ff",100)]

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


        
    const onColorChange = (id: string, value: any) => {
        console.log(`Color for ${id}: ${value}`);
        const newColors: any[] = [...colorRanges];
        if (id === '0') { newColors[0] = value; }
        else if (id === '1') { newColors[1] = value; }
        else if (id === '2') { newColors[2] = value; }
        setcolorRanges(newColors);
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
            <Flex width="100%" height="auto" direction="column" 
                  px="2" py="2" style={RdxThContainers.BORDER_SIMPLE} >
                    <XColorGradient initcoll={coll} width={450} />                      
            </Flex>            
        </Flex>
    )

}//end component