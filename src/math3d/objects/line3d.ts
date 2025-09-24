//src\lib\math3d\model\line3d.ts

import { System3dConfig } from "@/system3d/system3dcfg";


/**
 * class Line3d
 *    System3d.DIR_POSITIVE:  1
 *    System3d.DIR_NEGATIVE: -1
 */
export class Line3d {

    public linedir: number;
    public point_0:number[];
    public point_1:number[];

    constructor(point_0:number[],point_1:number[],linedir?:number) {
        this.point_0 = point_0;
        this.point_1 = point_1;
        this.linedir = linedir ?? System3dConfig.DIR_POSITIVE; 
    };//end

} // end class