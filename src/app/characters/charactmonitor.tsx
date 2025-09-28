//sr\universe3d\monitor\glplayermonitor.tsxc\app

import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { Box, Flex } from "@radix-ui/themes";
import { TDimension, Vector3d } from "@/common/types";
import { MainScene } from "@/app/characters/scene/mainscene";
import { CharacterPlayer } from "@/characters/model/chplayer";
import { OrbitCamControl } from "@/zone3d/three/systems/orbitcamcontrol";
import { SliderSimple } from "@/radix/sliders/slidersimple";
import { DeltaShooterAnimation } from "@/characters/animations/model/deltashooter";
import { GlbAnimationLoader } from "@/zone3d/three/loaders/animationloader";
import { PlayerCfg } from "@/characters/playerconfig";



let renderer: THREE.WebGLRenderer | null = null;
let mainScene: MainScene | null = null;

interface MainMonitorProps {
    canvasdim: TDimension;
    player:CharacterPlayer;
}
export interface MainMonitorRef {
    execa: (dirCCW: boolean) => void;
}

export const MainMonitor = forwardRef<MainMonitorRef, MainMonitorProps>((props, ref) => {
    const { canvasdim,player} = props;
    
    const monitorBackcolor = "#000000"
    const monitorCsswidth= canvasdim.width + "px";
    const monitorCssheight= canvasdim.height + "px";
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

        mainScene = new MainScene(onSceneCharged);
    
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
    // parent actions
    const execa = (dirCCW:boolean) => {};
    useImperativeHandle(ref, () => ({execa}), []);
    
    /*
        //player.initPlayer(mainScene!.scene!);
        //const terrainHeight = mainScene!.testRayTrace(player.bodyPivot.position);
        //player.initAnimation(mainScene!.scene!,1.0);     
    */

    let plAnWalkStart: DeltaShooterAnimation | null = null;

    const onSceneCharged = async () => {
        const animation:GLTF = await GlbAnimationLoader.readAnimation(PlayerCfg.SRC_AN_WALKSTART);
        plAnWalkStart = new DeltaShooterAnimation
            (mainScene!.scene!,animation,PlayerCfg.BONE_HANDRIGHT,PlayerCfg.GUN_INIT_POS);
        plAnWalkStart.init();                   
    };//end

    let plAnDeltaSum=0;
    const clock = new THREE.Clock();  
    
    const anPosition: Vector3d = {x:0,y:1.0,z:0};

    const animate = () => {
        requestAnimationFrame(animate);
        const delta = clock.getDelta();        
        if (plAnWalkStart) { 
            if(plAnDeltaSum<plAnWalkStart!.duration){
                const gunPos:Vector3d = plAnWalkStart!.update(delta,anPosition);
                //console.log(gunPos);
                plAnDeltaSum+=delta;
            }            
        }        
        renderer!.render(mainScene!.scene!,mainScene!.camera!);
    }//end
   
    const renderOrbitCamControls = () => {
        return(
            <Flex width="100%" height="30px" direction="row" align="center" gapX="2" >
                <Box width="33%" >
                    <SliderSimple config={OrbitCamControl.sliderViewRotCfg} 
                                index={0} 
                                value={OrbitCamControl.ORBCAMERA_ROTY_DEF} 
                                onchange={mainScene!.updateCameraParam}  />
                </Box>              
                <Box width="33%" >
                    <SliderSimple config={OrbitCamControl.sliderViewDistCfg} 
                                index={1} 
                                value={OrbitCamControl.ORBCAMERA_DIST_DEF} 
                                onchange={mainScene!.updateCameraParam}  />
                </Box>      
                <Box width="33%" >
                    <SliderSimple config={OrbitCamControl.sliderViewElevCfg} 
                                index={2} 
                                value={OrbitCamControl.ORBCAMERA_ELEV_DEF} 
                                onchange={mainScene!.updateCameraParam}  />
                </Box>                               
            </Flex>
        )
    };//end 

    return (
        <Flex width="100%"  direction="column" >
            {wglready ?renderOrbitCamControls():null}

            <Box width="100%" style={{ position: 'relative', width: monitorCsswidth, height: monitorCssheight }}>
                <canvas ref={threeContainerRef} 
                        style={{zIndex: 1,
                            position:'absolute',left:0,top:0,
                            width: monitorCsswidth,
                            height: monitorCssheight,
                            backgroundColor: monitorBackcolor}} />
            </Box>
        </Flex>
    );

});//end component

/*
    
    <div ref={divOverCanvasRef}    
            style={{zIndex: 2,
                    position:'absolute',left:0,top: 0,
                    width: monitorCsswidth,
                    height: monitorCssheight,
                    backgroundColor: 'transparent',
                    border: '1px solid rgba(222, 255, 9, 1)'}} />  
*/