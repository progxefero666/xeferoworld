'use client';

import { useRouter } from "next/navigation";
import { Box } from "@radix-ui/themes";
import { LayoutPageOneColumn } from "@/layouts/lypageonecolumn";
import { Universo3dConfig } from "@/app/universo/universo3dcfg";
import { GameLayout } from "@/app/universo/gamelayout";
import { SpaceGameMonitor } from "./universo/game/gamemonitor";


/**
 * Page Space Game
 */
export default function PageUniverso3D() {

    const router = useRouter();
    const loadSection = (sectionId: string) => {        
        const route:string = Universo3dConfig.APP_FOLDER + sectionId;
        router.push(route);
    };

    const headerContent = () => {
        return(
            <Box>Space Game</Box>
        );
    };//end SpaceGameMonitor   

    //main = {<GameLayout />}

    return (
        <LayoutPageOneColumn 
            headertitle   = {"By Xefero"} 
            headercontent = {headerContent()}
            main          = {<SpaceGameMonitor />}
            options       = {[]} 
            onselection   = {loadSection} />
    );

}//end page
