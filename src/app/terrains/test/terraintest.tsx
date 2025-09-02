//src\app\terrains3d\test\terraintest.tsx


import { useEffect, useState } from "react";
import { Flex,Box } from "@radix-ui/themes";
import { RdxThContainers } from "@/radix/rdxthcontainers";

import { TerrainEditor } from "./terraineditor";
import { TestThreeMonitor } from "./testmonitor";
import { GlTerrain } from "@/terrains/xterrains/glmodel/glterrain";



interface CompProps {
    value?: string;
};
export function Terrains3dTests({}: CompProps) {

    const [monitorKey, setMonitorKey] = useState<string>(new Date().getTime().toString());
    const [terrain,setTerrain] = useState<GlTerrain|null>(null);
    const onTerrainCharged = (terrain: GlTerrain) => {
        setMonitorKey(new Date().getTime().toString());
        setTerrain(terrain); 
    };
    
    return(
        <Flex width="100%" direction="row" style={RdxThContainers.MAIN_CONTENT} >

            <Flex width="40%"  direction="column" px="2" py="1" mb="2" 
                 style={RdxThContainers.PRIMARY_CONTENT}>     
                 <TerrainEditor onterraincharged={onTerrainCharged} />  
            </Flex>

            <Flex width="60%"  direction="column" px="2" py="1" mb="2" 
                 style={RdxThContainers.SECONDARY_CONTENT}>
                <TestThreeMonitor key={monitorKey} terrain={terrain} /> 
            </Flex>

        </Flex>
    )

}//end component