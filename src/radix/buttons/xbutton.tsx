//src\radix\buttons\xiconbutton.tsx

import { Box,Text, Button, IconButton } from "@radix-ui/themes";

import { ButtonsStyle } from "src/radix/rdxtheme";
import { XIcon } from "src/radix/rdxthicons";
import { XCompStyle, XTextCompStyle } from "@/radix/rdxtypes";
import { XText } from "../data/xtext";

/**
 * XIconButton component
 */
interface XButtonProps {
    text?: string;
    icon?: string;
    color?: any;
    operation?: string;
    xstyle?: XTextCompStyle;
    disabled?: boolean;
    item?: any;
    onclick?: () => void;
    exeOperation?: (operation:string,item:string|null) => void;
};
export function XButton({text, icon, color, item, onclick,
                         operation, exeOperation, xstyle,disabled }: XButtonProps) {

    //const icon_style: XCompStyle = ButtonsStyle.ICONBUTTON_STYLE;
    const button_style: XCompStyle = xstyle ?? ButtonsStyle.BUTTON_STYLE;
    if(color) { button_style.color = color;}

    const handleOnClick = () => {
        if(onclick){
            onclick();
            return;
        }
        if (exeOperation) {
            if(operation){exeOperation(operation,item);}
            else {exeOperation("undefined",item);}
        }
    };//end

    const renderButton = () => {
        //style={{width: '160px'}}
        return (
            <Button size    = {button_style.size}
                    color   = {button_style.color}
                    radius  = {button_style.radius}
                    variant = {button_style.variant}
                    onClick = {() => handleOnClick()}>                    
                    {icon?
                    <Box><XIcon name={icon}/></Box>:null}
                    <Box>
                        <XText  value={text!} />
                    </Box>
            </Button>
        );
    };

    const renderIconButton = () => {
        return (
            <IconButton size    = {button_style.size}
                        color   = {button_style.color}
                        radius  = {button_style.radius}
                        variant = {button_style.variant}
                        disabled= {disabled}
                        onClick = {() => handleOnClick()}>
                <XIcon name={icon!} />
            </IconButton>   
        )     
    };

    return (
        <Box>
            {text ? renderButton() : renderIconButton()}
        </Box>
    )

}//end component