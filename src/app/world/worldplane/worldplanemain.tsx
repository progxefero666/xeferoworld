//src\app\terrains\worldplane\worldplane.tsx


import { useEffect, useState } from "react";
import { Flex,Box } from "@radix-ui/themes";
import { RdxThContainers } from "@/radix/rdxthcontainers";
import { WorldPlaneViewer } from "@/app/world/worldplane/wpviewer";
import { WorldPlaneEditor } from "@/app/world/worldplane/wpeditor";
import { WorldPlane3d } from "@/terrains/worldplane3d";

//

interface CompProps {
    value?: string;
};
export function WorldPlaneMain({}: CompProps) {

    const [worldPlane,setWorldPlane] = useState<WorldPlane3d|null>(null);
    const [viewerKey,setViewerKey] = useState<string>('init');

    const onWorldPlaneChange = (newWorldPlane: WorldPlane3d) => {
        setWorldPlane(newWorldPlane);
        setViewerKey(new Date().getTime().toString());
    };
    
    return(
        <Flex width="100%" direction="row" pt="1" pb="2" 
            style={RdxThContainers.MAIN_CONTENT} >

            <Flex width="40%"  direction="column" py="1" 
                 style={RdxThContainers.PRIMARY_CONTENT}>     
                <WorldPlaneEditor onworldplanechange={onWorldPlaneChange} />
            </Flex>

            <Flex width="60%" direction="column" py="1" 
                  style={RdxThContainers.SECONDARY_CONTENT}>

                <WorldPlaneViewer key={viewerKey}
                                  worldplane={worldPlane} />
            </Flex>

        </Flex>
    )

}//end component