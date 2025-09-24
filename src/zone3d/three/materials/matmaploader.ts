//src\zone3d\three\materials\matmaploader.ts

import * as THREE from 'three';

/**
 * class MaterialMapLoader.loadTexture
 */
export class MaterialMapLoader {

    public static textureLoader = new THREE.TextureLoader();

    public static loadTextureMap(path: string): Promise<THREE.Texture> {
        return new Promise((resolve, reject) => {
            this.textureLoader.load(
                path,
                texture => resolve(texture),
                undefined,
                err => reject(err)
            );
        });
    }//end    

}//end