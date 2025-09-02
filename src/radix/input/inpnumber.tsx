//src\radix\input\inpnumber.tsx

import React, { useState } from "react";
import { forwardRef } from "react";
import { Box, Flex, TextField } from "@radix-ui/themes";
import { Label } from "radix-ui";
import { KeysConst } from "@/common/constants";
import { XContStyle } from "../rdxtypes";
import { CompStyle } from "@/radix/rdxtheme";


/**
 * XInputDecimal Jsx Component
 */
interface CompProps {
    direction?: "row" | "column";
    style?: XContStyle;
    name?: string;
    value?: any;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    autofocus?: boolean;
    autocommit?: boolean;
    onchange?: (value: any, name?: string) => void;
    onsubmit?: (value: any, name?: string) => void;
    icon?: React.ReactNode;
    step?: number;
    format?: string; // "numdigits"
};
export const XInputNumber =
    forwardRef<HTMLInputElement, CompProps>(({
        direction, style, name, value, label, placeholder,
        disabled, autofocus, autocommit, onchange, onsubmit,
        icon, step, format }, ref) => {

    const [currentValue, setCurrentValue] = useState<string>(value || "");
    const compStyle: XContStyle = style ?? CompStyle.DEFAULT;

    //.............................................................................
    const isDecimal: boolean = true;
    const decFormat: string | null = format ?? null;
    const input_step = step ?? (isDecimal ? 0.01 : 1);
    let maxIntegerDigits: number | null = null;
    let maxDecimalDigits: number | null = null;

    if (decFormat) {
        const parts = decFormat.split(':');
        if (parts.length === 2) {
            maxIntegerDigits = parseInt(parts[0]) || null;
            maxDecimalDigits = parseInt(parts[1]) || null;
        }
    }
    const input_disabled = disabled ?? false;

    const filterValidation = (newValue: string):boolean =>{
        if (decFormat && (maxIntegerDigits || maxDecimalDigits)) {
            const parts = newValue.split(".");
            const integerPart = parts[0] || "";
            const decimalPart = parts[1] || "";
            if (maxIntegerDigits && integerPart.length > maxIntegerDigits) {
                 return false;
            }
            if (isDecimal && maxDecimalDigits && decimalPart.length > maxDecimalDigits) {
                return false;
            }
            if (!isDecimal && newValue.includes(".")) { return false; }
        }
        return true;
    };//end

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = e.target.value;
        if (!filterValidation(newValue)) {return;}
        setCurrentValue(newValue);
        if (onchange) {
            onchange(Number(newValue), name);
        }
    };

    const onKeyIntro = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === KeysConst.KEY_INTRO) {
            if (onsubmit) { onsubmit(Number(currentValue), name); }
        }
    };

    return (
        <Flex width="100%" direction={direction} px="2" py="1"
            align="center" justify="start" gapX="2" gapY="2">
            {label &&
                <Box>
                    <Label.Root>{label}</Label.Root>
                </Box>}
            <Box>
                <TextField.Root
                    ref={ref}
                    type="number"
                    placeholder={placeholder ?? undefined}
                    defaultValue={placeholder ? undefined : value}
                    step={input_step}
                    onChange={handleOnChange}
                    onKeyDown={onKeyIntro}
                    variant={compStyle.variant}
                    size={compStyle.size}
                    color={compStyle.color}
                    radius={compStyle.border_radius}
                    disabled={input_disabled} />
            </Box>

        </Flex>
    )

})//end component

