//src\radix\input\inptext.tsx

import React, { useState, forwardRef } from "react";
import { Box, Flex,Text, TextField } from "@radix-ui/themes";
//import { Label } from "radix-ui";
import { CompStyle } from "../rdxtheme";
import { KeysConst } from "@/common/constants";
import { XContStyle } from "../rdxtypes";

//import { XForms } from "@/lib/forms/xforms";


/**
 * XInputText Jsx Component
 */
interface CompProps {
    direction?: "row" | "column";
    style?: XContStyle;
    name?: string;
    value?: any | null;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    autofocus?: boolean;
    autocommit?: boolean;
    onchange?: (value: any, name?: string) => void;
    onsubmit?: (value: any, name?: string) => void;
    format?: string;
    icon?: React.ReactNode;
    minlen?: number;
    maxlen?: number;
    htmltype?: React.HTMLInputTypeAttribute;
};

export const XInputText =
    forwardRef<HTMLInputElement, CompProps>(({
    direction, style, name, value, label, placeholder,
    disabled, autofocus, autocommit, onchange, onsubmit,
    icon, minlen, maxlen, htmltype }, ref) => {

    const [currentValue, setCurrentValue] = useState<string>(value ?? "");
    const compStyle: XContStyle = style ?? CompStyle.DEFAULT;
    const applyDirection = direction ?? "column";

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setCurrentValue(val);
        if (onchange) onchange(val, name);
    };

    const onKeyIntro = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === KeysConst.KEY_INTRO && onsubmit) {
            onsubmit(currentValue, name);
        }
    };
    const renderLabel = () => {
        return (
            <Box>
                {direction == "row" ? 
                    <Box style={{ flex: "0 0 30%" }}>
                        <Text size="2" align="left" >
                            {label}
                        </Text>    
                    </Box> :
                    <Flex width="100%" justify="start" align="center" >
                        <Text size="2" >
                            {label}
                        </Text>  
                    </Flex>    
                }
            </Box>
        )
    };//end

    const renderInput = () => {
        let inputStyle = {width: "100%"};
        if(applyDirection === "row"){
            inputStyle   = {width: "auto"};
        }
        return (
            <Box style={inputStyle}>
                <TextField.Root
                    ref={ref}
                    type={htmltype ?? "text" as any}
                    placeholder={placeholder ?? ""}
                    defaultValue={value ?? null}
                    onChange={handleOnChange}
                    onKeyDown={onKeyIntro}
                    disabled={disabled ?? false}
                    autoFocus={autofocus ?? false}
                    maxLength={maxlen ?? undefined}
                    minLength={minlen ?? undefined}
                    variant={compStyle.variant}
                    size={compStyle.size}
                    color={compStyle.color}
                    radius={compStyle.border_radius}
                    style={{ width: "100%" }} >
                    {icon && (
                        <TextField.Slot>
                            {icon}
                        </TextField.Slot>
                    )}
                </TextField.Root>
            </Box>

        )
    };//end

    return (
        <Flex width="100%" direction={applyDirection} px="2" py="1" gap="2">
            
            {label ? renderLabel():null}
            {renderInput()}
        </Flex>
    )

});
