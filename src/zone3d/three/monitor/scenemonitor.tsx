//src\app\universo\game\gamemonitor.tsx

import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import * as THREE from 'three'

import { Box, Flex} from "@radix-ui/themes";
import { TDimension } from "@/common/types";
import { SliderSimple } from "@/radix/sliders/slidersimple";
import { OrbitCamControl } from "@/zone3d/three/systems/orbitcamcontrol";


let renderer: THREE.WebGLRenderer | null = null;
let orbitCamera: OrbitCamControl | null = null;

const divOverCanvasStyle = {
    backgroundColor: 'none',
    border: '1px solid rgba(222, 255, 9, 1)',
};

interface GameMonitorProps {
    canvasdim: TDimension;
    scene: THREE.Scene;
}

export interface GameMonitorRef {
    updateParams: () => void;
}

export const GameMonitor = forwardRef<GameMonitorRef, GameMonitorProps>((props, ref) => {
    const { canvasdim,scene } = props;
 
    const backcolor:any = "#000000";
    const monCsswidth= canvasdim.width + "px";
    const monCssheight= canvasdim.height + "px";
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
        renderer.setClearColor(backcolor, 1.0); 

        orbitCamera = new OrbitCamControl(canvasdim,50,Math.PI);

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
        renderer!.setSize(canvasdim.width, canvasdim.height);
    };//end
 
    const updateParams = () => {console.log('updateParams');};
    useImperativeHandle(ref, () => ({updateParams}), []);


    /**
     * Main animation loop
     */
    const animate = () => {
        requestAnimationFrame(animate);        
        renderer!.render(scene, orbitCamera!.cam);
    };//end 

    const renderOrbitCamControls = () => {
        return(
            <Flex width="100%" height="auto" direction="row" gapX="2" >
                <Box width="33%" >
                    <SliderSimple config={OrbitCamControl.sliderViewRotCfg} 
                                index={0} 
                                value={OrbitCamControl.ORBCAMERA_ROTY_DEF} 
                                onchange={orbitCamera!.updateParam}  />
                </Box>              
                <Box width="33%" >
                    <SliderSimple config={OrbitCamControl.sliderViewDistCfg} 
                                index={1} 
                                value={OrbitCamControl.ORBCAMERA_DIST_DEF} 
                                onchange={orbitCamera!.updateParam}  />
                </Box>      
                <Box width="33%" >
                    <SliderSimple config={OrbitCamControl.sliderViewElevCfg} 
                                index={2} 
                                value={OrbitCamControl.ORBCAMERA_ELEV_DEF} 
                                onchange={orbitCamera!.updateParam}  />
                </Box>                               
            </Flex>
        )
    };//end 

    return (
        <Flex width="100%" direction="column"  >
            
            {wglready?renderOrbitCamControls():null}

            <Box width="100%" style={{position:'relative',width:monCsswidth,height:monCssheight}}>
                <canvas ref={threeContainerRef} 
                        style={{zIndex: 1,
                            position:'absolute',left:0,top:0,
                            width: monCsswidth,
                            height: monCssheight,
                            backgroundColor:backcolor}} />

            </Box>
        </Flex>
    );

});

/*
        //gamesc.updateOrbitCameraParam(index,value);
<div ref={divOverCanvasRef}    
    style={{zIndex: 2,
            position:'absolute',left:0,top: 0,
            width: monitorCsswidth,
            height: monitorCssheight,
            backgroundColor: 'transparent',
            border: '1px solid rgba(222, 255, 9, 1)'}} />  
if (universoScene!.orbitControls) {universoScene!.orbitControls.update(); }                         
*/