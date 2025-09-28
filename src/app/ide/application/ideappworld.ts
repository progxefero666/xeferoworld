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


let lightDirA_int:number =1.0;
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
    public cameraDist: number = 16;
    public cameraElev: number = 1.0;

    public skyboxInit:THREE.Mesh|null=null;
    
    //public\spacegame\player\xwing8k.glb
    public glmachine: THREE.Object3D|null = null;    

    //onSceneCharged:() => void
    constructor(canvasDim:TDimension) {
        this.canvasDim = canvasDim;        
        this.scene = new THREE.Scene();
        //this.scene.add(new THREE.GridHelper(500,500));
        this.loadSkyBox();
        this.loadLights();
        this.loadCamera();
    };//end
   
    public loadCamera = () => {          
        const coord2d:Point2d=CircunfUtil
            .getCfCoords(System3d.CC,this.cameraDist,this.cameraRotY);    
        const camConfig:TCameraConfig = {fov:60,near:1.0,far:4000};
        this.camera = CameraUtil.createPerspCamera(this.canvasDim,camConfig);        
        this.camera.position.set(coord2d.x,this.cameraElev,coord2d.y);
        //this.camera.position.set(-15, 1.0, -15);
        this.camera.lookAt(0,this.cameraElev,0);                 
    };//end
    
    public  loadSkyBox = async () => {            
        const skyboxFolder = "/spacegame/skybox/skyboxspace_blue";
        const skyboxDim:TDimension3d = {width:5000,height:5000,depth:5000};
        this.skyboxInit = await SkyBoxGenerator
            .genSkyBoxBlack(skyboxFolder,'skybox','jpg',skyboxDim,1); 
        this.scene.add(this.skyboxInit);           
    };//end

    //........................................................................
    //configure Cube HDR pbr environment
    //........................................................................
    public confHdrEnvironment = async (renderer:THREE.WebGLRenderer):Promise<boolean> => {
        const pmrem = new THREE.PMREMGenerator(renderer!);
        pmrem.compileEquirectangularShader();
        
        //const cubeT = await SkyBoxGenerator
        //    .getCubeTexture('/spacegame/skybox/skyboxspace_a/');
        //this.scene.background = cubeT;

        const hdrTex = await new RGBELoader()
                .loadAsync('/ide/hdr/studio_small_09_2k.hdr');
        const envHDR = pmrem.fromEquirectangular(hdrTex).texture;
        this.scene.environment = envHDR;

        hdrTex.dispose();
        pmrem.dispose();
        // test environment
        //this.addPBRTestSpheres();
        return true;
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

        const ptLight:THREE.PointLight = LightsUtil.createPointLight('#FFFFFF',1,40,2);
        ptLight.position.set(0.5,3,0.5);
        this.scene.add(ptLight);   
    };//end



    //más espejo,clearcoatRoughness baja a 0.04
    //El contraste viene sobre todo de 
    // roughness (nitidez del brillo) y 
    // envMapIntensity (potencia del reflejo).
    public loadSceneObjects = async ():Promise<boolean> => {
        //const src: string = '/spacegame/player/xwing8k.glb';

        //Longitud: 19'10 m. ; Altura: 4'88 m
        const src: string = '/spacegame/player/aircraftblackhigh.glb';
        this.glmachine = await GlbUtil.loadGLB_object(src);
        
        const material = (this.glmachine as THREE.Mesh)
                    .material as THREE.MeshPhysicalMaterial;
        //material.envMapIntensity = 1.5; 
        material.roughness = 0.6;
        material.metalness = 0.6;        
        //material.clearcoat = 0.7;
        //material.clearcoatRoughness = 0.08; 
        //material.normalScale.set(1.5,1.5);
        //material.ior = 1.5;
        material.needsUpdate = true;
        
        this.scene.add(this.glmachine);
        return true;
    };//end

};//end

function summarizeMaterial(m: THREE.Material) {

    const mm = m as THREE.MeshStandardMaterial as any; 
    // name: m.name,

    const summary = {       
        color: mm.color?.getHexString?.(),
        map: mm.map?.name ?? mm.map?.uuid,
        normalMap: mm.normalMap?.name ?? mm.normalMap?.uuid,        
        roughnessMap: mm.roughnessMap?.name ?? mm.roughnessMap?.uuid,
        metalnessMap: mm.metalnessMap?.name ?? mm.metalnessMap?.uuid,
        //aoMap: (mm as any).aoMap?.name ?? (mm as any).aoMap?.uuid,
        //aoMapIntensity: (mm as any).aoMapIntensity,
        //emissiveMap: mm.emissiveMap?.name ?? mm.emissiveMap?.uuid,
        //alphaMap: mm.alphaMap?.name ?? mm.alphaMap?.uuid,        
    };
    console.log(summary);
};//end

/*
        //transparent: m.transparent,
        //opacity: (m as any).opacity,

        //normalScale: mm.normalScale ? { x: mm.normalScale.x, y: mm.normalScale.y } : undefined,
        //metalness: mm.metalness,
        //roughness: mm.roughness,
        //emissive: mm.emissive?.getHexString?.(),
        //envMapIntensity: mm.envMapIntensity,
*/