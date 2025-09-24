//src\zone3d\three\loaders\glbloaderanimation.ts

import * as THREE from 'three';

import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TDimension3d, TTimePosition, Vector3d } from '@/common/types';
import { ArmatureMixamo } from '@/characters/armatures/armixamo';
import { GlbAnimationLoader } from './animationloader';
import { ArmBodyAnimation } from '@/characters/animations/model/anarmbody';
import { AnBodyModifier } from './anbodymodifier';

export type AnCheckResult = {
    uniform: boolean;
    avgDelta: number;
    minDelta: number;
    maxDelta: number;
};


/**
 * class GlbAnUtil.getSkinMeshBounds
 */
export class GlbAnUtil {

    public static getCmKeyTimes(gltf: GLTF): number[] {
        const rootName = ArmatureMixamo.ARM_BONE_HIP;
        const result:number[] = [];

        const tracks = gltf.animations[0].tracks;
        const track = tracks.find
            (t => t.name === `${rootName}.position`) as THREE.VectorKeyframeTrack | undefined;
        if (!track) return result;

        const times = track.times; 
        const values = track.values;
        for (let i = 0; i < times.length; i++) {
            const x = values[i * 3] / 100;
            const y = values[i * 3 + 1] / 100;
            const z = values[i * 3 + 2] / 100;
            result.push(times[i]);
        }
        return result;
    }//end

    //convert position to meters by /100
    public static getCmKeyframes(gltf: GLTF): TTimePosition[] {
        const rootName = ArmatureMixamo.ARM_BONE_HIP;
        const result:TTimePosition[] = [];

        const tracks = gltf.animations[0].tracks;
        const track = tracks.find
            (t => t.name === `${rootName}.position`) as THREE.VectorKeyframeTrack | undefined;
        if (!track) return result;

        const times = track.times; 
        const values = track.values;
        for (let i = 0; i < times.length; i++) {
            const x = values[i * 3] / 100;
            const y = values[i * 3 + 1] / 100;
            const z = values[i * 3 + 2] / 100;
            result.push({
                time: times[i],
                position: { x, y, z }
            });
        }
        return result;
    }//end

    public static async readKfListSkinMesh(url:string,times:number[],removeTransX:boolean): Promise<THREE.SkinnedMesh[]> {

        const objects: THREE.SkinnedMesh[] = [];
        for (let idx = 0; idx < times.length; idx++) {
            let animation = await GlbAnimationLoader.readAnimation(url);
            if(removeTransX){
                animation = AnBodyModifier.removeTransX(animation);
            }
            
            const mixer = new THREE.AnimationMixer(animation.scene);
            const action = mixer.clipAction(animation.animations[0]);
            action.play();
     
            mixer.setTime(times[idx]);
            animation.scene.updateMatrixWorld(true);
            const posed = animation.scene.clone(true);
            let objectMesh: THREE.SkinnedMesh | null = null;
            let found = false;
            posed.traverse((child) => {
                if(!found){
                    if (child instanceof THREE.SkinnedMesh && !objectMesh) {
                        objectMesh = child;
                        found = true;                  
                    }
                }
            });
            objects.push(objectMesh!);
        }
        return objects;
    }//end
    
    public static getSkinMeshSize(objSkin: THREE.SkinnedMesh,axis:number): number{

        const objMesh:THREE.Mesh =objSkin as THREE.Mesh;
        let size:number=0;        
        if(axis === 0) {
            size= objMesh.geometry.boundingBox!.max.x - objMesh.geometry.boundingBox!.min.x;
        }
        else if(axis === 1) {
            size= objMesh.geometry.boundingBox!.max.y - objMesh.geometry.boundingBox!.min.y;
        }       
        else if(axis === 2) {
            size= objMesh.geometry.boundingBox!.max.z - objMesh.geometry.boundingBox!.min.z;
        }
        return size;
    };

    public static getSkinMeshBounds(objSkin: THREE.SkinnedMesh): TDimension3d{

        const objMesh:THREE.Mesh =objSkin as THREE.Mesh;
        //let geometry= objMesh.geometry;        
        const obj_width:number = objMesh.geometry.boundingBox!.max.x - objMesh.geometry.boundingBox!.min.x;
        const obj_height:number = objMesh.geometry.boundingBox!.max.y - objMesh.geometry.boundingBox!.min.y;
        const obj_depth:number = objMesh.geometry.boundingBox!.max.z - objMesh.geometry.boundingBox!.min.z;  
        return {width:obj_depth,height:obj_height,depth:obj_width};
    };
        
    public static consoleGltfAnalisis(gltf: GLTF) {
        console.log('=== GLTF Structure ===');
        console.log('Main scene:', gltf.scene);
        console.log('All scenes:', gltf.scenes);
        console.log('Animations:', gltf.animations);
        let meshCount = 0;
        gltf.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                console.log(`Mesh ${meshCount++}:`, child);
                //console.log('  - Geometría:', child.geometry);
                //console.log('  - Material:', child.material);
            }
        });
        console.log(`count meshes: ${meshCount}`);
        console.log('================================');
    }//end 

    public static async inspectAnimation(url: string): Promise<void> {
        const loader = new GLTFLoader();

        return new Promise((resolve, reject) => {
            loader.load(url, (gltf: GLTF) => {
                const clip = gltf.animations[0];
                console.log("Animación:", clip.name);
                console.log("Duración (s):", clip.duration);
                console.log("Tracks:", clip.tracks.length);

                clip.tracks.forEach((track, i) => {
                    const times = (track as any).times as Float32Array;
                    console.log(
                        `Track ${i}: ${track.name} (${track.ValueTypeName}), keyframes=${times.length}`
                    );
                });
                resolve();
            }, undefined, reject);
        });
    }//end

}//end