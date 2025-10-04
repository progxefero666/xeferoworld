//src\app\ide\application\ideworlfunct.ts

import { GlbUtil } from '@/zone3d/three/loaders/glbutil';
import * as THREE from 'three';

/**
 * class AppWorldFunct.loadAircraft
 */
export class AppWorldFunct {

    /*
    //const src: string = '/spacegame/player/xwing8k.glb';
    //const src: string = '/spacegame/player/xwingfewpolys.glb';
    //Longitud: 19'10 m. ; Altura: 4'88 m
    //const src: string = '/spacegame/player/aircraftblackhigh.glb';        
    //const src: string = '/spacegame/player/spaceshipAfewpolys.glb';     
    */


    public static loadAircraft = async (scene:THREE.Scene):Promise<boolean> => {
        
        const src: string = '/spacegame/player_lib/gamedarkblue.glb';
        const glObject: THREE.Object3D = await GlbUtil.loadGLB_object(src);
        const objMesh = glObject as THREE.Mesh;
        //(objMesh.material as THREE.MeshPhysicalMaterial).envMapIntensity = 0.0; 
        (objMesh.material as THREE.MeshPhysicalMaterial).roughness = 0.2; 
        (objMesh.material as THREE.MeshPhysicalMaterial).metalness = 0.3; 
        (objMesh.material as THREE.MeshPhysicalMaterial).clearcoat = 0.7; 
        (objMesh.material as THREE.MeshPhysicalMaterial).clearcoatRoughness = 0.08; 
        //(objMesh.material as THREE.MeshPhysicalMaterial).normalScale.set(1.0,1.0);
        //(objMesh.material as THREE.MeshPhysicalMaterial).ior = 1.5;        
        (objMesh.material as THREE.MeshPhysicalMaterial).needsUpdate = true;                
        scene.add(objMesh);
        return true;
    }//end

    public static addPBRTestSpheres(scene:THREE.Scene) {	
        const material = new THREE.MeshPhysicalMaterial({
            color: '#FFFFFF',
            metalness: 0.8,
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
