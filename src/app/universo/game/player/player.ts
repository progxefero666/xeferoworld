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
import { PlayerArmy } from './playerarmy';
import { Math3dUtil } from '@/math3d/functions/math3dutil';
import { GenSpriteMaterials } from '@/zone3d/three/materials/genmatsprite';
import { PlayerConfig } from '@/app/universo/game/player/playerconfig';



/**
 * class GamePlayer
 */
export class Player {

    public direction: MVector3d;
    public pivot: Pivot3d;    
    public pivotLines: THREE.Line[]|null = null;
    public army:PlayerArmy;

    //15 × 3.6 = 54 km/h
    public ln_velocity: number;
    public roll_velocity: number = PlayerConfig.ROLL_VEL_UNIT;
    public pitch_velocity: number = PlayerConfig.PITCH_VEL_UNIT;

    public roll_angle: number = 0.0;
    public pitch_angle: number = 0.0;

    // parameters
    public readonly axisLocalZ = new THREE.Vector3(0, 0, 1);
    public readonly forwardLocal = new THREE.Vector3(0, 0, -1);
    public readonly forwardWorld = new THREE.Vector3();    
    public readonly upWorld = new THREE.Vector3(0, 1, 0);

    // var for calcs
    public tmpQ = new THREE.Quaternion();

    // gl objects
    public glmachine: THREE.Object3D|null = null;    
    public glCrosshair: THREE.Sprite|null = null;
    public glEngines:THREE.Mesh[] = [];
    public glCannonsObjs:THREE.Mesh[] = [];
    public glCannonsTarget:THREE.Mesh|null = null;
    
    //constructor
    constructor() {
        this.pivot = new Pivot3d();
        this.direction = new MVector3d([0, 0, 1]);
        this.ln_velocity = 0;
        this.army = new PlayerArmy(this);
    }//end

    //load gl scene objects
    public async init(): Promise<boolean> {
        this.ln_velocity = FlySystemUtil.msToTick(GameConfig.INIT_LVELOCITY); 
        this.glmachine = await GlbUtil.loadGLB_object(PlayerConfig.SOURCE_URL);
        await this.loadCrosshair();        
        this.initGuns();
     
        //this.glmachine.add(new THREE.AxesHelper(2)); 
        //this.initGlPivot();
        //this.initEngines();        
        return true;
    };//end

    public initGlPivot = () => {
        this.pivotLines = Sys3dThreeUtil.getPivotAxLines(this.pivot,10);
        for(let idx:number=0;idx<this.pivotLines.length;idx++){
            this.glmachine!.add(this.pivotLines[idx]); 
        }
    };//end 

    public loadCrosshair = async () => {    
    
        const material:THREE.SpriteMaterial = await GenSpriteMaterials
                .getMaterial(PlayerConfig.CROSSHAIR_MAP_PATH,false,'#FFFFFF',1.0);
        this.glCrosshair = new THREE.Sprite(material);
        
        const scale = PlayerConfig.GL_CRHAIR_SCALE;
        this.glCrosshair.scale.set(scale,scale,scale);
        this.glCrosshair.position.set(
            PlayerConfig.CROSSHAIR_POSITION[0],
            PlayerConfig.CROSSHAIR_POSITION[1],
            PlayerConfig.CROSSHAIR_POSITION[2]);   

        this.glmachine!.add(this.glCrosshair);    
        
        this.glCannonsTarget = PlayerConfig.getGlTarget();
        this.glmachine!.add(this.glCannonsTarget);    
    };//end 

    public initGuns = () => {
        this.glCannonsObjs = PlayerConfig.getGlCannons();
        for(let idx:number=0;idx<this.glCannonsObjs.length;idx++){
            this.glmachine!.add(this.glCannonsObjs[idx]); 
        }      
    };//end

    public initEngines = () => {
        this.glEngines = PlayerConfig.getGlEngines();
        for(let idx:number=0;idx<this.glEngines.length;idx++){
            this.glmachine!.add(this.glEngines[idx]); 
        }        
    };//end

    public getCurrVelocityKmH = ():number => {
        const physicMaxVelkmH:number= FlySystemUtil.tickToKmH(this.ln_velocity);
        return Math.floor(physicMaxVelkmH);
    };//end

    // actions
    //...............................................................................
    public pivotRotate = (axis: number, angle: number) => {
        this.pivot.rotate(axis, angle);
    };//end

    public changeVelocity = (increment: boolean) => {
        const dv = FlySystemUtil.accToTickDelta(PlayerConfig.PHY_ACELERATION_MAX);
        if (increment) {
            this.ln_velocity = Math.min(this.ln_velocity + dv, PlayerConfig.LN_VEL_MAX);
        } else {
            this.ln_velocity = Math.max(this.ln_velocity - dv, PlayerConfig.LN_VEL_MIN);
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

        this.pivot.rotateAroundWorldY(dPsi);
    }//end

    // loop animate
    public dinamic = (delta:number): number[] => {

        //calculate new position
        this.applyBankedYaw();
        this.forwardWorld.copy(this.forwardLocal)
            .applyQuaternion(this.glmachine!.quaternion).normalize(); 
        this.direction = new MVector3d
            ([this.forwardWorld.x,this.forwardWorld.y,this.forwardWorld.z]);
        const newPos: number[] = this.getNewPosition();
        this.updateCrosshairPosition();

        //check collisions
        //this.army.dinamic(delta);

        //update positions
        this.pivot.move(newPos);
        this.glmachine!.position.set
            (this.pivot.position[0],this.pivot.position[1],this.pivot.position[2]);
        return newPos;
    };//end

    public updateCrosshairPosition() {
        this.forwardWorld.copy(this.forwardLocal)
            .applyQuaternion(this.glmachine!.quaternion).normalize(); 
        this.direction = new MVector3d
            ([this.forwardWorld.x,this.forwardWorld.y,this.forwardWorld.z]);        
        const crossHairPos = this.getDirectionPoint(PlayerConfig.ATT_DIST_TO_CONVERG);
        this.glCrosshair!.position.set(crossHairPos[0],crossHairPos[1],crossHairPos[2]);
    }//end

    public getNewPosition = (): number[] => {
        const [px, py, pz] = this.pivot.position;
        return [
            px + this.direction.elements[0] * this.ln_velocity,
            py + this.direction.elements[1] * this.ln_velocity,
            pz + this.direction.elements[2] * this.ln_velocity,
        ];
    };//end   
    
    public getHeadingXZ(): number {
        // Forward in world; 0 = +Z, positive to +X
        this.forwardWorld.copy(this.forwardLocal).applyQuaternion(this.glmachine!.quaternion);
        const x = this.forwardWorld.x;
        const z = this.forwardWorld.z;
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

    public getDirectionPoint = (distance: number): number[] => {
        const [px, py, pz] = this.pivot.position;
        return [px + this.direction.elements[0] * distance,
                py + this.direction.elements[1] * distance,
                pz + this.direction.elements[2] * distance
        ];
    };//end

    public getCannonsPosition = (): Vector3d[] => {
        const positions: Vector3d[] = [];
        for(let idx=0;idx<this.glCannonsObjs.length;idx++){            
            const localPos = this.glCannonsObjs[idx].position.clone();
            const worldPos = this.glmachine!.localToWorld(localPos);
            positions.push(ThreeUtil.getVector3d(worldPos));
        }
        return positions;
    };//end 

    public getCrosshairPosition = (): Vector3d => {
        const localPos = this.glCrosshair!.position.clone();
        const worldPos = this.glmachine!.localToWorld(localPos);
        return ThreeUtil.getVector3d(worldPos);
    };
    
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

    public applyRollAutolevel(): void {
        const k = GameConfig.ROLL_AUTOLEVEL_PER_TICK;
        if (k <= 0) return;
        const a = this.roll_angle;
        if (Math.abs(a) < 1e-9) return;
        const delta = Math.abs(a) <= k ? -a : -Math.sign(a) * k;

        this.tmpQ.setFromAxisAngle(this.axisLocalZ, delta); // local Z
        this.glmachine!.quaternion.multiply(this.tmpQ).normalize();
        this.roll_angle += delta;
        this.pivot.rotate(PlayerConfig.ROLL_AXIS, delta);
    }//end    

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