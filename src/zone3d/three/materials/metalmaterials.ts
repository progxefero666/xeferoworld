
import * as THREE from 'three';
import { LineBasicMaterial, MeshStandardMaterial } from 'three'


/**
 * class MetalMaterials.getMaterial(MetalMaterials.COLOR_PLATE,0.9,0.1);
 */
export class MetalMaterials {

    public static readonly DEF_METALNESS: number = 0.8;
    public static readonly DEF_ROUGHNESS: number = 0.05;

    public static readonly MAT_TONEMAPPED: boolean = false;

    public static getMaterial(color: any, metal: number, rough: number, alpha?: number): THREE.MeshStandardMaterial {

        if (alpha) {
            return new THREE.MeshStandardMaterial({
                color: color,
                opacity: alpha,
                transparent: true,
                metalness: metal,
                roughness: rough,
                toneMapped: false
            });
        }
        else {
            return new THREE.MeshStandardMaterial({
                precision: "highp",
                color: color,
                metalness: metal,
                roughness: rough,
                toneMapped: false,
                ...({ clearcoat: 0.95, clearcoatRoughness: 0.44 } as any)
            });
        }

    }

}//end class