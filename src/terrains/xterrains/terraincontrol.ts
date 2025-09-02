//src\app\zone3d\terrains3d\terraincontrol.ts

import { Vector3d } from "@/common/types";
import { System3d } from '@/math3d/system3d';
import { Vector2d } from '@/math2d/math2dtypes';
import { GlTerrain } from './glmodel/glterrain';
import { TerrModCirc } from './modifiers/modcirc';


/**
 * class TerrainControl
 */
export class TerrainControl {

    public static DEF_SIDELEN: number = 100;

    public worldRadius:number;
    public terrSideLength:number = TerrainControl.DEF_SIDELEN;
    public terrElevationMax:number = 10.0
    public cameraPosition:Vector3d = System3d.VECTOR_CERO;
    
    public terrain:GlTerrain|null = null;

    public modCirc:TerrModCirc|null = null;

    constructor(worldRadius:number,terrSideLength:number,elevationMax:number) {
        this.worldRadius = worldRadius;
        this.terrSideLength = terrSideLength;
        this.terrElevationMax = elevationMax;

        this.modCirc = new TerrModCirc(this);
    };//end

    public generateTerrain(){
        this.terrain = new GlTerrain(System3d.CC, this.terrSideLength);
    };//end

    public setParamValue(modifierId:string,paramIndex:number, value:number): void {
        if(modifierId === TerrModCirc.name) {
            this.modCirc!.setValue(paramIndex, value);
        }
    };//end

    public getAleatoryPointInLimits(): Vector2d {        
        const point: Vector2d = this.terrain?.rectangle.getAleatoryPointInLimits(this.worldRadius)!;
        return point;
    };
};//end class