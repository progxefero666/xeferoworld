//src\common\math\xmath.ts

import { Line2d, Point2d, TDimension } from "@/common/types";
import { Vector2d } from "@/math2d/math2dtypes";

// !!!! npm i geometric -S !!! 

/**
 * class XMath2d.getPointsDistance
 */
export class XMath2d {

    public static readonly RAD: number = Math.PI / 180;
    public static readonly DEG_TO_RAD_FACTOR: number = 180 / Math.PI;
    public static readonly ROTATION_0: number = 0;
    public static CC: Point2d = {x:0,y:0};

    public static DIM_0: TDimension = { width: 0, height: 0 };


    public static toRadians(valueDegrees: number): number {
        return valueDegrees * XMath2d.RAD;
    };//end

    public static esPar(numero: number): boolean {
        if (numero % 2 === 0) {
            return true;
        }
        return false;
    };//end

    public static getAngleInc(pAng_Init: number, pAng_Inc: number): number {
        let angRes = pAng_Init + pAng_Inc;
        if (angRes >= (Math.PI * 2)) {
            angRes = angRes - (Math.PI * 2);
        }
        return (angRes);
    }//end

    public static getAngleDec(pAng_Init: number, pAng_Inc: number): number {
        let angRes = pAng_Init - pAng_Inc;
        if (angRes < ((Math.PI * 2) * (-1))) {
            angRes = angRes + (Math.PI * 2);
        }
        return (angRes);
    }//end

    public static getPointsAngleInPlain(point_0: Vector2d, point_1: Vector2d): number {
        return Math.atan2(
            (point_1.y - point_0.y),
            (point_1.x - point_0.x));
    };//end

    public static getPointsDistance(pointA: Vector2d, pointB: Vector2d): number {
        const dx = pointA.x - pointB.x;
        const dy = pointA.y - pointB.y;
        return Math.sqrt(dx * dx + dy * dy);
    };//end

    public static getCenterPoint(point_0: Vector2d, point_1: Vector2d): Vector2d {
        const x = (point_0.x + point_1.x) / 2;
        const y = (point_0.y + point_1.y) / 2;
        return { x, y };
    };//end

    public static getDistancePointToLine(point: Vector2d, a: Vector2d, b: Vector2d): number {
        const x = a.x, y = a.y;
        const dx = b.x - x, dy = b.y - y;
        if (dx === 0 && dy === 0) return Math.hypot(point.x - x, point.y - y);
        const t = ((point.x - x) * dx + (point.y - y) * dy) / (dx * dx + dy * dy);
        const tt = Math.max(0, Math.min(1, t));
        const projx = x + tt * dx, projy = y + tt * dy;
        return Math.hypot(point.x - projx, point.y - projy);
    }

    public static getDistancePointToLineOld(point: Vector2d, line: Line2d): number {

        const lineDeltaX = line.end.x - line.start.x;
        const lineDeltaY = line.end.y - line.start.y;
        const lineLengthSq = lineDeltaX ** 2 + lineDeltaY ** 2;
        const dx = (point.x - line.start.x) * lineDeltaX;
        const dy = (point.y - line.start.y) * lineDeltaY;
        const t = (dx + dy) / lineLengthSq;

        // Si 't' está fuera del rango [0, 1], el punto más cercano en la línea
        // es uno de los extremos.
        if (t < 0) {
            return XMath2d.getPointsDistance(point, line.start);
        }
        else if (t > 1) {
            return XMath2d.getPointsDistance(point, line.end);
        }
        else {
            const projection: Vector2d = {
                x: line.start.x + t * lineDeltaX,
                y: line.start.y + t * lineDeltaY
            };
            return XMath2d.getPointsDistance(point, projection);
        }
    } //end  

    public static getLinePoints(start:Vector2d,end:Vector2d,countSegments:number): Vector2d[] {
        const deltaX = (end.x - start.x) / countSegments;
        const deltaY = (end.y - start.y) / countSegments;

        const points: Vector2d[] = [];
        points.push({ x: start.x, y: start.y });
        for (let i = 1; i < countSegments; i++) {
            points.push({
                x: start.x + (deltaX * i),
                y: start.y + (deltaY * i)
            });
        }
        points.push({ x: end.x, y: end.y });
        return points;
    }//end

}//end class