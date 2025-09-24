//src\zone3d\three\objects\globject.ts

import * as THREE from 'three';
import { Pivot3d } from "@/math3d/pivot/pivot3d";
import { Vector3d } from "@/common/types";
import { System3dConfig} from "@/system3d/system3dcfg";
import { ThreeFbxUtil } from '../loaders/threefbxutil';
import { XMath2dUtil } from '@/math2d/functions/xmath2dutil';

import { ThreeModel3d } from '../threetypes';



/*
type ThreeModel3d = {
    object3d:THREE.Object3D|null;
    vertex: THREE.BufferAttribute | THREE.InterleavedBufferAttribute;
};
*/
export class GlObject  {

    public pivot:Pivot3d;
    public worldPosition: Vector3d = System3dConfig.CC;
    
    public object3d: THREE.Object3D | null = null;
    public vertex:Float32Array = new Float32Array();
    public applyInverse:boolean = false;

    constructor(pivot:Pivot3d,model3d:ThreeModel3d) {
        this.pivot = pivot;
        this.object3d = model3d.object3d!;
        this.vertex = model3d.vertex.array as Float32Array;
        //this.object3d.rotateY(Math.PI);
    };//end constructor

    public roll(angle:number) {             
        if(!(this.object3d instanceof THREE.Mesh)) {return;}
        
        const positionVertex: THREE.BufferAttribute |
                              THREE.InterleavedBufferAttribute 
                              = ThreeFbxUtil.getFbxObjectVertex(this.object3d);
                              
        let arrayVertex:Float32Array = this.pivot.rotateArrayPointsInAxis
            (0,(positionVertex.array as Float32Array),angle);
        this.object3d.geometry.setAttribute('position', new THREE.BufferAttribute(arrayVertex,3));
        this.object3d.geometry.attributes.position.needsUpdate = true;
        this.object3d.geometry.computeBoundingBox();
        this.object3d.geometry.computeBoundingSphere();
        
    };//end

    public pitch(angle:number) {
        if(!(this.object3d instanceof THREE.Mesh)) {return;}
        
        const positionVertex: THREE.BufferAttribute |
                              THREE.InterleavedBufferAttribute 
                              = ThreeFbxUtil.getFbxObjectVertex(this.object3d);
        let vertexAngle = angle;
        if(this.applyInverse) {vertexAngle *= (-1);}                      
        let arrayVertex:Float32Array = this.pivot.rotateArrayPointsInAxis
            (2,(positionVertex.array as Float32Array),vertexAngle);

        this.object3d.geometry.setAttribute('position', new THREE.BufferAttribute(arrayVertex,3));
        this.object3d.geometry.attributes.position.needsUpdate = true;
        this.object3d.geometry.computeBoundingBox();
        this.object3d.geometry.computeBoundingSphere();
  
    }//end

}//end

/*
    public debugRotation(): void {
        const rotGrades_x:number = XMath2dUtil.toDegrees(this.pivot.rotation[0]);
        const rotGrades_y:number = XMath2dUtil.toDegrees(this.pivot.rotation[1]);
        const rotGrades_z:number = XMath2dUtil.toDegrees(this.pivot.rotation[2]);
        console.log('Rotation Roll: ' + rotGrades_x.toString());
    };

    public init() {
        const points_x:THREE.Vector3[] = ThreeUtil.toThreeVectors(
            this.pivotAxis[0].axis_vertex_0,
            this.pivotAxis[0].axis_vertex_1);
        const geometry_x: THREE.BufferGeometry = new THREE.BufferGeometry().setFromPoints(points_x);
        const material_x: THREE.LineBasicMaterial = new THREE.LineBasicMaterial({color:GlSystem3d.AXIS_X_COLOR});
        this.pivotLines[0] = new THREE.Line( geometry_x, material_x);

        const points_y:THREE.Vector3[] = ThreeUtil.toThreeVectors(
            this.pivotAxis[1].axis_vertex_0,
            this.pivotAxis[1].axis_vertex_1);
        const geometry_y: THREE.BufferGeometry = new THREE.BufferGeometry().setFromPoints(points_y);
        const material_y: THREE.LineBasicMaterial = new THREE.LineBasicMaterial({color:GlSystem3d.AXIS_Y_COLOR});
        this.pivotLines[1] = new THREE.Line( geometry_y, material_y);

        const points_z:THREE.Vector3[] = ThreeUtil.toThreeVectors(
            this.pivotAxis[2].axis_vertex_0,
            this.pivotAxis[2].axis_vertex_1);
        const geometry_z: THREE.BufferGeometry = new THREE.BufferGeometry().setFromPoints(points_z);
        const material_z: THREE.LineBasicMaterial = new THREE.LineBasicMaterial({color:GlSystem3d.AXIS_Z_COLOR});
        this.pivotLines[2] = new THREE.Line( geometry_z, material_z);

    };//end
    public rotatePivotLines(axis:number,angle:number):void {
        const geometries: THREE.BufferGeometry[] = [
            this.pivotLines[0].geometry,
            this.pivotLines[1].geometry,
            this.pivotLines[2].geometry
        ];

        for (let idx=0;idx<3;idx++) {
            const posVertex: THREE.BufferAttribute |
                             THREE.InterleavedBufferAttribute 
                             = geometries[idx].getAttribute('position');
            const arrayVertex:Float32Array = this.pivot.rotateArrayPointsInAxis
                    (axis,(posVertex.array as Float32Array),angle);

            this.pivotLines[idx].geometry.setAttribute('position', new THREE.BufferAttribute(arrayVertex,3));
            this.pivotLines[idx].geometry.attributes.position.needsUpdate = true;
            this.pivotLines[idx].geometry.computeBoundingBox();
            this.pivotLines[idx].geometry.computeBoundingSphere();   
        };//end for       

    };//end
*/