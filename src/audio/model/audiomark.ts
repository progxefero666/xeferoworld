// src/lib/audio/model/audiomark.ts

import { Point2d } from "@/lib/graph2d/types2d";
import { Point } from "gojs";


/**
 * class AudioMark
 */
export class AudioMark {

    public position: Point2d;
    public size: number;
    public color: string;

    constructor(position:Point2d, size:number, color:string) {
        this.position = position;
        this.size = size;
        this.color = color;
    };//end 

};//end