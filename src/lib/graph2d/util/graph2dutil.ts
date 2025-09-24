//src\lib\graph2d\util\graph2dutil.ts

import {TDimension, Point2d} from "@/common/types";
import { XMath2dUtil } from "@/math2d/functions/xmath2dutil";

/**
 * class Graph2dUtil.toGraphPoint
 */
export class Graph2dUtil {

    public static toGraphPoint(point: Point2d): Point2d {
        return {x:point.x,y:point.y};
    }//end

    public static toArrayGraphPoints(points: Point2d[]): Point2d[] {
        return points.map(point => Graph2dUtil.toGraphPoint(point));
    }//end

    public static scalePlPointToCanvasDim(cvDim:TDimension,planeDim:TDimension,point:Point2d): Point2d {
        const percentX = XMath2dUtil.getPercent100(planeDim.width,point.x);
        const percentY = XMath2dUtil.getPercent100(planeDim.height,point.y);
        const canvasX = Math.floor(XMath2dUtil.getValue100(cvDim.width,percentX));
        const canvasY = Math.floor(XMath2dUtil.getValue100(cvDim.height,percentY));
        return {x:canvasX,y:canvasY};    
    }//end 

    public static scalePolyToCanvasDim(cvDim:TDimension,planeDim:TDimension,polyPoints:Point2d[]): Point2d[] {
        const canvasPoints:Point2d[] = [];
        for(let idx=0;idx<polyPoints.length;idx++){
            const scaledPoint = Graph2dUtil
                .scalePlPointToCanvasDim(cvDim,planeDim,polyPoints[idx])
            canvasPoints.push(scaledPoint);
        }
        return canvasPoints;
    }//end

}//end class Graph2d