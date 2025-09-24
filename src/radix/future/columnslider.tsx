//src\radix\future\columnslider.tsx

import React, { useRef, useState } from "react";
import { Box, Flex} from "@radix-ui/themes";
import { RADIX_COLORS } from "@/radix/rdxconf";
import { LIB_ICON } from "@/radix/rdxthicons";
import { RdxFutureComp } from "@/radix/future/rdxfuturecomp";
import { XFIcon } from "@/radix/future/xficon";
import { TSliderConfig } from "@/common/types";

const contBarstyle={
    position:'relative',
    background:'#222',
    border:'1px solid #444'
};

const barStyle = {
    width: '100%',
    left: 0, bottom: 0,
    backgroundColor: 'rgba(0, 98, 255, 1)',
    border: '1px solid rgba(26, 25, 26, 1)',
    transition: 'height 0.2s'
};

const sliderConfig:TSliderConfig = {
    range:{min:0,max:180},
    step:1
};

interface FXColumnSliderProps {
    sendinterval?:number;
    height:   number;
    valuemax: number;
    value:    number;
    onchange: (operation:string,value: number) => void;
};

export function FXColumnSlider({onchange, height, valuemax, value}: FXColumnSliderProps) {
    const barRef = useRef<HTMLDivElement>(null);
    const valueHeight = useRef<number>(50);

    const unitY: number = height / valuemax;
    const contCssHeight: any = height + "px";
    const valueCalc: number = Math.floor(unitY * value);
    const [barHeight, setBarHeight] = useState<string>(valueCalc.toString() + "px");


    const onPressed = (operation:string) => {       
        if(operation === RdxFutureComp.CMD_PRESS_UP) {
            let newValue:number = valueHeight.current+1;            
            if (newValue === valuemax) {return;}            
            const valueCssY: string = Math.floor(unitY * newValue).toString() + "px";           
            setBarHeight(valueCssY); 
            valueHeight.current =newValue;
            onchange(operation,valueHeight.current);
        }
        if(operation === RdxFutureComp.CMD_PRESS_DOWN) {
            let newValue:number = valueHeight.current-1;
            if (newValue === 0) {return;}
            const valueCssY: string = Math.floor(unitY * newValue).toString() + "px";            
            setBarHeight(valueCssY);              
            valueHeight.current =newValue;
            onchange(operation,valueHeight.current);
        }
    };//end

    return (
        <Flex height="auto" direction="column" 
              justify="end" px="2" py="1" gapY="2" >

            <Box width="auto" >
                <XFIcon icon={LIB_ICON.UP} 
                        color={RADIX_COLORS.orange}
                        colorpressed={RADIX_COLORS.green}
                        operation={RdxFutureComp.CMD_PRESS_UP}
                        onpressed={onPressed} />    
            </Box>
            
            <Flex height={contCssHeight} direction="column" justify="end"
                 style={{...contBarstyle,position:'relative'}}>

                <Box ref={barRef} height={barHeight}
                     style={{...barStyle,position:'absolute'}}/>
            </Flex>
            <Box width="auto" >
                <XFIcon icon={LIB_ICON.DOWN} 
                             color={RADIX_COLORS.orange}
                             colorpressed={RADIX_COLORS.green}
                             operation={RdxFutureComp.CMD_PRESS_DOWN}
                             onpressed={onPressed}  />    
            </Box>
        </Flex>
    );
    
};//end component

/*
const changeValue = (operation: string, newValue: number) => {        
    const valueCssY: string = Math.floor(unitY * newValue).toString() + "px";
    setBarHeight(valueCssY);
    valueHeight.current = newValue;    
};
const onClick = (operation:string) => {
    onPressed(operation);
};//end
*/