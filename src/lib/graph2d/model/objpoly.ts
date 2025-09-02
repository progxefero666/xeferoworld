//src\graph2d\model\objpoly.ts

import { Dim2d, Point2d } from "@/lib/graph2d/types2d";

/**
 * ObjectPoly class
 */
export class ObjectPoly {

    public center: Point2d  = {x:0,y:0};  
    public points: Point2d[]= [];      

    public backcolor:   string= "#ffffffff"; 
    public bordercolor: string= "#000000"; 
    public dim: Dim2d = {width:0,height:0};
    
    constructor(center:Point2d,points:Point2d[],backcolor:string,bordercolor?:string) {
        this.center     = center;
        this.points     = points;
        this.backcolor  = backcolor;
        if(bordercolor) { this.bordercolor = bordercolor;}
    }

}//end class