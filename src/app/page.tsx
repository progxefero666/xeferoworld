'use client';

import { useRouter } from "next/navigation";
import { Universo3dConfig } from "@/app/universo/universo3dcfg";
import { SpaceGameMonitor } from "./universo/game/gamemonitor";
import { LayoutPageGame } from "@/layouts/lypagegame";

/**
 * Page Space Game
 */
export default function PageUniverso3D() {

    const router = useRouter();
    const loadSection = (sectionId: string) => {        
        const route:string = Universo3dConfig.APP_FOLDER + sectionId;
        router.push(route);
    };

    return (
        <LayoutPageGame 
            main        = {<SpaceGameMonitor />}
            options     = {[]} 
            onselection = {loadSection} />
    );

}//end page

/*
import { Box } from "@radix-ui/themes";
import { GameLayout } from "@/app/universo/gamelayout";
import { LayoutPageOneColumn } from "@/layouts/lypageonecolumn";
    main = {<GameLayout />}
    const headerContent = () => {
        return(
            <Box>Space Game</Box>
        );
    };//end

    //main = {<GameLayout />}
    return (
        <LayoutPageGame 
            headertitle   = {"By Xefero"} 
            headercontent = {headerContent()}
            main          = {<SpaceGameMonitor />}
            options       = {[]} 
            onselection   = {loadSection} />
    );
*/