//src\graph2d\model\objpoly.ts

import { Circunf2d, TDimension, TPolyColor } from "@/common/types";
import { Point2d } from "@/lib/graph2d/types2d";


/**
 * ObjectPoly class
 */
export class SimplePoly {

    public center: Point2d  = {x:0,y:0};  
    public points: Point2d[]= [];
    public colorback:string; 
    public colorborder: string; 
    
    constructor(center:Point2d,points:Point2d[],colorback:string,colorborder: string) {
        this.center     = center;
        this.points     = points;
        this.colorback  = colorback;
        this.colorborder= colorborder;
    }

}//end class