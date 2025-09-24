//src\radix\future\ftvaluecolumn.tsx


import React, { useRef, useState, forwardRef, useImperativeHandle } from "react";
import { Box, Flex} from "@radix-ui/themes";

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


interface FXColumnValueProps {
    id:       string;
    height:   number;
    valuemax:    number;
    value:    number;
};

export interface FXColumnValueRef {
    changeValue: (newValue: number) => void;
};

export const FXColumnValue = forwardRef<FXColumnValueRef, FXColumnValueProps>((props, ref) => {
    const { id, height, valuemax, value } = props;
    const [barValue, setBarValue] = useState<number>(value);
    const barRef = useRef<HTMLDivElement>(null);

    const contCssHeight: any = height + "px";
    const valueY: number = Math.floor((height / valuemax) * barValue);
    const valueCssY: string = valueY + "px";

    const changeValue = (newValue: number) => {
        setBarValue(newValue);
    };

    useImperativeHandle(ref, () => ({
        changeValue,
    }), []);

    return (
        <Flex width="100%" height={contCssHeight} direction="column" 
              justify="end" px="2" py="1">

            <Box width="100%" height={contCssHeight} 
                 style={{...contBarstyle,position:'relative'}}>

                <div ref={barRef}
                     style={{...barStyle,position:'absolute',height:valueCssY}}/>
            </Box>
        </Flex>
    );
    
});