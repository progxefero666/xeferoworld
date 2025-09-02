//src\radix\input\inpcheck.tsx

import { forwardRef } from "react";
import { Checkbox, Flex, Text, Box } from "@radix-ui/themes";
import { Label } from "radix-ui";
import { CompStyle, TextStyle } from "@/radix/rdxtheme";
import { XContStyle } from "../rdxtypes";


/**
 * XInputCheck Jsx Component
 */
interface CompProps {
    direction?:  "row" | "column";
    style?:      XContStyle;
    name?:       string;
    value?:      any;
    label?:      string;
    placeholder?:string;
    disabled?:   boolean;
    autofocus?:  boolean;
    autocommit?: boolean;    
    onchange?:   (value: any, name?: string) => void;
    onsubmit?:   (value: any | null, name?: string) => void;
    format?:     string;
    icon?:       React.ReactNode;
};
export const XInputCheck = 
    forwardRef<HTMLInputElement, CompProps>(({
                    direction, style, name, value, label,
                    disabled, autofocus, onchange, icon}, ref) => {

const compStyle: XContStyle = style ?? CompStyle.DEFAULT;

    const handleOnChange = (value: boolean) => {
        if (onchange) {
            onchange(value, name);
        }
    };
 
    return (
        <Flex width="100%" direction={direction} px="2" 
            align="center" justify="start" gapX="2">
            {label &&
                <Box>
                    <Label.Root>
                        {label}
                    </Label.Root>
                </Box>}
            <Box pt="2">
                <Checkbox         
                    autoFocus={autofocus ?? false}       
                    defaultChecked={value}
                    variant = {compStyle.variant}
                    size    = {compStyle.size}
                    color   = {compStyle.color}
                    onCheckedChange={handleOnChange}
                    disabled={disabled} />
            </Box>
        </Flex>

    )//end return

})//end component
