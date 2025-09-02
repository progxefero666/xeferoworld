

import * as THREE from 'three'
import { TDimension, Vector2d } from "@/common/types";

import { XMath2d } from "@/math2d/xmath2d";
import { XMath2dUtil } from "@/math2d/xmath2dutil";
import { XMath2dPolyUtil } from "@/math2d/polygons/math2dpolyutil";
import { Plane2d } from "@/math2d/model/plane2d";
import { GeoFunction } from '@/zone3d/three/util/geofunction';
import { TerrainZone } from '@/terrains/model/terrainzone';


/**
 * Zone Size Range in 100%
 */
export class PlaneZonesConfig  {

    //public static ZONE_SIZE_MIN: number = 0.1;
}//end

export class PlaneZones3d extends Plane2d {

    public zones:TerrainZone[] = [];
    public boundsX: number[] = [0.0,0.0];
    public boundsY: number[] = [0.0,0.0];

    constructor(center:Vector2d,size:number,cellSize:number) {
        super(center,size,cellSize);
        this.init();
    }//end

    public init() {
        this.boundsX[0] = this.center.x - this.size / 2;
        this.boundsX[1] = this.center.x + this.size/ 2;
        this.boundsY[0] = this.center.y - this.size / 2;
        this.boundsY[1] = this.center.y + this.size / 2;     
    }//end

    public addZone(terrainZone: TerrainZone) {
        this.zones.push(terrainZone);
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
            const distToLimits: number = XMath2dPolyUtil
                .getMinDistToLimits(this.center, this.boundsX, this.boundsY, point);
            if(distToLimits <= radius){
                pointFound = true;
            }
        }
        return point;
    };//end

    //Vector2d[]
    //Math2DCurve.getSimpleCurvePoints

}//end