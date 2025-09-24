//src\app\terrains3d\test\terraintest.tsx

import * as THREE from 'three'
import { useEffect, useRef,useState } from "react";
import { Box, Flex, Text, Button, Tabs, } from "@radix-ui/themes";
import { RdxThContainers } from "@/radix/rdxthcontainers";
import { XGroupIntParameters } from "@/radix/inputgroup/xgrpintparams";
import { Point2d, TDimension, Vector3d } from "@/common/types";

import { TerrainControl } from "@/terrains/xterrains/terraincontrol";
import { TerrModCirc } from "@/terrains/xterrains/modifiers/modcirc";
import { TestThreeMonitor } from "./testmonitor";
import { GlTerrain } from "@/terrains/xterrains/glmodel/glterrain";
import { XMath2dUtil } from '@/math2d/functions/xmath2dutil';
import { ElipseUtil } from '@/math2d/functions/elipseutil';
import { XMath2d } from '@/math2d/xmath2d';
import { GenColorMaterial } from '@/zone3d/three/materials/genmatcolor';
import { BlocksGenerator } from '@/terrains/planeblocks/functions/generateblocks';

import { Math2dPlane } from '@/math2d/functions/mathplane';
import { XMath2dPoly } from '@/math2d/polygons/mathpoly';



interface XTerrainEditorProps {
    value?: string;
};
export function XTerrainEditor({}: XTerrainEditorProps) {

    //.....................................................................................
    const [monitorKey, setMonitorKey] = useState<string>(new Date().getTime().toString());
    const [terrain,setTerrain] = useState<GlTerrain|null>(null);

    const onTerrainCharged = (terrain: GlTerrain) => {
        //setMonitorKey(new Date().getTime().toString());
        setTerrain(terrain); 
    };
    //.....................................................................................

    const [ready, setReady] = useState<boolean>(false);
    const terrControl = useRef<TerrainControl|null>(null);  

    const [glBlocks, setGlBlocks] = useState<THREE.Mesh[]>([]);

    useEffect(() => {
        if(ready) {return;}
        terrControl.current = new TerrainControl(125.0,100.0, 10.0);        
        terrControl.current!.generateTerrain();
        //generatePlaneBlocksA();
        generatePolyBlocks();
        setTerrain(terrControl.current!.terrain!); 
        setReady(true);
    }, []);
        
    const generatePolyBlocks = () => {

        const gridCells = terrControl.current!.terrain!.gridFaces;
        const cellDim:TDimension = terrControl.current!.terrGridFaceDim;
        const maxHeight:number = 12.0;

        const center:Point2d= XMath2d.CC;
        const rotation:number = 0.0;
        const scale:TDimension = {width:100,height:100};
        const radius:number =15;
        const polyPoints: Point2d[] = ElipseUtil        
            .getElipseEscaledPoints(center,radius,scale,rotation,90);

        const glGenBlocks:THREE.Mesh[] = BlocksGenerator
            .genBlocksMA1(gridCells,cellDim,center,polyPoints,maxHeight);


        setGlBlocks(glGenBlocks);
        setMonitorKey(new Date().getTime().toString());
    };//end



    const executeTerrModifier = () => {
        const new_vertex:Vector3d[][] = terrControl.current!.modCirc!.applyModifier();
        terrControl.current!.terrain!.modifyMesh(new_vertex);
        setTerrain(terrControl.current!.terrain!);        
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
                    <Button onClick={executeTerrModifier} color="green">
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

    return(
        <Flex width="100%" direction="row" style={RdxThContainers.MAIN_CONTENT} >

            <Flex width="40%"  direction="column" px="2" py="1" mb="2" 
                 style={RdxThContainers.PRIMARY_CONTENT}>     
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

            <Flex width="60%"  direction="column" px="2" py="1" mb="2" 
                 style={RdxThContainers.SECONDARY_CONTENT}>
                <TestThreeMonitor key={monitorKey}
                                  terrain={terrain}
                                  glblocks={glBlocks} /> 
            </Flex>

        </Flex>
    )

}//end component

/*
    const material: THREE.MeshStandardMaterial = GeoMaterials.getBaseMaterial('red',1.0);
    const glGenBlocks:THREE.Mesh[] = []; 
    const listFacesIndex: number[] = [];
    for (let faceIdx = 0; faceIdx < gridFaces.length; faceIdx++) {
        const isInside: boolean = XMath2dPoly
            .pointInside(gridFaces[faceIdx].position, polyPoints);
        if (isInside) {
            listFacesIndex.push(faceIdx);
            const geom = new THREE.BoxGeometry(1,1,1); 
            const glBlock = new THREE.Mesh(geom,material);
            glBlock.position.x = gridFaces[faceIdx].position.x;
            glBlock.position.y = 0.0;
            glBlock.position.z = gridFaces[faceIdx].position.y;  
            glGenBlocks.push(glBlock); 
        }        
    }    
*/