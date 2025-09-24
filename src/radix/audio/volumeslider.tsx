//src\radix\input\inprange.tsx

import React, { useState } from "react";
import { Box, Flex, Grid, Slider, Text} from "@radix-ui/themes";
import { CompStyle } from "@/radix/rdxtheme";

import { XText } from "../data/xtext";

import { Label } from "radix-ui";
import { RADIX_COLORS } from "../rdxconf";
import { IntParameter } from "@/common/intparam";
import { AudioMonitorCfg } from "@/audio/components/audiolabmoncfg";


/**
 * XInputText Jsx Component
 */
interface ControlVolumeProps {
    value: number;
    onchange?: (value:number,id?:string) => void;
};

export function ControlVolume ({value,onchange}: ControlVolumeProps) {

    const handleOnChange = (value: number[]) => {     
        if (onchange) {
            onchange(value[0],'control_volumen');
        }
    };//end

    return (
        <Flex width="auto" direction="column" align="center" pt="3"  px="2">
            
            <Slider defaultValue = {[value]} 
                    step         = {1}
                    min          = {1} 
                    max          = {100}
                    size         = {CompStyle.DEFAULT.size}
                    radius       = {CompStyle.DEFAULT.border_radius}
                    onValueChange= {(value) => {handleOnChange(value)}} />
        </Flex>
    )

};//end component

//const [currentValue, setCurrentValue] = useState<string>(value ?? "");
//setCurrentValue(val.toString());