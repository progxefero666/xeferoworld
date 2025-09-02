//src\radix\future\ftvaluecolumn.tsx


import React, { useRef, useState, forwardRef, useImperativeHandle } from "react";
import { Box, Flex} from "@radix-ui/themes";


const barStyle = {
    backgroundColor: 'rgba(0, 98, 255, 1)',
    border: '1px solid rgba(26, 25, 26, 1)',
};


interface FtValueColumnProps {
    id:       string;
    height:   number;
    valuemax:    number;
    value:    number;
};

export interface FtValueColumnRef {
    changeValue: (newValue: number) => void;
}

export const FtValueColumn = forwardRef<FtValueColumnRef, FtValueColumnProps>((props, ref) => {
    const { id, height, valuemax, value } = props;
    const [barValue, setBarValue] = useState<number>(value);
    const barRef = useRef<HTMLDivElement>(null);
    const contCssHeight: any = height + "px";
    const valueCssY: number = Math.floor((height / valuemax) * barValue);

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
                 style={{position:'relative',background:'#222',border:'1px solid #444'}}>

                <div
                    ref={barRef}
                    style={{
                        ...barStyle,
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        width: '100%',
                        height: valueCssY + 'px',
                        transition: 'height 0.2s',
                    }}
                />
            </Box>

        </Flex>
    );
});