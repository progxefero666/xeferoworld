//src\universo3d\game\player\gameplayer.ts

import * as THREE from 'three';

import { GlbUtil } from '@/zone3d/three/loaders/glbutil';
import { MVector3d } from '@/math3d/pivot/mathpivot3d';
import { Pivot3d } from '@/math3d/pivot/pivot3d';
import { Plane3dPoint, TCylinderConfig, TDimension3d, Vector3d } from "@/common/types";
import { System3d } from "@/system3d/system3d";
import { FlySystemUtil } from '@/system3d/flysystem/flysystemutil';
import { GameConfig } from '@/app/universo/game/gameconfig';
import { Sys3dThreeUtil } from '@/system3d/util/sys3dthreeutil';
import { ThreeUtil } from '@/zone3d/three/util/threeutil';
import { PlayerArmy } from './playerarmy';
import { Math3dUtil } from '@/math3d/functions/math3dutil';
import { GenSpriteMaterials } from '@/zone3d/three/materials/genmatsprite';

/*
cm_y: number = 1.2;
MASS: number = 10000;
velocities in rad/tick
mapeo: 290 m/s  →  ~0.6 m/tick @ 60 FPS
SPEED_SCALE = 0.124;
physic velocity max: 290 m/s --> 1045.16 Km/h
relation factor: 1/290 = 0,003448 
*/

/**
 * class PlShipCfg.GL_CRHAIR_SCALE
 */
export class PlShipCfg {

    public static SOURCE_URL: string = '/spacegame/player/xwingfinal.glb';

    public static CROSSHAIR_MAP_PATH: string = '/spacegame/spritemaps/crosshairwhite.png'

    public static DIMENSION: TDimension3d = {width:11.76,height:2.4,depth:13.4};
    public static PHY_VELOCITY_MAX = 290; //m/s 
    public static PHY_ACELERATION_MAX = 36.297; //m/s² 
    public static LN_VEL_MIN: number = 0.001;
    public static LN_VEL_INC: number = 0.005;
    public static LN_VEL_MAX: number = 0.6;
    public static DIRTARGET_DIST_MAX:number = 90;//m

    public static ROLL_AXIS: number = System3d.AXIS_Z;
    public static PITCH_AXIS: number = System3d.AXIS_X;
    public static YAW_AXIS: number = System3d.AXIS_Y;

    public static ROLL_ANGLE_MAX: number = 1.3; 
    public static ROLL_VEL_UNIT: number = 0.03;
    public static PITCH_ANGLE_MAX: number = 1.2; 
    public static PITCH_VEL_UNIT: number = 0.02;

    // engines
    public static ENGINE_RU_COORDS:Vector3d = {x: 1.4, y: 0.94,  z:3.6};
    public static ENGINE_RD_COORDS:Vector3d = {x: 1.5,y:-1.28, z:3.6};
    public static ENGINE_LU_COORDS:Vector3d = {x:-1.4, y: 0.94,  z:3.6};
    public static ENGINE_LD_COORDS:Vector3d = {x:-1.5,y:-1.28, z:3.6};

    public static getGlEngines():THREE.Mesh[] {
        
        const material:THREE.MeshBasicMaterial
                    = new THREE.MeshBasicMaterial( { color: 0xff0000 } ); 

        const engineObj_RU = new THREE.Mesh(
                new THREE.SphereGeometry(0.25,32,32),material);

        const engineObj_RD = new THREE.Mesh(
                new THREE.SphereGeometry(0.25,32,32),material);

        const engineObj_LU = new THREE.Mesh(
                new THREE.SphereGeometry(0.25,32,32),material);

        const engineObj_LD = new THREE.Mesh(
                new THREE.SphereGeometry(0.25,32,32),material);  

        engineObj_RU.position.set(PlShipCfg.ENGINE_RU_COORDS.x,
                                  PlShipCfg.ENGINE_RU_COORDS.y,
                                  PlShipCfg.ENGINE_RU_COORDS.z); 

        engineObj_RD.position.set(PlShipCfg.ENGINE_RD_COORDS.x,
                                  PlShipCfg.ENGINE_RD_COORDS.y,
                                  PlShipCfg.ENGINE_RD_COORDS.z);

        engineObj_LU.position.set(PlShipCfg.ENGINE_LU_COORDS.x,
                                  PlShipCfg.ENGINE_LU_COORDS.y,
                                  PlShipCfg.ENGINE_LU_COORDS.z);

        engineObj_LD.position.set(PlShipCfg.ENGINE_LD_COORDS.x,
                                  PlShipCfg.ENGINE_LD_COORDS.y,
                                  PlShipCfg.ENGINE_LD_COORDS.z);  

        const glEngines:THREE.Mesh[] = [];
        glEngines.push(engineObj_RU);
        glEngines.push(engineObj_RD);
        glEngines.push(engineObj_LU);
        glEngines.push(engineObj_LD);   
        return glEngines;
    }//end
       
    public static GL_CRHAIR_SCALE:number= 0.15;

    //military cannons
    public static CANNON_RU_COORDS:Vector3d = {x: 5.6, y: 1.4, z:-6.3};
    public static CANNON_RD_COORDS:Vector3d = {x: 5.6, y:-1.4, z:-6.3};
    public static CANNON_LU_COORDS:Vector3d = {x:-5.6, y: 1.4, z:-6.3};
    public static CANNON_LD_COORDS:Vector3d = {x:-5.6, y:-1.4, z:-6.3};    

    //military arsenal     
    public static ATT_TIME_TO_CONVERG:number = 0.75;        
    public static BULLETS_A_PHYVEL:number = 400;//m/s
    public static BULLETS_A_TICKVEL:number 
        = FlySystemUtil.msToTick(PlShipCfg.BULLETS_A_PHYVEL);
        
    public static ATT_DIST_TO_CONVERG:number 
        = this.ATT_TIME_TO_CONVERG * PlShipCfg.BULLETS_A_PHYVEL;   
 
    public static BULLETS_A_CFG:TCylinderConfig 
        = {radius:0.15,len:1.0,radialseg:16,lenseg:1,color: 0xFFD700};

    public static getGlCannons():THREE.Mesh[] {
        const material:THREE.MeshBasicMaterial
                    = new THREE.MeshBasicMaterial( { color: 0xFF00FF } ); 

        const gunRefObj_RU = new THREE.Mesh
                (new THREE.SphereGeometry(0.5,16,16),material);
        const gunRefObj_LU = new THREE.Mesh
                (new THREE.SphereGeometry(0.5,16,16),material);

        const gunRefObj_RD = new THREE.Mesh
                (new THREE.SphereGeometry(0.5,16,16),material);
        const gunRefObj_LD = new THREE.Mesh
                (new THREE.SphereGeometry(0.5,16,16),material);

        gunRefObj_RU.position.set(PlShipCfg.CANNON_RU_COORDS.x,
                                  PlShipCfg.CANNON_RU_COORDS.y,
                                  PlShipCfg.CANNON_RU_COORDS.z);
       gunRefObj_LU.position.set(PlShipCfg.CANNON_LU_COORDS.x,
                                  PlShipCfg.CANNON_LU_COORDS.y,
                                  PlShipCfg.CANNON_LU_COORDS.z);

        gunRefObj_RD.position.set(PlShipCfg.CANNON_RD_COORDS.x,
                                  PlShipCfg.CANNON_RD_COORDS.y,
                                  PlShipCfg.CANNON_RD_COORDS.z); 
        gunRefObj_LD.position.set(PlShipCfg.CANNON_LD_COORDS.x,
                                  PlShipCfg.CANNON_LD_COORDS.y,
                                  PlShipCfg.CANNON_LD_COORDS.z); 

        const glGuns:THREE.Mesh[] = [];
        glGuns.push(gunRefObj_RU);
        glGuns.push(gunRefObj_LU);
        glGuns.push(gunRefObj_RD);        
        glGuns.push(gunRefObj_LD); 
        return glGuns;
    }//end

    public static getGlTargets():THREE.Mesh[] {
        const material:THREE.MeshBasicMaterial
                    = new THREE.MeshBasicMaterial( { color: 0xFFFF00 } ); 

        const gunRefObj_RU = new THREE.Mesh
                (new THREE.SphereGeometry(0.5,16,16),material);
        const gunRefObj_RD = new THREE.Mesh
                (new THREE.SphereGeometry(0.5,16,16),material);
        const gunRefObj_LU = new THREE.Mesh
                (new THREE.SphereGeometry(0.5,16,16),material);
        const gunRefObj_LD = new THREE.Mesh
                (new THREE.SphereGeometry(0.5,16,16),material);

        const coordZ = PlShipCfg.ATT_DIST_TO_CONVERG * (-1);
        gunRefObj_RU.position.set(PlShipCfg.CANNON_RU_COORDS.x,
                                  GameConfig.PLCAM_INCY+PlShipCfg.CANNON_RU_COORDS.y,
                                  coordZ);
        gunRefObj_RD.position.set(PlShipCfg.CANNON_RD_COORDS.x,
                                  GameConfig.PLCAM_INCY+PlShipCfg.CANNON_RD_COORDS.y,
                                  coordZ); 

        gunRefObj_LU.position.set(PlShipCfg.CANNON_LU_COORDS.x,
                                  GameConfig.PLCAM_INCY+PlShipCfg.CANNON_LU_COORDS.y,
                                  coordZ);
        gunRefObj_LD.position.set(PlShipCfg.CANNON_LD_COORDS.x,
                                  GameConfig.PLCAM_INCY+PlShipCfg.CANNON_LD_COORDS.y,
                                  coordZ); 

        const glTargets:THREE.Mesh[] = [];
        glTargets.push(gunRefObj_RU);
        glTargets.push(gunRefObj_RD);
        glTargets.push(gunRefObj_LU);
        glTargets.push(gunRefObj_LD);         
        return glTargets;
    }//end

    //util
    public static getMaxVelocityKmH = ():number => {
        const physicMaxVelkmH:number= FlySystemUtil.tickToKmH(PlShipCfg.LN_VEL_MAX);
        return Math.floor(physicMaxVelkmH);
    };//end
        
};//end


/**
 * class GamePlayer
 */
export class GamePlayer {

    public direction: MVector3d;
    public pivot: Pivot3d;    
    public pivotLines: THREE.Line[]|null = null;
    public army:PlayerArmy;

    //15 × 3.6 = 54 km/h
    public ln_velocity: number;
    public roll_velocity: number = PlShipCfg.ROLL_VEL_UNIT;
    public pitch_velocity: number = PlShipCfg.PITCH_VEL_UNIT;

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
    public glmachine: THREE.Object3D | null = null;    
    public glCrosshair: THREE.Sprite | null = null;
    public glEngines:THREE.Mesh[] = [];
    public glCannonsObjs:THREE.Mesh[] = [];
    public glCannonTargets:THREE.Mesh[] = [];
    
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
        this.glmachine = await GlbUtil.loadGLB_object(PlShipCfg.SOURCE_URL);
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
                .getSpriteMaterial(PlShipCfg.CROSSHAIR_MAP_PATH,false,'#FFFFFF',1.0);
        this.glCrosshair = new THREE.Sprite(material);     
        this.glCrosshair.scale.set(
            PlShipCfg.GL_CRHAIR_SCALE,
            PlShipCfg.GL_CRHAIR_SCALE,
            PlShipCfg.GL_CRHAIR_SCALE); 
        this.glCrosshair.position.set
            (0,GameConfig.PLCAM_INCY,PlShipCfg.ATT_DIST_TO_CONVERG);   
        this.glmachine!.add(this.glCrosshair);     
    };//end 

    public initEngines = () => {
        this.glEngines = PlShipCfg.getGlEngines();
        for(let idx:number=0;idx<this.glEngines.length;idx++){
            this.glmachine!.add(this.glEngines[idx]); 
        }        
    };//end

    public initGuns = () => {
        this.glCannonsObjs = PlShipCfg.getGlCannons();
        for(let idx:number=0;idx<this.glCannonsObjs.length;idx++){
            this.glmachine!.add(this.glCannonsObjs[idx]); 
        }     
        this.glCannonTargets = PlShipCfg.getGlTargets();
        for(let idx:number=0;idx<this.glCannonTargets.length;idx++){
            this.glmachine!.add(this.glCannonTargets[idx]); 
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
        const dv = FlySystemUtil.accToTickDelta(PlShipCfg.PHY_ACELERATION_MAX);
        if (increment) {
            this.ln_velocity = Math.min(this.ln_velocity + dv, PlShipCfg.LN_VEL_MAX);
        } else {
            this.ln_velocity = Math.max(this.ln_velocity - dv, PlShipCfg.LN_VEL_MIN);
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

    public applyRollAutolevel(): void {
        const k = GameConfig.ROLL_AUTOLEVEL_PER_TICK;
        if (k <= 0) return;
        const a = this.roll_angle;
        if (Math.abs(a) < 1e-9) return;
        const delta = Math.abs(a) <= k ? -a : -Math.sign(a) * k;

        this.tmpQ.setFromAxisAngle(this.axisLocalZ, delta); // local Z
        this.glmachine!.quaternion.multiply(this.tmpQ).normalize();
        this.roll_angle += delta;
        this.pivot.rotate(PlShipCfg.ROLL_AXIS, delta);
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

        //check collisions
        //this.army.dinamic(delta);

        //update positions
        this.pivot.move(newPos);
        this.glmachine!.position.set
            (this.pivot.position[0],this.pivot.position[1],this.pivot.position[2]);
        return newPos;
    };//end

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