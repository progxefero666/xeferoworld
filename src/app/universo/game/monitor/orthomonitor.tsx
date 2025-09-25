//src\app\universo\game\gamemonitor.tsx

import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import * as THREE from 'three'

import { Box, Flex } from "@radix-ui/themes";
import { TDimension } from "@/common/types";
import { GameScene } from "../gamescene";
import { SliderSimple } from "@/radix/sliders/slidersimple";
import { GameConfig } from "@/app/universo/game/gameconfig";
import { OrbitCamera } from "@/zone3d/three/cameras/orbitcamera";
import { XIconButton } from "@/radix/buttons/xiconbutton";
import { ButtonsStyle } from "@/radix/rdxtheme";
import { LIB_ICON } from "@/radix/rdxthicons";
import { GameAircraft } from "@/app/universo/game/spacegame";



let renderer: THREE.WebGLRenderer | null = null;
let camera: THREE.OrthographicCamera | null = null;

interface OrthoMonitorProps {
    canvasdim: TDimension;
    game: GameAircraft;
    gamesc: GameScene;
};

export function OrthoMonitor({ canvasdim, gamesc, game }: OrthoMonitorProps) {

    const monCsswidth = canvasdim.width + "px";
    const monCssheight = canvasdim.height + "px";
    const threeContainerRef = useRef<HTMLCanvasElement>(null);

    const [wglready, setWglReady] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window === "undefined" || typeof document === "undefined") return;
        if (wglready) { return; }

        renderer = new THREE.WebGLRenderer({ canvas: threeContainerRef.current! });
        renderer.setSize(canvasdim.width, canvasdim.height);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setClearColor(GameConfig.SCENE_BACKCOLOR, 1.0);

        chargeCamera();
        animate();
        setWglReady(true);
        return () => {
            if (renderer && renderer.domElement.parentNode) {
                renderer.domElement.parentNode.removeChild(renderer.domElement);
            }
        };
    }, []);

    const chargeCamera = () => {
        const aspect = canvasdim.width / canvasdim.height;
        const viewSize = 200;
        const top = viewSize / 2;
        const bottom = -top;
        const right = top * aspect;
        const left = -right;
        
        camera = new THREE.OrthographicCamera(left, right, top, bottom, 0.1, 1000);
        camera.position.set(0, 200, 0);
        camera.rotation.set(-Math.PI/2, 0, Math.PI);
    };

    // Ejemplo de uso con diferentes alturas:
    const setCameraHeight = (height: number) => {
        camera!.position.y = height;
        camera!.lookAt(0, 0, 0); // Asegura que siempre mire al centro
    };


    /**
     * Main animation loop
     */
    const execSleep = async (ms: number): Promise<void> => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };
    let lastTime = 0;
    const animate = async () => {
        requestAnimationFrame(animate);
        const now = performance.now();

        const playerPos = game.player!.pivot.position;
        camera!.position.set(playerPos[0],playerPos[1]+200,playerPos[2]);        
        //camera!.lookAt(playerPos[0],playerPos[1],playerPos[2]) ;

        renderer!.render(gamesc.scene, camera!);

        const delta = performance.now() - lastTime;
        if (delta < GameConfig.FRAME_TIME) {
            await execSleep(GameConfig.FRAME_TIME - delta);
        }
        lastTime = now;
    };//end 

    const onExpand = () => {
        console.log("onclick expand");
    };//end

    return (
        <Flex width="100%" direction="column"  >

            <Flex width="100%" direction="row" justify="between">
                <Box width="100%">
                    Ortho. View
                </Box>
                <Box width="auto">
                    <XIconButton icon={LIB_ICON.EXPAND}
                        color={ButtonsStyle.COLOR_EXPAND}
                        onclick={onExpand} />
                </Box>
            </Flex>

            <Box width="100%" style={{ position: 'relative', width: monCsswidth, height: monCssheight }}>
                <canvas ref={threeContainerRef}
                    style={{
                        zIndex: 1, position: 'absolute', left: 0, top: 0,
                        width: monCsswidth,
                        height: monCssheight,
                        backgroundColor: GameConfig.SCENE_BACKCOLOR
                    }} />
            </Box>

        </Flex>
    );

};//end

/*
    const renderOrbitCamControls = () => {
        return(
            <Flex width="100%" height="30px" direction="row" align="center" gapX="2" >
                <Box width="33%" >
                    <SliderSimple config={OrbitCamera.sliderViewRotCfg} 
                                index={0} 
                                value={OrbitCamera.ORBCAMERA_ROTY_DEF} 
                                onchange={orbitCamera!.updateParam}  />
                </Box>              
                <Box width="33%" >
                    <SliderSimple config={OrbitCamera.sliderViewDistCfg} 
                                index={1} 
                                value={OrbitCamera.ORBCAMERA_DIST_DEF} 
                                onchange={orbitCamera!.updateParam}  />
                </Box>      
                <Box width="33%" >
                    <SliderSimple config={OrbitCamera.sliderViewElevCfg} 
                                index={2} 
                                value={OrbitCamera.ORBCAMERA_ELEV_DEF} 
                                onchange={orbitCamera!.updateParam}  />
                </Box>                               
            </Flex>
        )
    };//end 

    {wglready?renderOrbitCamControls():null}    
*/