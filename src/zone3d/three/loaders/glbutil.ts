//src\zone3d\three\loaders\glbutil.ts

import * as THREE from 'three';

import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { ThreeModel3d } from '@/zone3d/three/threetypes';
import { ThreeUtil } from '@/zone3d/three/util/threeutil';


/**
 * class GlbUtil.loadGLB_object
 */
export class GlbUtil {

    public static async loadGLB_object(url: string): Promise<THREE.Object3D> {
        const loader = new GLTFLoader();
        return new Promise((resolve, reject) => {
            loader.load(
                url,
                (gltf: GLTF) => {
                    
                    let mesh: THREE.Object3D | null = null;
                    gltf.scene.traverse((child) => {
                        if (child instanceof THREE.Mesh && !mesh) {mesh = child;}
                    });
                    if (mesh) {
                        resolve(mesh);
                    }
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

    public static async getGlbUniqueModel(url: string): Promise<ThreeModel3d> {
        const object3d: THREE.Object3D = await GlbUtil.loadGLB_object(url);
        const vertex = GlbUtil.getGlbObjectVertex(object3d);
        return { object3d, vertex };
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
