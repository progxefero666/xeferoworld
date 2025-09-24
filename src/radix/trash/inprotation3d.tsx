//src\radix\input\inprange.tsx

import React, { useState } from "react";
import { Box, Flex,  Slider} from "@radix-ui/themes";
import { CompStyle } from "@/radix/rdxtheme";


import { TRange } from "@/common/types";
import { XText } from "@/radix/data/xtext";


interface InputRotation3dProps {
    id:       string;   
    onchange: (id:string,rotationCCW:boolean) => void;
};

export function InputRotation3d({id, onchange}: InputRotation3dProps) {

    const [oldValue,setOldValue ] = useState<number>(90);

    const [value, setValue] = useState<number[]>([90]);
    const [valueText, setValueText] = useState<string>("0");

    const handleOnChange = (sliderValue: number[]) => {      
        let dirCCW:boolean = true;
        if(sliderValue[0]<oldValue){dirCCW = true;}
        setOldValue(sliderValue[0]);
        onchange(id,dirCCW);
        setValueText(sliderValue[0].toString());
    };//end

    return (
        <Flex width="100%" direction="row" align="center">
            <Flex width="93%" px="2"  justify="center">
                <Slider
                    defaultValue={value}
                    step={1}
                    min={0}
                    max={180}
                    size={CompStyle.DEFAULT.size}
                    color={CompStyle.DEFAULT.color}
                    radius={CompStyle.DEFAULT.border_radius}
                    onValueChange={handleOnChange}/>
            </Flex>
            <Flex width="6%" justify="center" >
                <XText align="center"
                    value={valueText} />
            </Flex>
        </Flex>
    );
};//end component

/*
{valueDegrees}°<br />
{value.toFixed(2)} rad
*/