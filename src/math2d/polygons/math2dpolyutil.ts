import { TDimension, Vector2d } from "@/common/types";

const geometric = require("geometric");

/**
 * class XMath2dPolyUtil
 */
export class XMath2dPolyUtil  {

    public static getMinDistToLimits(center: Vector2d,
                                      boundsX:number[],
                                      boundsY:number[],
                                      point:Vector2d): number {        
        let distX: number = 0;
        if(point.x>=center.x) {distX=boundsX[1]-point.x;}
        else                       {distX=point.x-boundsX[0];}
        let distY: number = 0;
        if(point.y>=center.y){distY = boundsY[1]-point.y;}
        else                      {distY = point.y -boundsY[0];}
        return Math.min(distX, distY);
    };//end

}//end 