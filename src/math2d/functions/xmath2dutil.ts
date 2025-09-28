//src\math2d\xmath2dutil.ts

import { XMath2d } from "@/math2d/xmath2d";
import { Vector2d } from "../math2dtypes";
import { TDimension } from "@/common/types";


/**
 * class XMath2dUtil.getAspect
 */
export class XMath2dUtil {

    public static getPercent100(value100: number, valueCalc: number): number {
        return (valueCalc * 100) / value100;
    };//end

    public static getValue100(value100: number, percCalc: number): number {
        return (value100 * percCalc) / 100.0;
    };//end
    public static toRadians(valueDegrees: number): number {
        return valueDegrees * XMath2d.RAD;
    };//end

    public static toDegrees(valueRad: number): number {
        let valueDegress=  Math.abs(valueRad) * XMath2d.DEG_TO_RAD_FACTOR;
        if(valueRad < 0) {valueDegress *= (-1);}
        return valueDegress;
    };//end


    public static getAleatBoolean(): boolean {
        return Math.random() * 1.0 > 0.5;
    };//end

    public static getAleatNumber(max: number): number {
        return Math.random() * max;
    };//end

    public static getAleatNumberInRange(min:number,max: number): number {
        const valueCalc:number = max - min;
        return min + (valueCalc * Math.random()) ;
    };//end

    public static getAleatInt(max: number): number {
        return Math.floor(Math.random() * max);
    };//end    

    public static getAleatIntInRange(min:number,max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };//end

    public static getAleatAngle(): number {
        return Math.floor(Math.random() * (Math.PI*2));
    };//end

    public static getAleatoryPoint(center:Vector2d, bounds:TDimension): Vector2d {
        const valueCalcX:number = XMath2dUtil.getAleatNumber(bounds.width/2);
        const valueCalcY:number = XMath2dUtil.getAleatNumber(bounds.height/2);

        let coordX: number = valueCalcX;
        if(!XMath2dUtil.getAleatBoolean()){coordX = valueCalcX*(-1);}

        let coordY: number = valueCalcY;
        if(!XMath2dUtil.getAleatBoolean()){coordY = valueCalcY*(-1);}

        const point:Vector2d = {x: center.x + coordX, y: center.y + coordY};
        return point;
    };//end

    public static getPointAtDistance(points:Vector2d[],distance:number):Vector2d {
        let index: number = 0;
        let minDiff: number = Infinity;
        for (let i = 1; i < points.length; i++) {
            const pointDistance: number = XMath2d.getPointsDistance(points[0], points[i]);
            const diff: number = Math.abs(pointDistance - distance);
            if (diff < minDiff) {
                minDiff = diff;
                index = i;
            }
        }
        return points[index];
    };//end
        
}//end class