//src\graph2d\shape\shape.ts

import { Dim2d, Point2d } from "@/lib/graph2d/types2d";
import { Graph2d } from "@/lib/graph2d/graph2d";



/**
 * Shape class base -> not instance
 */
export class Shape {

    public position:    Point2d;
    public dim:         Dim2d = Graph2d.DIM_DEF;   
    public fillColor:   string;
    public strokeColor: string;

    constructor(position:Point2d,dim:Dim2d|null,fillColor:string,strokeColor:string) {
        this.position = position;
        if(dim){this.dim = dim;}
        this.fillColor = fillColor;
        this.strokeColor = strokeColor;
    };    

}//end class Shape