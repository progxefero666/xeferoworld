//src\math3d\objects\planeface3d.ts

import { TDimension, Vector3d } from "@/common/types";
import { System3d } from "../system3d";

/**
 * class PlaneFace3D
 *     rotationPh: horizontal plane rotation (around Y) 
 */
export class PlaneFace3D {

    public static DEF:PlaneFace3D 
        = new PlaneFace3D(System3d.CC,{width:0,height:0},0.0);

    public center:    Vector3d;
    public dimension: TDimension;
    public rotationPh:  number;

    constructor(center:Vector3d,dimension:TDimension,rotationPh:number) {
        this.center    = center;
        this.dimension = dimension;  
        this.rotationPh  = rotationPh;
    }

}//end