//src\radix\data\xtext.tsx

import { Flex, Text } from "@radix-ui/themes";

import { TextStyle } from "@/radix/rdxtheme";
import { XTextStyle } from "@/radix//rdxtypes";


/**
 * XText component for:
 *   display text with theme style.
 */
interface XTextProps {
    value: string;
    label?: string;
    color?:any;
    direction?: "row" | "column";
    align?: "center" | "start" | "end" | "between" ;
    style?: XTextStyle
};
export function XText({value,direction,label,color, align, style}: XTextProps) {

    const xstylelab: XTextStyle = TextStyle.ST_LABEL;

    const xstyle: XTextStyle = style ?? TextStyle.ST_DEF;
    if (color) { xstyle.color = color; }
    

    
    let comp_direction = direction ?? "row";
    if(!label){comp_direction = "row";}

    return (
        <Flex width="100%" direction={comp_direction} justify={align ?? "start"} >

            {label ?
            <Text size={xstylelab.size}
                  mb="2"                  
                  color={xstylelab.color}
                  style={xstylelab.style}>
                {label}
            </Text>:null}

            <Text size={xstyle.size} 
                color={xstyle.color} 
                style={xstyle.style} >
                {value}
            </Text>
        </Flex>
    );

}//end component

