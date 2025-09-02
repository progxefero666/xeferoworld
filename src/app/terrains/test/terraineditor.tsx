//src\app\zone3d\terrains\terraineditor.tsx

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
interface CompProps {
    onterraincharged: (terrain: GlTerrain) => void;
};
export function TerrainEditor({onterraincharged}: CompProps) {

    const [ready, setReady] = useState<boolean>(false);
    const terrControl = useRef<TerrainControl|null>(null);  

    useEffect(() => {
        if(ready) {return;}
        terrControl.current = new TerrainControl(125.0, 100.0, 10.0);
        generateTerrain(); 
    }, []);
    
    //...................................................................................
    // Terrain Control
    //...................................................................................
    
    const generateTerrain = () => {
        terrControl.current!.generateTerrain();
        setReady(true);
        onterraincharged(terrControl.current!.terrain!);
    };//end

    const updateTerrain = () => {
        const new_vertex:Vector3d[][] = terrControl.current!.modCirc!.applyModifier();
        terrControl.current!.terrain!.modifyMesh(new_vertex);
        onterraincharged(terrControl.current!.terrain!);
    };//end

    const onParameterChange = (paramIndex:number,value:number) => {
        terrControl.current!.setParamValue(TerrModCirc.NAME,paramIndex, value);       
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
                    <Button onClick={updateTerrain} color="green">
                        Generate
                    </Button>
                </Box>
            </Flex>         
        );
    };//end

    const renderMainPanel = () => { 
        //<TerrModCircPanel  /> 
        return (
            <Flex width="100%" direction="column" px="2" gapY="2">
                {ready ?
                <XGroupIntParameters initparams={terrControl.current!.modCirc!.parameters} 
                                     onchange={onParameterChange} /> :null}

            </Flex>
        );
    };//end

    return (
        <Flex width="100%" direction="column" px="2"   
              style={RdxThContainers.MAIN_CONTENT} >

            {renderHeader()}

            <Tabs.Root defaultValue="terrain">
                <Tabs.List>
                    <Tabs.Trigger value="terrain">Terrain</Tabs.Trigger>
                    <Tabs.Trigger value="materials">Materials</Tabs.Trigger>
                    <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
                </Tabs.List>
                <Box pt="3">
                    <Tabs.Content value="terrain">
                       {renderMainPanel()}
                    </Tabs.Content>
                    <Tabs.Content value="materials">
                        <Text size="2">Materials</Text>
                    </Tabs.Content>
                    <Tabs.Content value="settings">
                        <Text size="2">Settings</Text>
                    </Tabs.Content>
                </Box>
            </Tabs.Root>
        </Flex>
    )

};//end component

    /*
    if (!terrain.current) {alert("Terrain not initialized");return;}       
    const forze_mode:string = XTerrBaseFunctions.FX_A_MODE_POW;
    const forze_coords:Vector3d ={x:0, y:10, z:0};
    const forze_radiusMax:number = 25; 
    const forze_intensity:number = 10; 
    const new_vertex:Vector3d[][] = XTerrBaseFunctions.applyRadialForze(
            terrain.current.vertex,
            forze_mode,
            forze_coords, 
            forze_radiusMax, 
            forze_intensity);
    terrain.current?.modifyMesh(new_vertex);        
    onterraincharged(terrain.current!);
    */ 