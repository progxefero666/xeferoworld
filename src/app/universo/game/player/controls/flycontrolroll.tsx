//src\radix\future\rowslider.tsx

import React, { useRef, useState } from "react";
import { Box, Flex,  Slider} from "@radix-ui/themes";
import { CompStyle } from "@/radix/rdxtheme";
import { TSliderConfig } from "@/common/types";
import { RADIX_COLORS } from "@/radix/rdxconf";
import { LIB_ICON } from "@/radix/rdxthicons";
import { XText } from "@/radix/data/xtext";
import { RdxFutureComp } from "@/radix/future/rdxfuturecomp";
import { XFIcon } from "@/radix/future/xficon";


interface FlyControlRollProps {
    changeValue: (operation:string,value:number) => void;
};

export function FlyControlRoll({changeValue}: FlyControlRollProps) {

    const sliderConfig:TSliderConfig = {range:{min:0,max:180},step:1};

    const valueReal = useRef<number>(0);
    const [valueSlider, setValueSlider] = useState<number>(90);
    const valueMin:number = Math.floor((sliderConfig.range.max/2)*-1);
    const valueMax:number = Math.floor(sliderConfig.range.max/2);

    const onPressed = (operation:string) => {       
        if(operation === RdxFutureComp.CMD_PRESS_LEFT) {
            let newValue:number = valueReal.current-1;            
            if (newValue === valueMin) {return;} 
            valueReal.current =newValue;
            const newSliderValue = 90 + valueReal.current;
            setValueSlider(newSliderValue);
            changeValue(operation,valueReal.current);
        }          
        if(operation === RdxFutureComp.CMD_PRESS_RIGHT) {
            let newValue:number = valueReal.current+1;            
            if (newValue === valueMax) {return;} 
            valueReal.current =newValue;
            const newSliderValue = 90 + valueReal.current;
            setValueSlider(newSliderValue);
            changeValue(operation,valueReal.current);
        }      
    };//end

    return (
        <Flex width="100%" direction="row" justify="between" align="center">

            <Box width="auto" >
                <XFIcon icon={LIB_ICON.ARROW_LEFT} 
                            color={RADIX_COLORS.orange}
                            colorpressed={RADIX_COLORS.green}
                            operation={RdxFutureComp.CMD_PRESS_LEFT}
                            onpressed={onPressed} />  
            </Box>

            <Box width="100%" px="2" >
                <Slider defaultValue={[90]}
                        value={[valueSlider]}
                        step={sliderConfig.step ?? 1}
                        min={sliderConfig.range.min}
                        max={sliderConfig.range.max}
                        size="3"
                        color={CompStyle.DEFAULT.color}
                        radius={CompStyle.DEFAULT.border_radius}/>
            </Box>

            <Box width="auto" >
                <XFIcon icon={LIB_ICON.ARROW_RIGHT} 
                            color={RADIX_COLORS.orange}
                            colorpressed={RADIX_COLORS.green}
                            operation={RdxFutureComp.CMD_PRESS_RIGHT}
                            onpressed={onPressed} /> 
            </Box>

        </Flex>
    );
};//end component
