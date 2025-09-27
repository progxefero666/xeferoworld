//src\app\ide\application\ideappworld.ts

import * as THREE from 'three';

import { Point2d, TCameraConfig, TDimension } from '@/common/types';
import { CircunfUtil } from '@/math2d/functions/circunfutil';
import { XMath2dUtil } from '@/math2d/functions/xmath2dutil';
import { System3d } from '@/system3d/system3d';
import { CameraUtil } from '@/zone3d/three/cameras/thcamerautil';
import { LightsUtil } from '@/zone3d/three/threelights';
import { IdeThreeUtil } from '../util/idethreeutil';
import { SkyBoxGenerator } from '@/system3d/util/genskybox';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { GlbUtil } from '@/zone3d/three/loaders/glbutil';


let lightDirA_int:number =2;
let lightDirA_color:any  = '#FFFFFF';
let lightDirA_pos:THREE.Vector3 = new THREE.Vector3(10,20,10);
let lightDirA:THREE.DirectionalLight;

/**
 * class IdeAppWorld
    public terrain:THREE.Object3D|null=null;
 */
export class IdeAppWorld {

    public canvasDim:TDimension;
    public scene: THREE.Scene;
    public camera: THREE.PerspectiveCamera | null = null;
    public cameraRotY: number = 0;
    public cameraDist: number = 15;
    public cameraElev: number = 1.0;

    //public\spacegame\player\xwing8k.glb
    public glmachine: THREE.Object3D|null = null;    

    //onSceneCharged:() => void
    constructor(canvasDim:TDimension) {
        this.canvasDim = canvasDim;        
        this.scene = new THREE.Scene();
        this.scene.add(new THREE.GridHelper(500,500));
        this.loadLights();
        this.loadCamera();
    };//end
   
    public loadCamera = () => {  
        
        const coord2d:Point2d=CircunfUtil
            .getCfCoords(System3d.CC,this.cameraDist,this.cameraRotY);    
        const camConfig:TCameraConfig = {fov:60,near:1.0,far:1500};
        this.camera = CameraUtil.createPerspCamera(this.canvasDim,camConfig);        
        this.camera.position.set(coord2d.x,this.cameraElev,coord2d.y);
        //this.camera.position.set(-15, 1.0, -15);
        this.camera.lookAt(0,this.cameraElev,0);                 
    };//end
    
    public loadInitObjects = async (renderer:THREE.WebGLRenderer) => {
        this.scene.add(new THREE.GridHelper(1000, 1000));
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
        this.scene.environment = envHDR;
        this.scene.background = cubeT;
        hdrTex.dispose();
        pmrem.dispose();
        //........................................................................
        this.addPBRTestSpheres();
    };//end

    public addPBRTestSpheres = () => {
        
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
        this.scene.add(m);

    };//end

    public updateCameraParam = (index:number,value:number) => {
        if(index === 0) {
            this.cameraRotY = XMath2dUtil.toRadians(value);
        }
        else if(index === 1) {
            this.cameraDist = value;
        }
        else if(index === 2) {
            this.cameraElev = value;
        }
        const coord2d:Point2d=CircunfUtil
            .getCfCoords(System3d.CC,this.cameraDist,this.cameraRotY);                    
        this.camera!.position.set(coord2d.x,this.cameraElev,coord2d.y);
        this.camera!.lookAt(0,this.cameraElev,0); 
    };//end  

    public loadLights = () => {   
        //light A:
        lightDirA = LightsUtil.createDirectLight(lightDirA_color,lightDirA_int);
        lightDirA.position.copy(lightDirA_pos);
        this.scene.add(lightDirA);
        const directLightObj:THREE.Mesh = IdeThreeUtil.getLightMesh();        
        directLightObj.position.copy(lightDirA_pos);        
        this.scene.add(directLightObj);       
    };//end

    public loadInitObject = () => {   

    };//end

};//end