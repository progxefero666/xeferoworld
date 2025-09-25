//src\app\universo\game\gamemonitor.tsx

import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import * as THREE from 'three'

import { Box, Flex } from "@radix-ui/themes";
import { TDimension } from "@/common/types";
import { GameScene } from "../gamescene";
import { GameConfig } from "@/app/universo/game/gameconfig";
import { XIconButton } from "@/radix/buttons/xiconbutton";
import { LIB_ICON } from "@/radix/rdxthicons";
import { ButtonsStyle } from "@/radix/rdxtheme";
import { GameAircraft } from "@/app/universo/game/spacegame";
import { FlySystemUtil } from "@/system3d/flysystem/flysystemutil";

const divOverCanvasStyle = {
    backgroundColor: 'none',
    border: '1px solid rgba(222, 255, 9, 1)',
};

interface GameMonitorProps {
    canvasdim: TDimension;
    gamesc:GameScene;
    game: GameAircraft;
};

export interface GameMonitorRef {
    test: () => void;
};

let renderer: THREE.WebGLRenderer | null = null;

export const GameMonitor = forwardRef<GameMonitorRef, GameMonitorProps>((props, ref) => {
    const { canvasdim,gamesc, game } = props;

    if(gamesc===null) { alert("GameScene is null"); }

    const monCsswidth = canvasdim.width + "px";
    const monCssheight = canvasdim.height + "px";
    const threeContainerRef = useRef<HTMLCanvasElement>(null);

    const divOverCanvasRef = useRef<HTMLDivElement>(null);

    let monCamera: THREE.PerspectiveCamera | null = null;

    const [wglready, setWglReady] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window === "undefined" || typeof document === "undefined") return;
        if (wglready) { return; }

        renderer = new THREE.WebGLRenderer({ canvas: threeContainerRef.current! });
        renderer.setSize(canvasdim.width, canvasdim.height);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setClearColor(GameConfig.SCENE_BACKCOLOR, 1.0);

        const aspect  =canvasdim.width/ canvasdim.height;
        monCamera = new THREE.PerspectiveCamera(
            GameConfig.M_CAMERA_FOV,aspect, 
            GameConfig.M_CAMERA_NEAR,
            GameConfig.M_CAMERA_FAR);
        monCamera.position.set(0,0,-6);
        monCamera.lookAt(0,0,0);

        if(gamesc!==null) {
            lastTime = performance.now();
            animate();
        }
        //else{alert("GameScene is null");}
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
        renderer!.setSize(canvasdim.width, canvasdim.height);
    };//end
    
    const onExpand = () => {
        console.log("onclick expand");
    };//end

    const test = () => {};
    useImperativeHandle(ref,()=>({test}),[]);

    const execSleep = async(ms: number): Promise<void> =>{
        return new Promise(resolve => setTimeout(resolve, ms));
    };    
    
    //......................................................................................    
    //Three app Main animation loop    
    //......................................................................................

    //init time properties
    let lastTime = 0;
    
    const clock = new THREE.Clock();

    const animate = async () => {
        requestAnimationFrame(animate);

        //new time parameters
        const delta = clock.getDelta(); 
        const now = performance.now();
        
        //animate scene
        if(GameAircraft.EXEC_ANIMATION){game.animate(delta);}

        //render main scene
        renderer!.render(gamesc.scene, game.cameraPlayer!);
    
        //sleep to correct frame duration
        const timeDiff = performance.now() - lastTime;
        if(timeDiff < GameConfig.FRAME_TIME) { 
            await execSleep(GameConfig.FRAME_TIME - timeDiff); 
        }        

        //update time properties
        lastTime = now;
    };//end
    //.......................................................................................




    //jsx
    //.......................................................................................    
    return (
        <Flex width="100%" direction="column" >

            <Flex width="100%" direction="row" justify="between">
                <Box width="100%">
                    Player View
                </Box>
                <Box width="auto">
                    <XIconButton icon={LIB_ICON.EXPAND}
                        color={ButtonsStyle.COLOR_EXPAND}
                        onclick={onExpand} />
                </Box>
            </Flex>

            <Box width="100%" style={{ position: 'relative', width: monCsswidth, height: monCssheight }}>
                <canvas ref={threeContainerRef}
                        style={{zIndex:1, position:'absolute',left:0,top:0,
                                width:monCsswidth, height:monCssheight,
                                backgroundColor: GameConfig.SCENE_BACKCOLOR}} />
            </Box>
        </Flex>
    );

});//end GameMonitor

/*
//before animate
let lastTelemetry = 0;
//debug telemetry
if (now - lastTelemetry >= 500 && game.player) {
    const telemetry = FlySystemUtil.getTelemetry(game.player);
    telemetry.toConsole();
    lastTelemetry = now;
}
*/  

/*
<div ref={divOverCanvasRef}    
    style={{zIndex: 2,
            position:'absolute',left:0,top: 0,
            width: monitorCsswidth,
            height: monitorCssheight,
            backgroundColor: 'transparent',
            border: '1px solid rgba(222, 255, 9, 1)'}} />  
if (universoScene!.orbitControls) {universoScene!.orbitControls.update(); }                         
*/