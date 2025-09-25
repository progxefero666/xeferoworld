'use client';

import { useRouter } from "next/navigation";
import { Box } from "@radix-ui/themes";
import { GameLayout } from "@/app/universo/game/gameeditor";
import { LayoutPageOneColumn } from "@/layouts/lypageonecolumn";
import { Universo3dConfig } from "@/app/universo/universo3dcfg";


/**
 * Page Space Game
 */
export default function PageSpaceGameEditor() {

    const router = useRouter();
    const loadSection = (sectionId: string) => {        
        const route:string = Universo3dConfig.APP_FOLDER + sectionId;
        router.push(route);
    };

    const headerContent = () => {
        return(
            <Box>Space Game</Box>
        );
    };//end

    return (
        <LayoutPageOneColumn 
            headertitle   = {"By Xefero"} 
            headercontent = {headerContent()}        
            main = {<GameLayout />}
            options     = {[]} 
            onselection = {loadSection} />
    );

}//end page