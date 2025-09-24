//src\app\diagrams\xefero\diagramcanvas.ts

import { CvPainter } from "@/lib/graph2d/painters/cvpaint";
import { Dim2d, Point2d } from "@/lib/graph2d/types2d";


/**
 * DiagramCanvas class
 */
export class PainterTextureCanvas {

    public ctx: CanvasRenderingContext2D;
    public dim: Dim2d;
    public backcolor: string;
    public center: Point2d = { x: 0, y: 0 };
    public painter:CvPainter;

    constructor(ctx: CanvasRenderingContext2D, dimension: Dim2d, backcolor: string) {
        this.ctx = ctx;
        this.dim = dimension;
        this.backcolor = backcolor;
        this.center.x = Math.floor(this.dim.width / 2);
        this.center.y = Math.floor(this.dim.height / 2);
        this.painter = new CvPainter(ctx, dimension, backcolor);

        this.painter.fillback(this.backcolor);
    };//end
    
    public clear() {
        this.ctx.clearRect(0, 0, this.dim.width, this.dim.height);
    };

    public render_bitmap(imgbitmap:ImageBitmap) {
        const position: Point2d = {x:1,y:1};
        this.painter.drawImageBitmap(imgbitmap,position);
    };

}//end class