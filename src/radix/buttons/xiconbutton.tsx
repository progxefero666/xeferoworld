//src\radix\buttons\xiconbutton.tsx

import { ButtonsStyle } from "src/radix/rdxtheme";
import { XIcon } from "src/radix/rdxthicons";
import { XCompStyle } from "@/radix/rdxtypes";
import { IconButton } from "@radix-ui/themes";

/**
 * XIconButton component
 */
interface XIconButtonProps {
    color?: any;
    operation?: string;
    icon: string;
    xstyle?: XCompStyle;
    disabled?: boolean;
    item?: any;
    onrowclick?: (rowIndex: number) => void;
    onclick?: () => void;
    exeOperation?: (operation:string,item:string|null) => void;
};
export function XIconButton({ color,item,operation,icon,onclick,exeOperation,xstyle,disabled,onrowclick}: XIconButtonProps) {

    const apply_style: XCompStyle = xstyle ?? ButtonsStyle.ICONBUTTON_STYLE;
    if(color) { apply_style.color = color;}

    const handleOnClick = () => {
        if(onclick){
            onclick();
            return;
        }
        if(onrowclick) {
            onrowclick(item);
            return;
        }
        if (exeOperation) {
            if(operation){exeOperation(operation,item);}
            else {exeOperation("undefined",item);}
        }
    };//end

    return (
        <div>
            <IconButton size    = {apply_style.size}
                        color   = {apply_style.color}
                        radius  = {apply_style.radius}
                        variant = {apply_style.variant}
                        disabled= {disabled}
                        onClick = {() => handleOnClick()}>
                <XIcon name={icon} />
            </IconButton>
        </div>
    )

}//end component