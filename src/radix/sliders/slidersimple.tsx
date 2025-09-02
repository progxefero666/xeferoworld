//src\radix\sliders\slidersimple.tsx

import React, { useState } from "react";
import { Box, Flex,  Slider} from "@radix-ui/themes";
import { CompStyle } from "@/radix/rdxtheme";
import { XText } from "@/radix/data/xtext";
import { RangeConfig } from "@/common/rangeconfig";


interface SliderSimpleProps {    
    id:string;
    config:RangeConfig;    
    onchange: (id:string,value:number) => void;    
};

export function SliderSimple({id,config,onchange}: SliderSimpleProps) {

    const [valueText, setValueText] = useState<string>(config.value.toFixed(2).toString());

    const handleOnChange = (sliderValue: number[]) => {         
        setValueText(sliderValue[0].toFixed(2).toString());
        onchange(id,sliderValue[0]);
    };//end

    return (
        <Flex width="100%" direction="row" justify="between" align="center">

            <Box width="84%" px="2">
                <Slider
                    defaultValue={[config.value]}
                    step={config.step ?? 1}
                    min={config.range.min}
                    max={config.range.max}
                    size={CompStyle.DEFAULT.size}
                    color={CompStyle.DEFAULT.color}
                    radius={CompStyle.DEFAULT.border_radius}
                    onValueChange={handleOnChange}/>
            </Box>

            <Box width="16%" >
                <XText align="center" value={valueText} />
            </Box>

        </Flex>
    );

};//end