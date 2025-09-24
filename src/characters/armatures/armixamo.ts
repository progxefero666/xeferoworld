//src\zone3d\armatures\armixamo.ts


/**
 * class ArmatureMixamo.ARM_BONE_RIGHT_HAND
 */
export class ArmatureMixamo {

    public static ARM_BONE_HIP:string = 'mixamorigHips';

    public static ARM_BONE_RIGHT_HAND:string = 'mixamorigRightHand';
}//end

// NOMENCLATURA COMPLETA DE HUESOS MIXAMO
/*
const MIXAMO_BONE_NAMES = [
    // Huesos principales
    'mixamorigHips',          // Cadera (pivot principal)
    'mixamorigSpine',         // Columna vertebral baja
    'mixamorigSpine1',        // Columna vertebral media
    'mixamorigSpine2',        // Columna vertebral alta
    'mixamorigNeck',          // Cuello
    'mixamorigHead',          // Cabeza
    
    // Brazos derechos
    'mixamorigRightShoulder', // Hombro derecho
    'mixamorigRightArm',      // Brazo derecho
    'mixamorigRightForeArm',  // Antebrazo derecho
    'mixamorigRightHand',     // Mano derecha
    'mixamorigRightHandThumb1', // Pulgar derecho
    'mixamorigRightHandThumb2',
    'mixamorigRightHandThumb3',
    'mixamorigRightHandIndex1', // Índice derecho
    'mixamorigRightHandIndex2',
    'mixamorigRightHandIndex3',
    'mixamorigRightHandMiddle1', // Medio derecho
    'mixamorigRightHandMiddle2',
    'mixamorigRightHandMiddle3',
    'mixamorigRightHandRing1', // Anular derecho
    'mixamorigRightHandRing2',
    'mixamorigRightHandRing3',
    'mixamorigRightHandPinky1', // Meñique derecho
    'mixamorigRightHandPinky2',
    'mixamorigRightHandPinky3',
    
    // Brazos izquierdos
    'mixamorigLeftShoulder',  // Hombro izquierdo
    'mixamorigLeftArm',       // Brazo izquierdo
    'mixamorigLeftForeArm',   // Antebrazo izquierdo
    'mixamorigLeftHand',      // Mano izquierda
    'mixamorigLeftHandThumb1', // Pulgar izquierdo
    'mixamorigLeftHandThumb2',
    'mixamorigLeftHandThumb3',
    'mixamorigLeftHandIndex1', // Índice izquierdo
    'mixamorigLeftHandIndex2',
    'mixamorigLeftHandIndex3',
    'mixamorigLeftHandMiddle1', // Medio izquierdo
    'mixamorigLeftHandMiddle2',
    'mixamorigLeftHandMiddle3',
    'mixamorigLeftHandRing1', // Anular izquierdo
    'mixamorigLeftHandRing2',
    'mixamorigLeftHandRing3',
    'mixamorigLeftHandPinky1', // Meñique izquierdo
    'mixamorigLeftHandPinky2',
    'mixamorigLeftHandPinky3',
    
    // Piernas derechas
    'mixamorigRightUpLeg',    // Muslo derecho
    'mixamorigRightLeg',      // Pierna derecha
    'mixamorigRightFoot',     // Pie derecho
    'mixamorigRightToeBase',  // Base del pie derecho
    'mixamorigRightToe_End',  // Punta del pie derecho
    
    // Piernas izquierdas
    'mixamorigLeftUpLeg',     // Muslo izquierdo
    'mixamorigLeftLeg',       // Pierna izquierdo
    'mixamorigLeftFoot',      // Pie izquierdo
    'mixamorigLeftToeBase',   // Base del pie izquierdo
    'mixamorigLeftToe_End'    // Punta del pie izquierdo
];


// Función para encontrar huesos Mixamo comunes
function findCommonMixamoBones(gltf: any) {
    const commonBones: { [key: string]: THREE.Bone | null } = {
        hips: null,
        spine: null,
        head: null,
        rightHand: null,
        leftHand: null,
        rightFoot: null,
        leftFoot: null
    };
    
    gltf.scene.traverse((object: any) => {
        if (object.isBone) {
            if (object.name === 'mixamorigHips') commonBones.hips = object;
            if (object.name === 'mixamorigSpine') commonBones.spine = object;
            if (object.name === 'mixamorigHead') commonBones.head = object;
            if (object.name === 'mixamorigRightHand') commonBones.rightHand = object;
            if (object.name === 'mixamorigLeftHand') commonBones.leftHand = object;
            if (object.name === 'mixamorigRightFoot') commonBones.rightFoot = object;
            if (object.name === 'mixamorigLeftFoot') commonBones.leftFoot = object;
        }
    });
    
    return commonBones;
}
*/