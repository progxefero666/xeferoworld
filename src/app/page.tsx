'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AppConfig } from "@/app/index/appconfig";
import { LayoutPageOneColumn } from "@/layouts/lypageonecolumn";
import { PageMain } from "@/app/index/main";
import { PageHeader } from "@/app/index/header";


/**
 * Web App Home Page Client Component (Main View)
 */
export default function PageHome() {

    const router = useRouter();
    useEffect(() => {
        //loadSection(AppConfig.MOD_CHARACTERS.id);
        //loadSection(AppConfig.MOD_UNIVERSO.id);
        //loadSection(AppConfig.IMAGE_TOOLS.id);
        //loadSection(AppConfig.MOD_TERRAINS.id);
    }, []);
        
    const loadSection = (sectionId: string) => {
        router.push(`/${sectionId}`);
    };

    return (
        <LayoutPageOneColumn 
            headertitle   = {"Xefero AI"} 
            headercontent = {<PageHeader />}
            main          = {<PageMain />}
            options       = {AppConfig.MODULES} 
            onselection   = {loadSection} />
    );

}//end page
