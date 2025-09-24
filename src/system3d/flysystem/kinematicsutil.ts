// src/system3d/flysystem/kinematicsutil.ts

import * as THREE from 'three';

import { Plane3dPoint, Vector3d } from "@/common/types";
import { Physic3D } from "@/system3d/physic";
import { GameConfig } from "@/universo3d/game/gameconfig";
import { FlySystemUtil } from "@/system3d/flysystem/flysystemutil";

/*
const sat = new KinematicBody({x:0,y:50,z:0}, {x:1,y:0,z:0}, 50);
// en animate():
const p = sat.tick();
objMesh.position.set(p.x, p.y, p.z);

Lineal real: pos = KinematicsUtil.stepLinear(pos, dir, v_ms, GameConfig.DT_SEC)
Lineal visual: pos = KinematicsUtil.stepLinearTick(pos, dir, v_ms)
Circular real: state = stepUniformCircularXZ(C, R, theta, omega, GameConfig.DT_SEC)
Circular visual: state = stepUniformCircularXZTick(C, R, theta, omega)

const prev = { x: mesh.position.x, z: mesh.position.z };
const p = orb.tick(); // o: pos = KinematicsUtil.stepLinearTick(...)
mesh.position.set(p.x, mesh.position.y, p.z);

const dir = KinematicsUtil.tangentDirXZ(prev, p);
KinematicsUtil.orientMeshForwardXZ(mesh, dir);

*/
export class KinematicsUtil {
    // μ = G · M (central mass)
    public static muFromMass(M: number): number {
        return Physic3D.G * M;
    }//end

    // Circular orbital speed at radius r (m/s)
    public static circVel(mu: number, r: number): number {
        return Math.sqrt(mu / r);
    }//end

    // Angular speed for circular orbit (rad/s)
    public static circOmega(mu: number, r: number): number {
        return Math.sqrt(mu / (r * r * r));
    }//end

    // Period for circular orbit (s)
    public static circPeriod(mu: number, r: number): number {
        const w = KinematicsUtil.circOmega(mu, r);
        return (w > 0) ? (2 * Math.PI) / w : Infinity;
    }//end

    // Linear step (real-time): pos += û · v_ms · dt_sec
    public static stepLinear(pos: Vector3d, dir: Vector3d, v_ms: number, dt_sec: number): Vector3d {
        const n = Math.hypot(dir.x, dir.y, dir.z);
        if (n < 1e-12) return { ...pos };
        const ux = dir.x / n, uy = dir.y / n, uz = dir.z / n;
        const s = v_ms * dt_sec;
        return { x: pos.x + ux * s, y: pos.y + uy * s, z: pos.z + uz * s };
    }//end

    // Linear step (per-tick visual): aplica SPEED_SCALE internamente
    public static stepLinearTick(pos: Vector3d, dir: Vector3d, v_ms: number): Vector3d {
        const n = Math.hypot(dir.x, dir.y, dir.z);
        if (n < 1e-12) return { ...pos };
        const step = FlySystemUtil.msToTick(v_ms); // m/tick comprimidos
        const ux = dir.x / n, uy = dir.y / n, uz = dir.z / n;
        return { x: pos.x + ux * step, y: pos.y + uy * step, z: pos.z + uz * step };
    }//end

    // Uniform circular motion in XZ (real-time): theta' = theta + omega·dt
    public static stepUniformCircularXZ(
        C: Plane3dPoint, R: number, theta: number, omega: number, dt_sec: number
    ): { point: Plane3dPoint; theta: number; v: number } {
        if (R <= 0) return { point: { x: C.x, z: C.z }, theta, v: 0 };
        const th = theta + omega * dt_sec;
        const x = C.x + R * Math.sin(th);
        const z = C.z + R * Math.cos(th);
        return { point: { x, z }, theta: th, v: Math.abs(omega) * R };
    }//end

    // Uniform circular (per-tick visual): comprime arco aplicando SPEED_SCALE a Δθ
    public static stepUniformCircularXZTick(
        C: Plane3dPoint, R: number, theta: number, omega: number
    ): { point: Plane3dPoint; theta: number; v: number } {
        if (R <= 0) return { point: { x: C.x, z: C.z }, theta, v: 0 };
        const dtheta = omega * GameConfig.DT_SEC * GameConfig.SPEED_SCALE;
        const th = theta + dtheta;
        const x = C.x + R * Math.sin(th);
        const z = C.z + R * Math.cos(th);
        // v (real) se mantiene para telemetría física
        return { point: { x, z }, theta: th, v: Math.abs(omega) * R };
    }//end

    // heading desde A→B en planta (0 = +Z, derecha positiva)
    public static headingFromPointsXZ(a: Plane3dPoint, b: Plane3dPoint): number {
        const dx = b.x - a.x, dz = b.z - a.z;
        if (Math.abs(dx) < 1e-12 && Math.abs(dz) < 1e-12) return 0;
        return Math.atan2(dx, dz);
    }

    // dirección tangente normalizada en XZ
    public static tangentDirXZ(a: Plane3dPoint, b: Plane3dPoint): Vector3d {
        const dx = b.x - a.x, dz = b.z - a.z;
        const n = Math.hypot(dx, dz);
        if (n < 1e-12) return { x: 0, y: 0, z: 1 };
        return { x: dx / n, y: 0, z: dz / n };
    }

    // orientar un mesh para “mirar” la tangente en XZ (forward local = (0,0,-1))
    public static orientMeshForwardXZ(mesh: THREE.Object3D, dir: Vector3d): void {
        const n = Math.hypot(dir.x, dir.y, dir.z);
        if (n < 1e-12) return;
        const from = new THREE.Vector3(0, 0, -1);
        const to = new THREE.Vector3(dir.x / n, 0, dir.z / n);
        const q = new THREE.Quaternion().setFromUnitVectors(from, to);
        mesh.quaternion.copy(q).normalize();
    }

}//end
