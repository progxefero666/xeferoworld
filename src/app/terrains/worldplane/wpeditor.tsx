//src\app\terrains\worldplane\wpeditor.tsx


import { useState, useEffect, useRef } from "react";
import { Box, Grid, Flex, Text, Button, Slider, Tabs, } from "@radix-ui/themes";

import { RdxThContainers } from "@/radix/rdxthcontainers";
;
import { XGroupIntParameters } from "@/radix/inputgroup/xgrpintparams";


import { Vector3d } from "@/common/types";
import { GlTerrain } from "@/terrains/xterrains/glmodel/glterrain";
import { TerrainControl } from "@/terrains/xterrains/terraincontrol";
import { TerrModCirc } from "@/terrains/xterrains/modifiers/modcirc";

/**
 * Terrain 3D Editor
 */
interface WorldPlaneEditorProps {
    onterraincharged: (terrain: GlTerrain) => void;
};
export function WorldPlaneEditor({onterraincharged}: WorldPlaneEditorProps) {

    const [ready, setReady] = useState<boolean>(false);
    //const terrControl = useRef<TerrainControl|null>(null);  

    useEffect(() => {
        if(ready) {return;}

    }, []);
    
    //...................................................................................
    // Terrain Control
    //...................................................................................
    
    const test = () => {

    };//end


    // Render Jsx
    //...................................................................................


    const renderHeader = () => {
        return (
            <Flex width="100%" direction="row" justify="between"  align="center" >
                <Box px="2">
                    <Text size="3" weight="bold" color="gray">
                        Terrain Editor
                    </Text>
                </Box>
                <Box pt="1" px="1">
                    {/*
                        <Button onClick={updateTerrain} color="green">
                            Generate
                        </Button>                     
                     */}
                </Box>
            </Flex>         
        );
    };//end



    return (
        <Flex width="100%" direction="column" px="2"   
              style={RdxThContainers.MAIN_CONTENT} >

            {renderHeader()}

            <Flex width="100%" direction="column" px="2" gapY="2">

            </Flex>
        </Flex>
    )

};//end component
