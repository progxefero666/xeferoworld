
//src\app\terrains3d\genmodel\mapglmonitor.tsx
import { useState, useEffect, useRef } from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Terrains3dConfig } from "../terrains3dcfg";


let scene: THREE.Scene | null = null;
let camera: THREE.PerspectiveCamera | null = null;
let renderer: THREE.WebGLRenderer | null = null;

interface TerrainHeighMapMonitorProps {    
    mesh:THREE.Mesh | null;
    onExport?: () => void;
}
export function TerrainHeightMapMonitor({mesh}: TerrainHeighMapMonitorProps) {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [wglready, setWglReady] = useState<boolean>(false);
    const [orbitControls, setOrbitControls] = useState<OrbitControls | null>(null);
    
    useEffect(() => {

        if (typeof window === "undefined" || typeof document === "undefined") return;
        if (wglready) { return; }

        renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current! });
        renderer.setSize(Terrains3dConfig.GLMONITOR_HEIGHTMAP_DIM.width,
                         Terrains3dConfig.GLMONITOR_HEIGHTMAP_DIM.height);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        loadScene();
        loadCameraAndControls();
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
        //camera!.aspect = Terrains3dConfig.GLMONITOR_HEIGHTMAP_DIM.width / 
         //                Terrains3dConfig.GLMONITOR_HEIGHTMAP_DIM.height;
        //camera!.updateProjectionMatrix();
        //renderer!.setSize(window.innerWidth, window.innerHeight);
    };//end
 
    const loadCameraAndControls = () => {
        const aspect = Terrains3dConfig.GLMONITOR_HEIGHTMAP_DIM.width / 
                       Terrains3dConfig.GLMONITOR_HEIGHTMAP_DIM.height;
        camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
        camera.position.z = 40;
        camera.position.y = 2.0;

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
        scene.add(new THREE.GridHelper(100, 100));
        if(mesh){
            scene.add(mesh);
        }
        
    };//end

    /**
     * Main animation loop
     */
    const animate = () => {
        requestAnimationFrame(animate);
        if (orbitControls) {orbitControls.update(); }
        renderer!.render(scene!, camera!);
    };//end

    return (                
        <canvas ref={canvasRef}
            width={Terrains3dConfig.GLMONITOR_HEIGHTMAP_DIM.width}
            height={Terrains3dConfig.GLMONITOR_HEIGHTMAP_DIM.height}
            style={{ backgroundColor: 'black' }} />
    )
}//end component