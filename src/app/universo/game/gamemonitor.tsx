//sr\universe3d\monitor\glplayermonitor.tsxc\app

import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";

import { Box, Grid, Flex, Text,  } from "@radix-ui/themes";
import { TDimension } from "@/common/types";

import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { RdxThContainers } from "@/radix/rdxthcontainers";
import { UniversoScene } from "./scene/universoscene";


let renderer: THREE.WebGLRenderer | null = null;
let universoScene: UniversoScene | null = null;


const divOverCanvasStyle = {
    backgroundColor: 'none',
    border: '1px solid rgba(222, 255, 9, 1)',
};

interface GameMonitorProps {
    canvasdim: TDimension;
}
export interface GameMonitorRef {
    execPlayerRoll: (dirCCW: boolean) => void;
    execPlayerElevation: (dirCCW: boolean) => void;
}

export const GameMonitor = forwardRef<GameMonitorRef, GameMonitorProps>((props, ref) => {
    const { canvasdim } = props;
    
    const monitorBackcolor = "#000000"
    const monitorCsswidth= canvasdim.width + "px";
    const monitorCssheight= canvasdim.height + "px";
    const monitorAspect = canvasdim.width / canvasdim.height;
    const threeContainerRef = useRef<HTMLCanvasElement>(null);

    const divOverCanvasRef = useRef<HTMLDivElement>(null);

    const [wglready, setWglReady] = useState<boolean>(false);
    
    useEffect(() => {
        if (typeof window === "undefined" || typeof document === "undefined") return;
        if (wglready) { return; }

        renderer = new THREE.WebGLRenderer({ canvas: threeContainerRef.current! });
        renderer.setSize(canvasdim.width, canvasdim.height);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setClearColor('#000000ff', 1.0); 

        universoScene = new UniversoScene(renderer,monitorAspect);
        animate();
        setWglReady(true);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (renderer && renderer.domElement.parentNode) {
                renderer.domElement.parentNode.removeChild(renderer.domElement);
            }
        };
    }, []);

    const handleResize = () => {
        universoScene!.camera!.aspect = monitorAspect;
        universoScene!.camera!.updateProjectionMatrix();
        renderer!.setSize(canvasdim.width, canvasdim.height);
    };//end
 
    const execPlayerRoll = (dirCCW:boolean) => {
        console.log('execPlayerRoll');
    };
    
    const execPlayerElevation = (dirCCW:boolean) => {
        console.log('execPlayerElevation');
    };

    useImperativeHandle(ref, () => ({
        execPlayerRoll,
        execPlayerElevation,
    }), []);

    /**
     * Main animation loop
     * This function is called recursively to update the scene.
     */
    const animate = () => {
        requestAnimationFrame(animate);
        if (universoScene!.orbitControls) {universoScene!.orbitControls.update(); }
        renderer!.render(universoScene!.scene!, universoScene!.camera!);
    };//end animate function threeContainerRef

    return (
        <Box width="100%" style={{ position: 'relative', width: monitorCsswidth, height: monitorCssheight }}>
            <canvas ref={threeContainerRef} 
                    style={{zIndex: 1,
                        position:'absolute',left:0,top:0,
                        width: monitorCsswidth,
                        height: monitorCssheight,
                        backgroundColor: monitorBackcolor}} />


        </Box>
    );

});

/*
            <div ref={divOverCanvasRef}    
                 style={{zIndex: 2,
                         position:'absolute',left:0,top: 0,
                         width: monitorCsswidth,
                         height: monitorCssheight,
                         backgroundColor: 'transparent',
                         border: '1px solid rgba(222, 255, 9, 1)'}} />  
*/