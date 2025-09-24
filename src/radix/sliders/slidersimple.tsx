//src\radix\input\inprange.tsx

import React, { useState } from "react";
import { Box, Flex,  Slider} from "@radix-ui/themes";
import { CompStyle } from "@/radix/rdxtheme";
import { XText } from "@/radix/data/xtext";
import { NumberParameter } from "@/common/numberparam";
import { SliderConfig } from "./sliderconfig";


interface SliderSimpleProps {
    config:SliderConfig;
    index:number;
    value:number;
    onchange: (index:number,value:number) => void;
};

export function SliderSimple({config,index,value, onchange}: SliderSimpleProps) {

    const [valueText, setValueText] = useState<string>(value.toString());

    const handleOnChange = (sliderValue: number[]) => { 
        
        setValueText(sliderValue[0].toFixed(2).toString());
        onchange(index, sliderValue[0]);
    };//end

    return (
        <Flex width="100%" direction="row" justify="between" align="center">
            <Box width="25%" >
                <XText value={config.label} />
            </Box>

            <Box width="59%" px="2">
                <Slider
                    defaultValue={[value]}
                    step={config.step ?? 1}
                    min={config.range.min}
                    max={config.range.max}
                    size={CompStyle.DEFAULT.size}
                    color={CompStyle.DEFAULT.color}
                    radius={CompStyle.DEFAULT.border_radius}
                    onValueChange={handleOnChange}/>
            </Box>

            <Box width="16%" >
                <XText align="center"
                    value={valueText} />
            </Box>

        </Flex>
    );
};//end component

/*
const [value, setValue] = useState<number[]>([defvalue]);
    
{valueDegrees}°<br />
{value.toFixed(2)} rad
*/