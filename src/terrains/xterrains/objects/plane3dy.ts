// src/zone3d/model/plane3d.ts
"use client";

import { TDimension, Vector3d } from "@/common/types";
import { Rectangle2d } from "@/math2d/model/rectangle2d";
import { Math3dTerrains } from "@/terrains/xterrains/functions/math3dterrains";
import { System3dConfig } from "@/system3d/system3dcfg";


/**
 * class Plane 3d Horizontal
 *  - dir 3d --> Y top  
 *  - Aspect Ratio --> 1:1
 */
export class Plane3d_Y {

    public axis: number = System3dConfig.AXIS_Y;

    public sidelen: number = 0;
    public countsub: number;
    
    //TDimension = { width: 0, height: 0 }
    public center:      Vector3d;
    public direction:   Vector3d = { x: 0, y: 1, z: 0 };
    public vertex:      Vector3d[][]= [];
    public sizeunit:    number = 0;
    public dimension:   TDimension = {width:0,height: 0 };
    public halfdimension: number = 0;    
    public rectangle: Rectangle2d; 

    constructor(center:Vector3d,sidelen:number,countsub:number) {
        this.center     = center;
        this.sidelen    = sidelen;
        this.countsub   = countsub;
        this.sizeunit   = Math.floor(this.sidelen / this.countsub);
        this.dimension  = {width:this.sidelen,height:this.sidelen};
        this.halfdimension = this.sidelen / 2;
        this.rectangle  = new Rectangle2d(this.center, this.dimension);
        this.vertex = Math3dTerrains.getPlaneTwoDimVertex(this.center,this.sidelen,this.countsub);     
    };//end constructor

    public getSelectedVertex(vertexflags: boolean[][]): Vector3d[] {
        let selVertex: Vector3d[] = [];
        for (let x: number = 0; x < vertexflags.length; x++) {
            for (let z: number = 0; z <vertexflags[x].length; z++) {
                if(vertexflags[x][z]){
                    selVertex.push(this.vertex[x][z]);
                }
            }
        }
        return selVertex;
    };//end 
        
}//end class
