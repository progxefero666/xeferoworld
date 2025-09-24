
import * as THREE from 'three';
import { LineBasicMaterial, MeshStandardMaterial } from 'three'


/**
 * class GenColorMaterial.getSpriteMaterial
 */
export class GenColorMaterial {

    public static readonly MAT_TONEMAPPED: boolean = false;

    public static getLineMaterial(lineWwitdh:number,color: string,opacity?:number): LineBasicMaterial {
    
        const material = new LineBasicMaterial({
             color: color, 
             linewidth: 5 ,
             opacity: opacity,
             transparent: true
        }); 
        return material;
    }//end

    public static getGridMaterial(gridColor: string, meshOpacity: number): THREE.MeshStandardMaterial {
        return new THREE.MeshStandardMaterial({
            color: gridColor,
            opacity: meshOpacity,
            transparent: true,
            wireframe: true 
        });
    }//end

    public static getBaseMaterial(p_color: string, p_opacity: number): MeshStandardMaterial {
        return new MeshStandardMaterial({
            color: p_color,
            opacity: p_opacity,
            transparent: true
        })
    }//end

    public static getStandardMaterial(color:string,metalness:number,roughness:number,
                                      alpha?:number): MeshStandardMaterial {
        return new MeshStandardMaterial({
            color: color,
            opacity: alpha??1.0,
            transparent: true,            
            metalness: metalness,
            roughness: roughness,
            toneMapped: this.MAT_TONEMAPPED
        })
    }//end

    public static getSpriteMaterial(matColor:any): THREE.SpriteMaterial {
        const material:THREE.SpriteMaterial = new THREE.SpriteMaterial({
            color:matColor
        });
        return material;
    };


    //toneMapped: false,
    //({ clearcoat: 0.95, clearcoatRoughness: 0.44 } as any)

    /**
     * Creates a material that renders the wireframe (edges) of a mesh.
     *
     * @param gridColor The color of the wireframe.
     * @param meshOpacity The opacity of the wireframe.
     * @returns A LineBasicMaterial with wireframe properties.
     */


} //end class