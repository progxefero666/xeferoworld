
import * as THREE from 'three';
import { LineBasicMaterial, MeshStandardMaterial } from 'three'
import { MaterialMapLoader } from './matmaploader';


/**
 * class MetalMaterials.getMaterial(MetalMaterials.COLOR_PLATE,0.9,0.1);
 * geometry.computeVertexNormals(); // Recalcula normales
geometry.normalizeNormals();     // Normaliza vectores
 */
export class GenMatTextures {

    public static textureLoader = new THREE.TextureLoader();

    /*
    Para transparencia real (vidrio): usa MeshPhysicalMaterial con transmission, thickness e ior (y un buen scene.environment).
    Ejemplo mínimo:

    const glass = new THREE.MeshPhysicalMaterial({
        metalness: 0,
        roughness: 0.05,
        transmission: 1,
        thickness: 0.2,
        ior: 1.5,
        attenuationColor: 0xffffff,
        attenuationDistance: 2
    });    

¿Qué es ior?
    Índice de refracción (Index of Refraction).
    Controla cuánto se curva la luz al entrar/salir del material (Ley de Snell) y la fuerza del reflejo Fresnel.
    Valores típicos: aire ≈ 1.0, agua 1.33, vidrio 1.5, diamante 2.4.
    En MeshPhysicalMaterial, ior afecta transmission y el brillo especular en ángulos rasante
    */

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
        
        const texture = await MaterialMapLoader.loadTextureMap(texturePath);
        const normalMap = normalMapPath 
            ? await MaterialMapLoader.loadTextureMap(normalMapPath)
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



}//end class