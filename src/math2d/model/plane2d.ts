//src\math2d\model\plane2d.ts

import { TDimension, Vector2d } from "@/common/types";

export class Plane2d {

    public center:    Vector2d;
    public size: number;
    public cellSize:  number;
    public subdiv:   number;

    constructor(center:Vector2d,size: number,cellSize:number) {
        this.center = center;
        this.size = size;
        this.cellSize = cellSize;
        this.subdiv = Math.floor(this.size / this.cellSize);
    }//end


}//end