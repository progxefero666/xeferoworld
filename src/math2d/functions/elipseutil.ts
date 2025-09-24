//src\math2d\math2dcurve.ts

import { TDimension } from "@/common/types";
import { Point2d } from "@/lib/graph2d/types2d";
import { Vector2d } from "@/math2d/math2dtypes";
import { XMath2d } from "@/math2d/xmath2d";
import { XMath2dUtil } from "@/math2d/functions/xmath2dutil";




/**
 * class ElipseUtil.getElipsePoints
 */
export class ElipseUtil {


    public static getElipsePoints(center:Point2d,size:TDimension,
                                  rotation:number,countPoints:number): Point2d[] {

        const points: Point2d[] = [];
        const a = size.width / 2;
        const b = size.height / 2;
        const angleStep = (2 * Math.PI) / countPoints;
        for (let i = 0; i < countPoints; i++) {
            const t = i * angleStep;
            const x = a * Math.cos(t);
            const y = b * Math.sin(t);
            const xr = x * Math.cos(rotation) - y * Math.sin(rotation);
            const yr = x * Math.sin(rotation) + y * Math.cos(rotation);
            points.push({x:center.x+ xr,y:center.y+ yr});
        }
        return points;
    }//end
    
    public static getElipseEscaledPoints(position: Point2d,
                                         radius: number,
                                         scale: TDimension,
                                         rotation: number,
                                         countPoints: number): Point2d[] {
        const size: TDimension = {
            width:XMath2dUtil.getValue100(radius,scale.width),
            height:XMath2dUtil.getValue100(radius,scale.height)};
            
        return ElipseUtil.getElipsePoints(position,size,rotation,countPoints);
    }//end    

    public static getElipsePointsOld(positionsizeX: number,
        size: TDimension,
        rotation: number,
        countPoints: number): Point2d[] {
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

    public static getElipseHalfRangePoints(start: Vector2d, end: Vector2d,
        radiusFactor: number,
        rangeMax: number,
        countPoints: number,
        dirCw: boolean): Point2d[] {
        const endAngleCalc = XMath2dUtil.getValue100(Math.PI, rangeMax);

        const center: Vector2d = XMath2d.getCenterPoint(start, end);
        const rotAngle = XMath2d.getPointsAngleInPlain(start, end);
        const elipseRadiusX = XMath2d.getPointsDistance(start, end) / 2;
        const elipseRadiusY = XMath2dUtil.getValue100(elipseRadiusX, radiusFactor);
        const rotAngleCos = Math.cos(rotAngle);
        const rotAngleSin = Math.sin(rotAngle);

        const startAngle = dirCw ? Math.PI : 0;
        const endAngle = dirCw ? (Math.PI - endAngleCalc) : endAngleCalc;
        const diffAngle = endAngle - startAngle;

        const points: Point2d[] = [];
        for (let idx = 0; idx < countPoints; idx++) {
            const value_t = idx / (countPoints - 1);
            const angle = startAngle + (value_t * diffAngle);

            const localX = elipseRadiusX * Math.cos(angle);
            const localY = elipseRadiusY * Math.sin(angle);
            const value_x = center.x + (localX * rotAngleCos - localY * rotAngleSin);
            const value_y = center.y + (localX * rotAngleSin + localY * rotAngleCos);
            points.push({ x: value_x, y: value_y });
        }
        return points;
    };//end

    public static getElipseHalfAllPoints(start: Vector2d, end: Vector2d,
        radiusFactor: number,
        countPoints: number,
        dirCw: boolean): Point2d[] {

        const center: Vector2d = XMath2d.getCenterPoint(start, end);
        const rotAngle = XMath2d.getPointsAngleInPlain(start, end);
        const elipseRadiusX = XMath2d.getPointsDistance(start, end) / 2;
        const elipseRadiusY = XMath2dUtil.getValue100(elipseRadiusX, radiusFactor);
        const rotAngleCos = Math.cos(rotAngle);
        const rotAngleSin = Math.sin(rotAngle);

        const startAngle = dirCw ? Math.PI : 0;
        const endAngle = dirCw ? 0 : Math.PI;
        const diffAngle = endAngle - startAngle;

        const points: Point2d[] = [];
        for (let idx = 0; idx < countPoints; idx++) {
            const value_t = idx / (countPoints - 1);
            const angle = startAngle + (value_t * diffAngle);

            const localX = elipseRadiusX * Math.cos(angle);
            const localY = elipseRadiusY * Math.sin(angle);
            const value_x = center.x + (localX * rotAngleCos - localY * rotAngleSin);
            const value_y = center.y + (localX * rotAngleSin + localY * rotAngleCos);
            points.push({ x: value_x, y: value_y });
        }
        return points;
    }//end

}//end