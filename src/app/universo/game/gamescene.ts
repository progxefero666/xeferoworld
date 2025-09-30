//src\app\universo\game\scene\universoscene.ts

import * as THREE from 'three';

import { XTerrMaterial } from '@/terrains/xterrains/xterrains';
import { GameConfig } from '@/app/universo/game/gameconfig';
import { GeoFunction } from '@/zone3d/three/functions/geofunction';
import { GenColorMaterial } from '@/zone3d/three/materials/genmatcolor';
import {SkyBoxGenerator} from '@/system3d/util/genskybox';
import { TDimension } from '@/common/types';
import { XMath2dUtil } from '@/math2d/functions/xmath2dutil';


/**
 * class GameScene
 */
export class GameScene {

    public scene: THREE.Scene;
    public terrain:THREE.Object3D|null=null;
    public plane: THREE.Mesh|null = null;
    public modeGrid:boolean = true;

    public skyboxInit:THREE.Mesh|null=null;
    public terrainBlocks:THREE.Mesh[] = []; 

    constructor(showGrid:boolean) {
        this.scene = new THREE.Scene();
        if(showGrid){this.scene.add(new THREE.GridHelper(1000,1000));}
        this.loadLights();
        this.loadTestObjects();
        //this.loadInitObjects();
    }//end

    public loadLights = () => {   
        const ambientLight = new THREE.AmbientLight('#ffffff', 4.0);                
        this.scene.add(ambientLight);  

        const pointLightA = new THREE.PointLight('#ffffff',20.0,40.0,2.0);
        pointLightA.position.set( 1, 10, 1 );
        this.scene.add( pointLightA );

        //const directionalLight = new THREE.DirectionalLight('#ffffff', 1.2);
        //directionalLight.position.set(10, 10, 10);
        //directionalLight.castShadow = true;
        //directionalLight.shadow.mapSize.width = 1024;
        //directionalLight.shadow.mapSize.height = 1024;        
        //this.scene.add(directionalLight);                      
    };//end

    public  loadTestObjects = async () => { 

        const planeDim: TDimension = {width:500,height:500};
        const countBlocks = 80;

        const material: THREE.MeshStandardMaterial 
            = GenColorMaterial.getStandardMaterial('#9d5100',0.85,0.3);
        this.terrainBlocks =  [];
        for(let idx:number=0;idx<countBlocks;idx++) {
            
            const xPos =XMath2dUtil.getAleatBoolean();
            const zPos =XMath2dUtil.getAleatBoolean();            
            let coordX:number = XMath2dUtil.getAleatNumberInRange(1,planeDim.width);
            let coordZ:number = XMath2dUtil.getAleatNumberInRange(1,planeDim.height);
            if(!xPos){coordX *= -1;}
            if(!zPos){coordZ *= -1;}

            const itemW = XMath2dUtil.getAleatNumberInRange(2,6);
            const itemH = XMath2dUtil.getAleatNumberInRange(2,46);
            const itemD = itemW;            
            const geom = new THREE.BoxGeometry(itemW,itemH,itemD); 
            const item:THREE.Mesh = new THREE.Mesh(geom,material);
            item.position.set(coordX,(itemH/2),coordZ);
            console.log(idx);
            this.terrainBlocks.push(item);
        }
        for(let idx:number=0;idx<this.terrainBlocks.length;idx++) {
            this.scene.add(this.terrainBlocks[idx]);
        }
    };//end 

    public  loadInitObjects = async () => {            
        const skyboxFolder = "/spacegame/skybox/skyboxspace_a";
        this.skyboxInit = await SkyBoxGenerator
            .genSkyBox(skyboxFolder,'skybox','jpg',2500,"#FFFFFF",1); 
        this.scene.add(this.skyboxInit);           
    };//end

    public loadTerrain(glObject:THREE.Object3D,glTarget:THREE.Sprite){
        //this.terrain = await GlbUtil.loadGLB_object(GameConfig.SRC_TERRAIN);
        //this.terrain.position.set(0,-5.0,0);
        //this.scene.add(this.terrain);

        let material: THREE.MeshStandardMaterial| null = null;
        if(this.modeGrid) {
            material = GenColorMaterial.getGridMaterial(GameConfig.TERRAIN_GRID_COLOR,0.9);
        }
        else {
            material = XTerrMaterial.getTerrainBasicMaterial(); 
        }        
        const planeGeometry:THREE.PlaneGeometry = GeoFunction.getThreePlaneGeometry(1000,100);
        this.plane = new THREE.Mesh(planeGeometry,material);
        this.plane.position.set(0,-5.0,0); 
        //this.scene.add(this.plane); 
    }//end 

    public loadPlayer(glObject:THREE.Object3D){        
        this.scene.add(glObject);
    };//end

}//end