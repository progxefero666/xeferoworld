//src\graph2d\canvaspaint.ts

import { Dim2d, Point2d } from "@/lib/graph2d/types2d";
import { Line2d } from "@/lib/graph2d/model/line2d";
import { Rectangle2d } from "@/lib/graph2d/model/rectangle2d";
import { ShapeCylinder } from "@/lib/graph2d/shapes/shapecylinder"
import { ShapeArrow } from "@/lib/graph2d/shapes/shapearrow";


/**
 * class Canvas Painter Connections
 * constructor(ctx:CanvasRenderingContext2D,dimension:Dim2d,backcolor:string) 
 */
export class CvPaintConnections {

    public ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    };//end

    public drawArrow(arrow: ShapeArrow) {
        this.ctx.save();
        this.ctx.strokeStyle = arrow.fillColor;

        this.ctx.beginPath();
        this.ctx.moveTo(arrow.position.x, arrow.position.y);
        this.ctx.lineTo(arrow.target.x, arrow.target.y);
        this.ctx.lineWidth = arrow.width;
        this.ctx.stroke();

        const vcalc:number = Math.PI/arrow.headFactor;
        this.ctx.beginPath();

        this.ctx.moveTo(arrow.target.x, arrow.target.y);
        this.ctx.lineTo(arrow.target.x- (arrow.headLen * Math.cos(arrow.angle-vcalc)),
                        arrow.target.y- (arrow.headLen * Math.sin(arrow.angle-vcalc)));                                 
        this.ctx.lineTo(arrow.target.x - (arrow.headLen * Math.cos(arrow.angle+vcalc)),
                        arrow.target.y - (arrow.headLen * Math.sin(arrow.angle+vcalc)));
                 
        this.ctx.lineTo(arrow.target.x, arrow.target.y);
        this.ctx.lineTo(arrow.target.x-(arrow.headLen*Math.cos(arrow.angle-vcalc)),
                        arrow.target.y-(arrow.headLen*Math.sin(arrow.angle-vcalc)));

        this.ctx.stroke();
        this.ctx.restore();       
    };//end


}//end class

