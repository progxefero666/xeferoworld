//src\radix\input\inprange.tsx

import React, { useState } from "react";
import { Box, Flex, Grid, Slider, Text} from "@radix-ui/themes";
import { CompStyle } from "@/radix/rdxtheme";

import { XText } from "../data/xtext";

import { Label } from "radix-ui";
import { RADIX_COLORS } from "../rdxconf";
import { IntParameter } from "@/common/intparam";


/**
 * XInputText Jsx Component
 */
interface XInputZoomProps {
    config:IntParameter;
    value?: number;
    onchange: (value:number) => void;
};

export function XInputZoom ({config, value, onchange}: XInputZoomProps) {

    const sliderValue:number = value ?? config.defaul;

    const handleOnChange = (value: number[]) => {     
       onchange(value[0]);
    };//end

    return (
		<Flex  width="100%" direction="column"  px="2" >

            <Box width="100%" pb="2" >
               <XText value={"Zoom: " + sliderValue.toString()} />
            </Box>

            <Box width="100%" >
                <Slider defaultValue = {[sliderValue]} 
                        step         = {config.step ?? 1}
                        min          = {config.range.min} 
                        max          = {config.range.max}
                        size         = {CompStyle.DEFAULT.size}
                        color        = {CompStyle.DEFAULT.color}
                        radius       = {CompStyle.DEFAULT.border_radius}
                        onValueChange= {(value) => {handleOnChange(value)}} 
                        disabled     = {!config.enabled}/>
            </Box>
        </Flex>
    )

};//end component

//const [currentValue, setCurrentValue] = useState<string>(value ?? "");
//setCurrentValue(val.toString());