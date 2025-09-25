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


interface LayoutPageGameProps {
    options: Option[];
    actoption?: string;  
    main: React.ReactNode;
    onselection?: (section: string) => void;
};
export function LayoutPageGame({options,actoption,onselection,main}:LayoutPageGameProps) {

    return (
        <Grid height="100vh" rows="1fr" columns="12% 84% 4%" style={LAYOUT_DEF}>

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