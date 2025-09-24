//src\zone3d\three\geoutil.ts

import { TDimension3d } from '@/common/types';
import * as THREE from 'three'

/**
 * class TDimension3d =  GeoUtil.getSingleObjBounds
 */
export class GeoUtil {

  
    public static getSingleObjBounds(object: THREE.Object3D): TDimension3d{

        let geometry:any;
        for (const child of object.children) {
            if (child instanceof THREE.Mesh) {
                geometry = child.geometry;
                break;
            }
        }
        const obj_width:number = geometry.boundingBox!.max.x - geometry.boundingBox!.min.x;
        const obj_height:number = geometry.boundingBox!.max.y - geometry.boundingBox!.min.y;
        const obj_depth:number = geometry.boundingBox!.max.z - geometry.boundingBox!.min.z;  

        return {width:obj_depth,height:obj_height,depth:obj_width};
    };
};//end