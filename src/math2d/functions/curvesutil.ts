//src\math2d\functions\genturfcurves.ts


import { Point2d } from "@/lib/graph2d/types2d";
import { Vector2d } from "../math2dtypes";


/**
 * class CurvesUtil
 *  resolution: 10000 --> Más puntos = curva más suave
 *  sharpness: 0.85  --> 0-1, control de curvatura
 *
 */
export class CurvesUtil {

    public static  getIntensityDirChange(p0: Point2d, p1: Point2d, p2: Point2d): number {        
        const angle1 = Math.atan2(p1.y - p0.y, p1.x - p0.x); 
        const angle2 = Math.atan2(p2.y - p1.y, p2.x - p1.x);        
        let rotIntensity     = angle2 - angle1;        
        // Normalize to [-π, π]
        while (rotIntensity > Math.PI) rotIntensity -= 2 * Math.PI;
        while (rotIntensity < -Math.PI) rotIntensity += 2 * Math.PI;
        return Math.abs(rotIntensity);
    }//end

    public static autoRefinePoints(points: Point2d[], maxAngleChange = Math.PI/3): Point2d[] {
        const refined: Point2d[] = [points[0]];        
        for (let i = 1; i < points.length - 1; i++) {
            refined.push(points[i]);            
            const angleChange = CurvesUtil.getIntensityDirChange(points[i-1], points[i], points[i+1]);
            if (angleChange > maxAngleChange) {
                // Add inter point
                const mid = {
                    x: (points[i].x + points[i+1].x) / 2,
                    y: (points[i].y + points[i+1].y) / 2
                };
                refined.push(mid);
            }
        }
        refined.push(points[points.length - 1]);
        return refined;
    }//end

    public static getCubicBezierPoints(start:Vector2d,ctr1:Vector2d,ctr2:Vector2d,end: Vector2d,
                                       countPoints:number): Vector2d[] {
        const points: Vector2d[] = [];
        
        for (let i = 0; i < countPoints; i++) {
            const t = i / (countPoints - 1);
            const t2 = t * t;
            const t3 = t2 * t;
            const mt = 1 - t;
            const mt2 = mt * mt;
            const mt3 = mt2 * mt;

            const x = mt3 * start.x + 3 * mt2 * t * ctr1.x +
                3 * mt * t2 * ctr2.x + t3 * end.x;
            const y = mt3 * start.y + 3 * mt2 * t * ctr1.y +
                3 * mt * t2 * ctr2.y + t3 * end.y;

            points.push({ x, y });
        }
        return points;
    }//end

}//end