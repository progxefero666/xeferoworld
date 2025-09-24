//src\radix\input\inpselect.tsx

import React ,{ forwardRef, useState } from "react";
import { Option } from "@/common/option";
import { Box, Text, Flex, Select } from "@radix-ui/themes";
import { Label } from "radix-ui";
import { XContStyle } from "../rdxtypes";
import { CompStyle } from "@/radix/rdxtheme";
import { KeysConst } from "@/common/constants";


/**
 * XInputSelect Jsx Component
 *   Allows selection from a list of options.
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
    format?: string;
    icon?: React.ReactNode;
    collection: Option[];
};
export const XInputSelect =
    forwardRef<HTMLSelectElement, CompProps>(({
                    direction, style, name, value, label, placeholder,
                    disabled, autofocus, autocommit, onchange, onsubmit,
                    icon, collection }, ref) => {                 
    const [currentValue, setCurrentValue] = useState<string>(value ?? "");
    const compStyle: XContStyle = style ?? CompStyle.DEFAULT;

    const handleOnChange = (val: string) => {
        setCurrentValue(val);
        if (onchange) onchange(val, name);
    };//end

    const onKeyIntro = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === KeysConst.KEY_INTRO && onsubmit) {
            onsubmit(currentValue, name);
        }
    };//end


    return (
        <Flex width="100%" direction={direction} px="2" py="1"
            align="center" justify="start" gapX="2" gapY="2">
            {label &&
                <Box>
                    <Label.Root>{label}</Label.Root>
                </Box>}
            <Box>
                <Select.Root
                    defaultValue={value}
                    onValueChange={handleOnChange}
                    disabled={disabled}
                    size={compStyle.size}  >
                    <Select.Trigger variant={compStyle.variant} color={compStyle.color} />
                    <Select.Content>
                        {collection.map((item, index) => (
                            <Select.Item key={index} value={item.id}  onKeyDown={onKeyIntro}>
                                {item.text}
                            </Select.Item>
                        ))}
                    </Select.Content>
                </Select.Root>
            </Box>
        </Flex>
    );

})//end component
