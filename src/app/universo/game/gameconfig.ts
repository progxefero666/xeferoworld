//src\universo3d\game\gameconfig.ts

import { System3d } from "@/system3d/system3d";

/**
 * class GameConfig.PLCAM_INCY
 * @author 2017.01.13
 */
export class GameConfig {

    public static SCENE_BACKCOLOR:any = "#000000";

    public static TERRAIN_A_SRC: string='/terrains/terrain.glb'    
    public static TERRAIN_GRID_COLOR: string = "#888888";

    public static FRAME_RATE: number = 60;
    public static FRAME_TIME: number = 1000 / GameConfig.FRAME_RATE; 

    //seconds in tick
    public static DT_SEC: number = 1 / GameConfig.FRAME_RATE; 


    //relation ticks: 290 m/s  →  ~0.6 m/tick @ 60 FPS
    public static SPEED_SCALE: number = 0.124;
    public static YAW_GAIN: number = 10.0;

    // roll damping toward 0 (rad per tick)
    public static ROLL_AUTOLEVEL_PER_TICK: number = 0.01;
    public static PITCH_ENERGY_DEADZONE: number = 0.01; // rad
    // simple quadratic drag on speed (tunable)
    public static DRAG_COEFF: number = 0.002;

    //at game start
    public static INIT_LVELOCITY:number = 120/2;
    public static INIT_DIRECTION:number = System3d.AXIS_Z;
    public static INIT_ROTATION:number[] = [0,0,0];
    public static INIT_POSITION:number[] = [0,0,0];

    public static M_CAMERA_FOV:number = 50.0;
    public static M_CAMERA_NEAR:number = 0.1;
    public static M_CAMERA_FAR:number = 8000;

    public static M_CAMERA_PLDIST:number = 20.0;
    public static M_CAMERA_PLINCY:number = 4.0;


}//end