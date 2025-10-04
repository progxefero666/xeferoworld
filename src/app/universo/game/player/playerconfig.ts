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
import { GameCamCfg } from '@/app/universo/game/gcamerascfg';


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
    public static CANN_RIGHT_COORDS:Vector3d = {x: 6.51, y: -1.0, z:-2.6};
    public static CANN_LEFT_COORDS:Vector3d  = {x:-6.51, y: -1.0, z:-2.6};
        
    public static getGlCannons():Mesh[] {

        const material:MeshBasicMaterial = new MeshBasicMaterial({color:'#00FF00'}); 
        const objRight = new Mesh(new SphereGeometry(0.5,16,16),material);
        objRight.position.set(PlayerArmyCfg.CANN_RIGHT_COORDS.x,
                                  PlayerArmyCfg.CANN_RIGHT_COORDS.y,
                                  PlayerArmyCfg.CANN_RIGHT_COORDS.z);

        const objLeft = new Mesh(new SphereGeometry(0.5,16,16),material);
        objLeft.position.set(PlayerArmyCfg.CANN_LEFT_COORDS.x,
                                  PlayerArmyCfg.CANN_LEFT_COORDS.y,
                                  PlayerArmyCfg.CANN_LEFT_COORDS.z);
        return [objRight,objLeft];
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
    public static ENG_RIGHT_COORDS:Vector3d = {x: 1.4, y: 0.94,  z:3.6};
    public static ENG_LEFT_COORDS:Vector3d  = {x:-1.4, y: 0.94,  z:3.6};

    public static getGlEngines():Mesh[] {
        
        const material:MeshBasicMaterial= new MeshBasicMaterial({color:'#FF0000'}); 

        const obj_right = new Mesh(new SphereGeometry(0.25,32,32),material);
        obj_right.position.set(PlayerEngineCfg.ENG_RIGHT_COORDS.x,
                                  PlayerEngineCfg.ENG_RIGHT_COORDS.y,
                                  PlayerEngineCfg.ENG_RIGHT_COORDS.z); 

        const obj_left = new Mesh(new SphereGeometry(0.25,32,32),material);
        obj_left.position.set(PlayerEngineCfg.ENG_LEFT_COORDS.x,
                                  PlayerEngineCfg.ENG_LEFT_COORDS.y,
                                  PlayerEngineCfg.ENG_LEFT_COORDS.z);

        return [obj_right,obj_left];
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
 *   for --> spacejet 3d object
 *      dim: width:15.5 height:2.48 m deepth:11.9 m -> cm_y: 1.24  
 *      ext box: width:15.7 height:2.68 deepth:12.1
 */
export class PlayerConfig {

    //public static SOURCE_URL: string = '/spacegame/player/xwing.glb';
    public static SOURCE_URL: string = '/spacegame/player/spacejet.glb';

    public static CROSSHAIR_MAP_PATH: string = '/spacegame/spritemaps/crosshairwhite.png'

    public static ROLL_AXIS: number = System3d.AXIS_Z;
    public static PITCH_AXIS: number = System3d.AXIS_X;
    public static YAW_AXIS: number = System3d.AXIS_Y;

    public static GLOBJECT_DIM: TDimension3d = {width:15.5,height:2.48,depth:11.9};
    public static COLLIDER_DIM: TDimension3d = {width:15.7,height:2.68,depth:12.1};
    
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
        const scale = PlayerConfig.CRH_GLOBJ_SCALE;        
        const material:THREE.SpriteMaterial = await GenSpriteMaterials
                .getMaterial(PlayerConfig.CROSSHAIR_MAP_PATH,false,'#FFFFFF',1.0);
        const glCrosshair = new THREE.Sprite(material);
        glCrosshair.scale.set(scale,scale,scale);
        return glCrosshair;
    };//end 

    //util
    public static getMaxVelocityKmH = ():number => {
        return FlySystemUtil.tickToKmH(PlayerConfig.LN_VEL_MAX);
    };//end
        
};//end