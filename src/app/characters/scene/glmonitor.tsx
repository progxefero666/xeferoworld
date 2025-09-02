//sr\universe3d\monitor\glplayermonitor.tsxc\app

import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import * as THREE from 'three'
import { Box, Grid, Flex } from "@radix-ui/themes";
import { TDimension } from "@/common/types";
import { Characters3dScene } from "@/app/characters/scene/charactscene";
import { CharacterPlayer } from "@/characters/model/chplayer";
import { BipedConfig } from "@/lib/character/biped/bipedconfig";
import { GlbLoaderUtil } from "@/zone3d/three/loaders/threeglbutil";
import { CharacterConfig } from "@/characters/charactconfig";

//Con 5 Km/h-> (1000/720 meters) per second -> 
//             1.38 meters per second    
const bipedConfig = new BipedConfig(1.9,1.38);
let player: CharacterPlayer | null = null;

let renderer: THREE.WebGLRenderer | null = null;
let charactScene: Characters3dScene | null = null;


interface CharactMonitorProps {
    canvasdim: TDimension;
}
export interface CharactMonitorRef {
    execPlayerRoll: (dirCCW: boolean) => void;
    execPlayerElevation: (dirCCW: boolean) => void;
}

export const CharactMonitor = forwardRef<CharactMonitorRef, CharactMonitorProps>((props, ref) => {
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
        renderer.setClearColor('#000000', 1.0); 

        charactScene = new Characters3dScene(renderer,monitorAspect,onSceneCharged);
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
        //charactScene!.camera!.aspect = monitorAspect;
        //charactScene!.camera!.updateProjectionMatrix();
        renderer!.setSize(canvasdim.width, canvasdim.height);
    };//end
     
    const onSceneCharged = (object3d: THREE.Object3D) => {
        player = new CharacterPlayer(bipedConfig,object3d);
        charactScene!.scene!.add(player.globject!.object3d!);        
    };//end

    // parent actions
    const execPlayerRoll = (dirCCW:boolean) => {};
    const execPlayerElevation = (dirCCW:boolean) => {};
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
        renderer!.render(charactScene!.scene!, charactScene!.camera!);
    };//end

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
        //charactScene!.orbitControls!.target.set(0, 6, 0);
        //charactScene!.orbitControls!.update(); 
            <div ref={divOverCanvasRef}    
                 style={{zIndex: 2,
                         position:'absolute',left:0,top: 0,
                         width: monitorCsswidth,
                         height: monitorCssheight,
                         backgroundColor: 'transparent',
                         border: '1px solid rgba(222, 255, 9, 1)'}} />  
*/