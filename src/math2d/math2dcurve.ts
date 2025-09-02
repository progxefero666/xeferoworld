//src\math2d\math2dcurve.ts

import { Vector2d } from "@/math2d/math2dtypes";
import { XMath2d } from "@/math2d/xmath2d";
import { XMath2dUtil } from "@/math2d/xmath2dutil";

/**
 * class Math2DCurve.getSimpleCurvePoints
 */
export class Math2DCurve {

    public static getSimpleCurvePoints(start:Vector2d,
                                       end:Vector2d,
                                       radiusPercentY:number,
                                       countPoints:number,
                                       dirCw:boolean):Vector2d[] {

        const center: Vector2d = XMath2d.getCenterPoint(start, end);
        const elipseRadiusX = XMath2d.getPointsDistance(start, end) / 2;
        const elipseRadiusY = XMath2dUtil.getValue100(elipseRadiusX, radiusPercentY);        
        //const rotationAngle = Math.atan2(end.y - start.y, end.x - start.x);
        const rotationAngle = 0.0;
        const startAngle    = dirCw ? Math.PI : 0;
        const endAngle      = dirCw ? 0 : Math.PI;

        const points:Vector2d[] = [];
        for (let idx = 0; idx < countPoints; idx++) {
            const t = idx / (countPoints - 1); // t va de 0 a 1
            let angle = startAngle + t * (endAngle - startAngle);
            const value_x = center.x + (elipseRadiusX * Math.cos(angle));
            const value_y = center.y +(elipseRadiusY * Math.sin(angle));
            points.push({ x:value_x, y:value_y });
        }
        return points;
    }//end

    /*
            const x_rot = center.x + x_prime * Math.cos(rotationAngle) 
                               - y_prime * Math.sin(rotationAngle);
            const y_rot = center.y + x_prime * Math.sin(rotationAngle)
                               + y_prime * Math.cos(rotationAngle);
            points.push({ x_rot, y_rot });    
    */
}//end