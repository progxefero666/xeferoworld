//src\app\diagrams\xefero\diagramcanvas.ts


import { ObjectPoly } from "@/lib/graph2d/model/objpoly";
import { SimplePoly } from "@/lib/graph2d/model/simplepoly";
import { Dim2d, Point2d } from "@/lib/graph2d/types2d";
import { Plane2dPainter } from "@/math2d/graph/plane2dpainter";
import { Vector2d } from "@/math2d/math2dtypes";
import { Zone2d } from "@/terrains/model/zone";



/**
 * DiagramCanvas class
 */
export class WorldPainter {

    public ctx: CanvasRenderingContext2D;
    public dim: Dim2d;
    public backcolor: string= "#000000";
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

    public renderZones(listPolys:ObjectPoly[]) {  
        const intCfColor ="#ffffff";

        for(let idx=0; idx<listPolys.length; idx++) {
            this.painter.drawfillPolygon(listPolys[idx].points,
                listPolys[idx].color?.back!,        
                listPolys[idx].color?.border!);

            this.painter.drawCf(listPolys[idx].intCircunf.position,3,1,intCfColor);
            this.painter.drawCf(
                listPolys[idx].intCircunf.position,
                listPolys[idx].intCircunf.radius,1,
                intCfColor);            
        }
    };

    public renderZoneGridFaces(zoneFaces:SimplePoly[]) { 
        for(let idx=0; idx<zoneFaces.length; idx++) {
            this.painter.drawPolygon(zoneFaces[idx].points,                      
                zoneFaces[idx].colorborder);
        }
    }

    public renderBitmap(imgbitmap:ImageBitmap) {
        const position: Vector2d = {x:0,y:0};
        this.painter.drawImageBitmap(imgbitmap, position,1);
    };

}//end class