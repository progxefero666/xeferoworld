//src\radix\input\inptextarea.tsx

import React, { useEffect, useState } from "react";
import { forwardRef } from "react";
import { Box, Flex,Text,TextArea } from "@radix-ui/themes";


import { RadixConf } from "@/radix/rdxconf";

const areaStyle = {
    width: '100%',   
    height: '200px',     
    border: '2px solid rgb(28, 28, 43)',
    padding: '2px'
};

/**
 * InputTextComponent
 */
interface CompProps {
    autocommit?: boolean;
    inline?: boolean;
    name?: string;
    label?: string;
    readonly?: boolean;
    disabled?: boolean
    defaul?: string;
    onchange?: (value:string,name?: string) => void;
    onsubmmit?: (value:string) => void;
    type?: any;
    placeholder?: string;
    autofocus?: boolean;
    minlen?: number;
    maxlen?: number;
    height?: string;
}



export const XInputTextArea = forwardRef<HTMLInputElement, CompProps>
        (({ inline,name, label,autocommit,maxlen,height, placeholder, 
            defaul,onchange, onsubmmit, readonly, disabled }, ref) => {        

    if(height) {areaStyle.height = height;}


    const color = "gray";
    const size = RadixConf.SIZES.size_2;
    const radius = 2;
    const variant = RadixConf.VARIANTS.surface;
    const showInline: boolean = inline ?? false; 
    const input_readonly = readonly ?? false;
    const input_disabled = disabled ?? false;

    const [value, setValue] = useState<string|null>(null);
    
    
        
    useEffect(() => {
        if( defaul){setValue(defaul);}
    }, []);
      
    const handleOnChange = (value:string) => {
        setValue(value);
        if (autocommit) {
            if (onchange) {
                if (name !== null) {onchange(value, name);}
                else {onchange(value);}
            }
        }
    };//end

    const renderReadComp = () => {
        return (
            <TextArea value={value!} style={areaStyle}  size={size} 
                      variant={variant} color={color}
                      disabled={true} />          
        )
    }

    const renderEditComp = () => {
        if(value === null){
            return (
                <TextArea 
                    placeholder={placeholder}
                    style={areaStyle}  
                    size={size}                            
                    onChange={(e) => {if(onsubmmit) {handleOnChange(e.target.value);}}}
                    variant={variant}  
                    color={color} 
        
                    disabled={input_disabled} />      
            )              
        }
        else {
            return (
                <TextArea
                    value={value} 
                    style={areaStyle}  
                    size={size}            
                    onChange={(e) => {handleOnChange(e.target.value);}}
                    variant={variant}  
                    color={color} 
   
                    disabled={input_disabled} />    
            )    
        }

    }

    const renderRowSimpleContent = () => {
        return (
            <Box >
                {input_readonly ? renderReadComp() :
                    renderEditComp()}
            </Box>
        )
    }

    const renderColSimpleContent = () => {
        return (
            <Box>
                {input_readonly ? renderReadComp() :
                    renderEditComp()}
            </Box>
        )
    }

    const renderRowLabelContent = () => {
        return (
            <Flex  width={"100%"} gap="1"> 
                <Text size="2" align="left" >
                    {label}
                </Text>
                {renderRowSimpleContent()}
             </Flex>
        )
    }

    const renderColLabelContent = () => {
        //className="LabelRoot"
        return (
            <Flex width={"100%"} direction="column" gap="1">    
                <Text size="2" align="left" >
                    {label}
                </Text>                           
                {renderColSimpleContent()}
            </Flex>
        )
    }

    return (
        <>
            {showInline ?
                label ? renderRowLabelContent() :
                    renderRowSimpleContent()
                :
                label ? renderColLabelContent() :
                    renderColSimpleContent()
            }
        </>
    )

})//end component

