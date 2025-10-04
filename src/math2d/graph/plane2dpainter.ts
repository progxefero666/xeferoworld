//src\graph2d\canvaspaint.ts


import { Line2d, TDimension } from "@/common/types";
import { GraphColoUtil } from "@/lib/graph2d/graphcolors";

import { Rectangle2d } from "@/lib/graph2d/model/rectangle2d";
import { Point2d } from "@/lib/graph2d/types2d";
import {  } from "@/math2d/math2dtypes";
import { CircunfGradient } from "@/terrains/gradients/cfgradient";
import { PointGradient } from "@/terrains/gradients/pointgradient";



/**
 * Canvas Painter
 * class CvPainter
 */
export class Plane2dPainter {

    public static readonly POINT_RADIUS: number = 2;
    public static readonly ROTATION_NONE: number = 0;

    public ctx: CanvasRenderingContext2D;
    public dim: TDimension;
    public backcolor: string;
    public center: Point2d = { x: 0, y: 0 };

    constructor(ctx: CanvasRenderingContext2D, dimension: TDimension, backcolor: string) {
        this.ctx = ctx;
        this.dim = dimension;
        this.backcolor = backcolor;
        this.center.x = Math.floor(this.dim.width / 2);
        this.center.y = Math.floor(this.dim.height / 2);
    };//end

    public fillback(color: string) {
        this.ctx.fillStyle = this.backcolor;
        this.ctx.fillRect(0, 0, this.dim.width, this.dim.height);
    }

    public fillbackColor(color: string) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.dim.width, this.dim.height);
    }

    // points
    //.................................................................................    

    public paintPixel(coords:Point2d,color:string) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(coords.x,coords.y,1,1);
    }//end    

    public paintBigPoint(point: Point2d, color: string) {
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, Plane2dPainter.POINT_RADIUS, 0, Math.PI * 2);
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    }//end

    public paintListBigPoint(points: Point2d[], color: string) {
        this.ctx.fillStyle = color;
        for (const point of points) {
            this.paintBigPoint(point, color);
        }
    }//end

    // circunferences
    //.................................................................................        
    public drawCf(center:Point2d,radius:number,lineWidth:number,color:string) {
        this.ctx.beginPath();
        this.ctx.lineWidth = lineWidth;
        this.ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
        this.ctx.lineWidth = 1;
    }//end

    public fillCf(center:Point2d,radius:number,color:string) {
        this.ctx.beginPath();        
        this.ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = color;
        this.ctx.fill();        
    }//end

    /*
    public paintCf(center: Point2d, radius: number, 
                lineWidth: number, strokeColor: string, fillColor: string) {
        this.ctx.beginPath();
        this.ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = fillColor;
        this.ctx.fill();
        this.ctx.strokeStyle = strokeColor;
        this.ctx.lineWidth = lineWidth;
        this.ctx.stroke();
    }   
    */

    // lines
    //.................................................................................    

    public drawLine(pointA:Point2d,pointB:Point2d,lineWidth:number,strokeColor:string) {
        this.ctx.lineWidth = lineWidth;
        this.ctx.strokeStyle = strokeColor;
        this.ctx.beginPath();
        this.ctx.moveTo(pointA.x, pointA.y);
        this.ctx.lineTo(pointB.x, pointB.y);
        this.ctx.closePath();
        this.ctx.stroke();
    }//end

    public drawLine2d(line2d:Line2d,lineWidth:number,color:string) {
        this.drawLine(line2d.start,line2d.end,lineWidth,color);
    };//end
    
    public drawLines2d(lines2d:Line2d[],lineWidth:number,color:string) {
        for(const line of lines2d) {
            this.drawLine2d(line,lineWidth,color);
        }
    };//end

    // rectangles
    //.................................................................................

    public drawRect(point: Point2d, dim: TDimension, color: string) {
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = color;
        this.ctx.strokeRect(point.x, point.y, dim.width, dim.height);
        this.ctx.stroke();
    };//end

    public fillRect(point: Point2d, dim: TDimension, color: string) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(point.x, point.y, dim.width, dim.height);
    };//end

    public drawRectangle(rect2d: Rectangle2d) {
        this.drawRect(rect2d.position, rect2d.dim, rect2d.color);
    };//end


    // polygons
    //.................................................................................
    public drawRay(points: Point2d[], color: string) {
        if (points.length < 3) return;
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            this.ctx.lineTo(points[i].x, points[i].y);
        }
        //this.ctx.closePath();
        this.ctx.stroke();
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

    public drawImageBitmap(img:ImageBitmap, pointxy:Point2d, alpha?:number): void {
        this.ctx.globalAlpha = alpha?? 1;
        this.ctx.drawImage(img, pointxy.x, pointxy.y, img.width, img.height);
        this.ctx.globalAlpha = 1;
    }//end

    public drawImageBitmapDim(img: ImageBitmap, pointxy: Point2d, dimension: TDimension, alpha?: number): void {
        this.ctx.globalAlpha = alpha?? 1;
        this.ctx.drawImage(img, pointxy.x, pointxy.y, dimension.width, dimension.height);
        this.ctx.globalAlpha = 1;
    }//end


    public drawMemoryImagen(objectURL: string, pointxy: Point2d, dimension: TDimension) {
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
        this.ctx.ellipse(position.x, position.y, width, height, Plane2dPainter.ROTATION_NONE, startAngle, Math.PI * 2);
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    };//end

    // gradients
    //.................................................................................
    public paintGradientsOld(gradients:CircunfGradient[]) {
        
        const width = this.dim.width;
        const height = this.dim.width;
        const backcolorVal = 255; 
       
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {

                let maxIntensity = 0;
                for (const grad of gradients) {
                    const dx     = (x - grad.position.x * width) / (grad.radius * width);
                    const dy     = (y - grad.position.y * height) / (grad.radius * width);
                    const cos    = Math.cos(grad.rotation * (-1));
                    const sin    = Math.sin(grad.rotation * (-1));
                    const tdx    = (dx * cos - dy * sin) / grad.scale.x;
                    const tdy    = (dx * sin + dy * cos) / grad.scale.y;
                    const distSq = tdx * tdx + tdy * tdy;

                    if (distSq < 1) {
                        const falloff = Math.exp(-distSq * 5);
                        const currentIntensity = grad.intensity * falloff;
                        maxIntensity = Math.max(maxIntensity, currentIntensity);
                    }
                }//end for gradients

                //calculate color
                const finalIntensity = Math.min(maxIntensity, 1.0);              
                const colorVal = backcolorVal - Math.round(backcolorVal * finalIntensity);
                const colorHex = GraphColoUtil.toHexadecimal(colorVal);
                this.paintPixel({x: x, y: y}, colorHex);                                
            }//end for x
        }//end for y

    };//end

    public paintCfsGradients(gradients: CircunfGradient[]) {
        const width = this.dim.width;
        const height = this.dim.width;
        const backcolorVal = 255;

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let maxIntensity = 0;
                
                for (const grad of gradients) {            
                    const dx = (x - grad.position.x) / (grad.radius * width);
                    const dy = (y - grad.position.y) / (grad.radius * width);
                    const cos = Math.cos(grad.rotation * (-1));
                    const sin = Math.sin(grad.rotation * (-1));
                    const tdx = (dx * cos - dy * sin) / grad.scale.x;
                    const tdy = (dx * sin + dy * cos) / grad.scale.y;
                    const distSq = tdx * tdx + tdy * tdy;
                    if (distSq < 1) {
                        const falloff = Math.exp(-distSq * 5);
                        const currentIntensity = grad.intensity * falloff;
                        maxIntensity = Math.max(maxIntensity, currentIntensity);
                    }
                }
                // Calculate color
                const finalIntensity = Math.min(maxIntensity, 1.0);
                const colorVal = backcolorVal - Math.round(backcolorVal * finalIntensity);
                const colorHex = GraphColoUtil.toHexadecimal(colorVal);

                this.paintPixel({x: x, y: y}, colorHex);
                
            }//end for x

        }//end for y

    }//end

    public paintPointsGradients(gradients:PointGradient[]) {
        const width = this.dim.width;
        const height = this.dim.width;
        const backcolorVal = 255;

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let maxIntensity = 0;
                
                for (const grad of gradients) {            
                    const dx = (x - grad.position.x) / (grad.radius * width);
                    const dy = (y - grad.position.y) / (grad.radius * width);
                    const cos = Math.cos(0);
                    const sin = Math.sin(0);
                    const tdx = (dx * cos - dy * sin);
                    const tdy = (dx * sin + dy * cos);
                    const distSq = tdx * tdx + tdy * tdy;
                    if (distSq < 1) {
                        const falloff = Math.exp(-distSq * 5);
                        const currentIntensity = grad.intensity * falloff;
                        maxIntensity = Math.max(maxIntensity, currentIntensity);
                    }
                }
                // Calculate color
                const finalIntensity = Math.min(maxIntensity, 1.0);
                const colorVal = backcolorVal - Math.round(backcolorVal * finalIntensity);
                const colorHex = GraphColoUtil.toHexadecimal(colorVal);

                this.paintPixel({x: x, y: y}, colorHex);
                
            }//end for x

        }//end for y

    }//end


}//end class
