
//src\app\ide\application\threeapp.tsx

import { useState, useEffect, useRef } from "react";
import * as THREE from 'three';
import { Box } from "@radix-ui/themes";
import { RdxThContainers } from "@/radix/rdxthcontainers";
import { IdeConfig } from "@/app/ide/xethreeidecfg";
import { IdeAppWorld } from "./ideappworld";
import { TDimension } from "@/common/types";


//main three webgl elements
//..................................................................
let renderer: THREE.WebGLRenderer;
let world:IdeAppWorld;

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
        await world.loadInitObjects(renderer);
    }//end
    /**
     * Main animation loop
     */
    const animate = () => {
        requestAnimationFrame(animate);
        //renderer!.render(scene!, camera!);
    };//end

    const handleResize = () => {
        //camera!.aspect = window.innerWidth / window.innerHeight;
        //camera!.updateProjectionMatrix();
        renderer!.setSize(window.innerWidth, window.innerHeight);
    };//end    

    return (
        <Box width="100%" style={RdxThContainers.MONITOR_CONTENT}>
            <canvas ref={canvasRef}
                width={canvasDimRef.current.width}
                height={canvasDimRef.current.height} />
        </Box>
    )

};//end component