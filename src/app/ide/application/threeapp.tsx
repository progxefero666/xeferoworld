
//src\app\ide\application\threeapp.tsx

import { useState, useEffect, useRef } from "react";
import * as THREE from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { Box } from "@radix-ui/themes";
import { TDimension } from "@/common/types";
import { RdxThContainers } from "@/radix/rdxthcontainers";
import { SkyBoxGenerator } from "@/system3d/util/genskybox";
import { IdeConfig } from "@/app/ide/xethreeidecfg";
import { LightsUtil } from "@/zone3d/three/util/threelightsutil";
import { GenColorMaterial } from "@/zone3d/three/materials/genmatcolor";


//main three webgl elements
//..................................................................
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;

//lights
//..................................................................
let directLightA:THREE.DirectionalLight;

// Three Applicacion jsx component
//..................................................................
export function ThreeApp() {

    const canvasDimRef = useRef<TDimension>(IdeConfig.MCANVAS_DIM);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [wglready, setWglReady] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window === "undefined" || typeof document === "undefined") return;
        if (wglready) { return; }

        createMainRenderer();
        scene = new THREE.Scene();
        loadSceneLights();
        loadCamera();
        loadInitObjects();
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
    }//end

    const handleResize = () => {
        camera!.aspect = window.innerWidth / window.innerHeight;
        camera!.updateProjectionMatrix();
        renderer!.setSize(window.innerWidth, window.innerHeight);
    };//end

    const loadCamera = () => {
        const aspect = canvasDimRef.current.width / canvasDimRef.current.height;
        camera = new THREE.PerspectiveCamera(60, aspect, 1.0, 1500);
        camera.position.set(-15, 1.0, -15);
        camera.lookAt(0, 0, 0);
    };//end

    const loadSceneLights = () => {

        //light A: directional
        const directLightA_pos:THREE.Vector3 = new THREE.Vector3(10,20,10);
        const directLightA:THREE.DirectionalLight 
            = LightsUtil.createDirectLight('#FFFFFF',2);
        const directLightObj = new THREE.Mesh(
            new THREE.SphereGeometry(IdeConfig.LIGHT_OBJ_RADIUS,16,16), 
            GenColorMaterial.getGridMaterial(IdeConfig.LIGHT_OBJ_COLOR,1));   

        directLightA.position.copy(directLightA_pos);
        directLightObj.position.copy(directLightA_pos);

        scene!.add(directLightA);
        scene!.add(directLightObj);

    };//end

    const loadInitObjects = async () => {
        scene!.add(new THREE.GridHelper(1000, 1000));
        //........................................................................
        //configure Cube HDR
        //........................................................................
        const pmrem = new THREE.PMREMGenerator(renderer!);
        pmrem.compileEquirectangularShader();
        const cubeT = await SkyBoxGenerator
            .getCubeTexture('/spacegame/skybox/skyboxspace_a/');
        const hdrTex = await new RGBELoader()
                .loadAsync('/ide/hdr/studio_small_09_2k.hdr');
        const envHDR = pmrem.fromEquirectangular(hdrTex).texture;
        scene!.environment = envHDR;
        scene!.background = cubeT;
        hdrTex.dispose();
        pmrem.dispose();
        //........................................................................
        addPBRTestSpheres();
    };//end

    const addPBRTestSpheres = () => {
        
        const material = new THREE.MeshPhysicalMaterial({
            color: 0xaaaaaa,
            metalness: 1.0,
            roughness: 0.15,
            clearcoat: 0.7,
            clearcoatRoughness: 0.1,
            envMapIntensity: 1.6,
        });
        //for normal maps
        material.normalScale.set(2,2);

        const geo = new THREE.SphereGeometry(1, 64, 32);
        const m = new THREE.Mesh(geo, material);
        m.position.set(-2, 1, 0);
        scene!.add(m);

    };//end

    /**
     * Main animation loop
     */
    const animate = () => {
        requestAnimationFrame(animate);
        renderer!.render(scene!, camera!);
    };//end


    return (
        <Box width="100%" style={RdxThContainers.MONITOR_CONTENT}>
            <canvas ref={canvasRef}
                width={canvasDimRef.current.width}
                height={canvasDimRef.current.height} />
        </Box>
    )

};//end component