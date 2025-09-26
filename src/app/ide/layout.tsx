//src\layouts\lypageonecolumn.tsx

import { Grid, Flex } from "@radix-ui/themes";
import { LayoutPrimaryBar } from "@/layouts/lyprimarybar";

import { RdxThContainers } from "@/radix/rdxthcontainers";


const LAYOUT_DEF = {
    background: 'rgba(0, 0, 0, 1)'
};


interface LayoutPageGameProps {
    //main: React.ReactNode;
    onselection?: (section: string) => void;
};
export function XeThreeIdLayout({onselection}:LayoutPageGameProps) {

    return (
        <Grid height="100vh" rows="1fr" columns="12% 84% 4%" style={LAYOUT_DEF}>

            <Flex gridColumn="1" gridRow="2" >

            </Flex>

            <Flex gridColumn="2" gridRow="2" >
                <Flex width="100%" direction="row" style={RdxThContainers.MAIN_CONTENT} >
                    <Flex width="100%"  direction="column" px="3" py="1" mb="2" 
                        style={RdxThContainers.PRIMARY_CONTENT}>     
                    
                    </Flex>
                </Flex>
            </Flex>

            <Flex gridColumn="3" gridRow="2" >
                rbar
            </Flex>

        </Grid>
    );

}//end page