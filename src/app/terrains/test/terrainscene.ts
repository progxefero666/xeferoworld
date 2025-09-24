//src\app\zone3d\terrains3d\terrainscene.ts

import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
//import { loadFBX } from 'src/zone3d/loaders/threefbxloader';


/**
 * class TerrainScene
 */
export class TerrainScene {

    public aspect: number;
    public scene: THREE.Scene;
    public camera: THREE.PerspectiveCamera | null = null;
    public orbitControls: OrbitControls | null = null;

    constructor(renderer: THREE.WebGLRenderer,aspect: number) {
        this.aspect = aspect;
        this.loadCamera();
        this.scene = new THREE.Scene();
        this.loadControls(renderer);
        this.loadLights();
    };//end

    public loadCamera = () => {  
        this.camera = new THREE.PerspectiveCamera(50,this.aspect, 0.1, 1000);
        this.camera.position.z = 50.0;
        this.camera.position.y = 5;        
    };//end

    public loadControls = (renderer: THREE.WebGLRenderer) => {  
        this.orbitControls= new OrbitControls(this.camera!, renderer!.domElement);
        this.orbitControls.enableDamping = true;
        this.orbitControls.dampingFactor = 0.25;
    };//end

    public loadLights = () => {   
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);              
        const dirLightA = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLightA.position.set(-25, 10,- 20);
        dirLightA.castShadow = true;
        this.scene.add(ambientLight);  
        this.scene.add(dirLightA); 
    };//end

    public loadTestObject = () => {
        const geometry = new THREE.SphereGeometry( 15, 32, 32 ); 
        const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } ); 
        const sphere = new THREE.Mesh( geometry, material ); 
        sphere.position.set(0, 10, 0);
        sphere.scale.set(1.0, 0.5, 0.5);
        this.scene.add(sphere);
    };//end

    public onResize = (aspect:number,renderer: THREE.WebGLRenderer) => {
        this.aspect = aspect;
        this.camera!.aspect = this.aspect;
        this.camera!.updateProjectionMatrix();
        this.orbitControls= new OrbitControls(this.camera!, renderer.domElement);    
    };//end

};//end class