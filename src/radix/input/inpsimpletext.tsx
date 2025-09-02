//src\radix\input\inptext.tsx

import React, { useState, forwardRef } from "react";
import { Box, Flex, TextField } from "@radix-ui/themes";
import { CompStyle } from "../rdxtheme";
import { KeysConst } from "@/common/constants";
import { XForms } from "@/lib/forms/xforms";


/**
 * XInputText Jsx Component
 */
interface CompProps {
    disabled: boolean;
    name?: string;
    value?: any | null;
    autofocus?: boolean;
    onchange?: (value: any, name?: string) => void;
    onsubmit?: (value: any, name?: string) => void;
    minlen?: number;
    maxlen?: number;
    htmltype?: React.HTMLInputTypeAttribute;
};

export function SInput ({disabled, name, value,
                         autofocus, onchange, onsubmit, 
                         minlen, maxlen, htmltype}: CompProps) {

    const [currentValue, setCurrentValue] = useState<string>(value ?? "");

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

    const renderInput = () => {
  
        return (
            <Box style={{width: "100%"}}>
                <TextField.Root
                    type={htmltype ?? XForms.TT_DEFAULT}
                    defaultValue={value ?? ''}
                    onChange={handleOnChange}
                    onKeyDown={onKeyIntro}
                    disabled={disabled }
                    autoFocus={autofocus ?? false}
                    maxLength={maxlen ?? undefined}
                    minLength={minlen ?? undefined}
             
                    size={CompStyle.DEFAULT.size}
                    color={CompStyle.DEFAULT.color}
                    radius={CompStyle.DEFAULT.border_radius}
                    variant={CompStyle.DEFAULT.variant}
                    style={{ width: "100%" }} />
                   
            </Box>

        )
    };//end

    return (
        <Flex width="100%" direction={"row"} px="2" py="1" gap="2">
            {renderInput()}
        </Flex>
    )

};
