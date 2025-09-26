'use client';

import { useState } from "react";
import { Box, Flex } from "@radix-ui/themes";

import { LayoutPageOneColumn } from "@/layouts/lypageonecolumn";
import { Terrains3dConfig } from "@/app/terrains/terrains3dcfg";
import { TerrainsHeightMap } from "@/app/terrains/genheightmap/heightmaps";
import { XTerrainEditor } from "@/app/terrains/test/terraintest";
import { WorldPlaneMain } from "../world/worldplane/worldplanemain";


/**
 * Page Terrains 3d Generator
 */
export default function PageTerrains3d() {

    const [sectionId,setSectionId] = useState<string>(Terrains3dConfig.SECTIONS[2].id);
    const loadSection= (section: string) => {
        setSectionId(section);
    };//end

    const renderMain = () => {
        if(sectionId===Terrains3dConfig.SECTION_HEIGHTMAP){
            return(<TerrainsHeightMap />);
        }
        else if(sectionId===Terrains3dConfig.SECTION_TEST){
            return(<XTerrainEditor />);
        }  
        //else if(sectionId===Terrains3dConfig.SECTION_TEXTURE){return null;}                         
    };//end

    return (
        <LayoutPageOneColumn 
            headertitle   = {"Terrains 3d"} 
            headercontent = {<Box>Generator Terrains.</Box>}
            main          = {renderMain()}
            options       = {Terrains3dConfig.SECTIONS}
            onselection   = {loadSection}  />                
    );

};//end page