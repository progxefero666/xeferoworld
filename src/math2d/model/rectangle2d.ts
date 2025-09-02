// src/math2d/model/polygon2d.ts

import { TDimension } from "@/common/types";
import { Vector2d } from "@/math2d/math2dtypes";
import { XMath2d } from "@/math2d/xmath2d";
import { XMath2dPoly } from "@/math2d/polygons/math2dpoly";
import { XMath2dUtil } from "@/math2d/xmath2dutil";
import { XMath2dPolyUtil } from "@/math2d/polygons/math2dpolyutil";

const geometric = require("geometric");

/**
 * class Rectangle 2D
 */
export class Rectangle2d {

    public center: Vector2d;
    public points: Vector2d[];
    public bounds: TDimension = XMath2d.DIM_0;
    public boundsX: number[] = [0.0,0.0];
    public boundsY: number[] = [0.0,0.0];

    constructor(center:Vector2d, bounds:TDimension) {
        this.center = center;
        this.bounds = bounds;
        this.points = XMath2dPoly.getRectanglePoints(this.center,this.bounds);
        this.boundsX[0] = this.center.x - this.bounds.width / 2;
        this.boundsX[1] = this.center.x + this.bounds.width / 2;
        this.boundsY[0] = this.center.y - this.bounds.height / 2;
        this.boundsY[1] = this.center.y + this.bounds.height / 2;
    };//end

    public isPointInside(point:Vector2d): boolean {
        return XMath2dPoly.isPointInsideRect(this, point);
    };//end

    public getAleatoryPoint(): Vector2d {
        const valueCalcX:number = XMath2dUtil.getAleatNumber(this.bounds.width/2);
        const valueCalcY:number = XMath2dUtil.getAleatNumber(this.bounds.height/2);

        let coordX: number = valueCalcX;
        if(!XMath2dUtil.getAleatBoolean()){coordX = valueCalcX*(-1);}

        let coordY: number = valueCalcY;
        if(!XMath2dUtil.getAleatBoolean()){coordY = valueCalcY*(-1);}

        const point:Vector2d = {x: this.center.x + coordX, y: this.center.y + coordY};
        return point;
    };//end

    public getAleatoryPointInLimits(radius:number): Vector2d {
        let point:Vector2d = XMath2d.VECTOR_0;
        let pointFound: boolean = false;
        while(!pointFound){
            point = this.getAleatoryPoint();
            const distToLimits: number = XMath2dPolyUtil
                .getMinDistToLimits(this.center, this.boundsX, this.boundsY, point);
            if(distToLimits <= radius){
                pointFound = true;
            }
        }
        return point;
    };//end


};//end class