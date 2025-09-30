//src\app\ide\application\ideworlfunct.ts

import { GlbUtil } from '@/zone3d/three/loaders/glbutil';
import * as THREE from 'three';

/**
 * class AppWorldFunct.loadAircraft
 */
export class AppWorldFunct {

    public static loadAircraft = async (scene:THREE.Scene):Promise<boolean> => {

        //const src: string = '/spacegame/player/xwing8k.glb';
        //Longitud: 19'10 m. ; Altura: 4'88 m
        const src: string = '/spacegame/player/aircraftblackhigh.glb';
        const glObject: THREE.Object3D = await GlbUtil.loadGLB_object(src);
        
        /*
        const material = (glObject as THREE.Mesh)
                    .material as THREE.MeshPhysicalMaterial;
        //material.envMapIntensity = 1.5; 
        material.roughness = 0.6;
        material.metalness = 0.6;        
        //material.clearcoat = 0.7;
        //material.clearcoatRoughness = 0.08; 
        //material.normalScale.set(1.5,1.5);
        //material.ior = 1.5;
        material.needsUpdate = true;        
        */
        scene.add(glObject);
        return true;
    }//end

    public static addPBRTestSpheres(scene:THREE.Scene) {	
        const material = new THREE.MeshPhysicalMaterial({
            color: 0xaaaaaa,
            metalness: 1.0,
            roughness: 0.15,
            clearcoat: 0.7,
            clearcoatRoughness: 0.1,
            envMapIntensity: 1.6,
        });
        //for normal maps
        material.normalScale.set(2,2);
        const geo = new THREE.SphereGeometry(1, 64, 32);
        const m = new THREE.Mesh(geo, material);
        m.position.set(-2, 1, 0);
        scene.add(m);
    }//end

}//end
