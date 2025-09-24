//src\graph2d\model\objpoly.ts

import { Circunf2d, TDimension, TPolyColor } from "@/common/types";
import { Point2d } from "@/lib/graph2d/types2d";


/**
 * ObjectPoly class
 */
export class ObjectPoly {

    public color:TPolyColor;
    public mean: Point2d  = {x:0,y:0};  
    public center: Point2d  = {x:0,y:0};    
    public points: Point2d[]= [];
    public intCircunf: Circunf2d;
    //public dimension: TDimension = {width:0,height:0};
    
    constructor(mean:Point2d,points:Point2d[],intCircunf: Circunf2d,color:TPolyColor) {
        this.mean       = mean;
        this.points     = points;
        this.intCircunf = intCircunf;
        this.color      = color;
        this.center     = this.intCircunf.position;
    }

}//end class