//src\characters\charactconfig.ts

import { Vector3d } from "@/common/types";
import { ArmatureMixamo } from "./armatures/armixamo";


/**
 * class PlayerCfg.GUN_INIT_POS
 */
export class PlayerCfg {

    public static SRC_BLASTER: string='/soldier/blaster.glb';

    public static SRC_POSE_T: string='/soldier/poset.glb';
    public static SRC_POSET_GUNUP: string='/soldier/poset_gunup.glb';

    public static SRC_AN_WALKSTART: string='/soldier/walkstart.glb';
    public static SRC_AN_WALKFRONT: string='/soldier/walkfront.glb';

    public static SRC_AN_WALKSTART_DISP: string='/soldier/walkstartdisp.glb';
    public static SRC_AN_WALKFRONT_DISP: string='/soldier/walkfrontdisp.glb';

    
    public static BONE_HIP:string =  ArmatureMixamo.ARM_BONE_HIP;
    public static BONE_HANDRIGHT:string =  ArmatureMixamo.ARM_BONE_RIGHT_HAND;
    public static GUN_INIT_POS: Vector3d= {x:0.461252,y:1.62,z:0.1};

    public static GUN_INIT_COORDS: number[]= [0.461252,1.62,0.1];

}//end

/*

    public static LINEAR_VELOCITY_MAX:number = 100.0;
    public static ROLL_AXIS:number = System3d.AXIS_X;
    public static ROLL_VELOCITY: number = 1.0;
    public static ROLL_UNIT: number = Math3d.RADIAN * PlMachineConfig.ROLL_VELOCITY;

    public static INIT_DIRECTION:number = System3d.AXIS_X;
    public static INIT_ROTATION:Vector3d = {x:0,y:0,z:0};
    public static INIT_POSITION:Vector3d = {x:0,y:0,z:0};
*/