//src\radix\data\xtext.tsx

import { Box, Flex, Text } from "@radix-ui/themes";

import { TextStyle } from "@/radix/rdxtheme";
import { XTextStyle } from "@/radix//rdxtypes";
import { RdxThContainers } from "../rdxthcontainers";


/**
 * XText component for:
 *   display text with theme style.
 */
interface XOuputTextProps {
    value: string;
    label?: string;
    color?:any;
    direction?: "row" | "column";
    align?: "center" | "left" | "right";
    style?: XTextStyle
};
export function XOuputText({value,direction,label,color, align, style}: XOuputTextProps) {

    const xstylelab: XTextStyle = TextStyle.ST_LABEL;

    const xstyle: XTextStyle = style ?? TextStyle.ST_DEF;
    if (color) { xstyle.color = color; }
    if (align) { xstyle.align = align; }

    let comp_direction = direction ?? "row";
    let valueStyleWidth = "100%";
    if(!label){
        comp_direction = "row";
    }
    else {
        valueStyleWidth = "60%";
    }

    return (
        <Flex width="100%" direction={comp_direction} >

            {label ?
            <Box width="40%">
                <Text size={xstylelab.size} align={xstylelab.align} mb="1"                  
                    color={xstylelab.color} style={xstylelab.style}>
                    {label}
                </Text>
            </Box>
            :null}

            <Box width={valueStyleWidth} style={RdxThContainers.OUTPUT_TEXT}>
                <Text align={xstyle.align} size={xstyle.size} 
                    color={xstyle.color} style={xstyle.style} >
                    {value}
                </Text>
            </Box>

        </Flex>
    );

}//end component

