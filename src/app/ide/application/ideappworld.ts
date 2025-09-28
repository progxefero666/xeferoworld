//src\app\ide\application\ideappworld.ts

import * as THREE from 'three';

import { Point2d, TCameraConfig, TDimension, TDimension3d } from '@/common/types';
import { CircunfUtil } from '@/math2d/functions/circunfutil';
import { XMath2dUtil } from '@/math2d/functions/xmath2dutil';
import { System3d } from '@/system3d/system3d';
import { CameraUtil } from '@/zone3d/three/cameras/thcamerautil';
import { LightsUtil } from '@/zone3d/three/threelights';
import { IdeThreeUtil } from '../util/idethreeutil';
import { SkyBoxGenerator } from '@/system3d/util/genskybox';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { GlbUtil } from '@/zone3d/three/loaders/glbutil';
import { IdeWorldCfg } from '../xethreeidecfg';
import { AppWorldFunct } from './ideworlfunct';


let lightDirA_int:number =1.0;
let lightDirA_color:any  = '#FFFFFF';
let lightDirA_pos:THREE.Vector3 = new THREE.Vector3(10,20,10);
let lightDirA:THREE.DirectionalLight;

/**
 * class IdeAppWorld
    public terrain:THREE.Object3D|null=null;
 */
export class IdeAppWorld {
    public static showGrid:boolean = true;

    public canvasDim:TDimension;
    public scene: THREE.Scene;
    public camera: THREE.PerspectiveCamera | null = null;
    public cameraRotY: number = 0;
    public cameraDist: number = 10;
    public cameraElev: number = 1.0;

    public skyboxInit:THREE.Mesh|null=null;
    

    //onSceneCharged:() => void
    constructor(canvasDim:TDimension) {
        this.canvasDim = canvasDim;        
        this.scene = new THREE.Scene();
        this.loadLights();
        this.loadCamera();
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
        //light A:
        lightDirA = LightsUtil.createDirectLight(lightDirA_color,lightDirA_int);
        lightDirA.position.copy(lightDirA_pos);
        this.scene.add(lightDirA);
        const directLightObj:THREE.Mesh = IdeThreeUtil.getLightMesh();        
        directLightObj.position.copy(lightDirA_pos);        
        this.scene.add(directLightObj);       

        const ptLight:THREE.PointLight = LightsUtil.createPointLight('#FFFFFF',1,40,2);
        ptLight.position.set(0.5,3,0.5);
        this.scene.add(ptLight);   
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

    // load scene objects 
    //........................................................................    
    public loadSceneObjects = async (model:string):Promise<boolean> => {
        if(IdeAppWorld.showGrid){
            this.scene.add(new THREE.GridHelper(500,500));
        }
        //

        //SkyBox
        this.skyboxInit = await SkyBoxGenerator.genSkyBox(
            model,IdeWorldCfg.SKYBOX_NAME,
            IdeWorldCfg.SKYBOX_TYPE,
            IdeWorldCfg.SKYBOX_RADIUS,
            "#FFFFFF",1); 
        this.scene.add(this.skyboxInit);

        //3d objects
        const loadRes = await AppWorldFunct.loadAircraft(this.scene);
        return loadRes;
    };//end

}//end