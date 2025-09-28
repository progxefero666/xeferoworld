//src\zone3d\three\materials\materialutil.ts

import * as THREE from 'three'

/**
 * class ThMaterialUtil
 */
export class ThMaterialUtil {

    public static summarizeMaterial(m: THREE.Material) {

    const mm = m as THREE.MeshStandardMaterial as any; 
    // name: m.name,

    const summary = {       
        color: mm.color?.getHexString?.(),
        map: mm.map?.name ?? mm.map?.uuid,
        normalMap: mm.normalMap?.name ?? mm.normalMap?.uuid,        
        roughnessMap: mm.roughnessMap?.name ?? mm.roughnessMap?.uuid,
        metalnessMap: mm.metalnessMap?.name ?? mm.metalnessMap?.uuid,
        //aoMap: (mm as any).aoMap?.name ?? (mm as any).aoMap?.uuid,
        //aoMapIntensity: (mm as any).aoMapIntensity,
        //emissiveMap: mm.emissiveMap?.name ?? mm.emissiveMap?.uuid,
        //alphaMap: mm.alphaMap?.name ?? mm.alphaMap?.uuid,  
        //transparent: m.transparent,
        //opacity: (m as any).opacity,
        //normalScale: mm.normalScale ? { x: m1m.normalScale.x, y: mm.normalScale.y } : undefined,
        //metalness: mm.metalness,
        //roughness: mm.roughness,
        //emissive: mm.emissive?.getHexString?.(),
        //envMapIntensity: mm.envMapIntensity,              
    };
    console.log(summary);
};//end    
}