//src\app\zone3d\terrains3d\modifiers\terrmodcirc.ts
'use client';

import { Table,Flex, Slider } from "@radix-ui/themes";
import { CompStyle } from "@/radix/rdxtheme";
import { IntParameter } from "@/common/intparam";
import { XText } from "@/radix/data/xtext";
import { useState } from "react";
import { GenerateKeys } from "@/common/generatekeys";

/**
 * XText component for:
 *   display text with theme style.
 *     //const modifier:TerrModCirc = new TerrModCirc();
 */
interface XGroupIntParametersProps {
    initparams:IntParameter[];
    onchange: (rowIndex:number,value:number) => void;
};
export function XGroupIntParameters({initparams,onchange}: XGroupIntParametersProps) {

    const [keyMonitor, setKeyMonitor] = useState<string>(GenerateKeys.genAlphaNum4());
    const [parameters, setParameteres] = useState<IntParameter[]>(initparams);
    
    const onChange= (value:number[],rowIndex:number) => {
        const listParams = parameters;
        listParams[rowIndex].value= value[0];
        setParameteres(listParams);
        setKeyMonitor(GenerateKeys.genAlphaNum4());
        onchange(rowIndex, value[0]);
    };//end

    const renderParams= () => {
    
        return (
            <Flex width="100%" direction="column" px="2">

                <Table.Root >                            
                    <Table.Body style={{ width: "100%" }} >
                        { parameters.map((item, index) => (
                            <Table.Row key={index.toString()} align="center" >
                                <Table.Cell width="25%"  >
                                    <XText value={item.label!} align="left" />
                                </Table.Cell>
                                <Table.Cell width="65%" >
                                    <Slider value={[item.value]}
                                            step         = {item.step ?? 1}
                                            min          = {item.range.min} 
                                            max          = {item.range.max}
                                            size         = {CompStyle.DEFAULT.size}
                                            color        = {CompStyle.DEFAULT.color}
                                            radius       = {CompStyle.DEFAULT.border_radius}
                                            onValueChange= {(value) => onChange(value, index)}  />                                    
                                </Table.Cell>
                                
                                <Table.Cell width="10%">
                                    <XText align="center" value={item.value.toString()}  />
                                </Table.Cell>

                            </Table.Row>                 
                        ))}
            
                    </Table.Body>
                </Table.Root>

            </Flex>
        );
    };//end
    
    return (
        <Flex direction="column" gapY="2" key={keyMonitor}>
            {/*renderHeader()*/}
            {renderParams()}
        </Flex>
    );

}//end component