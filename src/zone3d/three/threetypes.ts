//src\zone3d\three\threetypes.ts

import * as THREE from 'three';

export type ThreeModel3d = {
    object3d:THREE.Object3D|null;
    vertex: THREE.BufferAttribute | THREE.InterleavedBufferAttribute;
};

export type TState3d = {
    position: number[];
    rotation: THREE.Quaternion;
};




