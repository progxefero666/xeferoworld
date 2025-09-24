//src\radix\data\xtext.tsx

import { Box, Flex, Text } from "@radix-ui/themes";

import { TextStyle } from "@/radix/rdxtheme";
import { XTextStyle } from "@/radix//rdxtypes";
import { RdxThContainers } from "../rdxthcontainers";


/**
 * XText component for:
 *   display text with theme style.
 */
interface XOuputTimeProps {
    label?: string;
    value: string;    
};
export function XOuputTime({value,label}: XOuputTimeProps) {
   
    return (
        <Flex width="auto" direction="row" gapX="2" px="1" >

            {label ?
            <Text size  = {TextStyle.ST_LABEL.size} 
                  align = {TextStyle.ST_LABEL.align}                 
                  color = {TextStyle.ST_LABEL.color} 
                  style = {TextStyle.ST_LABEL.style}>
                {label}
            </Text>:null}

            <Box width="auto" px="1" style={RdxThContainers.OUTPUT_TEXT}>
                <Text align = {TextStyle.ST_TIME.align} 
                      size  = {TextStyle.ST_TIME.size} 
                      color = {TextStyle.ST_TIME.color} 
                      style = {TextStyle.ST_TIME.style} >
                    {value}
                </Text>
            </Box>

        </Flex>
    );

}//end component

