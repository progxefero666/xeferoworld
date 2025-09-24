//src\system3d\flysystem\kinematicorbiter_plane.ts

import { Vector3d } from "@/common/types";
import { GameConfig } from "@/universo3d/game/gameconfig";

/*
Crear: const orb = new KinematicOrbiterPlane({x:0,y:0,z:0}, 300, 0.01, {x:0,y:1,z:0});
En animate():
const p = orb.tick(); mesh.position.set(p.x, p.y, p.z);
(opcional) orientar: const d = orb.tangentDir(); //alinear forward con d 
*/

function norm(v: Vector3d): number { return Math.hypot(v.x, v.y, v.z); }
function normalize(v: Vector3d): Vector3d {
    const n = norm(v); if (n < 1e-12) return { x: 0, y: 0, z: 1 };
    return { x: v.x / n, y: v.y / n, z: v.z / n };
}
function cross(a: Vector3d, b: Vector3d): Vector3d {
    return { x: a.y*b.z - a.z*b.y, y: a.z*b.x - a.x*b.z, z: a.x*b.y - a.y*b.x };
}
function sub(a: Vector3d, b: Vector3d): Vector3d {
    return { x: a.x-b.x, y: a.y-b.y, z: a.z-b.z };
}
function add(a: Vector3d, b: Vector3d): Vector3d {
    return { x: a.x+b.x, y: a.y+b.y, z: a.z+b.z };
}
function scale(v: Vector3d, s: number): Vector3d {
    return { x: v.x*s, y: v.y*s, z: v.z*s };
}

/** Orthonormal basis (u,v,n) for a plane with normal n; refDir sets u if provided */
function basisFromNormal(nIn: Vector3d, refDir?: Vector3d): { u: Vector3d; v: Vector3d; n: Vector3d } {
    const n = normalize(nIn);
    const ref = refDir && norm(refDir) > 1e-12 ? normalize(refDir) : (Math.abs(n.y) < 0.9 ? { x: 0, y: 1, z: 0 } : { x: 1, y: 0, z: 0 });
    let u = cross(ref, n);
    if (norm(u) < 1e-12) u = cross({ x: 1, y: 0, z: 0 }, n);
    u = normalize(u);
    const v = cross(n, u);
    return { u, v, n };
}

/** Uniform circular motion in a plane (center C, normal N) */
export class KinematicOrbiterPlane {
    public C: Vector3d;
    public R: number;
    public theta: number;     // phase (rad)
    public omega: number;     // rad/s (+CCW around +n)
    private u: Vector3d;
    private v: Vector3d;
    private n: Vector3d;

    constructor(C: Vector3d, R: number, omega: number, normal: Vector3d, theta0 = 0, refDir?: Vector3d) {
        this.C = { ...C };
        this.R = R;
        this.omega = omega;
        this.theta = theta0;
        const B = basisFromNormal(normal, refDir);
        this.u = B.u; this.v = B.v; this.n = B.n;
    }

    /** One visual tick (applies SPEED_SCALE) */
    public tick(): Vector3d {
        const dθ = this.omega * GameConfig.DT_SEC * GameConfig.SPEED_SCALE;
        this.theta += dθ;
        // p = C + R*(u*sinθ + v*cosθ)
        const us = scale(this.u, Math.sin(this.theta) * this.R);
        const vc = scale(this.v, Math.cos(this.theta) * this.R);
        return add(this.C, add(us, vc));
    }

    /** Tangent direction (unit) at current theta */
    public tangentDir(): Vector3d {
        // dp/dθ = R*(u*cosθ - v*sinθ); tangent points along motion; normalize
        const uc = scale(this.u, Math.cos(this.theta));
        const vs = scale(this.v, -Math.sin(this.theta));
        return normalize(add(uc, vs));
    }

    /** Instant linear speed (m/s) */
    public getSpeedMs(): number { return Math.abs(this.omega) * this.R; }

    /** Re-define orbit plane normal; keeps theta */
    public setNormal(normal: Vector3d, refDir?: Vector3d): void {
        const B = basisFromNormal(normal, refDir);
        this.u = B.u; this.v = B.v; this.n = B.n;
    }

}//end
