//src\characters\model\chplayer.ts

import * as THREE from 'three';

import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TDimension3d, TTimePosition, Vector3d } from "@/common/types";
import { Axis3d, Pivot3d } from "@/math3d/pivot/pivot3d";
import { PlayerCfg } from "@/characters/playerconfig";
import { Math3dUtil } from '@/math3d/functions/math3dutil';
import { ShooterAnimation } from '../animations/model/shooter';
import { ThreeGenSpheres } from '@/zone3d/three/functions/genspheres';
import { System3dUtil } from '@/system3d/system3d';


/**
 * class CharacterPlayer.CM_Y
 */
export class CharacterPlayer {

    public static CM_Y: number = 1.10028;

    public bodyPivot: Pivot3d;
    //public bodyGlPivot:ThreePivot3d;
    public bodyGlObject: THREE.Group|null = null;
    public bodyBoundsRadius:number = 0;


    //public gunPivot: Pivot3d;
    //public gunGlPivot:ThreePivot3d;
    //public gunGlObject: THREE.Object3D|null = null;

    constructor() {        
        this.bodyPivot = new Pivot3d();    
        this.bodyPivot.moveInAxis(1,Axis3d.DIR_POSITIVE,CharacterPlayer.CM_Y);
        //this.bodyGlPivot = new ThreePivot3d(this.bodyPivot);
        
        //this.gunPivot = new Pivot3d();
        //this.gunPivot.move(PlayerCfg.GUN_INIT_COORDS);
        //this.gunGlPivot = new ThreePivot3d(this.gunPivot);
    }//end

    public initPlayer(scene: THREE.Scene) {
        //this.glGun = await GlbUtil.loadGLB_object(PlayerCfg.SRC_BLASTER);
        //scene.add(this.bodyGlPivot.axisLines[0]);
        //scene.add(this.bodyGlPivot.axisLines[1]);
        //scene.add(this.bodyGlPivot.axisLines[2]);        
        //scene.add(this.gunGlPivot.axisLines[0]);
        //scene.add(this.gunGlPivot.axisLines[1]);
        //scene.add(this.gunGlPivot.axisLines[2]);        
    }//end

    public async initAnimation(scene:THREE.Scene,terrainHeight:number) {
        this.bodyPivot.moveInAxis(1,Axis3d.DIR_POSITIVE,terrainHeight);

        const anmShotter:ShooterAnimation = new ShooterAnimation(PlayerCfg.SRC_AN_WALKSTART);
        const result = await anmShotter.loadAnimation();
        this.bodyBoundsRadius = anmShotter.radius;

        this.bodyGlObject = new THREE.Group();
        this.bodyGlObject.add(anmShotter.listObj[0]);
        this.bodyGlObject.position.y += terrainHeight;
        //this.bodyGlObject.position.set(0,terrainHeight,0);         
        scene.add(this.bodyGlObject);        
    }//end 

  
    public moveToFloorY(scene: THREE.Scene,disp: number) {
        this.bodyPivot.moveInAxis(1,Axis3d.DIR_POSITIVE,disp);
        //this.bodyGlPivot = new ThreePivot3d(this.bodyPivot);
    }//end

    public updateBounds(scene: THREE.Scene) {
        let bodyBoundsCenter:Vector3d = System3dUtil.getAsVector(this.bodyPivot.position);
        
        const cfPoints:Vector3d[]= Math3dUtil.getCfPoints(bodyBoundsCenter,this.bodyBoundsRadius,16); 
        for(let ptIdx=0;ptIdx<cfPoints.length;ptIdx++) {
            const sp:THREE.Mesh= ThreeGenSpheres.generateSphere(cfPoints[ptIdx],0.05,16,0xff0000);
            scene.add(sp);
        }
    }//end
    

}//end