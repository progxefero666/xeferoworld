
//src\terrains\planezones.ts

import { TDimension, Point2d } from "@/common/types";
import { XMath2d } from "@/math2d/xmath2d";
import { Plane2d } from "@/math2d/model/plane";
import { PlaneZonesUtil } from "./functions/planezonesutil";
import { ObjectPoly } from "@/lib/graph2d/model/objpoly";
import { Zone2d } from "@/terrains/model/zone";
import { Plane2dCell } from "@/math2d/model/planecell";
import { Math2dPlaneOld } from "@/math2d/functions/mathplaneold";
import { SimplePoly } from "@/lib/graph2d/model/simplepoly";
import { Math2dPlane } from "@/math2d/functions/mathplane";

/**
 * class WorldPlane3d
 */
export class WorldPlane3d extends Plane2d {
         
    
    public halfSize: number;
    public boundsX: number[] = [0.0,0.0];
    public boundsY: number[] = [0.0,0.0];

    public zones:Zone2d[] = [];
    public zonesCvPolys:ObjectPoly[]= [];

    public gridFaces: Plane2dCell[] = [];
    public gridCvFaces:SimplePoly[]= [];

    constructor(center:Point2d,size:number,cellSize:number) {
        super(center,size,cellSize);
        this.halfSize = this.size/2;
        this.boundsX = [this.center.x-this.halfSize,this.center.x+this.halfSize];
        this.boundsY = [this.center.y-this.halfSize,this.center.y+this.halfSize];
        this.gridFaces = Math2dPlane
            .getPlanePolyCellsOld(this.dimension,this.subdiv,this.subdiv);        
    }//end

    public init(zones:Zone2d[],cvDim:TDimension) {
        this.zones = zones;
        this.zonesCvPolys = this.zones.map
            (zone => PlaneZonesUtil.getZoneObjPoly(cvDim,this.dimension,zone));

        this.gridCvFaces = [];
        for(let i=0;i<this.gridFaces.length;i++){        
            const cvFace:SimplePoly = PlaneZonesUtil
                .getGraphScaledSimplePoly(cvDim,this.dimension,this.gridFaces[i]);
            this.gridCvFaces.push(cvFace);
        }      
        
    }//end


}//end

/*
for(let zoneIdx:number=0;zoneIdx<this.zones.length;zoneIdx++){
    for(let faceIdx:number=0;faceIdx<this.gridFaces.length;faceIdx++){
        const distCalc = XMath2d.getPointsDistance(
            this.zones[zoneIdx].intCirc.position,
            this.gridFaces[faceIdx].position
        );
        if(distCalc< this.zones[zoneIdx].intCirc.radius){
            this.gridFaces[faceIdx].assignZone(zoneIdx,this.zones[zoneIdx].color);
            this.zones[zoneIdx].addGridFace(this.gridFaces[faceIdx])
        }
    }
}

    public getCvZoneFacesPolys(cvDim:TDimension,zoneIndex:number): SimplePoly[] {
        return PlaneZonesUtil.getZoneGridFacesPolys
                (cvDim,this.dimension,this.zones[zoneIndex]);
    }//end

public addZone(newZone: Zone2d) {
    this.zones.push(newZone);
}//end

public getAleatoryCoords():Vector2d {
    const dim:TDimension = {width:this.size,height:this.size};
    const point: Vector2d = XMath2dUtil.getAleatoryPoint(this.center,dim);
    return point;
}//end

public getAleatoryZonePosition(radius:number): Vector2d {
    let point:Vector2d = XMath2d.VECTOR_0;
    let pointFound: boolean = false;
    while(!pointFound){
        point = this.getAleatoryCoords();
        const distToLimits: number = XMath2dPoly
            .getMinDistToLimits(this.center, this.boundsX, this.boundsY, point);
        if(distToLimits <= radius){
            pointFound = true;
        }
    }
    return point;
};//end
*/