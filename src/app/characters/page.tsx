//src\app\page.tsx
'use client';

import { useState } from "react";

import { XText } from "@/radix/data/xtext";
import { LayoutPageTwoColumns } from "@/layouts/lypagetwocolumns";

import { HeadMonitor } from "@/app/characters/old/charactmonitorold";
import { CharacterEditor } from "@/app/characters/characteditor";
import { CharactMonitor } from "./scene/glmonitor";
import { TDimension } from "@/common/types";

const canvasdim: TDimension = { width: 500, height: 500 };

/**
 * Page Webgl Head 3d
 */
export default function PageCharacters() {

    const [monitorKey, setMonitorKey] 
        = useState<string>(new Date().getTime().toString());

    const TestA = () => {
        //setMonitorKey(new Date().getTime().toString());
        //key={monitorKey}
    };

    return (
        <LayoutPageTwoColumns 
            headertitle   = {"Xefero AI"} 
            headercontent = {<XText value={"3D Character Editor"} />}
            mainleft      = {<CharacterEditor/>}
            mainright     = {<CharactMonitor   canvasdim={canvasdim} /> }
            options       = {[]}
            actoption     = {""}
            onselection   = {() => {}} />
    );

}//end page
