//src\terrains\functions\planezonesutil.ts

import { Circunf2d, TDimension } from "@/common/types";
import { ObjectPoly } from "@/lib/graph2d/model/objpoly";
import { SimplePoly } from "@/lib/graph2d/model/simplepoly";
import { Point2d } from "@/lib/graph2d/types2d";
import { Graph2dUtil } from "@/lib/graph2d/util/graph2dutil";
import { Plane2dCell } from "@/math2d/model/planecell";
import { XMath2dUtil } from "@/math2d/functions/xmath2dutil";
import { Zone2d } from "@/terrains/model/zone";

/**
 * class PlaneZonesUtil.getGraphScaledSimplePoly
 */
export class PlaneZonesUtil {

    public static toGraphSimplePoly(poly:Plane2dCell):SimplePoly{
        const graphCenter:Point2d = Graph2dUtil.toGraphPoint(poly.position);
        const graphPoints: Point2d[]=Graph2dUtil.toArrayGraphPoints(poly.points);
        return new SimplePoly(graphCenter,graphPoints,poly.color.back,poly.color.border);     
    }//end

    
    public static getGraphScaledSimplePoly(cvDim:TDimension,planeDim:TDimension,face:Plane2dCell):SimplePoly{
        const graphCenter:Point2d = Graph2dUtil.toGraphPoint(face.position);
        const scaledCenter: Point2d  =Graph2dUtil
            .scalePlPointToCanvasDim(cvDim,planeDim,graphCenter);
        const scaledPoints: Point2d[]=  Graph2dUtil
            .scalePolyToCanvasDim(cvDim,planeDim,Graph2dUtil.toArrayGraphPoints(face.points));
        return new SimplePoly(scaledCenter,scaledPoints,face.color.back,face.color.border);     
    }//end    
    

    public static getZoneGridFacesPolys(cvDim:TDimension,planeDim:TDimension,zone:Zone2d):SimplePoly[]{
        const faces:SimplePoly[] = [];
        for(let i=0;i<zone.gridFaces.length;i++){
            const face:Plane2dCell = zone.gridFaces[i];
            faces.push(PlaneZonesUtil.getGraphScaledSimplePoly(cvDim,planeDim,face));
        }//end
        return faces;
    }//end
    

    public static getZoneObjPoly(cvDim:TDimension,planeDim:TDimension,zone:Zone2d):ObjectPoly{
        
        const percentIntCfRadius = XMath2dUtil.getPercent100(planeDim.width,zone.intCirc.radius);
        const graphIntCfRadius = XMath2dUtil.getValue100(cvDim.width,percentIntCfRadius);
        const intCfPosition:Point2d = Graph2dUtil.toGraphPoint(zone.intCirc.position);
        const intCfPositionScaled:Point2d = Graph2dUtil
            .scalePlPointToCanvasDim(cvDim,planeDim,intCfPosition);

        const scaledIntCircunf: Circunf2d = {
            position: intCfPositionScaled,
            radius: graphIntCfRadius
        };

        const scaledMean:Point2d = Graph2dUtil
            .scalePlPointToCanvasDim(cvDim,planeDim,Graph2dUtil.toGraphPoint(zone.mean));
        
        const scaledPoints:Point2d[] = Graph2dUtil
            .scalePolyToCanvasDim(cvDim,planeDim,Graph2dUtil.toArrayGraphPoints(zone.points));
            

        return new ObjectPoly(scaledMean,scaledPoints,scaledIntCircunf,zone.color);        
    }//end

}//end