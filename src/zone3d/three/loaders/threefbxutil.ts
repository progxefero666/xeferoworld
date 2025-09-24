//src\zone3d\three\loaders\threefbxloader.ts

import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import {ThreeModel3d} from '@/zone3d/three/threetypes'
import { TDimension3d } from '@/common/types';

/*
FBX → en binario arranca con "Kaydara FBX Binary \0" como header, 
     después un árbol de nodos serializado.
     Si es ASCII, empieza con ; FBX en texto plano.
*/

/**
 * class ThreeFbxUtil.loadFbx
 */
export class ThreeFbxUtil {
    
    public static async loadFbx(url:string): Promise<THREE.Object3D> {
        const loader = new FBXLoader();
        return new Promise((resolve, reject) => {
            loader.load(
                url,
                (fbx: THREE.Group) => {
                    const object = fbx.children[0] as THREE.Object3D;
                    resolve(object);
                },
                undefined,
                (error) => {
                    reject(error);
                }
            );
        });
    };//end

    public static scaleObjVertex(scaleFactor: number, vertex: Float32Array): Float32Array {        
        const scaledVertices = new Float32Array(vertex.length);
        for (let i = 0; i < vertex.length; i++) {
            scaledVertices[i] = vertex[i] * scaleFactor;
        }
        return scaledVertices;
    };//end

    public static getMinValue(axis:number,values:Float32Array): number {
        let min = 1000000;
        for (let idx=axis;idx<values.length;idx+=3) {  
            const absVal = Math.abs(values[idx]);
            if (absVal < min) min = absVal;
        }
        return min;
    };//end 

    public static getMaxValue(axis:number,values:Float32Array): number {
        let max = 0;
        for (let idx=axis;idx<values.length;idx+=3) {  
            const absVal = Math.abs(values[idx]);
            if (absVal > max) max = absVal;
        }
        return max;
    };//end 

    public static getFbxObjectBounds(object3d: THREE.Object3D) : TDimension3d|null {
        if(!(object3d instanceof THREE.Mesh)) {return null;}

        const geometry:THREE.BufferGeometry = object3d.geometry;
        const positionAttribute:THREE.BufferAttribute |
                                THREE.InterleavedBufferAttribute
                                = geometry.getAttribute('position');
        let arrayVertex:Float32Array = positionAttribute.array as Float32Array;        
        const dimX_min:number = ThreeFbxUtil.getMinValue(0,arrayVertex);
        const dimX_max:number = ThreeFbxUtil.getMaxValue(0,arrayVertex);
        const dimY_min:number = ThreeFbxUtil.getMinValue(1,arrayVertex);
        const dimY_max:number = ThreeFbxUtil.getMaxValue(1,arrayVertex);
        const dimZ_min:number = ThreeFbxUtil.getMinValue(2,arrayVertex);
        const dimZ_max:number = ThreeFbxUtil.getMaxValue(2,arrayVertex);

        const dimX:number = dimX_min + dimX_max;
        const dimY:number = dimY_min + dimY_max;
        const dimZ:number = dimZ_min + dimZ_max;
        return {width:dimX,height:dimY,depth:dimZ};
    };//end 


    /**
     * Normaliza la escala de un conjunto de vértices a 1.0, utilizando un factor de escala original conocido.
     * Esta función asume que todos los ejes (X, Y, Z) fueron escalados uniformemente por el valor 'scaleOrigin'.
     */
    public static normFbxObjVertexScale(scaleOrigin: number, vertex: Float32Array): Float32Array {
        const scaleFactor = 1.0 / scaleOrigin;
        const scaledVertices = new Float32Array(vertex.length);
        for (let i = 0; i < vertex.length; i++) {
            scaledVertices[i] = vertex[i] * scaleFactor;
        }
        return scaledVertices;
    };//end

    public static getFbxObjectVertex(object3d:THREE.Object3D):THREE.BufferAttribute |
                                                              THREE.InterleavedBufferAttribute  {
        const objMesh = object3d as THREE.Mesh;
        const geometry:THREE.BufferGeometry = objMesh.geometry;
        const positionAttribute:THREE.BufferAttribute |
                                THREE.InterleavedBufferAttribute
                                = geometry.getAttribute('position');
        return positionAttribute;
    };//end

    public static async getFbxModel(url:string): Promise<ThreeModel3d> {
        const object3d: THREE.Object3D = await ThreeFbxUtil.loadFbx(url);
        const vertex = ThreeFbxUtil.getFbxObjectVertex(object3d);
        return { object3d, vertex };
    };//end


};//end

export async function loadFbxAdust(url:string): Promise<THREE.Object3D> {
    const loader = new FBXLoader();
    return new Promise((resolve, reject) => {
        loader.load(
            url,
            async (fbx: THREE.Group) => {
                const object = await adjustFbxNew(
                    fbx.children[0] as THREE.Object3D);
                resolve(object!);
            },
            undefined,
            (error) => {
                reject(error);
            }
        );
    });    
};//end

//arrayVertex = FbxLoaderUtil.normFbxObjVertexScale(objMesh.scale.x, arrayVertex);
//finalSizeX:number,
//const scaleFactor = finalSizeX / bounds.width;
//let arrayVertex:Float32Array = positionAttribute.array as Float32Array;
//arrayVertex = FbxLoaderUtil.scaleObjVertex(scaleFactor, arrayVertex);

export async function adjustFbxNew(object3d: THREE.Object3D): Promise<THREE.Object3D|null> {
    
    if(!(object3d instanceof THREE.Mesh)) {return null;}

    const bounds = ThreeFbxUtil.getFbxObjectBounds(object3d);
    if (!bounds) { return null; }

    const objMesh = object3d as THREE.Mesh;
    const geometry:THREE.BufferGeometry = objMesh.geometry;
    const positionAttribute:THREE.BufferAttribute |
                            THREE.InterleavedBufferAttribute
                            = geometry.getAttribute('position');

    let arrayVertex = ThreeFbxUtil.normFbxObjVertexScale(objMesh.scale.x, positionAttribute.array as Float32Array);
    
    object3d.geometry.setAttribute('position', new THREE.BufferAttribute(arrayVertex,3));
    object3d.geometry.attributes.position.needsUpdate = true;
    object3d.geometry.computeBoundingBox();
    object3d.geometry.computeBoundingSphere();               
    return object3d;
};

/*
public static async getFbxModelAdjEscale(url:string): Promise<ThreeModel3d> {
    const object3d: THREE.Object3D = await loadFbx(url);
    //alert(JSON.stringify(object3d!.scale));
    const vertex = FbxLoaderUtil.getFbxObjectVertex(object3d);
    return { object3d, vertex };
};//end

if(object3d instanceof THREE.Mesh) {       
    const geometry:THREE.BufferGeometry = object3d.geometry;
    const positionAttribute:THREE.BufferAttribute |
                            THREE.InterleavedBufferAttribute 
                            = geometry.getAttribute('position');

    const vertex: Float32Array = positionAttribute.array as Float32Array;
    const glObject:GlObject    = new GlObject(System3d.CC, vertex);
    
    const rotatedArray = glObject.rotate(1, Math.PI/4);

    geometry.setAttribute('position', new THREE.BufferAttribute(rotatedArray, 3));
    geometry.attributes.position.needsUpdate = true;
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
}        
*/