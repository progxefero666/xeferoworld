//src\radix\cbars\btmenu.tsx

import { Option } from "@/common/option";
import { Flex, Box, Button } from "@radix-ui/themes";
import { CompStyle, MenusStyle} from "@/radix/rdxtheme";


function equals (valueA:string,valueB:string|null):boolean {
    if ((valueB !== null) && 
        (valueB === valueA)) {
        return true;
    }
    return false;
};

export const renderOptionButton = (id: string, onclick: (name: string) => void,
    text: string, style: any) => {
    return (
        <Button key={id} 
            onClick={() => onclick(id)}
            style={style}
            size={MenusStyle.OPT_SIZE} >
            {text}
        </Button>
    )
};//end
export interface MenuProp {
    inline?: boolean;
    disabled?: boolean;
    name?: string;
    label?: string;    
    icon?: any | null;
    autofocus?: boolean;    
    actoption: string | null;
    options: Option[]
    onclick: (name: string) => void;
}
export default function MenuButtons({options,actoption,onclick: onselection}: MenuProp) {

    return (
        <Flex width="100%" direction="column" align="center" gapY="3" style={CompStyle.CONT_CSS_STYLE} >
            {options.map((section, index) => (
            <Box width="100%" key={index.toString()}   >
                {equals(section.id, actoption) ?
                    renderOptionButton(section.id,onselection,section.text,
                        MenusStyle.OPT_ACT_CSS)
                    :
                    renderOptionButton(section.id,onselection,section.text,
                        MenusStyle.OPT_ACT_CSS)
                }
            </Box>
            ))}
        </Flex>
    )

}//end