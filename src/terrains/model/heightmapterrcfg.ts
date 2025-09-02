//src\terrains\model\terrainconfig.ts

import { NumberParameter } from "@/common/numberparam";


/**
 * class TerrainConfig
 */
export class HeightMapTerrainConfig {
    
    public sideLength: number;
    public subdivisions: number;
    public maxHeight: number;

    constructor(sideLength: number, subdivisions: number, maxHeight: number) {
        this.sideLength = sideLength;
        this.subdivisions = subdivisions;
        this.maxHeight = maxHeight;
    };//end 

    public clone(): HeightMapTerrainConfig {
        return new HeightMapTerrainConfig(this.sideLength, this.subdivisions, this.maxHeight);
    };

    public getAsArrayParams():NumberParameter[] {
        const params:NumberParameter[]=[];
        params.push( new NumberParameter("sideLength","Side",{min:50,max:400},this.sideLength,10));
        params.push( new NumberParameter("subdivisions","Subdiv.",{min:100,max:500},this.subdivisions,1));
        params.push( new NumberParameter("maxHeight","M. Height",{min:10,max:50},this.maxHeight,1));
        return params;
    };//end
    
}//end