//src\common\math\xmath.ts

import { TDimension } from "@/common/types";
import { Vector2d } from "@/math2d/math2dtypes";

// !!!! npm i geometric -S !!! 

/**
 * class XMath2d.getCenterPoint
 */
export class XMath2d {

    public static readonly RAD: number = Math.PI / 180;
    public static readonly DEG_TO_RAD_FACTOR: number = 180 / Math.PI;
    public static readonly ROTATION_0: number = 0;
    public static VECTOR_0: Vector2d = { x: 0, y: 0 };
    public static DIM_0: TDimension = { width: 0, height: 0 };

    public static esPar(numero: number): boolean {
        if (numero % 2 === 0) {
            return true;
        } 
        return false;
    };//end


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

	public static getAngleInc(pAng_Init: number, pAng_Inc: number):number {
        let angRes = pAng_Init + pAng_Inc;
        if (angRes >= (Math.PI * 2)) {
            angRes = angRes - (Math.PI * 2);
        }
        return (angRes);
    }//end

	public static getAngleDec(pAng_Init: number, pAng_Inc: number):number  {
        let angRes = pAng_Init - pAng_Inc;
        if (angRes < ((Math.PI * 2) * (-1))) {
            angRes = angRes + (Math.PI * 2);
        }
        return (angRes);
    }		

}//end class