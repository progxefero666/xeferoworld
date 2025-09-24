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
import { ProgresMessage } from "@/radix/progress/progmessage";

const dialogStyle = {
    cursor: "wait"
};
interface ProgresDialogProps {
    processing: boolean;
    buttontext?: string;
    icon?: string;
    title: string;
    data: string;
    execute: () => void;
};
export const ProgresDialog = ({processing,buttontext,icon,execute,title,data}: ProgresDialogProps) => {

    //useEffect(() => {  },[]);         

    return (
        <Flex width="auto" direction="row" align="center" gapX="2" pt="1"
             style = {dialogStyle}>
            {processing ? 
            <ProgresMessage title  = {title}
                            data   = {data}
                            opened = {processing} />:
            <XButton text="Open AI"
                color   = {ButtonsStyle.COLOR_APICALL}
                icon    = {LIB_ICON.APICALL}                          
                onclick = {execute} />}            
        </Flex>
    )

};//end component