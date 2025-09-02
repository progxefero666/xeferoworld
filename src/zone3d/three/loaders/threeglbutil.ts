// src/zone3d/loaders/threefbxloader.ts

import * as THREE from 'three';

import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { ThreeModel3d } from 'src/zone3d/three/threetypes';
import { ThreeUtil } from '../util/threeutil';

/*
GLB → tiene un encabezado fijo de 12 bytes (glTF) con versión + longitud,
      luego chunks (JSON + BIN). Es un contenedor definido y estandarizado.
*/

/**
 * class GlbLoaderUtil.getGlbModel
 */
export class GlbLoaderUtil {

    public static async loadGLB(url: string): Promise<THREE.Object3D> {
        const loader = new GLTFLoader();

        return new Promise((resolve, reject) => {
            loader.load(
                url,
                (gltf: GLTF) => {
                    const object = gltf.scene.children[0] as THREE.Object3D;
                    resolve(object);
                },
                undefined,
                (error) => {
                    reject(error);
                }
            );
        });
    }//end

    public static getGlbObjectVertex(object3d: THREE.Object3D): THREE.BufferAttribute |
                                                                THREE.InterleavedBufferAttribute {
        const objMesh = object3d as THREE.Mesh;
        const geometry: THREE.BufferGeometry = objMesh.geometry;
        const positionAttribute: THREE.BufferAttribute|
                                 THREE.InterleavedBufferAttribute = geometry.getAttribute('position');
        return positionAttribute;
    }//end

    public static async getGlbModel(url: string): Promise<ThreeModel3d> {
        const object3d: THREE.Object3D = await GlbLoaderUtil.loadGLB(url);
        const vertex = GlbLoaderUtil.getGlbObjectVertex(object3d);
        return { object3d, vertex };
    }//end

    //const loader = new GLTFLoader();
    //const glb1 = await loadGLB('model1.glb');
    //const glb2 = await loadGLB('model2.glb');    
    public static async downloadGlbMerge(fname:string,glb1:THREE.Object3D,glb2:THREE.Object3D) {
        const scene = new THREE.Scene();
        scene.add(glb1); //o? .scene
        scene.add(glb2);
        // Exportar scene completa
        const exporter = new GLTFExporter();
        const result = await exporter.parseAsync(scene, { binary: true }) as ArrayBuffer;
        ThreeUtil.downloadObject3dFile(result,fname);
    }
    
}//end 

/*
export async function loadGLBConfigured(
    url: string,
    config?: {
        position?: [number, number, number];
        rotation?: [number, number, number];
        scale?: [number, number, number];
        castShadow?: boolean;
        receiveShadow?: boolean;
    }
): Promise<THREE.Object3D> {
    const object = await GlbLoaderUtil.loadGLB(url);

    if (config) {
        if (config.position) object.position.set(...config.position);
        if (config.rotation) object.rotation.set(...config.rotation);
        if (config.scale) object.scale.set(...config.scale);

        if (config.castShadow !== undefined || config.receiveShadow !== undefined) {
            object.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    if (config.castShadow !== undefined) child.castShadow = config.castShadow;
                    if (config.receiveShadow !== undefined) child.receiveShadow = config.receiveShadow;
                }
            });
        }
    }

    return object;
};//end
*/



