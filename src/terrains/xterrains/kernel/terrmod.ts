//src\app\zone3d\terrains3d\kernel\terrmod.ts

import { IntParameter } from "@/common/intparam";

/**
 * class TerrModifierBase
 */
export class TerrModifierBase {

    // public terrRectangle:Rectangle2d;
    public name:string = "TerrModifierBase";   
    public parameters:IntParameter[];

    constructor(name:string) {
        this.name = name;
        this.parameters = [];
    };//end constructor

}; //end class