'use client';
//src\radix\buttons\xiconbutton.tsx

import { ButtonsStyle } from "src/radix/rdxtheme";
import { XIcon } from "src/radix/rdxthicons";
import { XCompStyle } from "@/radix/rdxtypes";
import { IconButton } from "@radix-ui/themes";
import { useEffect } from "react";


/**
 * XIconButton component
 */
interface XIconButtonProps {
    color?: any;
    operation?: string;
    icon: string;
    disabled?: boolean;
    item?: any;
    onrowclick?: (rowIndex: number) => void;
    onclick?: () => void;
    exeOperation?: (operation:string,item:string|null) => void;

};
export function XIconButton({ color,item,icon,disabled,
                              onclick,operation,exeOperation,                              
                              onrowclick}: XIconButtonProps) {

    const comp_size: any=ButtonsStyle.ICONBUTTON_STYLE.size;    
    const comp_radius: any=ButtonsStyle.ICONBUTTON_STYLE.radius;
    const comp_variant: any=ButtonsStyle.ICONBUTTON_STYLE.variant;
    

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
        <IconButton size    = {comp_size}
                    radius  = {comp_radius}     
                    variant = {comp_variant}
                    disabled= {disabled}
                    onClick = {() => handleOnClick()}>
            <XIcon name={icon} />
        </IconButton>
    )

}//end component

/*
    xstyle?: XCompStyle;
    //const comp_color: any=ButtonsStyle.ICONBUTTON_STYLE.color;
    //if(color) { apply_style.color = color;}
    useEffect(() => {
        //console.log(comp_color);
    }, []);

*/