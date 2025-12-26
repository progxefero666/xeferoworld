//src\app\characters\scene\charactscene.ts

import { CharacterSystem } from '@/characters/charactersystem';
import { Point2d } from '@/common/types';
import { CircunfUtil } from '@/math2d/functions/circunfutil';
import { XMath2dUtil } from '@/math2d/functions/xmath2dutil';
import { System3d } from '@/system3d/system3d';
import { GlbUtil } from '@/zone3d/three/loaders/glbutil';
import { ThreeFbxUtil } from '@/zone3d/three/loaders/threefbxutil';
import { ThreeUtil } from '@/zone3d/three/util/threeutil';
import * as THREE from 'three';



/**
 * class Characters Scene
 */
export class MainScene {

    public scene: THREE.Scene;
    public camera: THREE.PerspectiveCamera | null = null;
    public cameraRotY: number = 0;
    public cameraDist: number = 5;
    public cameraElev: number = 1.0;

    public terrain:THREE.Object3D|null=null;
    public cell_one:THREE.Object3D|null=null;

    constructor(onSceneCharged:() => void) {
        this.loadCamera();
        this.scene = new THREE.Scene();
        this.scene.add(new THREE.GridHelper(200,200));
        this.loadLights();
        this.loadInitObjects(onSceneCharged);
    };//end
   
    public  loadInitObjects = async (onSceneCharged:() => void) => {
        //this.terrain = await GlbUtil.loadGLB_object(CharacterSystem.SRC_TERRAIN);
        //this.scene.add(this.terrain); 

        this.cell_one = await GlbUtil.loadGLB_object(CharacterSystem.SRC_CELL_MOD_A);
        this.scene.add(this.cell_one);         

        console.log('terrain loaded');
        onSceneCharged();
    };


    public loadCamera = () => {  
        this.camera = new THREE.PerspectiveCamera(50,1.0, 0.1, 1000);
        const coord2d:Point2d=CircunfUtil
            .getCfCoords(System3d.CC,this.cameraDist,this.cameraRotY);                    
        this.camera.position.set(coord2d.x,this.cameraElev,coord2d.y);
        this.camera.lookAt(0,this.cameraElev,0); 
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
        const ambientLight = new THREE.AmbientLight('#ffffff', 1.0);                
        const directionalLight = new THREE.DirectionalLight('#ffffff', 1.2);
        directionalLight.position.set(10, 10, 10);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;
        this.scene.add(ambientLight);  
        this.scene.add(directionalLight);                      
    };//end

    public testRayTrace = (point:number[]):number => { 
        const origin: THREE.Vector3 = ThreeUtil.toThreeVector(point);
        let direction = new THREE.Vector3(0,-1,0);
		let raycaster = new THREE.Raycaster();
		raycaster.set(origin,direction);  
		let intersects = raycaster.intersectObjects([this.terrain!]);
		let coordY = 0;       
		if(intersects.length>0){
			coordY= intersects[0].point.y;			
		}	
		else {alert('instersect failed');}   
        return coordY;            
    }//end

     /*
    public setLayer(layerId) {
        for (let i = 0; i < this.dtos.length; i++) {
            this.dtos[i].layers.set(layerId);
        }//end for		
    }//end function
        
	getFloorHeightAtPosition3d(THREE,point3d){

		let origin	= new THREE.Vector3(point3d[0],point3d[1]+1,point3d[2]);
		let direction = new THREE.Vector3(0,-1,0);	
		let raycaster = new THREE.Raycaster();
		raycaster.set(origin,direction);				
		let intersects = raycaster.intersectObjects(this.floorDtos);
		let heightResult = 0;
		if(intersects.length>0){
			heightResult= intersects[0].point.y;	
			//console.log('instersect ok');			
		}	
		else {
			//console.log('instersect failed');
		}	
		return heightResult;						
	}//end function
	    
    */

};//end