//src\zone3d\three\loaders\anbodymodifier.ts

import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TTimePosition, Vector3d } from '@/common/types';
import { ArmatureMixamo } from '@/characters/armatures/armixamo';

/**
 * class AnBodyModifier
 */
export class AnBodyModifier {


    public static removeTransX(gltf: GLTF): GLTF {
        const rootName = ArmatureMixamo.ARM_BONE_HIP;
        const tracks = gltf.animations[0].tracks;
        const track = tracks.find
            (t => t.name === `${rootName}.position`) as THREE.VectorKeyframeTrack | undefined;
        const times = track!.times; 
        for (let i = 0; i < times.length; i++) {
            track!.values[i * 3]=0.0;
            //track!.values[i * 3 + 1]=0.0;
            //track!.values[i * 3 + 2]=0.0;
        }
        return gltf;
    }//end

}//end