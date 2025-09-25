//src\app\zone3d\system3d.ts

import { Rotation3d, TDimension3d, Vector3d } from "@/common/types";

/**
 * class System3d.AXIS_Y
 */
export class System3d {

    public static CC:Vector3d = {x:0, y:0, z:0}; 

    public static AXIS_X:number = 0;
    public static AXIS_Y:number = 1;
    public static AXIS_Z:number = 2;
    public static readonly AXIS_X_COLOR: string = "#0000FF";
    public static readonly AXIS_Y_COLOR: string = "#ccff00";
    public static readonly AXIS_Z_COLOR: string = "#3cff00";


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


    public static VECTOR_CERO:Vector3d = {x:0,y:0,z:0}; 
    public static RC:Rotation3d = {x:0,y:0,z:0}; 
    public static DIMENSION_CERO:TDimension3d = {width:0,height:0,depth:0};

};//end class

/**
 * class System3dUtil.getAsVector
 */
export class System3dUtil {

    public static getAsVector(values:number[]): Vector3d{
        return {x:values[0],y:values[1],z:values[2]};
    };//end

    public static getAsArray(vector: Vector3d): number[] {
        return [vector.x, vector.y, vector.z];
    };//end

};//end