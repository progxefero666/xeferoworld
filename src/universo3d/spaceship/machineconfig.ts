//src\zone3d\gamecontrols\machineconfig.ts

import { Rotation3d, Vector3d } from "@/common/types";
import { Math3d } from "@/math3d/math3d";
import { System3d } from "@/math3d/system3d";

/*
Fórmula de conversión de Mach a Kilómetros por hora
.........................................................
Kilómetros por hora = Mach * 1225.04398248
Cálculo de Mach a Kilómetros por hora
Kilómetros por hora = Mach * 1225.04398248
Kilómetros por hora = 1 * 1225.0439824819
Kilómetros por hora = 1225.04398
*/

/**
 * class PlMachineConfig.SOURCE_URL
 */
export class PlMachineConfig {
    
    //public static SOURCE_URL: string='/player/xwingfewpolys.glb';
    public static SOURCE_URL: string='/models3d/aircraftf15.glb';

    public static LINEAR_VELOCITY_MAX:number = 100.0;

    public static ROLL_AXIS:number = System3d.AXIS_X;
    public static ROLL_VELOCITY: number = 1.0;
    public static ROLL_UNIT: number = Math3d.RADIAN * PlMachineConfig.ROLL_VELOCITY;

    public static INIT_DIRECTION:number = System3d.AXIS_X;
    public static INIT_ROTATION:Vector3d = {x:0,y:0,z:0};
    public static INIT_POSITION:Vector3d = {x:0,y:0,z:0};

};//end

/*
this.model3d = await FbxLoaderUtil.getFbxModel(this.sourceUrl);
 *  sourceUrl: string='/models3d/naveespacial_a.glb';
 *  sourceUrl: string='/models3d/aircraftf15.glb';
*/