//src\terrains\model\gradient.ts

import { Point2d, Scale2d } from "@/lib/graph2d/types2d";


/**
 * class PointGradient 
 */
export class PointGradient {

    public position: Point2d;
    public intensity: number; 
    public radius: number;
    
    constructor(position:Point2d,intensity:number,radius:number) {
        this.position = position;
        this.intensity = intensity;
        this.radius = radius;        
    };

    public toJSonString() {
        return JSON.stringify(this);
    };

}//end 