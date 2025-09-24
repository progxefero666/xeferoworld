//src\terrains\cityblocks\model\block.ts

import { Point2d, TDimension, TDimension3d, Vector3d } from "@/common/types";
import { PlaneFace3D } from "@/math3d/objects/planeface3d";


/**
 * class Block
 *    size ->radius x 2
 */
export class Block {

    public center: Vector3d;
    public size: TDimension3d;
    public rotPlane:  number;

    constructor(center:Vector3d,size:TDimension3d,rotPlane?:number) {
        this.center    = center;
        this.size      = size;
        this.rotPlane  = rotPlane ?? 0.0;
    }//end


}//end