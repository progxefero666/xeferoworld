//src\radix\buttons\xiconbutton.tsx

import { ButtonsStyle } from "src/radix/rdxtheme";
import { XIcon } from "src/radix/rdxthicons";
import { XCompStyle } from "@/radix/rdxtypes";
import { IconButton } from "@radix-ui/themes";
import { useRef, useState } from "react";

/**
 * XIconButton component
 */
interface XFIconProps {
    sendinterval?:number;
    color?: any;
    colorpressed: any;
    operation?: string;
    icon: string;
    xstyle?: XCompStyle;
    disabled?: boolean;
    onclick?: (operation:string) => void;
    onpressed?: (operation:string) => void;
};
export function XFIcon({ sendinterval,color,colorpressed,
                         icon,xstyle,disabled,
                         operation,onpressed}: XFIconProps) {

    const apply_style: XCompStyle = xstyle ?? ButtonsStyle.ICONBUTTON_STYLE;
    if(color) { apply_style.color = color;}


    const handleOnClick = () => {
        /*
        if(onclick){
            onclick(operation!);
            return;
        }
        */
    };//end

    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    
    const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if(onpressed){
            const milliseconds = 40;
            intervalRef.current = setInterval(() => {
                onpressed(operation ?? "mouse_down");
            }, milliseconds);            
        }
    };//end

    const handleMouseUp = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }        
    };//end

    return (
        <div>
            <IconButton size    = {apply_style.size}
                        color   = {apply_style.color}
                        radius  = {apply_style.radius}
                        variant = {apply_style.variant}
                        disabled= {disabled}
                        onClick = {() => handleOnClick()}
                        onMouseDown={handleMouseDown} 
                        onMouseUp={handleMouseUp} >
                <XIcon name={icon} />
            </IconButton>
        </div>
    )

}//end component