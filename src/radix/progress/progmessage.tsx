//src\radix\progress\progmessage.tsx

import React, { useEffect, useRef, useState } from "react";
import { Flex, Text, Dialog } from "@radix-ui/themes";
import { ButtonsStyle, TextStyle } from '@/radix/rdxtheme';
import { Constants, OpConstants } from "@/common/constants";
import { XInputText } from "@/radix/input/inptext";

import { LIB_ICON } from "@/radix/rdxthicons";
import { XButton } from "@/radix/buttons/xbutton";
import { XIconButton } from "@/radix/buttons/xiconbutton";
import { XText } from "@/radix/data/xtext";


let executed: boolean = false;
interface ProgresMessageProps {

    title: string;
    data: string;
    opened:boolean;
};
export const ProgresMessage = ({title,data,opened}: ProgresMessageProps) => {

    const triggerRef = useRef<HTMLButtonElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {

        if (opened) {
            
            triggerRef.current?.click();
        }
        else        {closeRef.current?.click();}
    },[]);         

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <button ref={triggerRef} style={{display:"none"}}/> 
            </Dialog.Trigger>

            <Dialog.Content>

                <Dialog.Title>
                    <Text size={TextStyle.SIZE_TITLE_DIALOG}
                          color={TextStyle.COLOR_HEADER}>
                        {title}
                    </Text>
                </Dialog.Title>

                <Flex width="100%" direction="column" gapY="2" >
                    <XText  value={data} />

                </Flex>

                <Dialog.Close>
                    <Flex width="100%" direction="row" justify="center" gapX="2" mt="2">       
                        <button type="submit" ref={closeRef} style={{display:"none"}}/>                  
                    </Flex>
                </Dialog.Close>

            </Dialog.Content>

        </Dialog.Root>
    )

};//end component