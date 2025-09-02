//src\universo3d\spaceship\controls\flyrollpainter.ts


import { Line2d, TDimension } from "@/common/types";
import { Point2d, TCfMarksConfig } from "@/lib/graph2d/types2d";
import { MarksUtil } from "@/lib/graph2d/util/marksutil";
import { Plane2dPainter } from "@/math2d/graph/plane2dpainter";
import { Vector2d } from "@/math2d/math2dtypes";
import { XMath2dCircf } from "@/math2d/xmath2dcircf";
import { XMath2dUtil } from "@/math2d/xmath2dutil";



/**
 * class FlyRollPainter.EXT_BORDER_COLOR
 */
export class FlyRollPainter {

    public static SIZE_FACTOR:number = 80.0;
    public static EXT_BORDER_COLOR: any = "#2d2d2dff";
    public static INT_BORDER_COLOR: any = "#535252ff";

    public ctx: CanvasRenderingContext2D;
    public sideLength: number;
    public center: Point2d = { x: 0, y: 0 };
    public painter:Plane2dPainter;
    public radiusBorder:number= 0;
    public radiusObject:number= 0;
    public frontcolor: any = "#1c1c1eff";

    public backcolor: string= "#73adf9ff";
    public objcolor: string= "#269401ff";

    public marksConfig: TCfMarksConfig;
    public marks: Line2d[] = [];

    constructor(ctx: CanvasRenderingContext2D,sideLength:number,marksConfig:TCfMarksConfig) {
        this.ctx = ctx;
        this.sideLength = sideLength;
        this.marksConfig = marksConfig;
        this.center.x = Math.floor(sideLength / 2);
        this.center.y = Math.floor(sideLength / 2);

        this.painter = new Plane2dPainter
            (ctx,{width:this.sideLength,height:this.sideLength},this.backcolor);

        this.init();
    };//end
    
    public init() {
        const halfLength:number = this.sideLength/2.0;
        this.radiusBorder = Math.floor
            (XMath2dUtil.getValue100(halfLength,FlyRollPainter.SIZE_FACTOR));   
        this.radiusObject = this.radiusBorder - 4;
        this.marks =  MarksUtil.getCfMarks(this.center,this.radiusObject,this.marksConfig);
    };

    public clear() {
        this.ctx.clearRect(0, 0, this.sideLength, this.sideLength);
    };

    public render(rotation:number) {

        this.painter.fillbackColor(this.frontcolor);
        this.painter.drawCf(this.center,this.radiusBorder,2,FlyRollPainter.EXT_BORDER_COLOR);
        this.painter.drawCf(this.center,(this.radiusBorder-2),2,FlyRollPainter.INT_BORDER_COLOR);

        const diameterLine:Line2d= XMath2dCircf.getCfDiameterLine(this.center,this.radiusObject,rotation);
        const polyPoints:Vector2d[] = XMath2dCircf.getCfArcPiPoints(this.center,this.radiusObject,rotation);
        this.painter.fillPolygon(polyPoints,this.objcolor);

        this.painter.drawLines2d(this.marks,1,"#ffffff");

        this.painter.drawLine2d(diameterLine,2,"#ffffff");
    };
    

}//end class