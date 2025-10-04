//src\app\terrains\genheightmap\testpainter.ts


import { TDimension } from "@/common/types";
import { Plane2dPainter } from "@/math2d/graph/plane2dpainter";
import { CircunfGradient } from "@/terrains/gradients/cfgradient";
import { ObjectPoly } from "@/lib/graph2d/model/objpoly";
import { SimplePoly } from "@/lib/graph2d/model/simplepoly";

import {  Point2d } from "@/lib/graph2d/types2d";
import { GraphColoUtil } from "@/lib/graph2d/graphcolors";
import { Planedriver } from "@/lib/graph2d/planedriver";
import { CurveGradient } from "@/terrains/gradients/curvegradient";
import { LineGradient } from "@/terrains/gradients/linegradient";
/*
type Point2d = {
    x: number;
    y: number;
};
*/

/**
 * DiagramCanvas class
 */
export class Plain3dPainter {

    public ctx: CanvasRenderingContext2D;
    public dim: TDimension;
    public size:number;
    public backcolor: string= "#ffffff";
    public center: Point2d = { x: 0, y: 0 };
    public painter:Plane2dPainter;
    public driver:Planedriver;

    constructor(ctx: CanvasRenderingContext2D,dimension:TDimension) {
        this.ctx = ctx;
        this.dim = dimension;
        this.size = this.dim.width;
        this.center.x = Math.floor(this.dim.width / 2);
        this.center.y = Math.floor(this.dim.height / 2);
        this.painter = new Plane2dPainter(ctx, dimension, this.backcolor);
        this.driver = new Planedriver(dimension);
    };//end
    
    public clear() {
        this.ctx.clearRect(0, 0, this.dim.width, this.dim.height);
    };
    
    public paintCurveRay(points:Point2d[],color:string) {
        const drawPoints = this.driver.getListPoint(points);
        this.painter.drawRay(drawPoints,color);       
    }//end

         //const start = this.driver.getPoint(gradient.startPoint);
        //const end   = this.driver.getPoint(gradient.endPoint);           
        //const drawPoints = this.driver.getListPoint(gradient.points);
        //this.painter.drawLine(start,end,1,"#ff0000");

}//end