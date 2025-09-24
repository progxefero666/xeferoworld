//src\app\zone3d\terrains3d\terraincontrol.ts

import * as THREE from 'three'


import { Point2d, TDimension, Vector3d } from "@/common/types";
import { System3dConfig } from '@/system3d/system3dcfg';
import { Vector2d } from '@/math2d/math2dtypes';
import { GlTerrain } from './glmodel/glterrain';
import { TerrModCirc } from './modifiers/modcirc';
import { XTerrains, XTerrUtils } from "./xterrains";



/**
 * class TerrainControl.GRID_COLOR
 */
export class TerrainControl {
    public cameraPosition: Vector3d = System3dConfig.VECTOR_CERO;

    public static DEF_SIDELEN: number = 20;
    public static GRID_COLOR: string = "#888888";

    public worldRadius: number;

    public terrSideLength: number = TerrainControl.DEF_SIDELEN;
    public terrElevationMax: number = 10.0;
    public terrCountSubdiv: number = 0;
    public terrGridFaceDim: TDimension = { width: 1.0, height: 1.0 };

    public terrain: GlTerrain | null = null;
    public modCirc: TerrModCirc | null = null;

    constructor(worldRadius: number, terrSideLength: number, elevationMax: number) {
        this.worldRadius = worldRadius;
        this.terrSideLength = terrSideLength;
        this.terrElevationMax = elevationMax;

        this.terrCountSubdiv = XTerrUtils
            .getSubdivisions(XTerrains.UNIT_ONE_METER, this.terrSideLength);
        const equalFactor: number = this.terrSideLength / this.terrCountSubdiv;
        this.terrGridFaceDim = { width: equalFactor, height: equalFactor };

        this.modCirc = new TerrModCirc(this);
    };//end

    public generateTerrain() {
        this.terrain = new GlTerrain(System3dConfig.CC, this.terrSideLength);
    };//end



    public setParamValue(modifierId: string, paramIndex: number, value: number): void {
        if (modifierId === TerrModCirc.name) {
            this.modCirc!.setValue(paramIndex, value);
        }
    };//end

    public getAleatoryPointInLimits(): Vector2d {
        const point: Vector2d = this.terrain?.rectangle.getAleatoryPointInLimits(this.worldRadius)!;
        return point;
    };
};//end 

//const cntSubd:number = XTerrUtils.getSubdivisions(XTerrains.UNIT_ONEHUND_METER,this.terrSideLength);