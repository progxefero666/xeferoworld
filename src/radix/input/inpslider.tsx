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
interface XInputSliderProps {
    config:IntParameter;
    value?: number;
    onchange?: (id:string|null,value:number) => void;
};

export function XInputSlider ({config, value, onchange}: XInputSliderProps) {

    const sliderValue:number = value ?? config.defaul;

    const handleOnChange = (value: number[]) => {     
        if (onchange) {
            onchange(config.id??null,value[0]);
        }
    };//end

    return (
		<Grid width="100%" rows="auto" columns="20% 70% 10%" >

            <Box gridColumn="1" gridRow="2" >
                <Label.Root>{config.label}</Label.Root> 
            </Box>

            <Box gridColumn="2" gridRow="2" >
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

            <Box gridColumn="3" gridRow="2" >
				<XText value={sliderValue.toString()} color={RADIX_COLORS.gray} />
            </Box>

        </Grid>
    )

};//end component

//const [currentValue, setCurrentValue] = useState<string>(value ?? "");
//setCurrentValue(val.toString());