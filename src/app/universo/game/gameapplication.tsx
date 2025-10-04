//src\app\universo\game\gamemonitor.tsx

import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import * as THREE from 'three'

import { Box, Flex } from "@radix-ui/themes";
import { TDimension } from "@/common/types";
import { GameScene } from "./gamescene";
import { GameConfig } from "@/app/universo/game/gameconfig";
import { XIconButton } from "@/radix/buttons/xiconbutton";
import { LIB_ICON } from "@/radix/rdxthicons";
import { ButtonsStyle } from "@/radix/rdxtheme";
import { GameAircraft } from "@/app/universo/game/gameaircraft";
import { FlySystemUtil } from "@/system3d/flysystem/flysystemutil";
import { GameCamCfg } from "./gcamerascfg";
import { FlyRollControlRef, FlyRollMonitor } from "./player/monitor/flyrollmonitor";
import { XMath2d } from "@/math2d/xmath2d";

const divOverCanvasStyle = {
    backgroundColor: 'none',
    border: '1px solid rgba(222, 255, 9, 1)',
};

const ROLL_MONITOR_STYLE = {border: '1px solid rgba(0, 0, 0, 1)',};

export interface GameMonitorRef{
    updatecontrols:()=>void;
};

interface GameMonitorProps {
    canvasdim: TDimension;
    gamesc:GameScene;
    game: GameAircraft;
};


let renderer: THREE.WebGLRenderer | null = null;
let fixCamera: THREE.PerspectiveCamera | null = null;

export const GameWebGlApplication = forwardRef<GameMonitorRef, GameMonitorProps>((props, ref) => {
    
    const {canvasdim,gamesc,game} = props;
    const [wglready, setWglReady] = useState<boolean>(false);
    const threeContainerRef       = useRef<HTMLCanvasElement>(null);
    const monCsswidth:string      = canvasdim.width + "px";
    const monCssheight:string     = canvasdim.height + "px";
    
    const playerControlsRef = useRef<HTMLDivElement>(null);
    const flyRollControlRef = useRef<FlyRollControlRef>(null);

    useEffect(() => {
        if (typeof window === "undefined" || typeof document === "undefined") return;
        if (wglready) { return; }

        createGlRendered();
        loadFixDebugCamera();
        setWglReady(true);
        if(gamesc!==null) {startApplication();}        
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            if (renderer && renderer.domElement.parentNode) {
                renderer.domElement.parentNode.removeChild(renderer.domElement);
            }
        };
    }, []);

    const createGlRendered = () => {
        renderer = new THREE.WebGLRenderer({canvas:threeContainerRef.current!});
        renderer.setSize(canvasdim.width,canvasdim.height);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setClearColor(GameConfig.SCENE_BACKCOLOR, 1.0);        
    };//end

    const handleResize = () => {
        renderer!.setSize(canvasdim.width, canvasdim.height);
    };//end

    const loadFixDebugCamera = () => {
        fixCamera = new THREE.PerspectiveCamera(
            GameCamCfg.MCAM_FOV,
            canvasdim.width/ canvasdim.height, 
            GameCamCfg.MCAM_NEAR,
            GameCamCfg.MCAM_FAR);
        fixCamera.position.set(0,0,-6);
        fixCamera.lookAt(0,0,0);
    };//end

    const onExpand = () => {
        console.log("onclick expand");
    };//end

    useImperativeHandle(ref,()=>({updatecontrols}),[]);

    const updatecontrols = () => {
        const roll_angle:number = game.player!.roll_angle;
        console.log(XMath2d.toDegrees(roll_angle));

        flyRollControlRef.current!.changeValue(roll_angle);
    };

    const execSleep = async(ms: number): Promise<void> =>{
        return new Promise(resolve => setTimeout(resolve, ms));
    };    
    
    //......................................................................................    
    //Three app Main animation loop    
    //......................................................................................

    let lastTime = 0;  
    const startApplication = () => {
        lastTime = performance.now();
        animate();        
    };//end

    //init frame params      
    const clock = new THREE.Clock();

    //app render function
    const animate = async () => {
        requestAnimationFrame(animate);

        //1: new time parameters
        const delta = clock.getDelta(); 
        const now = performance.now();
        
        //2: animate scene
        if(GameAircraft.EXEC_ANIMATION){game.animate(delta);}

        //3: render main scene
        renderer!.render(gamesc.scene, game.cameraPlayer!);
    
        //4: sleep to correct frame duration
        const timeDiff = performance.now() - lastTime;
        if(timeDiff < GameConfig.FRAME_TIME) { 
            await execSleep(GameConfig.FRAME_TIME - timeDiff); 
        }        

        //5: update time properties
        lastTime = now;

    };//end
    //.......................................................................................

    //jsx
    //.......................................................................................    
    return (
        <Box width="100%" style={{position:'relative',width:monCsswidth,height:monCssheight}}>
            
            <canvas ref={threeContainerRef}
                    style={{zIndex:1, position:'absolute',left:0,top:0,
                            width:monCsswidth, height:monCssheight,
                            backgroundColor: GameConfig.SCENE_BACKCOLOR}} />

            <Flex ref={playerControlsRef} direction="row"   
                  width={monCsswidth} height={monCssheight}
                  px="3" py="3"
                  style={{zIndex:2,position:'absolute',left:0,top:0,
                         backgroundColor: 'transparent',border: '1px solid rgba(222, 255, 9, 1)'}} >
                
                <Flex width="20%" height="100%" direction="column" >
                    <FlyRollMonitor ref={flyRollControlRef}                                         
                                    value={0.0}  />                    
                </Flex>            
            </Flex>

        </Box>
    );

});//end GameMonitor

/*
border: '1px solid rgba(222, 255, 9, 1)'

//before animate
let lastTelemetry = 0;
//debug telemetry
if (now - lastTelemetry >= 500 && game.player) {
    const telemetry = FlySystemUtil.getTelemetry(game.player);
    telemetry.toConsole();
    lastTelemetry = now;
}
*/  
