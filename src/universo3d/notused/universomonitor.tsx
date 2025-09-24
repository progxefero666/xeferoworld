
//src\app\zone3d\page_monitor.tsx

import { useState, useEffect, useRef } from "react";

import { Box, Grid, Flex, Text,  } from "@radix-ui/themes";
import { TDimension } from "@/common/types";

import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { loadFbx } from '@/zone3d/three/loaders/threefbxutil';
import { RdxThContainers } from "@/radix/rdxthcontainers";
import { UniversoScene } from "@/app/universe3d/scene/universoscene";


let renderer: THREE.WebGLRenderer | null = null;
let universoScene: UniversoScene | null = null;

let camera: THREE.PerspectiveCamera | null = null;
let scene: THREE.Scene | null = null;

interface CompProps {
    texture?: HTMLImageElement|null;
    onExport?: () => void;
}
export function UniversoMonitor({ texture }: CompProps) {

    const canvasDimRef = useRef<TDimension>({ width: 700, height: 650 });
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [wglready, setWglReady] = useState<boolean>(false);
    const [orbitControls, setOrbitControls] = useState<OrbitControls | null>(null);
    
    useEffect(() => {
        if (typeof window === "undefined" || typeof document === "undefined") return;
        if (wglready) { return; }

        if(texture) {console.log("Texture received in monitor.");}

        // create Renderer, Scene, Camera and Controls
        const aspect = canvasDimRef.current.width / canvasDimRef.current.height;
        renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current! });
        renderer.setSize(canvasDimRef.current.width, canvasDimRef.current.height);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setClearColor('#000000ff', 1.0); 

        universoScene = new UniversoScene(renderer, aspect);
        chargeScene();

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
        camera!.aspect = window.innerWidth / window.innerHeight;
        camera!.updateProjectionMatrix();
        renderer!.setSize(window.innerWidth, window.innerHeight);
    };//end
 
    const chargeScene = () => {
        //terrScene!.scene.add(terrain!.mesh!);
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

/*
    const loadCameraAndControls = () => {
        const aspect = canvasDimRef.current.width / canvasDimRef.current.height;
        camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
        camera.position.set(0.0,0.0,30.0);
        camera.lookAt(0,0,0);

        const orb_controls: OrbitControls = new OrbitControls(camera, renderer!.domElement);
        setOrbitControls(orb_controls);
        orb_controls.enableDamping = true;
        orb_controls.dampingFactor = 0.25;
    };//end
    
    const loadScene = () => {
        scene = new THREE.Scene();
        loadSceneLights();
        //scene.add(new THREE.GridHelper(1000,1000));
        //const glPivot: ThreePivot3d = new ThreePivot3d();
        //scene.add(glPivot.axisLines[0].gline);
        //scene.add(glPivot.axisLines[1].gline);
        //scene.add(glPivot.axisLines[2].gline);  
        //loadTestObjects();
    };//end

    const loadTestObjects = async() => {
        //const obj_box = await loadFBX('/models3d/box.fbx');
        //const scale:THREE.Vector3 = obj_box.scale;                  
        const obj_box = await loadFbx('/models3d/avion.fbx');
        scene!.add(obj_box);
    };//end
    const loadSceneLights = () => {   
        const ambientLight = new THREE.AmbientLight('#ffffff', 1.0);                
        const directionalLight = new THREE.DirectionalLight('#ffffff', 1.2);
        directionalLight.position.set(10, 10, 10);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;
        scene!.add(ambientLight);  
        scene!.add(directionalLight);                      
    };//end    
 
        loadFighter(scene);
        if(texture) {
            console.log("Texture received in monitor.");
            const sphere = SpheresGenerator.generateTextureSphere(1,32,texture);
            scene.add(sphere);
        }
        else {
            console.log("not Texture received in monitor.");
        }
        *
        //const imageBitmap = await ImageLoader.getImageBitmap(ball.src);   
        //ctrlCanvas.current?.render_c(imageBitmap);
        //const geometry = new THREE.BoxGeometry();
        //const material = new THREE.MeshNormalMaterial({ wireframe: true });
        //const cube = new THREE.Mesh(geometry, material);
*/