//src\universo3d\game\spacegame.ts

import * as THREE from 'three'
import RAPIER from "@dimforge/rapier3d-compat";

import { GameConfig } from '@/app/universo/game/gameconfig';

import { GameScene } from '@/app/universo/game/gamescene';
import { TDimension } from '@/common/types';
import { GamePlayer, PlShipCfg } from '@/app/universo/game/player/gameplayer';

export const initRapier = async () => {
    // carga del .wasm (asíncrona, pero una sola vez)
    await RAPIER.init();   
    const gravity = { x: 0.0, y: -9.81, z: 0.0 };
    const world = new RAPIER.World(gravity);
    return world;
};

/**
 * SkyBoxGenerator
    public playerPivot: GamePlayerPivot | null = null;
 * class Universe Space Game
 */
export class SpaceGame {

    public world: RAPIER.World|null = null;
    public player:GamePlayer|null = null;
   
    //config 
    public readonly PITCH_AXIS_VECTOR = new THREE.Vector3(1, 0, 0);
    public readonly ROLL_AXIS_VECTOR = new THREE.Vector3(0, 0, 1);
    public tmpQ = new THREE.Quaternion();

    //scene cameras 
    public cameraPlayer: THREE.PerspectiveCamera | null = null;

    //constructor
    constructor() {};

    public init = async (canvasDim:TDimension):Promise<boolean> => {
        this.player = new GamePlayer();
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
        this.world = await initRapier();
    }//end

    public chargeCameraPlayer = (canvasDim:TDimension) => {
        const aspect  =canvasDim.width/ canvasDim.height;
        this.cameraPlayer = new THREE.PerspectiveCamera
            (GameConfig.PLCAM_FOV,aspect,GameConfig.PLCAM_NEAR,GameConfig.PLCAM_FAR);
        this.cameraPlayer.position
            .set(0,GameConfig.PLCAM_INCY,GameConfig.PLCAM_DIST);   
        this.player!.glmachine?.add(this.cameraPlayer);
    };//end

    /**
     * animate
     */
    public animate = (delta:number) => {
        this.player!.dinamic(delta);        
    };//end  
    
    //......................................................................
    //player actions
    //......................................................................
    public execPlayerRoll = (rollRight: boolean) => {
        //calculate roll values
        const sign      = rollRight ? -1 : 1;
        const old       = this.player!.roll_angle;
        const valueCurr = old + sign * this.player!.roll_velocity;
        const valueMin  = -PlShipCfg.ROLL_ANGLE_MAX;
        const valueMax  = PlShipCfg.ROLL_ANGLE_MAX;        
        const target    = THREE.MathUtils.clamp(valueCurr,valueMin,valueMax);
        const delta     = target - old;

        if (Math.abs(delta) < 1e-9) return;

        //execute roll
        this.tmpQ.setFromAxisAngle(this.ROLL_AXIS_VECTOR, delta);
        this.player!.glmachine!.quaternion.multiply(this.tmpQ).normalize();
        this.player!.roll_angle = target;

        //update player pivot manually
        this.player!.pivotRotate(PlShipCfg.ROLL_AXIS, delta);
    };//end

    public execPlayerPitch = (pitchDown: boolean) => {

        //calculate pitch values
        const sign      = pitchDown ? -1 : 1;
        const old       = this.player!.pitch_angle;
        const valueCurr = old + sign * this.player!.pitch_velocity;
        const valueMin  = -PlShipCfg.PITCH_ANGLE_MAX;
        const valueMax  = PlShipCfg.PITCH_ANGLE_MAX;
        const target    = THREE.MathUtils.clamp(valueCurr,valueMin,valueMax);
        const delta     = target - old;

        if (Math.abs(delta) < 1e-9) return;

        //execute pitch
        this.tmpQ.setFromAxisAngle(this.PITCH_AXIS_VECTOR, delta);
        this.player!.glmachine!.quaternion.multiply(this.tmpQ).normalize();
        this.player!.pitch_angle = target;

        //update player pivot manually
        this.player!.pivotRotate(PlShipCfg.PITCH_AXIS, delta);
    };//end

    public changePlayerVelocity = (increment:boolean) => {
        this.player!.changeVelocity(increment);
    };//end

    public execPlayerFire = () => {
        this.player!.army.fireBulletsA();
    };//end
    //......................................................................
  
}//end
