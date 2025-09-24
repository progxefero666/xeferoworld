//src\radix\input\inpfile.tsx

import { forwardRef, ChangeEvent } from "react";
import { Box, Flex, Text } from "@radix-ui/themes";
import { Label } from "radix-ui";

import { CompStyle } from "@/radix/rdxtheme";
import { XContStyle } from "../rdxtypes";
import { RdxThContainers } from "../rdxthcontainers";

/**
 * XInputFile Jsx Component
 *   Allows file selection and upload.
 * onchange?: (result: File, name?: string) => void;
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
export const XInputFile = 
    forwardRef<HTMLInputElement, CompProps>(({
                    direction, style, name, value, label,
                    disabled, autofocus, onchange,format, icon}, ref) => {

    const compStyle: XContStyle = style ?? CompStyle.DEFAULT;
    
    const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }
        if (onchange) {
            const files: FileList = e.target.files;
            if (files && onchange) {
                if (name){onchange(files[0],name);}
                else     {onchange(files[0]);}

            }
        }
    };
 
    return (
        <Flex width="100%" direction={direction}  align="center" justify="start">
            {label &&
                <Box>
                    {label}
                </Box>}
            <Box  px="2" py="1" style={RdxThContainers.INPUT_FILE}>
                <input
                    style={{fontSize:'13px'}}
                    name={name}
                    ref={ref}
                    type="file"
                    className="w-full"
                    multiple={false}
                    accept={format}
                    onChange={handleOnChange} />
            </Box>
        </Flex>

    )//end return

}); //end component