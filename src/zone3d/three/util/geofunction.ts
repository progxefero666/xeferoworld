//src\zone3d\three\geofunction.ts

import * as THREE from 'three'
import { TDimension, Vector3d } from "@/common/types";

import { ThreeLine3d } from "@/zone3d/three/objects/thline3d";

/**
 * class GeoFunction.getThreePlaneGeometry
 * Generate three geometries
 */
export class GeoFunction {

    public static generateThreeLine(point_0:number[],point_1:number[],
                                    color: THREE.ColorRepresentation): ThreeLine3d {
        return new ThreeLine3d(point_0, point_1, color);
    };//end
      
    public static getThreePlaneGeometry(sideLength:number,subdivisions:number):THREE.PlaneGeometry {
        const geometry = new THREE.PlaneGeometry(sideLength, sideLength, subdivisions, subdivisions);
        geometry.rotateX(-Math.PI / 2);
        return geometry;
    } 
    public static getThreePlaneGeometryVertex(sideLength:number,subdivisions:number):Float32Array {
        const geometry = new THREE.PlaneGeometry(sideLength, sideLength, subdivisions, subdivisions);
        geometry.rotateX(-Math.PI / 2);
        return geometry.attributes.position.array as Float32Array;
    } 

    public static getWglPlaneY3d(center: Vector3d, sidelen: number, countsub: number): THREE.Mesh {

        const geometry = new THREE.PlaneGeometry(sidelen, sidelen, countsub, countsub);
        const standardMaterial = new THREE.MeshStandardMaterial({
            color: "#c27d11",
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1.0,            
            wireframe: false, // wireframe mode
            roughness:0.5
        });

        const wglMesh = new THREE.Mesh(geometry, standardMaterial);
        wglMesh.rotation.x =  (Math.PI / 2) *(1);
        wglMesh.position.set(center.x, center.y, center.z);
        return wglMesh;
    };//end 
        
    /**
     * get THREE.PlaneGeometry
     */
    public static toThreePlaneGeometry(sidelength:number,countsub:number,vertex: Vector3d[][]): THREE.PlaneGeometry {
        const geometry =  new THREE.PlaneGeometry(sidelength,sidelength,countsub,countsub);
        const geometryVertex = geometry.attributes.position.array;
        for (let i = 0; i < countsub; i++) {
            for (let j = 0; j < countsub; j++) {
                const geoIndex = (i * (countsub + 1) + j) * 3;
                geometryVertex[geoIndex + 2] = vertex[i][j].y;
            }
        }        
        geometry.attributes.position.needsUpdate = true;
        geometry.computeVertexNormals();        
        return geometry;
    };//end

};//end class