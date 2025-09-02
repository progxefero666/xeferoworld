//src\layouts\lypageonecolumn.tsx

import { Grid, Flex } from "@radix-ui/themes";
import { Option } from "@/common/option";
import { LayoutHeader } from "@/layouts/lyheader";
import { LayoutPrimaryBar } from "@/layouts/lyprimarybar";
import { LayoutOneColumn } from "./lycontonecol";
import { RdxThContainers } from "@/radix/rdxthcontainers";

const LAYOUT_DEF = {
    background: 'rgba(0, 0, 0, 1)'
};


interface LayoutPageProps {
    options: Option[];
    actoption?: string;
    headertitle: string;
    headercontent?: React.ReactNode;      
    main: React.ReactNode;
    onselection?: (section: string) => void;
};
export function LayoutPageOneColumn({ options, actoption, onselection, 
                             headertitle, headercontent,
                             main }: LayoutPageProps) {

    return (
        <Grid height="100vh" rows="auto 1fr" columns="12% 84% 4%" style={LAYOUT_DEF}>

            <Flex gridColumn="1/4" gridRow="1" >
                <LayoutHeader title={headertitle??null}
                              childrencenter={headercontent??null} />
            </Flex>

            <Flex gridColumn="1" gridRow="2" >
                {onselection ?                
                <LayoutPrimaryBar 
                    options={options}
                    actoption={actoption ?? ""}
                    onselection={onselection}
                    collapseinit={false} />: 
                <LayoutPrimaryBar 
                    options={options}
                    actoption={""}
                    collapseinit={false} /> 
                }
            </Flex>

            <Flex gridColumn="2" gridRow="2" >
                <LayoutOneColumn children = {main} />
            </Flex>

            <Flex gridColumn="3" gridRow="2" >
                rbar
            </Flex>

        </Grid>
    );

}//end page