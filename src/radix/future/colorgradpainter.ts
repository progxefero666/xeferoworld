//src\universo3d\spaceship\controls\flyrollpainter.ts


import { Line2d, TDimension } from "@/common/types";
import { Point2d, TCfMarksConfig } from "@/lib/graph2d/types2d";
import { MarksUtil } from "@/lib/graph2d/util/marksutil";
import { Plane2dPainter } from "@/math2d/graph/plane2dpainter";
import { Vector2d } from "@/math2d/math2dtypes";

import { XMath2dUtil } from "@/math2d/functions/xmath2dutil";
import { CircunfUtil } from "@/math2d/functions/circunfutil";



/**
 * class FlyRollPainter.EXT_BORDER_COLOR
 */
export class ColorGradPainter {

    public static SIZE_FACTOR:number = 80.0;
    public static EXT_BORDER_COLOR: any = "#2d2d2dff";
    public static INT_BORDER_COLOR: any = "#535252ff";

    public ctx: CanvasRenderingContext2D;
    public width: number;
    public center: Point2d = { x: 0, y: 0 };
    public painter:Plane2dPainter;
    public radiusBorder:number= 0;
    public radiusObject:number= 0;
    public frontcolor: any = "#1c1c1eff";

    public backcolor: string= "#ffffff";
    public barcolor: string= "#014ab8ff";
    public barDim: TDimension;
    //drawRect(point: Point2d, dim: TDimension, color: string) {


    constructor(ctx: CanvasRenderingContext2D,width:number) {
        this.ctx = ctx;
        this.width = width;
        this.painter = new Plane2dPainter
            (ctx,{width:this.width,height:32},this.backcolor);
            
        this.barDim = {width:this.width,height:14};
        this.init();
        this.clear();
    };//end
    
    public init() {
        //Circunf2d
    };

    public clear() {
        this.painter.fillbackColor(this.backcolor);
    };

    public render() {

    };
    

}//end class