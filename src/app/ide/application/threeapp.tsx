
//src\app\zone3d\page_monitor.tsx

import { useState, useEffect, useRef } from "react";

import { Box, Grid, Flex, Text,  } from "@radix-ui/themes";
import { TDimension } from "@/common/types";

import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { RdxThContainers } from "@/radix/rdxthcontainers";
import { ThreeFbxUtil } from "@/zone3d/three/loaders/threefbxutil";
import { IdeConfig } from "../xethreeidecfg";
import { SkyBoxGenerator } from "@/system3d/util/genskybox";




interface ThreeAppProps {
    onExport?: () => void;
}

let scene: THREE.Scene | null = null;
let camera: THREE.PerspectiveCamera | null = null;
let renderer: THREE.WebGLRenderer | null = null;

//renderer.setViewport (0,0,canvasDimRef.current.width,canvasDimRef.current.height);


export function ThreeApp({ }: ThreeAppProps) {

    const canvasDimRef = useRef<TDimension>(IdeConfig.MCANVAS_DIM);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [wglready, setWglReady] = useState<boolean>(false);
    const [orbitControls, setOrbitControls] = useState<OrbitControls | null>(null);
    
    useEffect(() => {
        if (typeof window === "undefined" || typeof document === "undefined") return;
        if (wglready) { return; }

        // create Renderer, Scene, Camera and Controls
        renderer = new THREE.WebGLRenderer({ 
            canvas: canvasRef.current!,
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance' });

        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize(canvasDimRef.current.width, canvasDimRef.current.height);        
        renderer.autoClear = true;
        renderer.setClearColor('#000000');        
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMappingExposure = 1.0; // ajusta según HDRI (0.8–1.3 típico)
        renderer.debug.checkShaderErrors = true; // en dev, te avisa de shaders        
                
        scene = new THREE.Scene();
        loadSceneLights();
        loadCamera();
        loadOrbitControl();
        loadInitObjects();

        // init animation loop
        animate();
        setWglReady(true);

        window.addEventListener('resize', handleResize);
        // unmount cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            if (renderer && renderer.domElement.parentNode) {
                renderer.domElement.parentNode.removeChild(renderer.domElement);
            }
        };
    }, []);

    const handleResize = () => {
        camera!.aspect = window.innerWidth / window.innerHeight;
        camera!.updateProjectionMatrix();
        renderer!.setSize(window.innerWidth, window.innerHeight);
    };//end
 
    const loadCamera = () => {
        const aspect = canvasDimRef.current.width / canvasDimRef.current.height;
        camera = new THREE.PerspectiveCamera(60,aspect,1.0,2000);
        
        camera!.updateProjectionMatrix();
        camera.position.z = 5;
        camera.position.y = 2;
    };//end
    
    const loadSceneLights = () => {   
        const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
        sunLight.position.set(10, 20, 10);  // dirección de la luz
        sunLight.castShadow = true;
        sunLight.shadow.mapSize.set(2048, 2048);
        sunLight.shadow.bias = -0.0001;
        sunLight.shadow.normalBias = 0.02
        scene!.add(sunLight);                  
    };//end


    const loadInitObjects = async() => {
        scene!.add(new THREE.GridHelper(1000,1000));
        scene!.background = await SkyBoxGenerator
            .getCubeTexture('/spacegame/skybox/skyboxspace_a/');
    };//end

    /**
     * Main animation loop
     * This function is called recursively to update the scene.
     */
    const animate = () => {
        requestAnimationFrame(animate);
        if (orbitControls) {orbitControls.update(); }

        renderer!.render(scene!, camera!);
    };//end animate function

    const loadOrbitControl = () => {
        const orb_controls: OrbitControls = new OrbitControls(camera!, renderer!.domElement);
        setOrbitControls(orb_controls);
        orb_controls.enableDamping = true;
        orb_controls.dampingFactor = 0.25;
    };//end
        
    return (
        <Box width="100%" style={RdxThContainers.MONITOR_CONTENT}>
            <canvas ref={canvasRef}
                width={canvasDimRef.current.width}
                height={canvasDimRef.current.height}
                style={{ backgroundColor: 'yellow' }} />
        </Box>
    )

};//end component

/*
lights teory
...................................................................................
2. Sombra bloqueando luz hacia otro objeto

Caso: un objeto se interpone entre la luz y otro objeto.

Aquí la sombra no cae en un “plano receptor”, sino que lo que ocurre es que el objeto bloqueado recibe menos luz directamente.

Esto se calcula igual con el shadow map de la luz:

Objeto que bloquea → castShadow = true.
Objeto que queda detrás → receiveShadow = true.

mesh.castShadow = true;     // este objeto proyecta sombras
mesh.receiveShadow = true;  // este objeto puede recibir sombras
Renderer + Luz + Objetos (cast/receive) → si uno falla, no hay sombra.
*/