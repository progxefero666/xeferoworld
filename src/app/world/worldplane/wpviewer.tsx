//src\app\terrains\worldplane\wpviewer.tsx

import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { Flex, Box, Switch } from "@radix-ui/themes";
import { RdxThContainers } from "@/radix/rdxthcontainers";
import { WorldPlaneCfg } from "../worldconfig";
import { WorldPainter } from "./worldpainter";
import { XText } from "@/radix/data/xtext";
import { WorldPlane3d } from "@/terrains/worldplane3d";


/**
 * World Plane Viewer
 */
interface WorldPlaneViewerProps {
    worldplane: WorldPlane3d|null;
};
export function WorldPlaneViewer({worldplane}: WorldPlaneViewerProps) {

    const [ready, setReady] = useState<boolean>(false);
    const [viewImage, setViewImage] = useState<boolean>(true);
   
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const wpPainter = useRef<WorldPainter|null>(null);

    // webgl three monitor    
    const [isWireframe, setIsWireframe] = useState(false);
    const [wireframeColor, setWireframeColor] = useState('#00ff00');

    useEffect(() => {
        if(ready){return}
        const canvas = canvasRef.current;
        if (!canvas||!canvas.getContext("2d")) return;
        
        wpPainter.current = new WorldPainter
            (canvas.getContext("2d")!,WorldPlaneCfg.IMAGECANVAS_DIM);                    
        if(worldplane){renderWorldPlane();}    
 
        setReady(true);
    }, []);

    const renderWorldPlane = () => {
        
        wpPainter.current?.renderZones(worldplane!.zonesCvPolys);        
        //wpPainter.current?.renderZoneGridFaces(worldplane!.gridCvFaces); 
       
    };//end

    /*
    for(let idx=0; idx<worldplane!.zones.length; idx++) {
        console.log(idx);
        const zoneFaces:SimplePoly[] = worldplane!
            .getCvZoneFacesPolys(WorldPlaneCfg.IMAGECANVAS_DIM,idx);
        wpPainter.current?.renderZoneGridFaces(zoneFaces);   
    }
    */

    const onViewHeightMap = () => {
        setViewImage(!viewImage);
    };//end

    const onViewWireframe = () => {
        const showWf: boolean = !isWireframe;
        setIsWireframe(showWf);
    };//end

    const renderHeader = () => {
        return (
            <Flex width="100%" direction="row" justify="between" py="1"
                style={RdxThContainers.HEADER_MAIN} >
                <Flex gapX="2">
                    {viewImage ?
                        <Switch size="2" onClick={onViewHeightMap} defaultChecked /> :
                        <Switch size="2" onClick={onViewHeightMap} />}
                    <XText value="World Map" />
                </Flex>
                <Flex width="auto" direction="row" px="2" gapX="2">

                </Flex>
            </Flex>
        )
    }//end

    const renderWebglMonitor = () => {
        return (
            <p></p>
        )
    }//end

    return (
        <Flex width="100" height="auto" direction="column" px="2" gapY="2" >  
            {renderHeader()}
            <Box width="auto" > 
                <canvas ref={canvasRef} 
                        style = {{backgroundColor:WorldPlaneCfg.IMAGECANVAS_BACKCOLOR}}
                        width = {WorldPlaneCfg.IMAGECANVAS_DIM.width}
                        height= {WorldPlaneCfg.IMAGECANVAS_DIM.height} />
                {renderWebglMonitor()}
            </Box>
        </Flex>
    )

}//end component