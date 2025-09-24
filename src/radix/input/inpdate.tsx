//src\radix\input\inpdate.tsx

import React, { forwardRef, useState, useRef } from "react";
import { TextField, Flex, Text, Box } from "@radix-ui/themes";
import { RadixConf } from "@/radix/rdxconf";
import { Label } from "radix-ui";
import { CompStyle } from "@/radix/rdxtheme";
import { KeysConst } from "@/common/constants";
import { XContStyle } from "@/lib/forms/xtypes";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { es } from 'date-fns/locale/es';
import DatePicker from 'react-datepicker';
import "@radix-ui/themes/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import "radix-themes-datepicker-styles";

registerLocale('es', es);


/**
 * XInputDate Jsx Component
 *   Always use UTC format: ISO 8601
 *   "2023-10-05T18:25:30.123Z"
 */
interface CompProps {
    direction?: "row" | "column";
    style?: XContStyle;
    name?: string;
    value?: Date;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    autofocus?: boolean;
    autocommit?: boolean;
    onchange?: (value: any, name?: string) => void;
    onsubmit?: (value: any, name?: string) => void;
    icon?: React.ReactNode;
    format?: 'iso' | 'local';
};

export const XInputDate
    = forwardRef<HTMLInputElement, CompProps>(({
                    direction, style, name, value, label, placeholder,
                    disabled, autofocus, autocommit, onchange, onsubmit,format, icon }, ref) => {

    const [currentValue, setCurrentValue] = useState<Date>(value ?? new Date());
    const compStyle: XContStyle = style ?? CompStyle.DEFAULT;

    const isFromCalendarClick = useRef<boolean>(false);

    const handleOnChange = (date: Date | null) => {
        if (date) {
            setCurrentValue(date);
            if (isFromCalendarClick.current) {
                if (onchange) { onchange!(date.toISOString(), name); }
                isFromCalendarClick.current = false;
            }
        }
    };

    const onKeyIntro = (e: React.KeyboardEvent) => {
        if (e.key === KeysConst.KEY_INTRO && currentValue) {
            if (autocommit) { onsubmit!(currentValue, name); }
        }
    };

    const handleCalendarOpen = () => {
        isFromCalendarClick.current = true;
    };

    return (
        <Flex width="100%" direction={direction} px="2" py="1"
            align="center" justify="start" gapX="2" gapY="2">
            <Box>
                {label != null ? <p>{label}</p> : null}
            </Box>
            <Box>
                <Text as="label" size={RadixConf.SIZES.size_2}>
                    <Flex gap="2" align="center">
                        <DatePicker
                            customInput={<TextField.Root ref={ref} />}
                            locale="es"
                            dateFormat="dd/MM/yyyy"
                            selected={currentValue}
                            onChange={handleOnChange}
                            onCalendarOpen={handleCalendarOpen}
                            onKeyDown={onKeyIntro}
                            disabled={disabled}
                            autoFocus={autofocus ?? false}
                            showPopperArrow={false}
                            popperPlacement="bottom-start"
                            placeholderText={placeholder || "Select date"}
                        />
                    </Flex>
                </Text>
            </Box>
        </Flex>
    )

})//end component
