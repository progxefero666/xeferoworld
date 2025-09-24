//src\app\universo\game\gamemonitor.tsx

import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import * as THREE from 'three'

import { Box, Flex } from "@radix-ui/themes";
import { TDimension } from "@/common/types";
import { GameScene } from "../scene/universoscene";
import { GameConfig } from "@/universo3d/game/gameconfig";
import { XIconButton } from "@/radix/buttons/xiconbutton";
import { LIB_ICON } from "@/radix/rdxthicons";
import { ButtonsStyle } from "@/radix/rdxtheme";
import { SpaceGame } from "@/universo3d/game/spacegame";
import { FlySystemUtil } from "@/system3d/flysystem/flysystemutil";

const divOverCanvasStyle = {
    backgroundColor: 'none',
    border: '1px solid rgba(222, 255, 9, 1)',
};

interface GameMonitorProps {
    canvasdim: TDimension;
    gamesc:GameScene;
    game: SpaceGame;
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
            GameConfig.PLCAM_FOV,aspect, 
            GameConfig.PLCAM_NEAR,
            GameConfig.PLCAM_FAR);
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

    const test = () => { };
    useImperativeHandle(ref, () => ({ test }), []);


    /*.......................................................................................    
    Three app Main animation loop    
    //......................................................................................*/
    const execSleep = async(ms: number): Promise<void> =>{
        return new Promise(resolve => setTimeout(resolve, ms));
    };    
    let lastTelemetry = 0;
    let lastTime = 0;
    const clock = new THREE.Clock();  
    const animate = async () => {
        requestAnimationFrame(animate);
        const delta = clock.getDelta(); 
        const now = performance.now();
        
        //animate scene
        //game.animate(delta); 
        renderer!.render(gamesc.scene, game.cameraPlayer!);
        //renderer!.render(gamesc.scene, monCamera!);

        const timeDiff = performance.now() - lastTime;
        if(timeDiff < GameConfig.FRAME_TIME) { 
            await execSleep(GameConfig.FRAME_TIME - timeDiff); 
        }        
        lastTime = now;
    };//end
        
    /*
    //debug telemetry
    if (now - lastTelemetry >= 500 && game.player) {
        const telemetry = FlySystemUtil.getTelemetry(game.player);
        telemetry.toConsole();
        lastTelemetry = now;
    }
    */  
    //.......................................................................................


    const onExpand = () => {
        console.log("onclick expand");
    };//end

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
                    style={{
                        zIndex: 1,
                        position: 'absolute', left: 0, top: 0,
                        width: monCsswidth,
                        height: monCssheight,
                        backgroundColor: GameConfig.SCENE_BACKCOLOR
                    }} />

            </Box>
        </Flex>
    );

});//end GameMonitor

/*
let monCamera: THREE.PerspectiveCamera | null = null;
monCamera = new THREE.PerspectiveCamera(
    GameConfig.PLCAMERA_FOV,1, 
    GameConfig.PLCAMERA_NEAR,
    GameConfig.PLCAMERA_FAR);
monCamera.position.set(0,0,20);*/

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