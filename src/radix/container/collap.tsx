"use client";

import React from "react";
import * as Collapsible from '@radix-ui/react-collapsible';

import { Button, Box, Text, Flex, Separator, IconButton, Container, Section } from "@radix-ui/themes";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";

import { BarButtonsCfg } from "@/radix/models/barbuttonscfg";
import { RadixConf } from "../rdxconf";
import { ButtonsStyle } from "../rdxtheme";

export interface BarButtonsProp {
    barconfig:BarButtonsCfg;
    onclick: (operation: string) => void;
}
export function BarButtons({barconfig, onclick}: BarButtonsProp) {

    const size: any = ButtonsStyle.BUTTON_SIZE;

    const renderMainContent = () => {
        return (
            <>
                {barconfig.operations.map((operation, index) => (
                    <Button key={operation}
                        variant={ButtonsStyle.BUTTON_VAR}
                        color={barconfig.color[index]!}
                        size={size}
                        onClick={() => onclick(operation)}>
                        {barconfig.texts[index]}
                    </Button>
                ))}
            </>
        )        
    }

    return (    
        <Flex direction="row" gap="2">
            {renderMainContent()}
        </Flex>
    )

}//end

/**
 * https://github.com/progxefero666/radixcomp
 * radix-ui/themes
 * jsx Collapsible Component
 */
const compStyleDef = {
    
    borderRadius: 'var(--radius-1)',
    border: '2px solid var(--blue-7)',
    padding: 'var(--space-2)',
    boxShadow: '0px 0px 1px rgba(253, 72, 6, 0.9)' 
};
interface CompProps {
    compstyle?: React.CSSProperties;
    id?: number;
    title: string;
    intro?: string;
    opened?: boolean;
    children?: React.ReactNode;
    barbuttonscfg?: BarButtonsCfg;
}
//React.CSSProperties | undefined
export default function ContCollapsible({compstyle, id, barbuttonscfg, title, intro, children, opened }: CompProps) {
    const [open, setOpen] = React.useState(opened);

    let compStyle: React.CSSProperties= compstyle ?? compStyleDef;

    const onClick = (item:string,compName?:string) => {};


    return (
        <Box as="div" px="4" py="2" width="var(--size-4)" style={compStyle}  >
       
            <Collapsible.Root
                className="CollapsibleRoot"
                open={open}
                onOpenChange={setOpen}>

                <Flex align="start"  width={"100%"} pl="2" pt="1"  gapX={"2"} >

                    <Collapsible.Trigger asChild>
                        <IconButton variant={RadixConf.VARIANTS.ghost} >
	                         {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
                        </IconButton>
                    </Collapsible.Trigger>   

                    <Flex  width={"100%"} justify="between" align="start" >
                        <Text size="4" align="left">{title}</Text>     
                        {barbuttonscfg? <
                            BarButtons  barconfig={barbuttonscfg} onclick={onClick}/>
                        : null}       
                    </Flex>                 
                </Flex>
                
                <Separator orientation="horizontal" size="4" mb="2"/>

                {intro? 
                    <Box >
                        <Text size="3" >
                            {intro}
                        </Text>
                    </Box>
                : null}

                <Collapsible.Content>
                    {children}
                </Collapsible.Content>

            </Collapsible.Root>

        </Box>
    );

}//end component

