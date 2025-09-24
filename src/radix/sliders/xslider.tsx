//src\radix\input\inprange.tsx

import React, { useState } from "react";
import { Box, Flex,  Slider} from "@radix-ui/themes";
import { CompStyle } from "@/radix/rdxtheme";
import { XText } from "@/radix/data/xtext";
import { TSliderConfig } from "@/common/types";


interface XSliderProps {
    config:TSliderConfig;
    value:number;
    onchange: (id:string,value:number) => void;
};

export function XSlider({config,value, onchange}: XSliderProps) {

    //const [valueText, setValueText] = useState<string>(value.toString());

    const handleOnChange = (sliderValue: number[]) => {         
        //setValueText(sliderValue[0].toString());
        onchange(config.id,sliderValue[0]);
    };//end

    return (
        <Flex width="100%" direction="row" justify="center" px="2">

            <Box width="100%" >
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

            {/*
                <Box width="16%" >
                    <XText align="center" value={valueText} />
                </Box>            
            */}
        </Flex>
    );
};//end component