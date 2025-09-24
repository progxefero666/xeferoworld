//src\graph2d\canvaspaint.ts

import { Dim2d, Point2d } from "@/lib/graph2d/types2d";
import { Line2d } from "@/lib/graph2d/model/line2d";
import { Rectangle2d } from "@/lib/graph2d/model/rectangle2d";

import { AudioMonitorCfg } from "@/audio/components/audiolabmoncfg";

/**
 * Canvas Painter
 * class CvPainter
 */
export class AudioPainter {

    public static readonly POINT_RADIUS: number = 2;
    public static readonly ROTATION_NONE: number = 0;

    public ctx: CanvasRenderingContext2D;
    public dim: Dim2d;
    public backcolor: string;

    constructor(ctx: CanvasRenderingContext2D, dimension: Dim2d, backcolor: string) {
        this.ctx = ctx;
        this.dim = dimension;
        this.backcolor = backcolor;
    };//end

    public fillback() {
        this.ctx.fillStyle = this.backcolor;
        this.ctx.fillRect(0, 0, this.dim.width, this.dim.height);
    }

    public drawAxisHorz() {
        const coordY: number = Math.floor(this.dim.height / 2);
        const pointStart: Point2d = { x: 0, y: coordY };
        const pointEnd: Point2d = { x: this.dim.width, y: coordY };
        this.drawLine(pointStart, pointEnd,AudioMonitorCfg.AXIS_HORZ_COLOR);
    };//end

    // points
    //.................................................................................    

    public fillPointSmall(point: Point2d, color: string) {
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, 1, 0, Math.PI * 2);
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    }//end    

    public fillPoint(point: Point2d, color: string) {
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, AudioPainter.POINT_RADIUS, 0, Math.PI * 2);
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    }//end

    public dfillPoints(points: Point2d[], color: string) {
        this.ctx.fillStyle = color;
        for (const point of points) {
            this.fillPoint(point, color);
        }
    }//end

    public drawPointsColors(points: Point2d[], colors: string[]) {
        for (let idx = 0; idx < points.length; idx++) {
            this.fillPoint(points[idx], colors[idx]);
        }
    }//end

    // circunferences
    //.................................................................................        
    public drawCf(center: Point2d, radius: number, color: string) {
        this.ctx.beginPath();
        this.ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    }//end

    // lines
    //.................................................................................    

    public drawLine(pointA: Point2d, pointB: Point2d, strokeColor: string) {
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = strokeColor;
        this.ctx.beginPath();
        this.ctx.moveTo(pointA.x, pointA.y);
        this.ctx.lineTo(pointB.x, pointB.y);
        this.ctx.closePath();
        this.ctx.stroke();
    }//end

    public drawLine2d(line2d: Line2d) {
        this.drawLine(line2d.start, line2d.end, line2d.color);
    };//end

    public drawPointsConnected(points: Point2d[], color: string) {
        if (points.length < 3) return;
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            this.ctx.lineTo(points[i].x, points[i].y);
        }
        this.ctx.closePath();
        this.ctx.stroke();
    };//end    
    // rectangles
    //.................................................................................

    public drawRect(point: Point2d, dim: Dim2d, color: string) {
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = color;
        this.ctx.strokeRect(point.x, point.y, dim.width, dim.height);
        this.ctx.stroke();
    };//end

    public fillRect(point: Point2d, dim: Dim2d, color: string) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(point.x, point.y, dim.width, dim.height);
    };//end

    public drawRectangle(rect2d: Rectangle2d) {
        this.drawRect(rect2d.position, rect2d.dim, rect2d.color);
    };//end

    // polygons
    //.................................................................................
    public drawPolygon(points: Point2d[], color: string) {
        if (points.length < 3) return;
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            this.ctx.lineTo(points[i].x, points[i].y);
        }
        this.ctx.closePath();
        this.ctx.stroke();
    };//end

    public fillPolygon(points: Point2d[], color: string) {
        if (points.length < 3) return;
        this.ctx.fillStyle = color;
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            this.ctx.lineTo(points[i].x, points[i].y);
        }
        this.ctx.closePath();
        this.ctx.fill();
    };//end   

    public drawfillPolygon(points: Point2d[], backcolor: string, bordercolor: string) {
        if (points.length < 3) return;
        this.ctx.fillStyle = backcolor;
        this.ctx.strokeStyle = bordercolor;
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            this.ctx.lineTo(points[i].x, points[i].y);
        }
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
    };//end 

    public drawImageBitmap(img: ImageBitmap, pointxy: Point2d, alpha: number): void {
        this.ctx.globalAlpha = alpha;
        this.ctx.drawImage(img, pointxy.x, pointxy.y, img.width, img.height);
        this.ctx.globalAlpha = alpha;
    }//end

    public drawImageBitmapDim(img: ImageBitmap, pointxy: Point2d, dimension: Dim2d, alpha: number): void {
        this.ctx.globalAlpha = alpha;
        this.ctx.drawImage(img, pointxy.x, pointxy.y, dimension.width, dimension.height);
        this.ctx.globalAlpha = 1;
    }//end


    public drawMemoryImagen(objectURL: string, pointxy: Point2d, dimension: Dim2d) {
        const img = new Image();
        if (objectURL) {
            img.src = objectURL;
            img.onload = () => {
                this.ctx.drawImage(img, pointxy.x, pointxy.y, dimension.width, dimension.height);
            };
        }
    }//end

   public drawCurve2D(point: Point2d, radius: number,
        startAngle: number, endAngle: number,
        color: string,
        counterclockwise: boolean) {
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, radius, startAngle, endAngle, counterclockwise);
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        this.ctx.closePath();
    };//end     

    public drawEllipse(position: Point2d, width: number, height: number,
        startAngle: number, endAngle: number,
        color: string) {
        this.ctx.beginPath();
        this.ctx.ellipse(position.x, position.y, width, height, AudioPainter.ROTATION_NONE, startAngle, Math.PI * 2);
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    };//end

}//end class
