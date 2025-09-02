
import * as THREE from 'three'
import { TDimension, Vector2d } from "@/common/types";

import { Plane2d } from "@/math2d/model/plane2d";
import { XMath2dUtil } from "@/math2d/xmath2dutil";
import { XMath2d } from "../math2d/xmath2d";
import { XMath2dPolyUtil } from "../math2d/polygons/math2dpolyutil";
import { GeoFunction } from '../zone3d/three/util/geofunction';
import { GroupBlock } from './cityblocks/model/groupblock';


/**
 * Zone Size Range in 100%
 */
export class PlaneBlocksConfig  {

    public static ZONE_SIZE_MIN: number = 0.1;//percent100
    public static ZONE_SIZE_MAX: number = 9.0;//percent100
    public static ZONE_HEIGHT_MAXFACTOR: number = 20.0;
    public static PLANE_PADDING_CELLS: number = 2;
    public static BLOCKS_COLOR_BASE: any = '#ff8c00';
    public static BLOCKS_SPACE_MAX: number = 23.0;

}//end

export class PlaneBlocks3d extends Plane2d {

    public groupsBlocks: GroupBlock[] = [];
    public boundsX: number[] = [0.0,0.0];
    public boundsY: number[] = [0.0,0.0];
    public planeVertex: Float32Array|null = null;

    public blocksCellsUsed: number = 0;//count cells with blocks
    public blocksSpaceUsed: number = 0;//percent 100%

    constructor(center:Vector2d,size:number,cellSize:number) {
        super(center,size,cellSize);
        this.init();
    }//end

    public init() {
        this.boundsX[0] = this.center.x - this.size / 2;
        this.boundsX[1] = this.center.x + this.size/ 2;
        this.boundsY[0] = this.center.y - this.size / 2;
        this.boundsY[1] = this.center.y + this.size / 2;     
        this.planeVertex = GeoFunction.getThreePlaneGeometryVertex(this.size,this.subdiv);
    }//end

    public addGroup(groupBlock: GroupBlock) {
        this.groupsBlocks.push(groupBlock);
    }//end

    public getAleatoryPoint():Vector2d {
        const dim:TDimension = {width:this.size,height:this.size};
        const point: Vector2d = XMath2dUtil.getAleatoryPoint(this.center,dim);
        return point;
    }//end

    public getAleatoryZonePosition(radius:number): Vector2d {
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

    //Vector2d[]
    //Math2DCurve.getSimpleCurvePoints

}//end