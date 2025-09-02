//src\app\diagrams\xefero\diagramcanvas.ts

import { CvPainter } from "@/lib/graph2d/painters/cvpaint";
import { CvPaintConnections } from "@/lib/graph2d/painters/cvpaintsconns";
import { CvPaintShapes } from "@/lib/graph2d/painters/cvpaintshapes";
import { ShapeArrow } from "@/lib/graph2d/shapes/shapearrow";
import { ShapeCylinder } from "@/lib/graph2d/shapes/shapecylinder";
import { Dim2d, Point2d } from "@/lib/graph2d/types2d";

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

/**
 * DiagramCanvas class
 */
export class CvPainterDiagrams {

    public ctx: CanvasRenderingContext2D;
    public dim: Dim2d;
    public backcolor: string;
    public center: Point2d = { x: 0, y: 0 };
    public painter:CvPainter;
    public paintershapes:CvPaintShapes;
    public painterConns:CvPaintConnections;


    constructor(ctx: CanvasRenderingContext2D, dimension: Dim2d, backcolor: string) {
        this.ctx = ctx;
        this.dim = dimension;
        this.backcolor = backcolor;
        this.center.x = Math.floor(this.dim.width / 2);
        this.center.y = Math.floor(this.dim.height / 2);
        this.painter = new CvPainter(ctx, dimension, backcolor);
        this.paintershapes = new CvPaintShapes(ctx);
        this.painterConns = new CvPaintConnections(ctx);
    };//end
    
    public clear() {
        this.ctx.clearRect(0, 0, this.dim.width, this.dim.height);
    };

    public render_a() {    
        const position: Point2d = {x:200,y:200};      
        const target: Point2d = {x:300,y:280};  

        const arrow:ShapeArrow = new ShapeArrow(position,null,"#c72b08ff","#ffffffff",target,10);
        this.painterConns.drawArrow(arrow);
    };

    public render_b() {        
        const position: Point2d = {x:200,y:200};        
        const cylinder: ShapeCylinder = new ShapeCylinder(position,{width:70,height:70},"blue","white");
        this.paintershapes.drawCylinder(cylinder);
    };

    public render_c(imgbitmap:ImageBitmap) {
        const position: Point2d = {x:200,y:200};
        this.painter.drawImageBitmap(imgbitmap, position,1);
    };



}//end class