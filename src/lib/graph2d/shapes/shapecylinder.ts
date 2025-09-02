//src\graph2d\shape\shapecylinder.ts

import { Dim2d, Point2d } from "@/lib/graph2d/types2d";
import { ShapeUtil } from "@/lib/graph2d/util/shapeutil";
import { Shape } from "@/lib/graph2d/shapes/shape";

/**
 * Shape: Cylinder
 * class: ShapeCylinder
 * public darkColor: string = "#1c1e20ff"; 
 */
export class ShapeCylinder extends Shape {

    public rectPoints: Point2d[] = [];
    public halfDimY: number = 0;
    public radiusX: number = 0;
    public radiusY: number = 0;

    public ellipseXCenter: number = 0;
    public ellipseUpYCenter: number = 0;
    public ellipseDownYCenter: number = 0;

    constructor(position:Point2d,dim:Dim2d,fillColor:string,strokeColor:string) {
        super(position, dim, fillColor, strokeColor);
        this.halfDimY = Math.floor(this.dim.height / 2);
        this.radiusX = Math.floor(this.dim.width / 2);
        this.radiusY = Math.floor(this.dim.width * 0.2); 
        this.calculateElements();
    };

    public calculateElements() {
        this.rectPoints = ShapeUtil.getRectPoints(this.position, this.dim);
        this.ellipseXCenter     = this.position.x;
        this.ellipseUpYCenter   = this.position.y - this.halfDimY;
        this.ellipseDownYCenter = this.position.y + this.halfDimY;
    };

}//end class