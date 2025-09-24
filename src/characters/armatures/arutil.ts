//src\zone3d\armatures\arutil.ts

import * as THREE from 'three';

import { GlbLoaderObject } from '@/zone3d/three/loaders/objectloader';

/*
Armature
├── Hips (root)
│   ├── Spine
│   │   ├── Spine1
│   │   │   ├── Spine2
│   │   │   │   ├── Neck
│   │   │   │   │   └── Head
│   │   │   │   ├── LeftShoulder
│   │   │   │   │   └── LeftArm → LeftForeArm → LeftHand
│   │   │   │   └── RightShoulder
│   │   │   │       └── RightArm → RightForeArm → RightHand
│   ├── LeftUpLeg → LeftLeg → LeftFoot
│   └── RightUpLeg → RightLeg → RightFoot
*/

// Uso:
// const character = await loadCharacterGLB('character.glb');
// await attachWeaponToCharacter(character, 'weapon.glb', 'hand_R');

export async function attachWeaponToCharacter(characterGltf: any, weaponUrl: string, boneName: string) {    
    const weapon = await GlbLoaderObject.loadGLB_object(weaponUrl);    
    //find correct bone (hand_R)
    const bone = findBoneByName(characterGltf.scene, boneName);    
    if (bone) {
        bone.add(weapon);
        //weapon.position.set(0, 0, 0); 
        //weapon.rotation.set(0, 0, 0);
        //weapon.scale.set(1, 1, 1);     
    } 
    else {
        console.error("not bone found");
    }
}//end

// Función para encontrar un hueso por nombre
export function findBoneByName(object: THREE.Object3D, name: string): THREE.Bone | null {
    let targetBone: THREE.Bone | null = null;
    
    object.traverse((child) => {
        if (child instanceof THREE.Bone && child.name === name) {
            targetBone = child;
        }
    });
    
    return targetBone;
}//end


/*
const loader = new GLTFLoader();
loader.load('personaje.glb', (gltf) => {
    const model = gltf.scene;
    const animations = gltf.animations;

    // Buscar el hueso (bone) por nombre
    const handBone = model.getObjectByName('hand_R') as THREE.Bone;

    if (handBone) {
        // Crear el arma (o cargarla desde otro GLB)
        const weapon = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.5, 2),
            new THREE.MeshBasicMaterial({ color: 0xff0000 })
        );

        // Ajustar la posición del arma relativa al hueso
        weapon.position.set(0.5, 0, 0);
        weapon.rotation.set(0, 0, Math.PI / 2);

        // Agregar el arma como hijo del hueso
        handBone.add(weapon);
    }

    // Agregar el modelo a la escena
    scene.add(model);

    // Si hay animaciones, mezclarlas y reproducirlas
    // ... (código de animación)
});
*/
