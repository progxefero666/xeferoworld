//src\graph2d\shape\shapecylinder.ts

import { Dim2d, Point2d } from "@/lib/graph2d/types2d";
import { ShapeUtil } from "../util/shapeutil";

import { Graph2d } from "../graph2d";
import { XMath2dUtil } from "@/math2d/functions/xmath2dutil";


/**
 * ShapeCylinder class
 * Represents a cylinder shape in 2D space.
 * y end = ± (4*radius)/3;
 */
export class ShapeCylinder {

    public static readonly INCLIN_PERCENT: number = 60;

    public position: Point2d;
    public dim: Dim2d;
    public color: string;
    public halfDimY: number = 0;
    public radius: number = 0;
    public rectPoints: Point2d[] = [];

    public ellipsesCenter: Point2d[] = [];

    public ellipseUpCenter: Point2d = Graph2d.POINT_DEF;
    public ellipseUpRefPoints: Point2d[] = [];

    public ellipseDownCenter: Point2d = Graph2d.POINT_DEF;
    public ellipseDownRefPoints: Point2d[] = [];

    constructor(position: Point2d, dim: Dim2d, color: string) {
        this.position = position;
        this.dim = dim;
        this.color = color;
        this.halfDimY = Math.floor(this.dim.height / 2);
        this.radius = Math.floor(this.dim.width / 2);
        this.calculateElements();
    };//end

    public calculateElements() {

        this.rectPoints = ShapeUtil.getRectPoints(this.position, this.dim);

        this.ellipseUpCenter={x:this.position.x,y:this.position.y-this.halfDimY};
        this.ellipseDownCenter={x:this.position.x,y:this.position.y+this.halfDimY};

        const sizeCalcX:number  = Math.floor(this.radius/4);
        const sizeCalcY:number = XMath2dUtil.getValue100(this.radius,ShapeCylinder.INCLIN_PERCENT);     
   

        this.ellipseUpRefPoints[0] = {
            x: this.ellipseUpCenter.x - sizeCalcX,
            y: this.ellipseUpCenter.y + sizeCalcY
        };

        this.ellipseUpRefPoints[1] = {
            x: this.ellipseUpCenter.x + sizeCalcX,
            y: this.ellipseUpCenter.y + sizeCalcY
        };

        this.ellipseUpRefPoints[2] = {
            x: this.ellipseUpCenter.x + sizeCalcX,
            y: this.ellipseUpCenter.y - sizeCalcY
        };

        this.ellipseUpRefPoints[3] = {
            x: this.ellipseUpCenter.x - sizeCalcX,
            y: this.ellipseUpCenter.y - sizeCalcY
        };

        
        this.ellipseDownRefPoints[0] = {
            x: this.ellipseDownCenter.x + sizeCalcX,
            y: this.ellipseDownCenter.y + sizeCalcY
        };

        this.ellipseDownRefPoints[1] = {
            x: this.ellipseDownCenter.x - sizeCalcX,
            y: this.ellipseDownCenter.y + sizeCalcY
        };   

        this.ellipseDownRefPoints[2] = {
            x: this.ellipseDownCenter.x - sizeCalcX,
            y: this.ellipseDownCenter.y - sizeCalcY
        };

        this.ellipseDownRefPoints[3] = {
            x: this.ellipseDownCenter.x + sizeCalcX,
            y: this.ellipseDownCenter.y - sizeCalcY
        };    

    };//end

}//end class