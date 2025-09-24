'use client';

import { useState } from "react";
import { Box, Flex } from "@radix-ui/themes";

import { LayoutPageOneColumn } from "@/layouts/lypageonecolumn";
import { WorldPlaneMain } from "@/app/world/worldplane/worldplanemain";
import { WorldPlaneCfg } from "@/app/world/worldconfig";



/**
 * Page Terrains 3d Generator
 */
export default function PageWorl3d() {

    const [sectionId,setSectionId] = useState<string>(WorldPlaneCfg.SECTIONS[0].id);
    const loadSection= (section: string) => {
        setSectionId(section);
    };//end

    const renderMain = () => {
        if(sectionId===WorldPlaneCfg.SECTION_WORLDPLANE){
            return(<WorldPlaneMain />);
        }        

        //else if(sectionId===){return null;}                         
    };//end

    return (
        <LayoutPageOneColumn 
            headertitle   = {"World"} 
            headercontent = {<Box>World Plane.</Box>}
            main          = {renderMain()}
            options       = {WorldPlaneCfg.SECTIONS}
            onselection   = {loadSection}  />                
    );

};//end page