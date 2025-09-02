//src\zone3d\gamecontrols\planecontrol.ts

import * as THREE from 'three';

import { Rotation3d, Vector3d } from "@/common/types";
import { Math3d } from '@/math3d/math3d';
import { System3d } from "@/math3d/system3d";
import { ThreeFbxUtil, loadFbxAdust } from '@/zone3d/three/loaders/threefbxutil';
import { ThreeModel3d } from '@/zone3d/three/threetypes'
import { GlObject } from "@/zone3d/three/objects/globjpivot";
import { XMath2d } from '@/math2d/xmath2d';
import { PlMachineConfig } from './machineconfig';
import { GlbLoaderUtil } from '../../zone3d/three/loaders/threeglbutil';


/**
 * class Player Aircraft: Use Pivot3d 
 *  Handles the control of an aircraft in a 3D space.*  
 *  PlMachineConfig.SOURCE_URL-->'/models3d/xwingfewpolys.glb'
 */
export class PlayerAircraft {

    public position: Vector3d = System3d.CC;
    public rotation: Rotation3d = System3d.RC;     
    public model3d:ThreeModel3d|null = null;
    public glmachine:GlObject|null   = null;
    
    //range:    TRange;
    constructor(position: Vector3d) {
        this.position = position;
    };//end

    public async init(): Promise<void> {
        this.model3d = await GlbLoaderUtil.getGlbModel(PlMachineConfig.SOURCE_URL);
        //this.model3d = await FbxLoaderUtil.getFbxModel(PlMachineConfig.SOURCE_URL);
        this.glmachine = new GlObject(
            this.position,
            this.model3d!.object3d!,
            this.model3d!.vertex.array as Float32Array);
    };//end
    
    public async roll(rotationCCW:boolean) { 
        if(rotationCCW){
            this.glmachine!.roll(PlMachineConfig.ROLL_UNIT); 
        }
        else {
            this.glmachine!.roll(PlMachineConfig.ROLL_UNIT *(-1.0)); 
        }       
    };//end

};//end

/*
        //this.glmachine!.toConsoleRotation3d();
public rotate(axis:number,angle:number) { 
    this.glmachine!.rotate(axis,angle);        
};//end
public moveToTarget(target: Vector3d): void {
    this.glmachine.worldPosition = target;
    //this.position = System3dUtil.getAsArray(this.worldPosition);        
};//end
const object3d:THREE.Object3D = await loadGLB(PlMachineConfig.SOURCE_URL);
const vertex: THREE.BufferAttribute | THREE.InterleavedBufferAttribute  = FbxLoaderUtil.getFbxObjectVertex(object3d);
this.model3d = {object3d:object3d,vertex:vertex};
*/