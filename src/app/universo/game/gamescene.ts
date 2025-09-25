//src\app\universo\game\scene\universoscene.ts


import { TerrainControl } from '@/terrains/xterrains/terraincontrol';
import { XTerrMaterial } from '@/terrains/xterrains/xterrains';
import { GameConfig } from '@/app/universo/game/gameconfig';
import { GeoFunction } from '@/zone3d/three/functions/geofunction';
import { GlbUtil } from '@/zone3d/three/loaders/glbutil';
import { GenColorMaterial } from '@/zone3d/three/materials/genmatcolor';
import * as THREE from 'three';

import {SkyBoxGenerator} from '@/system3d/util/genskybox';
import { TDimension3d } from '@/common/types';

/**
 * class GameScene
 */
export class GameScene {

    public scene: THREE.Scene;
    public terrain:THREE.Object3D|null=null;
    public plane: THREE.Mesh|null = null;
    public modeGrid:boolean = true;

    public skyboxInit:THREE.Mesh|null=null;

    
    //,onSceneCharged:() => void
    constructor(showGrid:boolean) {
        this.scene = new THREE.Scene();
        if(showGrid){this.scene.add(new THREE.GridHelper(1000,1000));}
        this.loadLights();
        this.loadInitObjects();
    }//end

    public loadLights = () => {   
        const ambientLight = new THREE.AmbientLight('#ffffff', 1.0);                
        this.scene.add(ambientLight);  

        const pointLightA = new THREE.PointLight( 0xff0000, 1, 100 );
        pointLightA.position.set( 50, 50, 50 );
        this.scene.add( pointLightA );

        //const directionalLight = new THREE.DirectionalLight('#ffffff', 1.2);
        //directionalLight.position.set(10, 10, 10);
        //directionalLight.castShadow = true;
        //directionalLight.shadow.mapSize.width = 1024;
        //directionalLight.shadow.mapSize.height = 1024;        
        //this.scene.add(directionalLight);                      
    };//end

    public  loadInitObjects = async () => {            
        const skyboxFolder = "/spacegame/skybox/skyboxspace_a";
        const skyboxDim:TDimension3d = {width:5000,height:5000,depth:5000};
        this.skyboxInit = await SkyBoxGenerator
            .genSkyBoxBlack(skyboxFolder,'skybox','jpg',skyboxDim,1); 
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

    public loadPlayer(glObject:THREE.Object3D,glTarget:THREE.Sprite){
        this.scene.add(glObject);
        this.scene.add(glTarget);
    };//end

}//end