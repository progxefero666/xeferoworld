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
import { GameConfig } from '@/app/universo/game/gameconfig';
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
 * class PlayerConfig.getGlCrosshair
 */
export class PlayerCfg {

    public static SOURCE_URL: string = '/spacegame/player/xwingfinal.glb';

    public static CROSSHAIR_MAP_PATH: string = '/spacegame/spritemaps/crosshairwhite.png'

    //ext box: width:6.2 height:1.9 deepth:7.2
    public static GLOBJECT_DIM: TDimension3d = {width:11.76,height:2.4,depth:13.4};
    public static COLLIDER_DIM: TDimension3d = {width:11.96,height:2.6,depth:13.6};
    
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

        engineObj_RU.position.set(PlayerCfg.ENGINE_RU_COORDS.x,
                                  PlayerCfg.ENGINE_RU_COORDS.y,
                                  PlayerCfg.ENGINE_RU_COORDS.z); 

        engineObj_RD.position.set(PlayerCfg.ENGINE_RD_COORDS.x,
                                  PlayerCfg.ENGINE_RD_COORDS.y,
                                  PlayerCfg.ENGINE_RD_COORDS.z);

        engineObj_LU.position.set(PlayerCfg.ENGINE_LU_COORDS.x,
                                  PlayerCfg.ENGINE_LU_COORDS.y,
                                  PlayerCfg.ENGINE_LU_COORDS.z);

        engineObj_LD.position.set(PlayerCfg.ENGINE_LD_COORDS.x,
                                  PlayerCfg.ENGINE_LD_COORDS.y,
                                  PlayerCfg.ENGINE_LD_COORDS.z);  

        const glEngines:Mesh[] = [];
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
    public static ATT_BULL_A_PHYVEL:number = 400;//m/s
    public static ATT_TIME_TO_CONVERG:number = 0.75;

    public static ATT_DIST_TO_CONVERG:number 
        = this.ATT_TIME_TO_CONVERG * PlayerCfg.ATT_BULL_A_PHYVEL;   

    public static CRH_POSITION:number[] 
        = [0,GameConfig.M_CAMERA_PLINCY,PlayerCfg.ATT_DIST_TO_CONVERG*(-1)];  
    
    public static BULLETS_A_TICKVEL:number 
        = FlySystemUtil.msToTick(PlayerCfg.ATT_BULL_A_PHYVEL);
        
    public static BULLETS_A_CFG:TCylinderConfig 
        = {radius:0.15,len:1.0,radialseg:16,lenseg:1,color: 0xFFD700};

    public static getGlCrosshair = async () => {    
        const scale = PlayerCfg.GL_CRHAIR_SCALE;        
        const material:THREE.SpriteMaterial = await GenSpriteMaterials
                .getMaterial(PlayerCfg.CROSSHAIR_MAP_PATH,false,'#FFFFFF',1.0);
        const glCrosshair = new THREE.Sprite(material);
        glCrosshair.scale.set(scale,scale,scale);
        return glCrosshair;
    };//end 

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

        gunRefObj_RU.position.set(PlayerCfg.CANNON_RU_COORDS.x,
                                  PlayerCfg.CANNON_RU_COORDS.y,
                                  PlayerCfg.CANNON_RU_COORDS.z);
       gunRefObj_LU.position.set(PlayerCfg.CANNON_LU_COORDS.x,
                                  PlayerCfg.CANNON_LU_COORDS.y,
                                  PlayerCfg.CANNON_LU_COORDS.z);

        gunRefObj_RD.position.set(PlayerCfg.CANNON_RD_COORDS.x,
                                  PlayerCfg.CANNON_RD_COORDS.y,
                                  PlayerCfg.CANNON_RD_COORDS.z); 
        gunRefObj_LD.position.set(PlayerCfg.CANNON_LD_COORDS.x,
                                  PlayerCfg.CANNON_LD_COORDS.y,
                                  PlayerCfg.CANNON_LD_COORDS.z); 

        const glGuns:Mesh[] = [];
        glGuns.push(gunRefObj_RU);
        glGuns.push(gunRefObj_LU);
        glGuns.push(gunRefObj_RD);        
        glGuns.push(gunRefObj_LD); 
        return glGuns;
    }//end

    public static getGlTarget():Mesh {
        const material:MeshBasicMaterial
                    = new MeshBasicMaterial({color:'#FFFF00'}); 
        return new Mesh(new SphereGeometry(3.0,16,16),material);
    }//end

    //util
    public static getMaxVelocityKmH = ():number => {
        const physicMaxVelkmH:number= FlySystemUtil.tickToKmH(PlayerCfg.LN_VEL_MAX);
        return Math.floor(physicMaxVelkmH);
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