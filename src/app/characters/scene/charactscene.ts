//src\app\universo\game\scene\universoscene.ts

import { CharacterConfig } from '@/characters/charactconfig';
import { GlbLoaderUtil } from '@/zone3d/three/loaders/threeglbutil';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

/**
 * class Characters Scene
 */
export class Characters3dScene {

    public aspect: number;
    public scene: THREE.Scene;
    public camera: THREE.PerspectiveCamera | null = null;
    public orbitControls: OrbitControls | null = null;
    //public objFloor:THREE.Object3D|null = null;

    constructor(renderer: THREE.WebGLRenderer,aspect: number,onSceneCharged:(object3d: THREE.Object3D)=>void) {
        this.aspect = aspect;
        this.loadCamera();
        this.scene = new THREE.Scene();
        this.scene.add(new THREE.GridHelper(1000,1000));
        this.loadLights();
        this.loadInitObjects(onSceneCharged);
    };//end

    public onResize = (aspect:number,renderer: THREE.WebGLRenderer) => {
        this.aspect = aspect;
        this.camera!.aspect = this.aspect;
        this.camera!.updateProjectionMatrix();
        this.orbitControls= new OrbitControls(this.camera!, renderer.domElement);    
    };//end

    public loadCamera = () => {  
        this.camera = new THREE.PerspectiveCamera(50,this.aspect, 0.1, 1000);
        this.camera.position.set(3.0,1.0,0.0);
        this.camera.lookAt(0,1.0,0); 
    };//end




    public loadLights = () => {   
        const ambientLight = new THREE.AmbientLight('#ffffff', 1.0);                
        const directionalLight = new THREE.DirectionalLight('#ffffff', 1.2);
        directionalLight.position.set(10, 10, 10);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;
        this.scene.add(ambientLight);  
        this.scene.add(directionalLight);                      
    };//end

    public  loadInitObjects = async (onSceneCharged:(object3d: THREE.Object3D)=>void) => {
        const object3d: THREE.Object3D =  await GlbLoaderUtil.loadGLB(CharacterConfig.SOURCE_URL);
        const countChilds = object3d.children.length;
        //alert(countChilds);
        //const objMesh = object3d as THREE.Mesh;
        //console.log(JSON.stringify(objMesh));
        onSceneCharged(object3d);
    };

};//end
    

/*       const geometry: THREE.BufferGeometry = objMesh.geometry;
  //this.camera.position.set(3.0,5.0,0.0);  
    public loadControls = (renderer: THREE.WebGLRenderer) => {  
        //this.orbitControls= new OrbitControls(this.camera!, renderer!.domElement);
        //this.orbitControls.enableDamping = true;
        //this.orbitControls.dampingFactor = 0.25;
    };//end
    public loadCamera = (aspect:number) => {  
        this.camera = new THREE.PerspectiveCamera(30,this.aspect, 0.1, 1000);
        this.camera.aspect = aspect;
        this.camera.updateProjectionMatrix();
        this.camera.position.x = 5;
        this.camera.position.y = 2.0;      
        this.camera.lookAt(0.0,2.0,0); 
        //this.camera.updateProjectionMatrix();
    };//end
*/
//this.scene!.add(object3d);
//const obj_box = await ThreeFbxUtil.loadFbx('/models3d/box.fbx');
//this.scene.add(obj_box);
