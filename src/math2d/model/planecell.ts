//src\math2d\model\planepolyface.ts

import { TPolyColor, Point2d } from "@/common/types";
import { XMath2dPoly } from "@/math2d/polygons/mathpoly";


/**
 * class ThPlanePolyFace
 */
export class Plane2dCell {
    
    public color:TPolyColor = {back:"#ffffff",border:"#ffffff"};
    public position:Point2d;
    public indices:number[] = [];
    public points:Point2d[];
    public zoneIndex:number = -1;

    constructor(indices: number[], points: Point2d[]) {
        this.points = points;
        this.indices = indices;
        // Centro geométrico de los 4 puntos (promedio)
        if (points.length === 4) {
            this.position = {
                x: (points[0].x + points[1].x + points[2].x + points[3].x) / 4,
                y: (points[0].y + points[1].y + points[2].y + points[3].y) / 4
            };
        } else {
            // fallback: usa el método genérico
            this.position = XMath2dPoly.getCenter(points);
        }
    }//end

    public assignZone(zoneIdx:number,color:TPolyColor ):void {
        this.zoneIndex = zoneIdx; 
        this.color = color;
    }//end

}//end