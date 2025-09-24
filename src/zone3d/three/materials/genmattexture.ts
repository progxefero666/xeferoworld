
import * as THREE from 'three';
import { LineBasicMaterial, MeshStandardMaterial } from 'three'


/**
 * class MetalMaterials.getMaterial(MetalMaterials.COLOR_PLATE,0.9,0.1);
 * geometry.computeVertexNormals(); // Recalcula normales
geometry.normalizeNormals();     // Normaliza vectores
 */
export class TextureMaterials {

    public static textureLoader = new THREE.TextureLoader();


    public static async getTexturedMaterial(
        texturePath: string,
        metal: number = 0.5,
        rough: number = 0.5,
        alpha?: number,
        normalMapPath?: string,
        repeatX: number = 1,
        repeatY: number = 1,
        normalScale: number = 0.5 
    ): Promise<THREE.MeshStandardMaterial> {
        
        const texture = await this.loadTexture(texturePath);
        const normalMap = normalMapPath 
            ? await this.loadTexture(normalMapPath)
            : null;

        // Aplicar configuración de repetición
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(repeatX, repeatY);

        // Configurar normalMap si existe
        if (normalMap) {
            normalMap.wrapS = THREE.RepeatWrapping;
            normalMap.wrapT = THREE.RepeatWrapping;
            normalMap.repeat.set(repeatX, repeatY);
        }

        return new THREE.MeshStandardMaterial({
            map: texture,
            normalMap: normalMap,
            normalScale: new THREE.Vector2(normalScale, normalScale), // Aquí usamos el parámetro
            metalness: metal,
            roughness: rough,
            transparent: alpha !== undefined,
            opacity: alpha,
            side: THREE.DoubleSide,
            toneMapped: false
        });
    }

    public static loadTexture(path: string): Promise<THREE.Texture> {
        return new Promise((resolve, reject) => {
            this.textureLoader.load(
                path,
                texture => resolve(texture),
                undefined,
                err => reject(err)
            );
        });
    }


}//end class