//src\radix\input\inprange.tsx

import React, { useState } from "react";
import { Box, Flex,  Slider} from "@radix-ui/themes";
import { CompStyle } from "@/radix/rdxtheme";
import { XText } from "@/radix/data/xtext";
import { NumberParameter } from "@/common/numberparam";


interface SliderNumberProps {
    params:NumberParameter;
    index:number;
    onchange: (index:number,value:number) => void;
};

export function SliderNumber({params, index, onchange}: SliderNumberProps) {

    const [valueText, setValueText] = useState<string>(params.value.toFixed(2).toString());

    const handleOnChange = (sliderValue: number[]) => { 
        
        setValueText(sliderValue[0].toFixed(2).toString());
        onchange(index, sliderValue[0]);
    };//end

    return (
        <Flex width="100%" direction="row" justify="between" align="center">
            <Box width="25%" >
                <XText value={params.label} />
            </Box>

            <Box width="59%" px="2">
                <Slider
                    defaultValue={[params.value]}
                    step={params.step ?? 1}
                    min={params.range.min}
                    max={params.range.max}
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