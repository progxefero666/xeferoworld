//src\graph2d\shape\shapearrow.ts


import { Dim2d, Point2d } from "@/lib/graph2d/types2d";
import { Shape } from "@/lib/graph2d/shapes/shape";


/**
 * Shape: Arrow
 * class: ShapeArrow
 */
export class ShapeArrow extends Shape {

    public static readonly DEF_HEAD_LEN: number = 10;
    public static readonly DEF_HEAD_VF: number = 7;

    public target:Point2d;
    public width:number;
    public angle:number = 0;
    public headLen:number = 0;
    public headFactor:number = 0;

    constructor(position:Point2d,dim:Dim2d|null,fillColor:string,strokeColor:string,target:Point2d,width:number) {
        super(position,dim,fillColor,strokeColor);
        this.target = target;
        this.width = width;        
        this.calculateElements();
    };

    public calculateElements() {        
        this.angle = ShapeArrow.getPointsAngleInPlain(this.position, this.target);
        this.headLen = ShapeArrow.DEF_HEAD_LEN;
        this.headFactor = Math.PI/ShapeArrow.DEF_HEAD_VF;                                 
    };

    public static getPointsAngleInPlain(point_0:Point2d,point_1:Point2d): number {
        return Math.atan2(
            (point_1.y-point_0.y),
            (point_1.x-point_0.x));  
    };//end    
}//end class