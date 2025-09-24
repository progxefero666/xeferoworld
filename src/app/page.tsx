//src\app\page.tsx
'use client';

import { useState } from "react";
import { Text,Flex, Box } from "@radix-ui/themes";
import { LayoutPageOneColumn } from "@/layouts/lypageonecolumn";

import { useRouter } from "next/navigation";

import { Universo3dConfig } from "./universo/universo3dcfg";
import UniversoMain from "./universo/universomain";


/**
 * Page Workflows
 */
export default function PageUniverso3D() {

    const router = useRouter();
    const loadSection = (sectionId: string) => {        
        const route:string = Universo3dConfig.APP_FOLDER + sectionId;
        router.push(route);
    };

    const headerContent = () => {
        return(
            <Box>Universo 3D</Box>
        );
    };//end    

    return (
        <LayoutPageOneColumn 
            headertitle   = {"Xefero AI"} 
            headercontent = {headerContent()}
            main          = {<UniversoMain />}
            options       = {[]} 
            onselection   = {loadSection} />
    );

}//end page
