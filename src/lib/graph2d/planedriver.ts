//src\lib\graph2d\planedriver.ts

import { TDimension } from "@/common/types";
import { Point2d } from "@/lib/graph2d/types2d";


/**
 * class PlaneDriver
 */
export class Planedriver {

    public dimension:TDimension;
    public center: Point2d;
    
    constructor(dimension:TDimension) {
        this.dimension = dimension;
        this.center = {
            x:Math.floor(dimension.width / 2),
            y:Math.floor(dimension.height / 2)};
    }//end

    public getPoint(originPoint:Point2d):Point2d {
        return {
            x: this.center.x + originPoint.x,
            y: this.center.y - originPoint.y};
    }//end

    public getListPoint(originPoints:Point2d[]):Point2d[] {
        return originPoints.map((p:Point2d) => this.getPoint(p));
    }//end

}//end