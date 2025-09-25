//src\universo3d\game\spacegame.ts

import * as THREE from 'three'
import RAPIER from "@dimforge/rapier3d-compat";

import { GameConfig } from '@/app/universo/game/gameconfig';

import { GameScene } from '@/app/universo/game/gamescene';
import { TDimension } from '@/common/types';
import { Player } from '@/app/universo/game/player/player';
import { PlayerShipCfg } from './player/playerconfig';

/*
export const initRapier = async () => {
    // carga del .wasm (asíncrona, pero una sola vez)
    await RAPIER.init();   
    const gravity = { x: 0.0, y: -9.81, z: 0.0 };
    const world = new RAPIER.World(gravity);
    return world;
};
*/

/**
 * class GameAircraft
 *    Universe Space Game      
 */
export class GameAircraft {
 
    public static EXEC_ANIMATION:boolean = false;

    public world: RAPIER.World|null = null;
    public player:Player|null = null;
   
    //config 
    public readonly PITCH_AXIS_VECTOR = new THREE.Vector3(1, 0, 0);
    public readonly ROLL_AXIS_VECTOR = new THREE.Vector3(0, 0, 1);
    public tmpQ = new THREE.Quaternion();

    //scene cameras 
    public cameraPlayer: THREE.PerspectiveCamera | null = null;

    //constructor
    constructor() {};

    public createPlayer = async (canvasDim:TDimension):Promise<boolean> => {
        this.player = new Player();
        const result = await this.player.init();
        if(!result){alert('load player error');
            return false;
        }                
        //chargeCameraPlayer and set view to Z+
        this.chargeCameraPlayer(canvasDim);        
        this.player.glmachine?.rotateY(Math.PI);       
        return true;
    };//end

    public chargeRapierWorld = async (gScene: GameScene) => {
        //this.world = await initRapier();
    }//end

    public chargeCameraPlayer = (canvasDim:TDimension) => {
        const aspect  =canvasDim.width/ canvasDim.height;
        this.cameraPlayer = new THREE.PerspectiveCamera
            (GameConfig.M_CAMERA_FOV,aspect,GameConfig.M_CAMERA_NEAR,GameConfig.M_CAMERA_FAR);
        this.cameraPlayer.position
            .set(0,GameConfig.M_CAMERA_PLINCY,GameConfig.M_CAMERA_PLDIST);   
        this.player!.glmachine?.add(this.cameraPlayer);
    };//end

    /**
     * animate
     */
    public animate = (delta:number) => {
        this.player!.dinamic(delta);        
    };//end  
    
    //......................................................................
    // player ship dinamic actions
    //......................................................................
    public execPlayerRoll = (rollRight: boolean) => {

        //calculate parameters
        const sign      = rollRight ? -1 : 1;
        const old       = this.player!.roll_angle;
        const valueCurr = old + sign * this.player!.roll_velocity;
        const valueMin  = -PlayerShipCfg.ROLL_ANGLE_MAX;
        const valueMax  = PlayerShipCfg.ROLL_ANGLE_MAX;        
        const target    = THREE.MathUtils.clamp(valueCurr,valueMin,valueMax);
        const delta     = target - old;

        //execute roll
        if (Math.abs(delta) < 1e-9) return;
        this.tmpQ.setFromAxisAngle(this.ROLL_AXIS_VECTOR, delta);
        this.player!.glmachine!.quaternion.multiply(this.tmpQ).normalize();
        this.player!.roll_angle = target;

        //update player pivot manually
        this.player!.rotatePivots(PlayerShipCfg.ROLL_AXIS, delta);
        
    };//end

    public execPlayerPitch = (pitchDown: boolean) => {

        //calculate parameters
        const sign      = pitchDown ? -1 : 1;
        const old       = this.player!.pitch_angle;
        const valueCurr = old + sign * this.player!.pitch_velocity;
        const valueMin  = -PlayerShipCfg.PITCH_ANGLE_MAX;
        const valueMax  = PlayerShipCfg.PITCH_ANGLE_MAX;
        const target    = THREE.MathUtils.clamp(valueCurr,valueMin,valueMax);
        const delta     = target - old;

        //execute pitch
        if (Math.abs(delta) < 1e-9) return;
        this.tmpQ.setFromAxisAngle(this.PITCH_AXIS_VECTOR, delta);
        this.player!.glmachine!.quaternion.multiply(this.tmpQ).normalize();
        this.player!.pitch_angle = target;

        //update player pivot manually
        this.player!.rotatePivots(PlayerShipCfg.PITCH_AXIS, delta);
    };//end

    public changePlayerVelocity = (increment:boolean) => {
        this.player!.changeVelocity(increment);
    };//end


    //......................................................................
    // attack actions
    //......................................................................
    public execPlayerFire = () => {
        this.player!.systemAttack.fireBulletsA();
    };//end

}//end
