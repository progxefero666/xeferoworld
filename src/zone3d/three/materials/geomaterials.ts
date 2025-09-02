
import * as THREE from 'three';
import { LineBasicMaterial, MeshStandardMaterial } from 'three'


/**
 * class GeoMaterials.getGridMaterial
 */
export class GeoMaterials {

    public static readonly MAT_TONEMAPPED: boolean = false;

    /*const objMaterial = (
        <meshStandardMaterial
            color="white"
            metalness={0}
            roughness={0.2}
            toneMapped={false} />
    );*/


    public static getLineMaterial(lineWwitdh:number,color: string,opacity?:number): LineBasicMaterial {
    
        const material = new LineBasicMaterial({
             color: color, 
             linewidth: 5 ,
             opacity: opacity,
             transparent: true
        }); 
        return material;
    }

    public static getGeoObjMaterial(p_color: string,p_opacity:number,
                                    p_metalness:number,p_roughness:number): MeshStandardMaterial {
        return new MeshStandardMaterial({
            color: p_color,
            opacity: p_opacity,
            transparent: true,            
            metalness: p_metalness,
            roughness: p_roughness
        })
    }

    public static getBaseMaterial(p_color: string, p_opacity: number): MeshStandardMaterial {
        return new MeshStandardMaterial({
            color: p_color,
            opacity: p_opacity,
            transparent: true
        })
    }

    /**
     * Creates a material that renders the wireframe (edges) of a mesh.
     *
     * @param gridColor The color of the wireframe.
     * @param meshOpacity The opacity of the wireframe.
     * @returns A LineBasicMaterial with wireframe properties.
     */
    public static getGridMaterial(gridColor: string, meshOpacity: number): THREE.MeshStandardMaterial {
        return new THREE.MeshStandardMaterial({
            color: gridColor,
            opacity: meshOpacity,
            transparent: true,
            wireframe: true 
        });
    }

} //end class