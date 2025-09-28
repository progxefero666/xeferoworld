
//src\app\ide\application\threeapp.tsx

import { useState, useEffect, useRef } from "react";
import * as THREE from 'three';
import { Box, Flex } from "@radix-ui/themes";
import { RdxThContainers } from "@/radix/rdxthcontainers";
import { IdeConfig } from "@/app/ide/xethreeidecfg";
import { IdeAppWorld } from "./ideappworld";
import { TDimension } from "@/common/types";
import { SliderSimple } from "@/radix/sliders/slidersimple";
import { OrbitCamControl } from "@/zone3d/three/systems/orbitcamcontrol";


//main three webgl elements
//..................................................................
let renderer: THREE.WebGLRenderer;
let world:IdeAppWorld;

let orbitControl: OrbitCamControl | null = null;

interface ThreeAppProps {
    value?:string;
}
export function ThreeApp({}: ThreeAppProps) {

    const canvasDimRef = useRef<TDimension>(IdeConfig.MCANVAS_DIM);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [wglready, setWglReady] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window === "undefined" || typeof document === "undefined") return;
        if (wglready) { return; }

        createMainRenderer();
        createAppWorld();
        orbitControl = new OrbitCamControl(canvasDimRef.current,56,0);
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

    const createMainRenderer = () => {
        renderer = new THREE.WebGLRenderer({
            canvas:canvasRef.current!,
            antialias:true,alpha:false,powerPreference:'high-performance'
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(canvasDimRef.current.width, canvasDimRef.current.height);
        renderer.autoClear = true;
        renderer.setClearColor('#000000');
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMappingExposure = 1.0; //(0.8–1.3)
        renderer.debug.checkShaderErrors = true;
    };//end

    const createAppWorld = async () => {
        world = new IdeAppWorld(canvasDimRef.current);
        const configRes = await world.confHdrEnvironment(renderer);
        if(!configRes){console.log('env hdr config failed.');return;}

        const loadRes = await world.loadSceneObjects();        
    }//end

    /**
     * Main animation loop
     */
    const animate = () => {
        requestAnimationFrame(animate);
        //renderer!.render(world.scene,world.camera!);
        renderer!.render(world.scene,orbitControl!.cam);
        
    };//end

    const handleResize = () => {
        //camera!.aspect = window.innerWidth / window.innerHeight;
        //camera!.updateProjectionMatrix();
        renderer!.setSize(window.innerWidth, window.innerHeight);
    };//end    

    const renderOrbitCamControls = () => {
        return(
            <Flex width="100%" height="30px" direction="row" align="center" gapX="2" >
                <Box width="33%" >
                    <SliderSimple config={OrbitCamControl.sliderViewRotCfg} 
                                index={0} 
                                value={OrbitCamControl.ORBCAMERA_ROTY_DEF} 
                                onchange={orbitControl!.updateParam}  />
                </Box>              
                <Box width="33%" >
                    <SliderSimple config={OrbitCamControl.sliderViewDistCfg} 
                                index={1} 
                                value={OrbitCamControl.ORBCAMERA_DIST_DEF} 
                                onchange={orbitControl!.updateParam}  />
                </Box>      
                <Box width="33%" >
                    <SliderSimple config={OrbitCamControl.sliderViewElevCfg} 
                                index={2} 
                                value={OrbitCamControl.ORBCAMERA_ELEV_DEF} 
                                onchange={orbitControl!.updateParam}  />
                </Box>                               
            </Flex>
        )
    };//end 
        
    return (
        <Flex width="100%" direction="column" 
              style={IdeConfig.DESKTOP_CONTENT}>

            {wglready ? renderOrbitCamControls():null}   

            <canvas ref={canvasRef}
                width={canvasDimRef.current.width}
                height={canvasDimRef.current.height} />
        </Flex>
    )

};//end component