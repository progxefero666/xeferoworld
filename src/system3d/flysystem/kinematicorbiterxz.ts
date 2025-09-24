//src\system3d\flysystem\kinematicorbiterxz.ts

import { Plane3dPoint } from "@/common/types";
import { GameConfig } from "@/universo3d/game/gameconfig";
import { KinematicsUtil } from "@/system3d/flysystem/kinematicsutil";

/*
Uso mínimo (referencia): crear new KinematicOrbiterXZ({x:0,z:0}, 200, 0.01) y en animate() hacer const p = orb.tick(); mesh.position.set(p.x, mesh.position.y, p.z);.
*/
export class KinematicOrbiterXZ {

    public C: Plane3dPoint;   // center
    public R: number;         // radius (m)
    public theta: number;     // phase (rad)
    public omega: number;     // angular speed (rad/s), +CCW around +Y

    constructor(C: Plane3dPoint, R: number, omega: number, theta0 = 0) {
        this.C = { ...C };
        this.R = R;
        this.omega = omega;
        this.theta = theta0;
    }//end

    // Factory: circular orbit from μ and radius
    public static fromMu(C: Plane3dPoint, R: number, mu: number, ccw = true, theta0 = 0) {
        const w = KinematicsUtil.circOmega(mu, R);
        return new KinematicOrbiterXZ(C, R, ccw ? w : -w, theta0);
    }//end

    // One visual tick (applies SPEED_SCALE)
    public tick(): Plane3dPoint {
        const dθ = this.omega * GameConfig.DT_SEC * GameConfig.SPEED_SCALE;
        this.theta += dθ;
        const x = this.C.x + this.R * Math.sin(this.theta);
        const z = this.C.z + this.R * Math.cos(this.theta);
        return { x, z };
    }//end

    // Instant linear speed (m/s)
    public getSpeedMs(): number {
        return Math.abs(this.omega) * this.R;
    }//end

}//end
