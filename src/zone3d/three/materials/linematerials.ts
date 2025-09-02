
import * as THREE from 'three';
import { LineBasicMaterial, MeshStandardMaterial } from 'three';

// const wireframeMaterial = new THREE.LineBasicMaterial({color:WebColors.COLOR_BLACK,linewidth:2});

/**
 * class LineMaterials.getMaterial("#00FFFF",2,1.0);
 * THREE materials
 */
export class LineMaterials {

    /*
    return new THREE.LineBasicMaterial({
            color: color, linewidth: linesize ,
            opacity: opacity,transparent: true
    }); 
    */
        
    public static getMaterial(color: string,linewidth:number,alpha?:number): THREE.LineBasicMaterial {
        return new THREE.LineBasicMaterial({color:color,linewidth:linewidth});
    }


}//end class