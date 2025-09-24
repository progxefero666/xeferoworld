//src\radix\input\inpcolor.tsx


import React, { useRef, useState, forwardRef, useImperativeHandle, CSSProperties } from "react";

import { Box, Flex, Text, Dialog,Button, IconButton } from "@radix-ui/themes"
import { ButtonsStyle, TextStyle } from '@/radix/rdxtheme';
import { OpConstants } from "@/common/constants";
import { LIB_ICON } from "@/radix/rdxthicons";
import ChromePicker from "react-color/lib/components/chrome/Chrome";
import { XText } from "../data/xtext";

const contColorStyle = {
    backgroundColor: 'rgba(0, 98, 255, 1)',
    border: '1px solid rgba(26, 25, 26, 1)',
};

export interface InputColorProps {
    id: string;
    label: string;
    colorinit: any;
    onchange: (id:string,value:any) => void;
};

export interface InputColorRef {
    changeValue: (newValue: number) => void;
}

export const InputColor = forwardRef<InputColorRef, InputColorProps>((props, ref) => {
    const { id,label, colorinit, onchange } = props;
    
    const hiddenRef = useRef<HTMLButtonElement>(null);
    const contColorRef = useRef<HTMLDivElement>(null);
    const [currentColor, setCurrentColor] = useState<any>(colorinit);
    

    useImperativeHandle(ref, () => ({
        changeValue,
    }), []);

    //must be hexadecimal
    const changeValue = (newColor: any) => {
        setCurrentColor(newColor);
        onchange(id, newColor);
    };//end

    const showCromePicker = () =>{
        hiddenRef.current?.click();
    };//end

    const getStyle = ():CSSProperties | undefined => {
        const resultStyle = {
            backgroundColor: currentColor,
            width:'100%',
            height:'30px'
        };
        return resultStyle;
    };

    //label
    return (
        <Flex width="100%" direction="column" justify="center"  px="2" py="1">
            <Flex width="100%" direction="row"gapX="2" >
                <XText value={label} style={TextStyle.ST_LABEL} />
                <div ref={contColorRef} 
                     style={getStyle()} 
                     onClick={showCromePicker}/>
            </Flex>

            <Flex width="auto" direction="column" justify="center"  px="2" py="1" pb="2">
                <Dialog.Root   >
                    <Dialog.Trigger>
                        <IconButton ref={hiddenRef} style={{display:"none"}}/>
                    </Dialog.Trigger>
                    <Dialog.Content style={{ width:'300px', display:'flex', flexDirection:'column', alignItems:'center', padding:0 }}>
                        <Dialog.Title>
                            <Text size={TextStyle.SIZE_TITLE_DIALOG}>Select color</Text>
                        </Dialog.Title>
                        <ChromePicker color={currentColor} onChange={changeValue} />
                        <Dialog.Close>
                            <Flex width="100%" direction="row" justify="center" gapX="2" mt="2">
                                <Button type="submit"
                                        color={ButtonsStyle.COLOR_SAVE}
                                        size={ButtonsStyle.BUTTON_SIZE}
                                        radius={ButtonsStyle.BUTTON_RADIUS} >
                                    {OpConstants.OP_TEXT_OK}
                                </Button>
                                <Button color={ButtonsStyle.COLOR_CANCEL}
                                        size={ButtonsStyle.BUTTON_SIZE} 
                                        radius={ButtonsStyle.BUTTON_RADIUS}>
                                    {OpConstants.OP_TEXT_CANCEL}
                                </Button>
                            </Flex>
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Root>
            </Flex>

        </Flex>
    );

});//end 