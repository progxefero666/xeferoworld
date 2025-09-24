//src\system3d\util\threeutil.ts

import * as THREE from 'three';
import { Pivot3d } from '@/math3d/pivot/pivot3d';
import { GlSystem3d } from '@/zone3d/glsystem3d';
import { System3d } from '../system3d';
import { ThreeUtil } from '@/zone3d/three/util/threeutil';

/**
 * class Sys3dThreeUtil.getPivotAxLines
 */
export class Sys3dThreeUtil {

    public static getPivotAxLines(pivot:Pivot3d,linesSize:number):THREE.Line[] {
        const pivotLines:THREE.Line[] = [];
        const materials: THREE.LineBasicMaterial[] = [];
        materials[0]= new THREE.LineBasicMaterial({color:System3d.AXIS_X_COLOR});
        materials[1]= new THREE.LineBasicMaterial({color:System3d.AXIS_Y_COLOR});
        materials[2]= new THREE.LineBasicMaterial({color:System3d.AXIS_Z_COLOR});    
        for(let idx:number=0;idx<3;idx++){
            const points:THREE.Vector3[] = ThreeUtil.toThreeVectors(
                pivot.pivotAxis[idx].axis_vertex_0,
                pivot.getDirecctionVertex(idx,linesSize));
            const geometry: THREE.BufferGeometry = new THREE.BufferGeometry().setFromPoints(points);
            pivotLines[idx] = new THREE.Line( geometry, materials[idx]);                           
        }   
        return pivotLines;
    }//end

}//end 