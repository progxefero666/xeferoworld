//src\system3d\flysystem\kinematicbody.ts


import { Vector3d } from "@/common/types";
import { KinematicsUtil } from "@/system3d/flysystem/kinematicsutil";

/**
 * class KinematicBody
 *    dir-->not normalized; will be normalized on 
 *    speed--> in m/s
 */
export class KinematicBody {

    public pos: Vector3d;
    public dir: Vector3d; 
    public speed: number; 

    constructor(pos: Vector3d, dir: Vector3d, speed_ms: number) {
        this.pos = { ...pos };
        this.dir = { ...dir };
        this.speed = speed_ms;
    }//end

    // one visual tick (applies SPEED_SCALE internally)
    public tick(): Vector3d {
        this.pos = KinematicsUtil.stepLinearTick(this.pos, this.dir, this.speed);
        return this.pos;
    }//end

    public setDirectionFrom(p0: Vector3d, p1: Vector3d): void {
        this.dir = { x: p1.x - p0.x, y: p1.y - p0.y, z: p1.z - p0.z };
    }//end

}//end
