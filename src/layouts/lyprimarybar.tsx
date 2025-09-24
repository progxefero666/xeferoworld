'use client';

//src\layouts\lyprimarybar.tsx

import { Box, Separator, Flex, Text,  } from "@radix-ui/themes";
import { Option } from "@/common/option";
import MenuButtons from "@/radix/menus/viewmenu";
import { ButtonsStyle } from "src/radix/rdxtheme";
import { RdxThContainers } from "@/radix/rdxthcontainers";
import { XIconButton } from "@/radix/buttons/xiconbutton";
import { LIB_ICON } from "@/radix/rdxthicons";


/**
 * Page Primary Bar
 */
interface PrimaryBarProps {    
    options: Option[];
    collapseinit: boolean;
    actoption: string|null;
    onselection?:(optionId:string) => void;
    oncollapse?:() => void;
    addchildren?: React.ReactNode;
}
export function LayoutPrimaryBar({options,onselection,actoption,
                                  collapseinit,oncollapse,
                                  addchildren}: PrimaryBarProps) {    

    const collapse:boolean = collapseinit ?? false;

    const onHandlerClick = () => {
        if(oncollapse) {oncollapse()};
    };

    return (
        <Flex width="100%" direction="column" px="2" py="2" > 

            <Flex direction="row" justify="between" px="1" py="1" align="center" gapX="2"  
                  style={RdxThContainers.BORDER_SIMPLE}  >

                {!collapse ? <Box><Text size="3" >Options</Text></Box>:null} 
                <Box>                   
                    {collapse ?
                    <XIconButton icon={LIB_ICON.ARROW_LEFT} onclick={onHandlerClick} /> :
                    <XIconButton icon={LIB_ICON.ARROW_RIGHT} onclick={onHandlerClick} />}
                </Box>                  
            </Flex>

            {!collapse ?
            <Box width="100%" pt="2">
                {onselection ? <MenuButtons 
                    options={options}
                    onclick={onselection} 
                    actoption={actoption} /> : null}

                <Separator orientation="horizontal" size="4" /> 
                {addchildren ? addchildren : null}
            </Box>:null}    
           
        </Flex>
    );

}//end PrimaryBar


