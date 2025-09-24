//src\math2d\model\plane2d.ts

import { TDimension, Point2d } from "@/common/types";

export class Plane2d {

    public center:    Point2d;
    public size: number;
    public cellSize:  number;
    public subdiv:   number;
    public dimension: TDimension;
    
    constructor(center:Point2d,size: number,cellSize:number) {
        this.center = center;
        this.size = size;
        this.cellSize = cellSize;
        this.subdiv = Math.floor(this.size / this.cellSize);
        this.dimension = {width:this.size,height:this.size};
    }//end


}//end