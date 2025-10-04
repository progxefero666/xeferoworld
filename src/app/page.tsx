'use client';

import { useRouter } from "next/navigation";
import { Universo3dConfig } from "@/app/universo/universo3dcfg";
import { SpaceGameMonitor } from "./universo/game/gamemonitor";
import { LayoutPageGame } from "@/layouts/lypagegame";

/**
 * Page Space Game
 */
export default function PageSpaceGame() {

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