//src\layouts\lypagetwocolumns.tsx

import { Grid, Flex } from "@radix-ui/themes";
import { Option } from "@/common/option";
import { LayoutHeader } from "@/layouts/lyheader";
import { LayoutPrimaryBar } from "@/layouts/lyprimarybar";
import { LayoutTwoColumns } from "@/layouts/lyconttwocol";
import { RdxThContainers } from "@/radix/rdxthcontainers";


interface LayoutPageProps {
    options: Option[];
    actoption?: string;
    headertitle: string;
    headercontent?: React.ReactNode;      
    mainleft?: React.ReactNode;
    mainright?: React.ReactNode;
    onselection?: (section: string) => void;
};
export function LayoutPageTwoColumns({ options, actoption, onselection, 
                             headertitle, headercontent,
                             mainleft, mainright  }: LayoutPageProps) {

    return (
        <Grid height="100vh" rows="auto 1fr" columns="12% 84% 4%" style={RdxThContainers.LAYOUT_DEF}>

            <Flex gridColumn="1/4" gridRow="1" >
                <LayoutHeader title={headertitle??null}
                              childrencenter={headercontent??null} />
            </Flex>

            <Flex gridColumn="1" gridRow="2" >
                {onselection ?
                <LayoutPrimaryBar options    = {options}                                   
                                actoption    = {actoption??null} 
                                onselection  = {onselection}
                                collapseinit = {false} /> :
                <LayoutPrimaryBar options      = {options}                                   
                                  actoption    = {null} 
                                  collapseinit = {false} />}
            </Flex>

            <Flex gridColumn="2" gridRow="2" >
                <LayoutTwoColumns childrenleft  = {mainleft}
                                  childrenright = {mainright} />
            </Flex>

            <Flex gridColumn="3" gridRow="2" >
                rbar
            </Flex>

        </Grid>
    );

}//end page