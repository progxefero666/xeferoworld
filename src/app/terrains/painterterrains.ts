//src\app\diagrams\xefero\diagramcanvas.ts

import { Dim2d, Point2d } from "@/lib/graph2d/types2d";
import { Plane2dPainter } from "@/math2d/graph/plane2dpainter";
import { Vector2d } from "@/math2d/math2dtypes";


/**
 * DiagramCanvas class
 */
export class TerrainsPainter {

    public ctx: CanvasRenderingContext2D;
    public dim: Dim2d;
    public backcolor: string= "#FFFFFF";
    public center: Point2d = { x: 0, y: 0 };
    public painter:Plane2dPainter;

    constructor(ctx: CanvasRenderingContext2D, dimension: Dim2d) {
        this.ctx = ctx;
        this.dim = dimension;
        this.center.x = Math.floor(this.dim.width / 2);
        this.center.y = Math.floor(this.dim.height / 2);
        this.painter = new Plane2dPainter(ctx, dimension, this.backcolor);
    };//end
    
    public clear() {
        this.ctx.clearRect(0, 0, this.dim.width, this.dim.height);
    };

    public renderSingleRiver(linePoints:Vector2d[]) {  
        this.painter.drawRay(linePoints,'red');
    };

    public renderComplexRiver(riverPoints:Vector2d[][]) {  
        for(let idx:number=0;idx<riverPoints.length;idx++) {
            this.painter.drawRay(riverPoints[idx],'blue');
        }
        //this.painter.drawRay(linePoints,'red');
    };

    public renderBitmap(imgbitmap:ImageBitmap) {
        const position: Vector2d = {x:200,y:200};
        this.painter.drawImageBitmap(imgbitmap, position,1);
    };

}//end class