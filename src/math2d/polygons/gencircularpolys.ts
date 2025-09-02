//src\math2d\polygons\genpolysround.ts

import { TDimension } from "@/common/types";
import { Point2d } from "@/lib/graph2d/types2d";


/**
 * class GenCircularPolys
 */
export class GenCircularPolys {


    public static getElipsePoints(positionsizeX:number,size:TDimension,rotation:number,countPoints:number): Point2d[] {
        const points: Point2d[] = [];
        const a = size.width / 2;
        const b = size.height / 2;        
        const rotationInRadians = rotation * (Math.PI / 180);
        const angleIncrement = (2 * Math.PI) / countPoints;

        for (let i = 0; i < countPoints; i++) {
            const t = i * angleIncrement;
            const x = a * Math.cos(t);
            const y = b * Math.sin(t);
            const rotatedX = x * Math.cos(rotationInRadians) - y * Math.sin(rotationInRadians);
            const rotatedY = x * Math.sin(rotationInRadians) + y * Math.cos(rotationInRadians);
            const finalX = positionsizeX + rotatedX;
            const finalY = rotatedY; // Asumiendo que el centro en Y es 0
            points.push({ x: finalX, y: finalY });
        }
        return points;
    };//end

};//end