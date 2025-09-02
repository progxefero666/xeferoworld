//src\characters\model\chplayer.ts

import * as THREE from 'three';
import { Vector3d } from "@/common/types";
import { BipedConfig } from "@/lib/character/biped/bipedconfig";
import { GlPlayerObject } from "@/characters/model/glplayerobject";
import { XMath2dUtil } from "@/math2d/xmath2dutil";
import { Pivot3d } from "@/math3d/pivot/pivot3d";
import { CharacterConfig } from "src/characters/charactconfig";

/**
 * class CharacterPlayer
 * public model:ThreeModel3d|null = null;
 * ref: Vector3d = System3d.CC;
 */
export class CharacterPlayer {

    public bipedConfig:BipedConfig;
    public pivot: Pivot3d;    
    public globject:GlPlayerObject|null = null;

    constructor(bipedConfig:BipedConfig,object3d:THREE.Object3D) {
        this.bipedConfig = bipedConfig;
        this.pivot = new Pivot3d();
        this.globject = new GlPlayerObject(object3d);        
    }//end

    public init() {}//end 

    public toConsoleRotation3d(): void {
        const rotGrades_x:number = XMath2dUtil.toGrades(this.pivot.rotation[0]);
        const rotGrades_y:number = XMath2dUtil.toGrades(this.pivot.rotation[1]);
        const rotGrades_z:number = XMath2dUtil.toGrades(this.pivot.rotation[2]);
        console.log('Rotation Roll: '  + rotGrades_x.toString());
        console.log('Rotation Pitch: ' + rotGrades_y.toString());
        console.log('Rotation Yaw: '   + rotGrades_z.toString());
    }//end

}//end   
