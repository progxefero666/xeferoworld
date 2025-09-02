//src\app\universo\game\scene\universoscene.ts

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { PlayerAircraft } from "@/universo3d/spaceship/playeraircraft";
import { System3d } from "@/math3d/system3d";


/**
 * class UniversoScene
 */
export class UniversoSceneOld {

    public aspect: number;
    public scene: THREE.Scene;
    public camera: THREE.PerspectiveCamera | null = null;
    public orbitControls: OrbitControls | null = null;
    public playerAircraft: PlayerAircraft | null = null;

    public objterrain:THREE.Object3D|null = null;
    public objCircuit:THREE.Object3D|null = null;

    constructor(renderer: THREE.WebGLRenderer,aspect: number) {
        this.aspect = aspect;
        this.loadCamera();
        this.scene = new THREE.Scene();
        this.scene.add(new THREE.GridHelper(1000,1000));
        this.loadControls(renderer);
        this.loadLights();
        this.loadInitObjects();
    };//end

    public loadCamera = () => {  
        this.camera = new THREE.PerspectiveCamera(50,this.aspect, 0.1, 1000);
        this.camera.position.set(50.0,6.0,0.0);
        this.camera.lookAt(0,0,0); 
    };//end

    public loadControls = (renderer: THREE.WebGLRenderer) => {  
        this.orbitControls= new OrbitControls(this.camera!, renderer!.domElement);
        this.orbitControls.enableDamping = true;
        this.orbitControls.dampingFactor = 0.25;
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

    public  loadInitObjects = async () => {
        //loadBox(this.scene);
        this.playerAircraft = new PlayerAircraft(System3d.CC);
        await this.playerAircraft.init();
        this.scene.add(this.playerAircraft.glmachine!.object3d!); 
        this.scene.add(this.playerAircraft.glmachine!.pivotLines[0]);
        this.scene.add(this.playerAircraft.glmachine!.pivotLines[1]);
        this.scene.add(this.playerAircraft.glmachine!.pivotLines[2]);               
    };


    public onResize = (aspect:number,renderer: THREE.WebGLRenderer) => {
        this.aspect = aspect;
        this.camera!.aspect = this.aspect;
        this.camera!.updateProjectionMatrix();
        this.orbitControls= new OrbitControls(this.camera!, renderer.domElement);    
    };//end

};//end class