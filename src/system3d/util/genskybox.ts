//src\system3d\util\genskybox.ts

import * as THREE from 'three';

import { TDimension3d } from '@/common/types';
import { MaterialMapLoader } from '@/zone3d/three/materials/matmaploader';


/**
 * class SkyBoxGenerator.getCubeTexture
 */
export class SkyBoxGenerator {

    /*
        //const cubeT = await SkyBoxGenerator
        //    .getCubeTexture('/spacegame/skybox/skyboxspace_a/');
        //this.scene.background = cubeT;   
    */

    //[+X, −X, +Y, −Y, +Z, −Z]
    public static CUBE_SIDES:string[]=['skybox_rt.jpg','skybox_lf.jpg',
                                       'skybox_up.jpg','skybox_dn.jpg',
                                       'skybox_ft.jpg','skybox_bk.jpg'];

    public static async getCubeTexture(path:string): Promise<THREE.CubeTexture> {
         const loader = new THREE.CubeTextureLoader().setPath(path);
         const texture: THREE.CubeTexture = loader.load(SkyBoxGenerator.CUBE_SIDES);
         texture.colorSpace = THREE.SRGBColorSpace;
        return texture;
    }//end 

    /*
    const pmrem = new THREE.PMREMGenerator(renderer);
    const hdr = await new RGBELoader().setPath('/tex/hdr/').loadAsync('space_1k.hdr');
    const envRT = pmrem.fromEquirectangular(hdr).texture;
    scene.background = envRT;     // cielo
    // scene.environment = envRT; // cuando quieras IBL
    hdr.dispose(); pmrem.dispose();    
    */
    public static async getMaterial(path:string,colorBase:any,alpha?:number): Promise<THREE.MeshBasicMaterial> {
        const colorMap = await MaterialMapLoader.loadTextureMap(path);
        const material = new THREE.MeshBasicMaterial({
            color: colorBase, 
            map: colorMap,
            side: THREE.BackSide,
            transparent: true,
            opacity:alpha
        });
        return material;
    }//end 

    public static SIDES:string[]=["ft", "bk", "up", "dn", "rt", "lf"];

	public static getAllPaths(folder:string,fname:string,typeExtension:string) {		
		const baseFilename = folder + '/' + fname;
		const fileType = '.'+ typeExtension;
		const allpaths = SkyBoxGenerator.SIDES.map(side => {
		    return baseFilename + "_" + side + fileType;
		});		
		return allpaths;
	}//end    

    public static async genSkyBox(folder:string,fname:string,typeExtension:string,
                                  radius:number,colorBase:any,
                                  alpha?:number ):Promise<THREE.Mesh> {                             
        const listPaths:string[]= SkyBoxGenerator.getAllPaths(folder,fname,typeExtension);
        console.log(listPaths);
        const skyboxMaterials:THREE.MeshBasicMaterial[] = await Promise.all(
            listPaths.map(path => 
                SkyBoxGenerator.getMaterial(path,colorBase,alpha)
            )
        );
        const sideLen = radius * 2;
        const skyboxGeo = new THREE.BoxGeometry(sideLen,sideLen,sideLen); 
        const object = new THREE.Mesh(skyboxGeo, skyboxMaterials);
        object.position.set(0,0,0);     
        return object;     
    }//end function

}//end