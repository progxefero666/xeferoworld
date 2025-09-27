//src\system3d\util\genskybox.ts

import * as THREE from 'three';

import { TDimension3d } from '@/common/types';
import { MaterialMapLoader } from '@/zone3d/three/materials/matmaploader';


/**
 * class SkyBoxGenerator.getCubeTexture
 */
export class SkyBoxGenerator {

    //[+X, −X, +Y, −Y, +Z, −Z]
    public static CUBE_SIDES:string[]=['rt.jpg','lf.jpg','up.jpg','dn.jpg','ft.jpg','bk.jpg'];

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
    public static async genSkyBoxBlack(folder:string,fname:string,typeExtension:string,
                                       dimension:TDimension3d,
                                       alpha?:number ):Promise<THREE.Mesh> {
        const colorBase:any ="#FFFFFF";                               
        const listPaths:string[]= SkyBoxGenerator.getAllPaths(folder,fname,typeExtension);
        console.log(listPaths);
        const skyboxMaterials:THREE.MeshBasicMaterial[] = await Promise.all(
            listPaths.map(path => 
                SkyBoxGenerator.getMaterial(path,colorBase,alpha)
            )
        );
        const skyboxGeo = new THREE.BoxGeometry(dimension.width,dimension.height,dimension.depth);        
        return new THREE.Mesh(skyboxGeo, skyboxMaterials);     
    }//end function

}//end