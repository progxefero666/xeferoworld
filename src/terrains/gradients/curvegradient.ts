//src\terrains\model\gradient.ts

import { Point2d } from "@/lib/graph2d/types2d";


/**
 * class CurveGradient 
 * Point2d 0-1 0-1
 * radius: number; //0.25: 0-1, relative to canvas width
 * scale: 0-1 0-1
 * intensity: number; //0.0-> 0-1
 * rotation: number radians
 */
export class CurveGradient {

    public id: string;
    public points: Point2d[];
    public intensities: number[];
    public rotation: number; 
    public extension: number;

    constructor(id:string,
                points: Point2d[],
                intensities:number[],
                rotation:number,
                extension:number) {
        this.id          = id;
        this.points      = points;
        this.intensities = intensities;
        this.rotation    = rotation;
        this.extension   = extension;                        
    }//end

    public toJSonString() {
        return JSON.stringify(this);
    }//end

}//end 