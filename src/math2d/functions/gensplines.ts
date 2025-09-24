//src\math2d\functions\gensplines.ts

import { Point2d } from "@/lib/graph2d/types2d";

import {point,Lines,lineString, bezierSpline} from '@turf/turf'; 
//import {Grid} from '@turf/helpers'; 
//import {buffer} from '@turf/buffer'; 

/**
 * class GenSplines.getSplinePoints
 */
export class GenSplines {

    public static getSplinePoints(controlPoints:Point2d[],
                                  resolution:number,sharpness:number): Point2d[] {
        const positions: [number, number][] = controlPoints.map(pt => [pt.x, pt.y]);
        const cartesianLine = lineString(positions);
        const spline = bezierSpline(cartesianLine,{resolution:resolution,sharpness:sharpness});     
        const points: Point2d[] = spline
            .geometry.coordinates.map(p=>({x:p[0],y:p[1]}));
        return points;
    }//end 

}//end