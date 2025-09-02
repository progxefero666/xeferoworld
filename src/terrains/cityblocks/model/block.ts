//src\terrains\cityblocks\model\block.ts

import { Vector2d } from "@/common/types";
import { PlaneFace3D } from "@/math3d/objects/planeface3d";


/**
 * class Block
 *    size ->radius x 2
 */
export class Block {

    public center: Vector2d;
    public size: number;
    public rotationPh:  number;

    constructor(center:Vector2d,size:number,rotationPh:number) {
        this.center    = center;
        this.size = size;
        this.rotationPh  = rotationPh;
    }


}//end