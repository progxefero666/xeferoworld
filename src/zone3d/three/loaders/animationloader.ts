//src\zone3d\three\loaders\glbloaderanimation.ts

import * as THREE from 'three';

import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TDimension3d, Vector3d } from '@/common/types';
import { ArmatureMixamo } from '@/characters/armatures/armixamo';
import { GlbAnUtil } from '@/zone3d/three/loaders/anmutil';

/*
interface GLTF {
    scene: THREE.Object3D;          // jerarquía de objetos (modelos, meshes, bones, etc.)
    scenes: THREE.Object3D[];       // todas las escenas del archivo
    animations: THREE.AnimationClip[]; // todas las animaciones
    cameras: THREE.Camera[];        // cámaras incluidas (si hay)
    asset: any;                     // metadatos del archivo
}
*/

/**
 * class GlbAnimationLoader.readAnimation
 */
export class GlbAnimationLoader {
 
    public static async readAnimation(url: string): Promise<GLTF> {
        const loader = new GLTFLoader();
        return new Promise((resolve, reject) => {
            loader.load(url, (gltf: GLTF) => { resolve(gltf); },
                undefined, reject);
        });
    }//end

  

}//end
