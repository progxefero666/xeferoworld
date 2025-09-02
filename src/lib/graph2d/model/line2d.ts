//src\graph2d\model\line2d.ts

import { Point2d } from "@/lib/graph2d/types2d";

export class Line2d {

    public static DEF: Line2d = new Line2d({x:0,y:0},{x:1,y:1},"#ffffff");
    public color: string = "#ffffffff";
    public start: Point2d;
    public end: Point2d;
    public width: number=1;

    constructor(start:Point2d,end:Point2d,color:string,width?:number) {
        this.start = start;
        this.end = end;
        this.color = color;
        if (width) this.width = width;
    }

    public length(): number {
        const dx = this.end.x - this.start.x;
        const dy = this.end.y - this.start.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    public midpoint(): Point2d {
        return {
            x: (this.start.x + this.end.x) / 2,
            y: (this.start.y + this.end.y) / 2
        };
    }
}