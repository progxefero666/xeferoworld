
//src\zone3d\component\thmonitor.tsx

import { useState, useEffect, useRef } from "react";
import { Box, Grid, Flex, Text,  } from "@radix-ui/themes";


import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TDimension } from "@/common/types";
import { RdxThContainers } from "@/radix/rdxthcontainers";


let scene: THREE.Scene | null = null;
let camera: THREE.PerspectiveCamera | null = null;
let renderer: THREE.WebGLRenderer | null = null;

interface CompProps {
    onExport?: () => void;
}
export function ThreeMonitor({ }: CompProps) {

    const canvasDimRef = useRef<TDimension>({ width: 700, height: 650 });
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [wglready, setWglReady] = useState<boolean>(false);
    const [orbitControls, setOrbitControls] = useState<OrbitControls | null>(null);
    
    useEffect(() => {
        if (typeof window === "undefined" || typeof document === "undefined") return;
        if (wglready) { return; }

        // create Renderer, Scene, Camera and Controls
        renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current! });
        renderer.setSize(canvasDimRef.current.width, canvasDimRef.current.height);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        loadScene();
        loadCameraAndControls();
        
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
 
    const loadCameraAndControls = () => {
        const aspect = canvasDimRef.current.width / canvasDimRef.current.height;
        camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
        camera.position.z = 1;
        camera.position.y = 0.1;

        const orb_controls: OrbitControls = new OrbitControls(camera, renderer!.domElement);
        setOrbitControls(orb_controls);
        orb_controls.enableDamping = true;
        orb_controls.dampingFactor = 0.25;
    };//end
    
    const loadSceneLights = () => {   
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);                
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
        directionalLight.position.set(50, 50, 50);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        scene!.add(ambientLight);  
        scene!.add(directionalLight);                      
    };//end

    const loadScene = async() => {
        scene = new THREE.Scene();
        loadSceneLights();                         
        loadSceneObjects();
    };//end

    const loadSceneObjects = () => {
        const geometry = new THREE.SphereGeometry( 15, 32, 32 ); 
        const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } ); 
        const sphere = new THREE.Mesh( geometry, material ); 
        scene!.add(sphere);
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

    return (
        <Flex width="100%" direction="column" justify="start" px="2" py="1" gapY="2"
              style={RdxThContainers.SECONDARY_CONTENT}>

            <Box width="100%">
                <canvas ref={canvasRef}
                    width={canvasDimRef.current.width}
                    height={canvasDimRef.current.height}
                    style={{ backgroundColor: 'black' }} />
            </Box>

            <Flex width="100%" direction="row">
                <Text size="2">Canvas player commands</Text>
            </Flex>
        </Flex>
    )
};//end component

