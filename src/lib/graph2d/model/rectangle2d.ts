//src\graph2d\model\rectangle2d.ts


import { Dim2d, Point2d } from "@/lib/graph2d/types2d";

/**
 * Rectangle2d class
 */
export class Rectangle2d {

    public center:Point2d;
    public position:Point2d = {x:0,y:0};
    public color: string = "#ffffffff";
    public dim: Dim2d;
    
    constructor(center:Point2d,corner:Point2d,dim:Dim2d,color?:string) {
        this.center = center;
        this.dim = dim;
        if(color){this.color = color;}
        this.position.x = Math.floor(this.center.x - (this.dim.width/2));
        this.position.y = Math.floor(this.center.y - (this.dim.height/2));
    }

    public getCenter(): Point2d {
        return {
            x: (this.dim.width) / 2,
            y: (this.dim.height) / 2
        };
    }

}//end class