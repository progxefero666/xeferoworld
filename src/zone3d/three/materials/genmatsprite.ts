//src\zone3d\three\materials\genmatsprite.ts

import * as THREE from 'three';


/**
 * class GenSpriteMaterials
 */
export class GenSpriteMaterials {

    public static textureLoader = new THREE.TextureLoader();

    public static async loadTexture(path: string): Promise<THREE.Texture> {
        return new Promise((resolve, reject) => {
            this.textureLoader.load(
                path,
                texture => resolve(texture),
                undefined,
                err => reject(err)
            );
        });
    }//end 
    
    public static async getSpriteMaterial(path:string,sizeAtt:boolean,color:any,alpha?:number): Promise<THREE.SpriteMaterial> {
        const colorMap = await GenSpriteMaterials.loadTexture(path);
        const material = new THREE.SpriteMaterial( {
            color: color,
            map: colorMap,
            sizeAttenuation:sizeAtt,
            transparent:true,
            opacity:alpha??1,
            fog:false,
            depthTest: false,
            depthWrite:false
        } );
        return material;
    }//end 

}//end

/*
    /*
    const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        alphaTest: 0.5
    });    
    sprite.scale.set(width, height, 1);
    transparent: true,  // Sin alphaTest
opacity: 0.7  
const spriteMat = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    opacity: 1.0,
    alphaTest: 0.5,
    color: 0xffffff,
    fog: false,
    sizeAttenuation: true
});
*/