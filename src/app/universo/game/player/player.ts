//src\universo3d\game\player\gameplayer.ts

import * as THREE from 'three';

import { GlbUtil } from '@/zone3d/three/loaders/glbutil';
import { MVector3d } from '@/math3d/pivot/mathpivot3d';
import { Pivot3d } from '@/math3d/pivot/pivot3d';
import { Plane3dPoint,Vector3d } from "@/common/types";
import { FlySystemUtil } from '@/system3d/flysystem/flysystemutil';
import { GameConfig } from '@/app/universo/game/gameconfig';
import { Sys3dThreeUtil } from '@/system3d/util/sys3dthreeutil';
import { ThreeUtil } from '@/zone3d/three/util/threeutil';
import { PlayerSystemAttack } from './playersysattack';
import { Math3dUtil } from '@/math3d/functions/math3dutil';
import { GenSpriteMaterials } from '@/zone3d/three/materials/genmatsprite';
import { PlayerArmyCfg, PlayerEngineCfg, PlayerShipCfg } from '@/app/universo/game/player/playerconfig';
import { System3d } from '@/system3d/system3d';
import { GameCamCfg } from '../gcamerascfg';


/**
 * class GamePlayer
 */
export class Player {

    public readonly upWorld = new THREE.Vector3(0, 1, 0);

    public shipPivot: Pivot3d;
    public shipDirection: MVector3d;  
    
    public targetPivot: Pivot3d; 
    public targetDirection: MVector3d;
    
    public systemAttack:PlayerSystemAttack;

    //15 × 3.6 = 54 km/h
    public ln_velocity: number = 0.0;
    public roll_velocity: number = PlayerShipCfg.ROLL_VEL_UNIT;
    public pitch_velocity: number = PlayerShipCfg.PITCH_VEL_UNIT;

    public roll_angle: number = 0.0;
    public pitch_angle: number = 0.0;

    //use in applyRollAutolevel
    //public readonly axisLocalZ = new THREE.Vector3(0, 0, 1);

    //ship direction parameters
    public readonly shipLocalForward = new THREE.Vector3(0, 0, -1);
    public readonly shipWorldforward = new THREE.Vector3();    

    //att crosshair direction parameters 
    public readonly targetLocalForward = new THREE.Vector3(0, 0, -1);
    public readonly targetWorldforward = new THREE.Vector3();  

    // var for calcs
    public tmpQ = new THREE.Quaternion();

    // gl objects
    public glmachine: THREE.Object3D|null = null;    
    public glCrosshair: THREE.Sprite|null = null;
    public glEngines:THREE.Mesh[] = [];
    public glCannonsObjs:THREE.Mesh[] = [];
    public glCannonsTarget:THREE.Mesh|null = null;
    
    public pivotLines: THREE.Line[]|null = null;

    //constructor
    constructor() {

        this.shipPivot = new Pivot3d();
        this.shipDirection = new MVector3d([0, 0, 1]);

        this.targetPivot = new Pivot3d();
        this.targetPivot.moveInAxis(System3d.AXIS_Y,1,GameCamCfg.MCAM_ELVINC);
        this.targetDirection = new MVector3d([0,GameCamCfg.MCAM_ELVINC,1]);
        
        this.systemAttack = new PlayerSystemAttack(this);
    }//end

    public async init(): Promise<boolean> {
        this.ln_velocity = FlySystemUtil.msToTick(GameConfig.INIT_LVELOCITY); 
        this.glmachine = await GlbUtil.loadGLB_object(PlayerShipCfg.SOURCE_URL);
        await this.loadCrosshair();        
        this.initGuns();
        //this.glmachine.add(new THREE.AxesHelper(2)); 
        //this.initGlPivot();
        //this.initEngines();        
        return true;
    };//end

    public initGuns = () => {
        this.glCannonsObjs = PlayerArmyCfg.getGlCannons();
        for(let idx:number=0;idx<this.glCannonsObjs.length;idx++){
            this.glmachine!.add(this.glCannonsObjs[idx]); 
        }      
    };//end

    public loadCrosshair = async () => {        
        //crosshair object
        this.glCrosshair = await PlayerShipCfg.getGlCrosshair();
        this.glCrosshair.position.set(
            PlayerShipCfg.CRH_POSITION[0],
            PlayerShipCfg.CRH_POSITION[1],
            PlayerShipCfg.CRH_POSITION[2]);
        this.glmachine!.add(this.glCrosshair);

        //crosshair hidden sphere ref object
        this.glCannonsTarget = PlayerArmyCfg.getGlTarget();            
        this.glCannonsTarget.position.set(
            PlayerShipCfg.CRH_POSITION[0],
            PlayerShipCfg.CRH_POSITION[1],
            PlayerShipCfg.CRH_POSITION[2]);
        this.glmachine!.add(this.glCannonsTarget);
    };//end 

    public initEngines = () => {
        this.glEngines = PlayerEngineCfg.getGlEngines();
        for(let idx:number=0;idx<this.glEngines.length;idx++){
            this.glmachine!.add(this.glEngines[idx]); 
        }        
    };//end

    public initGlPivot = () => {
        this.pivotLines = Sys3dThreeUtil.getPivotAxLines(this.shipPivot,10);
        for(let idx:number=0;idx<this.pivotLines.length;idx++){
            this.glmachine!.add(this.pivotLines[idx]); 
        }
    };//end 

    public getCrosshairPosition = (): Vector3d => {
        const localPos = this.glCrosshair!.position.clone();
        const worldPos = this.glmachine!.localToWorld(localPos);
        return ThreeUtil.getVector3d(worldPos);
    };

    public getCurrVelocityKmH = ():number => {
        const physicMaxVelkmH:number= FlySystemUtil.tickToKmH(this.ln_velocity);
        return Math.floor(physicMaxVelkmH);
    };//end

    // actions
    //...............................................................................


    public changeVelocity = (increment: boolean) => {
        const dv = FlySystemUtil.accToTickDelta(PlayerShipCfg.PHY_ACELERATION_MAX);
        if (increment) {
            this.ln_velocity = Math.min(this.ln_velocity + dv, PlayerShipCfg.LN_VEL_MAX);
        } else {
            this.ln_velocity = Math.max(this.ln_velocity - dv, PlayerShipCfg.LN_VEL_MIN);
        }
    };
    
    public getSpeedMs(): number {
        return FlySystemUtil.tickToMs(this.ln_velocity);
    };//end

    public applyBankedYaw(): void {
        const v = this.getSpeedMs();
        const vHoriz = v * Math.cos(this.pitch_angle);
        if (vHoriz <= 1e-9) return;
        const yawRate = FlySystemUtil.computeYawRate(vHoriz, this.roll_angle);
        if (yawRate === 0) return;

        const dPsi = yawRate * GameConfig.DT_SEC;
        this.tmpQ.setFromAxisAngle(this.upWorld, dPsi);
        this.glmachine!.quaternion.premultiply(this.tmpQ).normalize();

        //update pivots
        this.shipPivot.rotateAroundWorldY(dPsi);
        this.targetPivot.rotateAroundWorldY(dPsi);
    }//end
    
    public rotatePivots = (axis:number,angle:number) => {
        this.shipPivot.rotate(axis,angle);
        this.targetPivot.rotate(axis,angle);
    };//end

    // loop animate
    //this.army.dinamic(delta);
    public dinamic = (delta:number): number[] => {

        this.applyBankedYaw();

        //calculate new ship position and direction        
        this.shipWorldforward.copy(this.shipLocalForward)
            .applyQuaternion(this.glmachine!.quaternion).normalize(); 
        this.shipDirection = new MVector3d
            ([this.shipWorldforward.x,this.shipWorldforward.y,this.shipWorldforward.z]);
        const shipPosition:number[] = this.getNewShipPivotPosition();

        //calculate new target position and direction
        this.targetWorldforward.copy(this.targetLocalForward)
            .applyQuaternion(this.glmachine!.quaternion).normalize(); 
        this.targetDirection = new MVector3d([
            this.targetWorldforward.x,
            this.targetWorldforward.y,
            this.targetWorldforward.z]);  
        const targetPivotPosition:number[] = this.getNewTargetPivotPosition();

        //update ship
        this.shipPivot.move(shipPosition);
        
        //update target pivot and position   
        this.targetPivot.move(targetPivotPosition);
        const targetPos:number[] = this.getNewTargetPosition();

        //update player all gl objects
        this.glmachine!.position.set(
            this.shipPivot.position[0],
            this.shipPivot.position[1],
            this.shipPivot.position[2]);
        this.glCrosshair!.position.set(targetPos[0],targetPos[1],targetPos[2]);
        this.glCannonsTarget!.position.set(targetPos[0],targetPos[1],targetPos[2]);

        return shipPosition;
    };//end
        
    public getNewShipPivotPosition = (): number[] => {
        const [px, py, pz] = this.shipPivot.position;
        return [px + this.shipDirection.elements[0] * this.ln_velocity,
                py + this.shipDirection.elements[1] * this.ln_velocity,
                pz + this.shipDirection.elements[2] * this.ln_velocity];
    };//end   

    public getNewTargetPivotPosition = (): number[] => {
        const [px, py, pz] = this.targetPivot.position;
        return [px + this.targetDirection.elements[0] * this.ln_velocity,
                py + this.targetDirection.elements[1] * this.ln_velocity,
                pz + this.targetDirection.elements[2] * this.ln_velocity];
    };//end  

    public getNewTargetPosition = (): number[] => {
        const targetDistance = PlayerArmyCfg.ATT_DIST_TO_CONVERG; 
        const [px, py, pz] = this.targetPivot.position;
        return [px + this.targetDirection.elements[0] * targetDistance,
                py + this.targetDirection.elements[1] * targetDistance,
                pz + this.targetDirection.elements[2] * targetDistance];
    };//end  

    //public updateCrosshairPosition() {}//end

    public getHeadingXZ(): number {
        // Forward in world; 0 = +Z, positive to +X
        this.shipWorldforward.copy(this.shipLocalForward).applyQuaternion(this.glmachine!.quaternion);
        const x = this.shipWorldforward.x;
        const z = this.shipWorldforward.z;
        if (Math.abs(x) < 1e-9 && Math.abs(z) < 1e-9) return 0;
        return Math.atan2(x, z);
    };//end

    public getTurnCenterXZ(): Plane3dPoint | null {
        const radius:number = FlySystemUtil
            .computeTurnRadius(this.getSpeedMs(), this.roll_angle);
        if (!isFinite(radius)) return null;        
        const h = this.getHeadingXZ();
        const cx = this.glmachine!.position.x - radius * Math.sin(h);
        const cz = this.glmachine!.position.z - radius * Math.cos(h);
        return { x: cx, z: cz };
    }//end

    public getYawRate(): number {
        const physicVelocity = this.getSpeedMs();
        const vHoriz = physicVelocity * Math.cos(this.pitch_angle);
        return FlySystemUtil.computeYawRate(vHoriz, this.roll_angle); 
    }//end

    public getCannonsPosition = (): Vector3d[] => {
        const positions: Vector3d[] = [];
        for(let idx=0;idx<this.glCannonsObjs.length;idx++){            
            const localPos = this.glCannonsObjs[idx].position.clone();
            const worldPos = this.glmachine!.localToWorld(localPos);
            positions.push(ThreeUtil.getVector3d(worldPos));
        }
        return positions;
    };//end 

    public getCannonsDirections = (cannonsPos:Vector3d[]): MVector3d[] => {
        const targetPos:Vector3d = this.getCrosshairPosition();
        const directions:MVector3d[] = [];
        for(let idx=0;idx<cannonsPos.length;idx++){ 
            const dirElems:number[] 
                = Math3dUtil.getTranslation(cannonsPos[idx],targetPos);
            directions.push(new MVector3d(dirElems));    
        }
        return directions;
    };//end

    /*
    public getShipDirectionPoint = (distance: number): number[] => {
        const [px, py, pz] = this.shipPivot.position;
        return [px + this.shipDirection.elements[0] * distance,
                py + this.shipDirection.elements[1] * distance,
                pz + this.shipDirection.elements[2] * distance
        ];
    };//end

    public applyRollAutolevel(): void {
        const k = GameConfig.ROLL_AUTOLEVEL_PER_TICK;
        if (k <= 0) return;
        const a = this.roll_angle;
        if (Math.abs(a) < 1e-9) return;
        const delta = Math.abs(a) <= k ? -a : -Math.sign(a) * k;

        this.tmpQ.setFromAxisAngle(this.axisLocalZ, delta); // local Z
        this.glmachine!.quaternion.multiply(this.tmpQ).normalize();
        this.roll_angle += delta;
        this.shipPivot.rotate(PlayerConfig.ROLL_AXIS, delta);
    }//end    
    */

};//end


/*
this.crhairPosition = this
    .getDirectionPoint(PlShipCfg.ATT_DIST_TO_CONVERG);
this.crhairPosition[1] = GameConfig.PLCAM_INCY;    

this.glCrosshair!.position.set(
        this.crhairPosition[0],
        this.crhairPosition[1],
        this.crhairPosition[2]);     
*/    