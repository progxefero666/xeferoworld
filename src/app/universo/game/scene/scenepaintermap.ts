//src\app\terrains\genheightmap\testpainter.ts


import { TDimension } from "@/common/types";

import {  Point2d } from "@/lib/graph2d/types2d";
import { Planedriver } from "@/lib/graph2d/planedriver";
import { CanvasPainter } from "./canvaspainter";
/*
type Point2d = {
    x: number;
    y: number;
};
*/

/**
 * DiagramCanvas class
 * '#000000'
 */
export class GameScenePainterMap {

    public ctx: CanvasRenderingContext2D;
    public dim: TDimension;
    public size:number;
    public backcolor: string= 'transparent';
    public center: Point2d = {x:0,y:0};
    public painter:CanvasPainter;
    public driver:Planedriver;

    constructor(ctx: CanvasRenderingContext2D,dimension:TDimension) {
        this.ctx = ctx;
        this.dim = dimension;
        this.size = this.dim.width;
        this.center.x = Math.floor(this.dim.width / 2);
        this.center.y = Math.floor(this.dim.height / 2);
        this.painter = new CanvasPainter(ctx, dimension, this.backcolor);
        this.driver = new Planedriver(dimension);
    };//end
    
    public clear() {
        this.ctx.clearRect(0,0,this.dim.width,this.dim.height);
    };

    public renderMap() {
        const testColor:any = "#ff0000";

        //const point = this.driver.getPoint(endPoint); 
        //const points = this.driver.getListPoint(endPoint); 
        //this.painter.
    };
    
}//end

    