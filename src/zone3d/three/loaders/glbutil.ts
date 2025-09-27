//src\zone3d\three\loaders\glbutil.ts

import * as THREE from 'three';

import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { ThreeModel3d } from '@/zone3d/three/threetypes';
import { ThreeUtil } from '@/zone3d/three/util/threeutil';
import { Pivot3d } from '@/math3d/pivot/pivot3d';


/**
 * class GlbUtil.getGlbMeshRotatedVertex
 */
export class GlbUtil {

    public static async loadGLB_object(url: string): Promise<THREE.Object3D> {
        const loader = new GLTFLoader();
        return new Promise((resolve, reject) => {
            loader.load(url,
                (gltf:GLTF) => {                    
                    let mesh: THREE.Object3D | null = null;
                    gltf.scene.traverse((child) => {
                        if (child instanceof THREE.Mesh && !mesh) {mesh = child;}
                    });
                    if (mesh) {resolve(mesh);}
                    else { reject(new Error('No mesh in file.')); }
                },
                undefined,
                (error) => { reject(error); }
            );
        });
    }//end

    public static getGlbObjectVertex(object3d: THREE.Object3D): THREE.BufferAttribute |
                                                                THREE.InterleavedBufferAttribute {
        const objMesh = object3d as THREE.Mesh;
        const geometry: THREE.BufferGeometry = objMesh.geometry;
        const positionAttribute: THREE.BufferAttribute |
            THREE.InterleavedBufferAttribute = geometry.getAttribute('position');
        return positionAttribute;
    }//end

    public static getGlMeshVertexArray(objMesh:THREE.Mesh): Float32Array{
        const geometry: THREE.BufferGeometry = objMesh.geometry;
        const positionAttribute: THREE.BufferAttribute |
            THREE.InterleavedBufferAttribute = geometry.getAttribute('position');
        return positionAttribute.array as Float32Array;
    }//end

    public static async getGlbUniqueModel(url: string): Promise<ThreeModel3d> {
        const object3d: THREE.Object3D = await GlbUtil.loadGLB_object(url);
        const vertex = GlbUtil.getGlbObjectVertex(object3d);
        return { object3d, vertex };
    }//end
    
    public static async getGlbMeshRotatedVertex(url:string,axis:number,angle:number): Promise<THREE.Mesh|null> {
        const object3d: THREE.Object3D = await GlbUtil.loadGLB_object(url);
        if(!(object3d instanceof THREE.Mesh)) {return null;}

        const objMesh = object3d as THREE.Mesh;
        const vertex = GlbUtil.getGlMeshVertexArray(objMesh);
        const pivot:Pivot3d = new Pivot3d();
        let rotatedVertex:Float32Array = pivot.rotateArrayPointsInAxis(axis,vertex,angle);
        objMesh.geometry.setAttribute('position', new THREE.BufferAttribute(rotatedVertex,3));
        objMesh.geometry.attributes.position.needsUpdate = true;
        objMesh.geometry.computeBoundingBox();
        objMesh.geometry.computeBoundingSphere();
        return objMesh;
    }//end

    public static async downloadGlbMerge(fname: string, glb1: THREE.Object3D, glb2: THREE.Object3D) {
        const scene = new THREE.Scene();
        scene.add(glb1); //o? .scene
        scene.add(glb2);
        // Exportar scene completa
        const exporter = new GLTFExporter();
        const result = await exporter.parseAsync(scene, { binary: true }) as ArrayBuffer;
        ThreeUtil.downloadObject3dFile(result, fname);
    }//end

    /*
    const loader = new GLTFLoader();
        loader.load('/models/asset.glb', (gltf) => {
        gltf.scene.traverse((o) => {
            const mesh = o as THREE.Mesh;
            if (mesh.isMesh) {
            const m = mesh.material as THREE.MeshStandardMaterial | THREE.MeshPhysicalMaterial;
            if (m.envMapIntensity !== undefined) m.envMapIntensity = 1.2;
            if (m.normalMap && m.normalScale) m.normalScale.set(0.6, 0.6);
            // Ajusta roughness/metalness solo si necesitas retocar
            // m.roughness = 0.2; m.metalness = 1.0;
            m.needsUpdate = true;
            }
        });
        scene!.add(gltf.scene);
    });   
    */

}//end

/*
public static async loadGLB_allMeshes(url: string): Promise<THREE.Mesh[]> {
    const loader = new GLTFLoader();
    return new Promise((resolve, reject) => {
        loader.load(
            url,
            (gltf: GLTF) => {
                const meshes: THREE.Mesh[] = [];
                gltf.scene.traverse((child) => {
                    if (child instanceof THREE.Mesh) {
                        meshes.push(child);
                    }
                });

                if (meshes.length > 0) {
                    resolve(meshes);
                } 
                else {reject(new Error("No Meshes in file"));}
            },
            undefined,
            (error) => {reject(error);}
        );
    });
}//end
*/
