//src\zone3d\xterrains\modifiers\modcirc.ts


import { IntParameter } from "@/common/intparam";
import { TRange, Vector3d } from "@/common/types";

import { Vector2d } from "@/math2d/math2dtypes";

import { XTerrBaseFunctions } from "../functions/basefunc";
import { TerrModifierBase } from "../kernel/terrmod";
import { TerrainControl } from "../terraincontrol";


/**
 * class TerrModCirc
 *  - Modifier for circular terrain modifications
 *  - extends TerrModifierBase
 */
export class TerrModCirc extends TerrModifierBase {

    public static readonly NAME: string = "TerrModCirc";

    public ctrlTerrain:TerrainControl;
    constructor(ctrlTerrain:TerrainControl) {
        super(TerrModCirc.NAME);
        this.ctrlTerrain = ctrlTerrain;
        this.chargeParameters();
    };//end constructor

    private chargeParameters(): void {        
        this.parameters.push(new IntParameter("count_iter",{min:10,max:100},5,"Cnt. Iter.", true, 1)); 
        this.parameters.push(new IntParameter("intensity_min", {min:1,max:7}, 2,"Inten. Min", true, 1));
        this.parameters.push(new IntParameter("intensity_max", {min:1,max:7}, 8,"Inten. Max", true, 1));
        this.parameters.push(new IntParameter("radius_min",{min:1,max:10},2.0,"Radius Min", true, 1));
        this.parameters.push(new IntParameter("radius_max",{min:1,max:10},10.0,"Radius Max", true, 1));        
    };//end

    public setValue(paramIndex:number, value:number): void {
        this.parameters[paramIndex].value = value;
        // console.log("paramChange"+this.parameters[paramIndex].id);
    };//end


    public applyModifier(): Vector3d[][] {
        let newVertex:Vector3d[][] = [];

        //const countIter:number = this.parameters[0].value;
        const countIter:number = 1;        
        const radioRange: TRange = {
            min:this.parameters[3].value, 
            max: this.parameters[4].value
        };

        for(let iterIdx=0;iterIdx<countIter;iterIdx++) {                                          
            //const coords2d:Vector2d = this.ctrlTerrain.getAleatoryPointInLimits(); 
            const coords2d:Vector2d = {x:0.001,y:0.001};
            const radius:number = 16;
            //const radius:number = XMath2dUtil.getAleatoryIntInRange(radioRange.min,radioRange.max);
            newVertex = XTerrBaseFunctions
                .applyRadialForze(this.ctrlTerrain.terrain!.vertex,coords2d,radius);
                
        }//end for
        return newVertex;
    };//end
    
    private applyModifierIter(terrVertex:Vector3d[][]): Vector3d[][] {
        let newVertex:Vector3d[][] = [];

        return newVertex;
    };//end

    /*
        forze_coords:Vector3d,
        forze_mode:string,
        intensity:number,
        radius:number    
        const forze_mode:string = this.getParameterValue("mode");
        const forze_coords:Vector3d = this.getParameterValue("coords");
        const forze_radiusMax:number = this.getParameterValue("radius");
        const forze_intensity:number = this.getParameterValue("intensity");

        return XTerrBaseFunctions.applyRadialForze(
            terrVertex,
            forze_mode,
            forze_coords, 
            forze_radiusMax, 
            forze_intensity);
    */

};//end class

