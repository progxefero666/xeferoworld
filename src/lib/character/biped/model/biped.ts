//src\lib\character\biped\biped.ts

import { Pivot3d } from "@/math3d/pivot/pivot3d";
import { BipedConfig } from "../bipedconfig";

/**
 * class Biped
 */
export class Biped {

    public config:BipedConfig;
    public pivotCM:Pivot3d;
    public pivotFloor:Pivot3d;

    constructor(config:BipedConfig) {
        this.config = config;
        this.pivotCM = new Pivot3d();
        this.pivotFloor = new Pivot3d();
    }//end

    
}//end 