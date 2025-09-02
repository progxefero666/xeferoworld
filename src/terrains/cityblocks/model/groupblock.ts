//src\terrains\cityblocks\model\block.ts

import { Vector2d } from "@/common/types";
import { Block } from "src/zone3d/cityblocks/model/block";

//this.model3d!.vertex.array as Float32Array

/**
 * class GroupBlock
 */
export class GroupBlock {

    public center: Vector2d;
    public blocks:Block[]; 

    constructor(center: Vector2d, blocks:Block[]) {
        this.center = center;
        this.blocks = blocks;
    }//end

}//end