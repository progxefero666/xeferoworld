//src\radix\inputgroup\grpslidernumber.tsx

import React from "react";
import { Flex,Box, ScrollArea  } from "@radix-ui/themes";

import { NumberParameter } from "@/common/numberparam";
import { SliderNumber } from "@/radix/sliders/slidernumber";
import { TablesStyle } from "@/radix/rdxtheme";


interface GroupSliderNumberProps {
    id:      string; 
    grparams:NumberParameter[];
    onchange: (index:number,value:string) => void;
};

export function GroupSliderNumber({id, grparams, onchange}: GroupSliderNumberProps) {
    
    const handleOnChange= (index:number,value:number) => {
        console.log(value)
    };//end

    return (
        <Flex width="100%" pr="10">
            <ScrollArea type="always" scrollbars="vertical"
                        style={TablesStyle.MAINCONT_STYLE}>                 
                {grparams.map((param,index) => (
                    <Box key={index.toString()} width="100%" >
                        <SliderNumber key={index.toString()}
                                      index={index}
                                      params={param} 
                                      onchange={handleOnChange}  />
                    </Box>
                ))}
            </ScrollArea>
        </Flex>
    )

}//end 