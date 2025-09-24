//src\app\characters\functions\charactrenders.ts


import * as THREE from 'three'
import { ThreeFbxUtil } from "@/zone3d/three/loaders/threefbxutil";

export const loadTestObject = async(scene:THREE.Scene) => {
    const obj_box = await ThreeFbxUtil.loadFbx('/models3d/box.fbx');
    scene.add(obj_box);
};//end

export const renderHead = async(scene:THREE.Scene) => {
    const obj_head     = await ThreeFbxUtil.loadFbx('/head3d/head.fbx');
    const obj_chin     = await ThreeFbxUtil.loadFbx('/head3d/chin.fbx');
    const obj_eyeright = await ThreeFbxUtil.loadFbx('/head3d/eyeright.fbx');
    const obj_eyeleft  = await ThreeFbxUtil.loadFbx('/head3d/eyeleft.fbx');

    const group = new THREE.Group();
    group.add(obj_head);
    group.add(obj_chin);
    group.add(obj_eyeright);
    group.add(obj_eyeleft);
    scene.add(group);
    console.log(JSON.stringify(group.children[2].position));        
};//end