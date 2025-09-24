//C:\Development\apps\xeferoworld\src\math2d\model\elipsecurve.ts

import { TRange } from "@/common/types";
import { Point2d } from "@/lib/graph2d/types2d";

/**
 * class ElipseCurve
 */
export class ElipseCurve {

    public color:any;
    public start: Point2d;
    public end: Point2d;
    public radiusFactor: number;
    public angleRange:TRange;

    public countPoints: number;
    public dirCw:boolean;

    constructor(start:Point2d,end:Point2d,
                color:any,
                radiusFactor:number,
                angleRange:TRange,
                countPoints:number,
                dirCw:boolean) {

        this.start = start;
        this.end = end;
        this.color = color;
        this.radiusFactor = radiusFactor;
        this.angleRange = angleRange;
        this.countPoints = countPoints;
        this.dirCw = dirCw;
    }//end

}//end