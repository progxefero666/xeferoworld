//src\zone3d\three\functions\genobjects.ts

import * as THREE from 'three'
import { GenSpriteMaterials } from '../materials/genmatsprite';


/**
 * class ThreeGenObjects
 */
export class ThreeGenObjects {

    //const material:THREE.SpriteMaterial = await GenSpriteMaterials.getSpriteMaterial(texturePath);

    public static genSpriteObject(material:THREE.SpriteMaterial):  THREE.Sprite {        
        return new THREE.Sprite(material);
    }//end
    

}//end