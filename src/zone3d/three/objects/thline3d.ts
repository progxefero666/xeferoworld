// src\zone3d\model\threeline3d.ts

import * as THREE from 'three'
import { Line3d } from "@/math3d/objects/line3d";
import { ThreeUtil } from '@/zone3d/three/util/threeutil';

/**
 * class ThreeLine3d
 */
export class ThreeLine3d extends Line3d {

    public color: any;
    public gline:THREE.Line;
    
    constructor(point_0:number[],point_1:number[],color:any,linedir?:number) {
        super(point_0, point_1, linedir);
        this.color = color;

        const points:THREE.Vector3[] = ThreeUtil.toThreeVectors(this.point_0, this.point_1);

        const geometry: THREE.BufferGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const material: THREE.LineBasicMaterial = new THREE.LineBasicMaterial({color:color});
        this.gline = new THREE.Line( geometry, material );

    };//end constructor

};//end class