//src\graph2d\canvaspaint.ts

import { Dim2d, Point2d } from "@/lib/graph2d/types2d";
import { Line2d } from "@/lib/graph2d/model/line2d";
import { Rectangle2d } from "@/lib/graph2d/model/rectangle2d";
import { ShapeCylinder } from "@/lib/graph2d/shapes/shapecylinder"


/**
 * class Canvas Painter Shapes
 * constructor(ctx:CanvasRenderingContext2D,dimension:Dim2d,backcolor:string) 
 */
export class CvPaintShapes {

    public ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    };//end

    /**
     * draw Shape Cylinder
     * @param shape 
     */
    public drawCylinder(shape: ShapeCylinder) {

        this.ctx.strokeStyle = shape.strokeColor;

        // step 1: draw main figure              
        //.................................................................................         
        this.ctx.beginPath();
        this.ctx.moveTo(shape.ellipseXCenter - shape.radiusX, shape.ellipseUpYCenter);
        this.ctx.ellipse(shape.ellipseXCenter, shape.ellipseUpYCenter,
            shape.radiusX, shape.radiusY, 0, Math.PI, 0, true);
        this.ctx.lineTo(shape.ellipseXCenter + shape.radiusX, shape.ellipseDownYCenter);
        this.ctx.ellipse(shape.ellipseXCenter, shape.ellipseDownYCenter,
            shape.radiusX, shape.radiusY, 0, 0, Math.PI, false);
        this.ctx.lineTo(shape.ellipseXCenter - shape.radiusX, shape.ellipseUpYCenter);
        this.ctx.closePath();
        this.ctx.lineWidth = 1;

        const gradient = this.ctx.createLinearGradient(
            shape.rectPoints[0].x, shape.rectPoints[0].y,
            shape.rectPoints[1].x, shape.rectPoints[1].y
        )
        gradient.addColorStop(0, "#000")
        gradient.addColorStop(1, shape.fillColor)
        

        this.ctx.fillStyle = gradient
        this.ctx.fill()
        this.ctx.stroke();


        // step 2: draw ellipse up
        //.................................................................................  
        this.ctx.beginPath();       
        this.ctx.ellipse(shape.ellipseXCenter,shape.ellipseUpYCenter,
                         shape.radiusX,shape.radiusY,0,2*Math.PI,0,true);
        this.ctx.closePath();
        this.ctx.lineWidth = 1;
        this.ctx.fillStyle = shape.fillColor;
        this.ctx.fill();
        this.ctx.stroke(); 
        
    };//end

}//end class


/*.................................................................................
public drawShapeCylinderOld(shape:ShapeCylinder){
    this.ctx.beginPath();
    this.ctx.moveTo(shape.rectPoints[0].x,shape.rectPoints[0].y);             
    
    this.ctx.bezierCurveTo(
        shape.ellipseUpRefPoints[0].x,shape.ellipseUpRefPoints[0].y,
        shape.ellipseUpRefPoints[1].x,shape.ellipseUpRefPoints[1].y,
        shape.rectPoints[1].x,shape.rectPoints[1].y);
    this.ctx.lineTo(shape.rectPoints[2].x,shape.rectPoints[2].y);
    this.ctx.bezierCurveTo(
        shape.ellipseDownRefPoints[0].x,shape.ellipseDownRefPoints[0].y,
        shape.ellipseDownRefPoints[1].x,shape.ellipseDownRefPoints[1].y,
        shape.rectPoints[3].x,shape.rectPoints[3].y);
    this.ctx.lineTo(shape.rectPoints[0].x,shape.rectPoints[0].y);
    this.ctx.lineWidth = 1; 
    this.ctx.strokeStyle = shape.color; 
    this.ctx.stroke();
    this.ctx.closePath();

    // step 2: draw ellipse up
    //.................................................................................          
    let drawEllipseUp:boolean = false;
        if (drawEllipseUp) {            
        this.ctx.beginPath();
        this.ctx.moveTo(shape.rectPoints[0].x,shape.rectPoints[0].y);             
        this.ctx.bezierCurveTo(
            shape.ellipseUpRefPoints[0].x,shape.ellipseUpRefPoints[0].y,
            shape.ellipseUpRefPoints[1].x,shape.ellipseUpRefPoints[1].y,
            shape.rectPoints[1].x,shape.rectPoints[1].y);    
        this.ctx.bezierCurveTo(
            shape.ellipseUpRefPoints[2].x,shape.ellipseUpRefPoints[2].y,
            shape.ellipseUpRefPoints[3].x,shape.ellipseUpRefPoints[3].y,
            shape.rectPoints[0].x,shape.rectPoints[0].y);            
        this.ctx.lineWidth = 1; 
        this.ctx.strokeStyle = "green"; 
        this.ctx.stroke();
        this.ctx.closePath();          
    }         
};*/
