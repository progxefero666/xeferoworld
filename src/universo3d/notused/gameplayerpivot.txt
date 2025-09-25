//src\universo3d\game\player\gameplayer.ts

import * as THREE from 'three';

import {  Vector3d } from "@/common/types";
import { ThreeModel3d, TState3d } from '@/zone3d/three/threetypes'
import { GlObject } from "@/zone3d/three/objects/gldinobject";

import { GlbUtil } from '@/zone3d/three/loaders/glbutil';
import { Pivot3d } from '@/math3d/pivot/pivot3d';
import { XMath2dUtil } from '@/math2d/functions/xmath2dutil';
import { PlShipCfg } from '../game/player/gameplayer';


/**
 * class GamePlayer
 */
export class GamePlayerPivot {

    public pivot:Pivot3d;


    public model3d:ThreeModel3d|null = null;
    public glmachine:GlObject|null   = null;

    public ln_velocity:number =  0.01;

    public roll_velocity:number = PlShipCfg.ROLL_VEL_UNIT;   
    public pitch_velocity:number = PlShipCfg.PITCH_VEL_UNIT;      

    public frameIndex:number=0;
    
    //constructor
    constructor() {
        this.pivot = new Pivot3d();
       
     }//end

    public async init(position: Vector3d): Promise<void> {
        this.model3d = await GlbUtil.getGlbUniqueModel(PlShipCfg.SOURCE_URL);
        this.glmachine = new GlObject(
            this.pivot,
            this.model3d!);
    };//end
    
    public glmachine_obj3d():THREE.Object3D  { 
        return this.glmachine!.object3d!;
    };//end
    
    public changeVelocity = (increment:boolean) => {        
        if(increment){
            const newVel = this.ln_velocity + PlShipCfg.LN_VEL_INC;
            if(newVel >=  PlShipCfg.LN_VEL_MAX){return;}
            this.ln_velocity = newVel;
        }
        else {
            const newVel = this.ln_velocity - PlShipCfg.LN_VEL_INC;
            if(newVel <=  PlShipCfg.LN_VEL_MIN){return;}
            this.ln_velocity = newVel;
        }
    };//end

    public execRoll = (dirCCW:boolean) => {
        let rollAngle = this.roll_velocity;
        if(!dirCCW) {rollAngle *= (-1);}
                
        this.glmachine!.roll(rollAngle); 
        this.pivot.rotate(2,rollAngle);
        const degrees = XMath2dUtil.toDegrees(this.pivot.rotation[0]);
        console.log(degrees);        
    };//end
    
    public execElevation = (dirCCW:boolean) => {
        let pitchAngle = this.pitch_velocity;
        if(!dirCCW) {pitchAngle *= (-1);}
        this.glmachine!.pitch(pitchAngle); 
        this.pivot.rotate(2,pitchAngle);
    };//end

    /**
     * animate
     */    
    public animate = ():number[] => {
        let newPos:number[] = this.getNewPosition();                
        this.glmachine!.object3d!.position.set(newPos[0],newPos[1],newPos[2]);
        this.pivot.move(newPos);
        return newPos;
    };//end

    public getNewPosition = ():number[] => {
        let newPos:number[] 
            = this.pivot.getDirecctionVertex(2,this.ln_velocity);
        return newPos;
    };//end


};//end