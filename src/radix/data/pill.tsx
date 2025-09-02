//src\radix\data\pill.tsx

import { Box, Grid, Flex, Text } from "@radix-ui/themes";

import { RadixConf } from "@/radix/rdxconf";

/*
 const compStyle={
        borderRadius: '8px',
        background: 'rgb(132, 208, 10)',
    };
*/

//'rgb(132, 208, 10)'
interface CompProps {
    color: string;
    text: string;
    children?: React.ReactNode;
    childalign?: string;
}
export const Pill = ({color,text,children,childalign}: CompProps) => {

    //const radius  = ThemeCompStyle.CONT_RADIUS;
    const compStyle={
        borderRadius: "8px",
        background: color,
    };
    const text_size = RadixConf.SIZES.size_2;

    const showIcon: boolean = !!children;
    const alignIcon: string = childalign ? "left" : "right";

    const renderText = () => {
        return (
            <Box >
                <Text size={text_size}  >
                    {text}
                </Text>
            </Box>    
        )   
    }    

    const renderTextAndIcon = () => {
        if(alignIcon === "left") {
            return (
                <>
                    <Box>{children}</Box>         
                    {renderText()}
                </>
            );    
        }
        else {
            return (
                <>
                    {renderText()}
                    <Box>{children}</Box>
                </>
            );
        }
    }    

    return (
        <Flex width="100%" direction="row" style={compStyle}>
            {showIcon ? renderTextAndIcon(): renderText()}          
        </Flex>
    );

}//end Pill
