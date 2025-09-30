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
import { IdeWorldCfg } from '../xethreeidecfg';
import { AppWorldFunct } from './ideworlfunct';


let lightDirA_int:number =4.0;
let lightDirA_color:any  = '#FFFFFF';
let lightDirA_pos:THREE.Vector3 = new THREE.Vector3(3,3,3);
let lightDirA:THREE.DirectionalLight;
let useLightDirA:boolean = true;

/**
 * class IdeAppWorld.showSkyBox
    public terrain:THREE.Object3D|null=null;
 */
export class IdeAppWorld {
    public static showGrid:boolean = false;
    public static showSkyBox:boolean = false;

    public canvasDim:TDimension;
    public scene: THREE.Scene;
    public skybox:THREE.Mesh|null=null;
    public camera: THREE.PerspectiveCamera | null = null;
    public cameraRotY: number = 0;
    public cameraDist: number = 10;
    public cameraElev: number = 1.0;
        
    public ambientLight:THREE.AmbientLight|null=null;
    public useWorldLights:boolean = true;
    
    constructor(canvasDim:TDimension) {
        this.canvasDim = canvasDim;        
        this.scene = new THREE.Scene();
        //this.loadLights();
        //this.loadCamera();
    };//end
   
    //configure Cube HDR pbr environment
    //........................................................................
    public confHdrEnvironment = async (renderer:THREE.WebGLRenderer):Promise<boolean> => {
        const pmrem = new THREE.PMREMGenerator(renderer!);
        pmrem.compileEquirectangularShader();
        const hdrTex = await new RGBELoader().loadAsync(IdeWorldCfg.HDR_MOTOR);
        const envHDR = pmrem.fromEquirectangular(hdrTex).texture;
        this.scene.environment = envHDR;

        hdrTex.dispose();
        pmrem.dispose();

        
        // test environment
        //AppWorldFunct.addPBRTestSpheres(this.scene);
        return true;
    };//end
  
    //load scene Lights
    //........................................................................    
    public loadLights = () => {   

        if(this.useWorldLights){
            this.ambientLight = new THREE.AmbientLight(
                IdeWorldCfg.AMB_LIGHT_COLOR,
                IdeWorldCfg.AMB_LIGHT_INT);                
            this.scene.add(this.ambientLight);  
        }

        /*
        export function loadLights(scene: THREE.Scene) {
            const dir = new THREE.DirectionalLight(0xffffff, 4);
            dir.position.set(5, 10, 5);
            scene.add(dir);

            const pt = new THREE.PointLight(0xffffff, 120, 0);
            pt.decay = 2;
            pt.position.set(1, 4, 1);
            scene.add(pt);
        }        
        */

        //light A:
        if(useLightDirA){
            lightDirA = LightsUtil.createDirectLight(lightDirA_color,lightDirA_int);
            lightDirA.position.copy(lightDirA_pos);
            this.scene.add(lightDirA);
            const directLightObj:THREE.Mesh = IdeThreeUtil.getLightMesh();        
            directLightObj.position.copy(lightDirA_pos);        
            //this.scene.add(directLightObj);
        }
       
        //const ptLight:THREE.PointLight = LightsUtil.createPointLight('#FFFFFF',10,30,2);
        //ptLight.position.set(1.0,3,1.0);
        //this.scene.add(ptLight);   
    };//end


    // Main Camera 
    //........................................................................    
    public loadCamera = () => {          
        const coord2d:Point2d=CircunfUtil
            .getCfCoords(System3d.CC,this.cameraDist,this.cameraRotY);    
        const camConfig:TCameraConfig = {fov:60,near:1.0,far:5000};
        this.camera = CameraUtil.createPerspCamera(this.canvasDim,camConfig);        
        this.camera.position.set(coord2d.x,this.cameraElev,coord2d.y);
        this.camera.lookAt(0,this.cameraElev,0);                 
    };//end
    
    public updateCameraParam = (index:number,value:number) => {
        if(index === 0) {this.cameraRotY = XMath2dUtil.toRadians(value);}
        else if(index === 1) {this.cameraDist = value;}
        else if(index === 2) {this.cameraElev = value;}
        const coord2d:Point2d=CircunfUtil
            .getCfCoords(System3d.CC,this.cameraDist,this.cameraRotY);                    
        this.camera!.position.set(coord2d.x,this.cameraElev,coord2d.y);
        this.camera!.lookAt(0,this.cameraElev,0); 
    };//end   

    // load scene elements 
    //........................................................................    
    public loadSceneElements = async (model:string):Promise<boolean> => {
        //this.loadLights();
        this.loadCamera();

        //GridHelper
        if(IdeAppWorld.showGrid){
            this.scene.add(new THREE.GridHelper(
                IdeWorldCfg.SKYBOX_RADIUS*2,
                IdeWorldCfg.SKYBOX_RADIUS*2));
        }        

        //SkyBox
        if(IdeAppWorld.showSkyBox){
            this.skybox = await SkyBoxGenerator.genSkyBox(
                model,IdeWorldCfg.SKYBOX_NAME,
                IdeWorldCfg.SKYBOX_TYPE,
                IdeWorldCfg.SKYBOX_RADIUS,
                "#FFFFFF",1); 
            this.scene.add(this.skybox);
        }

        //3d objects
        const loadRes = await AppWorldFunct.loadAircraft(this.scene);

       //dimIBL(this.scene, 0.8);        
        return loadRes;
    };//end

}//end

export function dimIBL(scene: THREE.Scene, value = 0.3) {
  scene.traverse(o => {
    const m = (o as THREE.Mesh).material as THREE.Material | THREE.Material[] | undefined;
    const set = (x:any)=>{ if (x?.isMeshStandardMaterial || x?.isMeshPhysicalMaterial) { x.envMapIntensity = value; x.needsUpdate = true; } };
    if (!m) return;
    Array.isArray(m) ? m.forEach(set) : set(m);
  });
}