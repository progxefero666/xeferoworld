//src\characters\model\glplayerobject.ts

import * as THREE from 'three';
import { Pivot3d } from "@/math3d/pivot/pivot3d";
import { TDimension3d, Vector3d } from "@/common/types";
import { ThreeUtil } from "@/zone3d/three/util/threeutil";
import { GlSystem3d } from '@/zone3d/glsystem3d';
import { XMath2dUtil } from '@/math2d/functions/xmath2dutil';
import { ThreeModel3d } from '@/zone3d/three/threetypes';
import { GeoUtil } from '@/zone3d/three/util/geoutil';
import { System3d } from '@/system3d/system3d';

//public worldPosition: Vector3d = System3d.CC;
//public vertex:Float32Array = new Float32Array();

/**
 * class GlPlayerObject
 */
export class GlPlayerObject  {

    public object3d: THREE.Object3D | null = null;    
    public pivotLines: THREE.Line[] = [];
    public dimension:TDimension3d = System3d.DIMENSION_CERO

    constructor(object3d:THREE.Object3D,initPosition?:Vector3d) {
        this.object3d  = object3d;
        //this.dimension = GeoUtil.getSingleObjBounds(object3d);
    }//end constructor

    public init(pivot: Pivot3d) {
        const points_x:THREE.Vector3[] = ThreeUtil.toThreeVectors(
            pivot.pivotAxis[0].axis_vertex_0,
            pivot.pivotAxis[0].axis_vertex_1);
        const geometry_x: THREE.BufferGeometry = new THREE.BufferGeometry().setFromPoints(points_x);
        const material_x: THREE.LineBasicMaterial = new THREE.LineBasicMaterial({color:GlSystem3d.AXIS_X_COLOR});
        this.pivotLines[0] = new THREE.Line( geometry_x, material_x);

        const points_y:THREE.Vector3[] = ThreeUtil.toThreeVectors(
            pivot.pivotAxis[1].axis_vertex_0,
            pivot.pivotAxis[1].axis_vertex_1);
        const geometry_y: THREE.BufferGeometry = new THREE.BufferGeometry().setFromPoints(points_y);
        const material_y: THREE.LineBasicMaterial = new THREE.LineBasicMaterial({color:GlSystem3d.AXIS_Y_COLOR});
        this.pivotLines[1] = new THREE.Line( geometry_y, material_y);

        const points_z:THREE.Vector3[] = ThreeUtil.toThreeVectors(
            pivot.pivotAxis[2].axis_vertex_0,
            pivot.pivotAxis[2].axis_vertex_1);
        const geometry_z: THREE.BufferGeometry = new THREE.BufferGeometry().setFromPoints(points_z);
        const material_z: THREE.LineBasicMaterial = new THREE.LineBasicMaterial({color:GlSystem3d.AXIS_Z_COLOR});
        this.pivotLines[2] = new THREE.Line( geometry_z, material_z);

    }//end

}//end

/*
public rollPivotLines(angle:number):void {
    const geometries: THREE.BufferGeometry[] = [
        this.pivotLines[0].geometry,
        this.pivotLines[1].geometry,
        this.pivotLines[2].geometry
    ];

    for (let idx=0;idx<3;idx++) {
        const posVertex: THREE.BufferAttribute |
                            THREE.InterleavedBufferAttribute 
                            = geometries[idx].getAttribute('position');
        const arrayVertex:Float32Array = this.rotateArrayPointsInAxis
                (PlMachineConfig.ROLL_AXIS,(posVertex.array as Float32Array),angle);

        this.pivotLines[idx].geometry.setAttribute('position', new THREE.BufferAttribute(arrayVertex,3));
        this.pivotLines[idx].geometry.attributes.position.needsUpdate = true;
        this.pivotLines[idx].geometry.computeBoundingBox();
        this.pivotLines[idx].geometry.computeBoundingSphere();   
    };//end for       

};//end

public roll(angle:number) {             
    if(!(this.object3d instanceof THREE.Mesh)) {return;}
    
    // object 3d
    const positionVertex: THREE.BufferAttribute |
                            THREE.InterleavedBufferAttribute 
                            = ThreeFbxUtil.getFbxObjectVertex(this.object3d);
                            
    let arrayVertex:Float32Array = this.rotateArrayPointsInAxis
        (PlMachineConfig.ROLL_AXIS,(positionVertex.array as Float32Array),angle);
    this.object3d.geometry.setAttribute('position', new THREE.BufferAttribute(arrayVertex,3));
    this.object3d.geometry.attributes.position.needsUpdate = true;
    this.object3d.geometry.computeBoundingBox();
    this.object3d.geometry.computeBoundingSphere();            
    
    this.rollPivotLines(angle);
    this.rotate(0,angle);
    //this.update();
};//end
*/