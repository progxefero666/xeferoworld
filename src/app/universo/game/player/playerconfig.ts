//src\app\universo\game\player\playerconfig.ts


import * as THREE from 'three';

import { 
    MeshBasicMaterial, 
    SphereGeometry, 
    Mesh
} from 'three';

import { TCylinderConfig, TDimension3d, Vector3d } from "@/common/types";
import { System3d } from "@/system3d/system3d";
import { FlySystemUtil } from '@/system3d/flysystem/flysystemutil';
import { GenSpriteMaterials } from '@/zone3d/three/materials/genmatsprite';
import { GameCamCfg } from '../gcamerascfg';


/**
 * class PlayerCfg
 */
export class PlayerArmyCfg {

    public static CRH_GLOBJ_RADIUS:number = 3.0;
    public static CRH_GLOBJ_COLOR:any = '#FFFF00';   

    public static ATT_BULL_A_PHYVEL:number = 400;//m/s
    public static ATT_TIME_TO_CONVERG:number = 0.75;
    public static ATT_DIST_TO_CONVERG:number 
        = PlayerArmyCfg.ATT_TIME_TO_CONVERG * PlayerArmyCfg.ATT_BULL_A_PHYVEL; 

    public static BULLETS_A_TICKVEL:number 
        = FlySystemUtil.msToTick(PlayerArmyCfg.ATT_BULL_A_PHYVEL);

    public static BULLETS_A_CFG:TCylinderConfig 
        = {radius:0.15,len:1.0,radialseg:16,lenseg:1,color: 0xFFD700};

    //military cannons
    public static CANNON_RU_COORDS:Vector3d = {x: 5.4, y: 1.6, z:-6.4};
    public static CANNON_RD_COORDS:Vector3d = {x: 5.4, y:-1.6, z:-6.4};
    public static CANNON_LU_COORDS:Vector3d = {x:-5.4, y: 1.6, z:-6.4};
    public static CANNON_LD_COORDS:Vector3d = {x:-5.4, y:-1.6, z:-6.4};    
        
    public static getGlCannons():Mesh[] {

        const material:MeshBasicMaterial
                    = new MeshBasicMaterial( { color: 0xFF00FF } ); 

        const gunRefObj_RU = new Mesh
                (new SphereGeometry(0.5,16,16),material);
        const gunRefObj_LU = new Mesh
                (new SphereGeometry(0.5,16,16),material);

        const gunRefObj_RD = new Mesh
                (new SphereGeometry(0.5,16,16),material);
        const gunRefObj_LD = new Mesh
                (new SphereGeometry(0.5,16,16),material);

        gunRefObj_RU.position.set(PlayerArmyCfg.CANNON_RU_COORDS.x,
                                  PlayerArmyCfg.CANNON_RU_COORDS.y,
                                  PlayerArmyCfg.CANNON_RU_COORDS.z);
       gunRefObj_LU.position.set(PlayerArmyCfg.CANNON_LU_COORDS.x,
                                  PlayerArmyCfg.CANNON_LU_COORDS.y,
                                  PlayerArmyCfg.CANNON_LU_COORDS.z);

        gunRefObj_RD.position.set(PlayerArmyCfg.CANNON_RD_COORDS.x,
                                  PlayerArmyCfg.CANNON_RD_COORDS.y,
                                  PlayerArmyCfg.CANNON_RD_COORDS.z); 
        gunRefObj_LD.position.set(PlayerArmyCfg.CANNON_LD_COORDS.x,
                                  PlayerArmyCfg.CANNON_LD_COORDS.y,
                                  PlayerArmyCfg.CANNON_LD_COORDS.z); 

        const glGuns:Mesh[] = [];
        glGuns.push(gunRefObj_RU);
        glGuns.push(gunRefObj_LU);
        glGuns.push(gunRefObj_RD);        
        glGuns.push(gunRefObj_LD); 
        return glGuns;
    }//end

    public static getGlTarget():Mesh {
        return new Mesh(
            new SphereGeometry(PlayerArmyCfg.CRH_GLOBJ_RADIUS,16,16),
            new MeshBasicMaterial({color:PlayerArmyCfg.CRH_GLOBJ_COLOR}));
    }//end

};//end

/**
 * class PlayerEngineCfg
 */
export class PlayerEngineCfg {

    // engines motors
    public static ENGINE_RU_COORDS:Vector3d = {x: 1.4, y: 0.94,  z:3.6};
    public static ENGINE_RD_COORDS:Vector3d = {x: 1.5,y:-1.28, z:3.6};
    public static ENGINE_LU_COORDS:Vector3d = {x:-1.4, y: 0.94,  z:3.6};
    public static ENGINE_LD_COORDS:Vector3d = {x:-1.5,y:-1.28, z:3.6};

    public static getGlEngines():Mesh[] {
        
        const material:MeshBasicMaterial
                    = new MeshBasicMaterial( { color: 0xff0000 } ); 

        const engineObj_RU = new Mesh(
                new SphereGeometry(0.25,32,32),material);

        const engineObj_RD = new Mesh(
                new SphereGeometry(0.25,32,32),material);

        const engineObj_LU = new Mesh(
                new SphereGeometry(0.25,32,32),material);

        const engineObj_LD = new Mesh(
                new SphereGeometry(0.25,32,32),material);  

        engineObj_RU.position.set(PlayerEngineCfg.ENGINE_RU_COORDS.x,
                                  PlayerEngineCfg.ENGINE_RU_COORDS.y,
                                  PlayerEngineCfg.ENGINE_RU_COORDS.z); 

        engineObj_RD.position.set(PlayerEngineCfg.ENGINE_RD_COORDS.x,
                                  PlayerEngineCfg.ENGINE_RD_COORDS.y,
                                  PlayerEngineCfg.ENGINE_RD_COORDS.z);

        engineObj_LU.position.set(PlayerEngineCfg.ENGINE_LU_COORDS.x,
                                  PlayerEngineCfg.ENGINE_LU_COORDS.y,
                                  PlayerEngineCfg.ENGINE_LU_COORDS.z);

        engineObj_LD.position.set(PlayerEngineCfg.ENGINE_LD_COORDS.x,
                                  PlayerEngineCfg.ENGINE_LD_COORDS.y,
                                  PlayerEngineCfg.ENGINE_LD_COORDS.z);  

        const glEngines:Mesh[] = [];
        glEngines.push(engineObj_RU);
        glEngines.push(engineObj_RD);
        glEngines.push(engineObj_LU);
        glEngines.push(engineObj_LD);   
        return glEngines;
    }//end

};//end

/*
velocities in rad/tick
mapeo: 290 m/s  →  ~0.6 m/tick @ 60 FPS
SPEED_SCALE = 0.124;
physic velocity max: 290 m/s --> 1045.16 Km/h
relation factor: 1/290 = 0,003448 
*/

/**
 * class PlayerShipCfg
 */
export class PlayerShipCfg {

    //public static SOURCE_URL: string = '/spacegame/player/xwing.glb';
    public static SOURCE_URL: string = '/spacegame/player/spacejet.glb';

    public static CROSSHAIR_MAP_PATH: string = '/spacegame/spritemaps/crosshairwhite.png'

    public static ROLL_AXIS: number = System3d.AXIS_Z;
    public static PITCH_AXIS: number = System3d.AXIS_X;
    public static YAW_AXIS: number = System3d.AXIS_Y;

    //ext box: width:6.2 height:1.9 deepth:7.2
    //cm_y: 1.2  mass: 10000 kg; 11.76/2=5.88
    public static GLOBJECT_DIM: TDimension3d = {width:11.76,height:2.4,depth:13.4};
    public static COLLIDER_DIM: TDimension3d = {width:11.96,height:2.6,depth:13.6};
    
    public static PHY_VELOCITY_MAX       = 290; //m/s 
    public static PHY_ACELERATION_MAX    = 36.297; //m/s² 
    public static LN_VEL_MIN: number     = 0.001;
    public static LN_VEL_INC: number     = 0.005;
    public static LN_VEL_MAX: number     = 0.6;
    public static ROLL_ANGLE_MAX:number  = 1.3; 
    public static ROLL_VEL_UNIT: number  = 0.03;
    public static PITCH_ANGLE_MAX:number = 1.2; 
    public static PITCH_VEL_UNIT: number = 0.02;

    //crosshair config 
    public static DIRTARGET_DIST_MAX:number = 90;          
    public static CRH_POSITION:number[] = [
        0,GameCamCfg.MCAM_ELVINC,
        PlayerArmyCfg.ATT_DIST_TO_CONVERG*(-1)];    
    public static CRH_GLOBJ_SCALE:number= 0.15; 
       
    //crosshair gl object 
    public static getGlCrosshair = async () => {    
        const scale = PlayerShipCfg.CRH_GLOBJ_SCALE;        
        const material:THREE.SpriteMaterial = await GenSpriteMaterials
                .getMaterial(PlayerShipCfg.CROSSHAIR_MAP_PATH,false,'#FFFFFF',1.0);
        const glCrosshair = new THREE.Sprite(material);
        glCrosshair.scale.set(scale,scale,scale);
        return glCrosshair;
    };//end 

    //util
    public static getMaxVelocityKmH = ():number => {
        return FlySystemUtil.tickToKmH(PlayerShipCfg.LN_VEL_MAX);
    };//end
        
};//end

/*
    public static getGlTargets():Mesh[] {
        const material:MeshBasicMaterial
                    = new MeshBasicMaterial( { color: 0xFFFF00 } ); 

        const gunRefObj_RU = new Mesh
                (new SphereGeometry(0.5,16,16),material);
        const gunRefObj_RD = new Mesh
                (new SphereGeometry(0.5,16,16),material);
        const gunRefObj_LU = new Mesh
                (new SphereGeometry(0.5,16,16),material);
        const gunRefObj_LD = new Mesh
                (new SphereGeometry(0.5,16,16),material);

        const coordZ = PlayerConfig.ATT_DIST_TO_CONVERG * (-1);
        gunRefObj_RU.position.set(PlayerConfig.CANNON_RU_COORDS.x,
                                  GameConfig.M_CAMERA_PLINCY+PlayerConfig.CANNON_RU_COORDS.y,
                                  coordZ);
        gunRefObj_RD.position.set(PlayerConfig.CANNON_RD_COORDS.x,
                                  GameConfig.M_CAMERA_PLINCY+PlayerConfig.CANNON_RD_COORDS.y,
                                  coordZ); 

        gunRefObj_LU.position.set(PlayerConfig.CANNON_LU_COORDS.x,
                                  GameConfig.M_CAMERA_PLINCY+PlayerConfig.CANNON_LU_COORDS.y,
                                  coordZ);
        gunRefObj_LD.position.set(PlayerConfig.CANNON_LD_COORDS.x,
                                  GameConfig.M_CAMERA_PLINCY+PlayerConfig.CANNON_LD_COORDS.y,
                                  coordZ); 

        const glTargets:Mesh[] = [];
        glTargets.push(gunRefObj_RU);
        glTargets.push(gunRefObj_RD);
        glTargets.push(gunRefObj_LU);
        glTargets.push(gunRefObj_LD);         
        return glTargets;
    }//end

*/