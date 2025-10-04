//src\app\zone3d\universo3d\monitorfunc.ts

import * as THREE from 'three'

import { ThreeGenSpheres } from "@/zone3d/three/functions/genspheres";
import { System3dConfig } from "@/system3d/system3dcfg";
import { GeoUtil } from '@/zone3d/three/util/geoutil';
import { TDimension3d } from '@/common/types';
import { ThreeFbxUtil } from '@/zone3d/three/loaders/threefbxutil';

/*
export const loadStarts = async(scene: THREE.Scene) => {
    console.log("loadTestObjects");
    const stars:THREE.Mesh[] = ThreeGenSpheres.getAleatMiniSpheres(10000, System3dConfig.CC, 500,1000);
    for (let objIndex = 0; objIndex < stars.length; objIndex++) {
        scene.add(stars[objIndex]);
    }
};//end
*/

export const loadFighter = async(scene: THREE.Scene) => {
    const obj_avion:THREE.Object3D  = await ThreeFbxUtil.loadFbx('/models3d/avion.fbx');
    scene.add(obj_avion);
};//end

export const loadXWing = async(scene: THREE.Scene) => {
    const obj_top:THREE.Object3D  = await ThreeFbxUtil.loadFbx('/models3d/xwingv1.fbx');
    const obj_down:THREE.Object3D = await ThreeFbxUtil.loadFbx('/models3d/xwingv2.fbx');

    //console.log(obj_top.toJSON());
    const scale:THREE.Vector3 = obj_top.scale;
    console.log(scale);

    /*
    if(obj_top instanceof THREE.Mesh) {
        obj_top.geometry.computeBoundingBox();
        const geometry = obj_top.geometry;        
        geometry.points = geometry.attributes.position;
        for (let i = 0; i < geometry.points.count; i++) {
            const x = geometry.points.getX(i);
            const y = geometry.points.getY(i);
            const z = geometry.points.getZ(i);
            console.log(x+" ");
        }        
    }
    */
    //const obj_top_bounds:TDimension3d = GeoUtil.getSingleObjBounds(obj_top); 
    //console.log(obj_top_bounds);

    const group = new THREE.Group();
    group.add(obj_top);
    group.add(obj_down);

    group.lookAt(new THREE.Vector3(0, 0, 0));
    //group.scale.set(0.1, 0.1, 0.1); // Ajustar escala
    scene.add(group);
    //console.log(JSON.stringify(group.children[2].position));        
};//end   


const loadGridHelper = async(scene: THREE.Scene) => {
    const geo = new THREE.BoxGeometry(2, 2, 2);
    const points = new THREE.Points(geo);
    scene.add(points);
    scene.add(new THREE.GridHelper(10, 10));
};//end

/*
        const line3d:ThreeLine3d = GeoUtil.generateThreeLine(
            [-5, 0, 0], [5, 0, 0], 0xff0000
        );
        scene!.add(line3d.gline); 

*/