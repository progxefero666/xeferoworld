//src\app\page.tsx
'use client';

import { useState } from "react";
import { XText } from "@/radix/data/xtext";
import { LayoutPageTwoColumns } from "@/layouts/lypagetwocolumns";
import { HeadMonitor } from "@/app/characters/old/charactmonitorold";
import { CharacterMain } from "@/app/characters/charactermain";
import { MainMonitor } from "./charactmonitor";
import { Box } from "@radix-ui/themes";
import { Characters3dConfig } from "./moduleconfig";
import { LayoutPageOneColumn } from "@/layouts/lypageonecolumn";


/**
 * Page Characters
 */
export default function PageCharacters() {

    const loadSection = (sectionId: string) => {        
    
    };

    const headerContent = () => {
        return(
            <Box>Characters 3D</Box>
        );
    };//end    

    return (
        <LayoutPageOneColumn 
            headertitle   = {"Xefero AI"} 
            headercontent = {headerContent()}
            main          = {<CharacterMain />}
            options       = {[]} 
            onselection   = {loadSection} />
    );

}//end page

/*
        <LayoutPageTwoColumns 
            headertitle   = {"Xefero AI"} 
            headercontent = {<XText value={"3D Character Editor"} />}
            mainleft      = {<CharacterEditor/>}
            mainright     = {<CharactMonitor canvasdim={Characters3dConfig.CANVAS_DIM} /> }
            options       = {[]}
            actoption     = {""}
            onselection   = {() => {}} />

    const [monitorKey, setMonitorKey] 
        = useState<string>(new Date().getTime().toString());

    const TestA = () => {
        //setMonitorKey(new Date().getTime().toString());
        //key={monitorKey}
    };
*/