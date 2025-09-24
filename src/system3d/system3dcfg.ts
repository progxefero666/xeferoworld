//src\app\zone3d\system3d.ts

import { Rotation3d, Vector3d } from "@/common/types";

/**
 * class System3d.CC
 */
export class System3dConfig {

    public static AXIS_X:number = 0;
    public static AXIS_Y:number = 1;
    public static AXIS_Z:number = 2;

    public static readonly DIR_INVCW: number = 0;
    public static readonly DIR_CW: number = 1;
    
    public static DIR_POSITIVE:number=  1;
    public static DIR_NEGATIVE:number= -1;

    public static DIR_FRONT:number	= 0;
    public static DIR_BACK:number	= 1;
    public static DIR_LEFT:number	= 2;
    public static DIR_RIGHT:number	= 3;
    public static DIR_TOP:number	= 4;
    public static DIR_BOTTOM:number = 5;

    // center of coordinate system
    public static CC:Vector3d = {x:0, y:0, z:0}; 

    public static VECTOR_CERO:Vector3d = {x:0,y:0,z:0}; 

    public static RC:Rotation3d = {x:0,y:0,z:0}; 

    public static AXIS_X_COLOR:string = "0xFF0000"; // red
    public static AXIS_Y_COLOR:string = "0xFFFF00"; // yellow
    public static AXIS_Z_COLOR:string = "0x00FF00"; // green


};//end class

/**
 * class System3dUtil.getAsArray
 */
export class System3dUtil {

    public static getAsVector(values:number[]): Vector3d{
        return {x:values[0],y:values[1],z:values[2]};
    };//end

    public static getAsArray(vector: Vector3d): number[] {
        return [vector.x, vector.y, vector.z];
    };//end

};//end