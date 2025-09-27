//src\app\ide\util\idethreeutil.ts


import * as THREE from 'three'
import { IdeConfig } from '../xethreeidecfg';
import { GenColorMaterial } from '@/zone3d/three/materials/genmatcolor';

/**
 * class IdeThreeUtil.getLightMesh
 */
export class IdeThreeUtil {

    public static getLightMesh(): THREE.Mesh{
        const mesh = new THREE.Mesh(
            new THREE.SphereGeometry(IdeConfig.LIGHT_OBJ_RADIUS,16,16), 
            GenColorMaterial.getGridMaterial(IdeConfig.LIGHT_OBJ_COLOR,1));   
        return mesh;    
    }
}//end 
