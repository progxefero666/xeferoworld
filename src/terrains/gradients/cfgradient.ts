//src\terrains\model\gradient.ts

import { Point2d, Scale2d } from "@/lib/graph2d/types2d";


/**
 * class CircunfGradient 
 * Point2d 0-1 0-1
 * radius: number; //0.25: 0-1, relative to canvas width
 * scale: 0-1 0-1
 * intensity: number; //0.0-> 0-1
 * rotation: number //degrees --> !!! put to radians !!!
 */
export class CircunfGradient {

    public id: string;
    public position: Point2d;
    public radius: number;
    public scale: Scale2d;
    public rotation: number; //radians
    public intensity: number; 

    constructor(id:string,position:Point2d,radius:number,scale:Scale2d,rotation:number,intensity:number) {
        this.id = id;
        this.position = position;
        this.radius = radius;
        this.scale = scale;
        this.rotation = rotation;
        this.intensity = intensity;
    };

    public toJSonString() {
        return JSON.stringify(this);
    };

}//end 