//src\system3d\util\genskybox.ts

import * as THREE from 'three';

import { TDimension3d } from '@/common/types';
import { MaterialMapLoader } from '@/zone3d/three/materials/matmaploader';


/**
 * class SkyBoxGenerator
 */
export class SkyBoxGenerator {

    public static SIDES:string[]=["ft", "bk", "up", "dn", "rt", "lf"];

	public static getAllPaths(folder:string,fname:string,typeExtension:string) {		
		const baseFilename = folder + '/' + fname;
		const fileType = '.'+ typeExtension;
		const pathStings = SkyBoxGenerator.SIDES.map(side => {
		    return baseFilename + "_" + side + fileType;
		});		
		return pathStings;
	}//end

    public static async getMaterial(path:string,colorBase:any,alpha?:number): Promise<THREE.MeshBasicMaterial> {
        const colorMap = await MaterialMapLoader.loadTextureMap(path);
        const material = new THREE.MeshBasicMaterial({
            color: colorBase, 
            map: colorMap,
            side: THREE.BackSide,
            depthWrite: false,
            depthTest: false,       
            transparent: true,
            opacity:alpha
        });
        return material;
    }//end 

    public static async genSkyBoxBlack(folder:string,fname:string,typeExtension:string,
                                       dimension:TDimension3d,
                                       alpha?:number ):Promise<THREE.Mesh|null> {
        const colorBase:any ="#FFFFFF";                               
        const listPaths:string[]= SkyBoxGenerator.getAllPaths(folder,fname,typeExtension);
        const skyboxMaterials:THREE.MeshBasicMaterial[] = await Promise.all(
            listPaths.map(path => 
                SkyBoxGenerator.getMaterial(path,colorBase,alpha)
            )
        );
        const skyboxGeo = new THREE.BoxGeometry(dimension.width,dimension.height,dimension.depth);        
        return new THREE.Mesh(skyboxGeo, skyboxMaterials);     
    }//end function

}//end