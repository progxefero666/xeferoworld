//

import { TDimension, Vector3d } from "@/common/types";
import { XMath2dUtil } from "@/math2d/xmath2dutil";

/**
 * class Math3dUtil.getAleatorySpherePoint
 */
export class Math3dUtil {

    
    /**
     * Get the distance between two points in 3D space
     */
    public static getDistance(p1: Vector3d, p2: Vector3d): number {
        return Math.sqrt(
            Math.pow(p2.x - p1.x, 2) +
            Math.pow(p2.y - p1.y, 2) +
            Math.pow(p2.z - p1.z, 2)
        );
    };//end

    /**
     * Get the midpoint between two points in 3D space
     */
    public static getCenter(p1: Vector3d, p2: Vector3d): Vector3d {
        return {
            x: (p1.x + p2.x) / 2,
            y: (p1.y + p2.y) / 2,
            z: (p1.z + p2.z) / 2
        };
    };
	
	static getTranslation3d(vertex_0:number[],vertex_1:number[]){
		const trans3d:number[] = [];
		trans3d[0] = vertex_1[0]-vertex_0[0];
		trans3d[1] = vertex_1[1]-vertex_0[1];
		trans3d[2] = vertex_1[2]-vertex_0[2];		
		return trans3d;
	}//end    

    public static getAleatoryPointInPlaneY(dim:TDimension,heightMin:number,heightMax:number): Vector3d {
        const pos_x: number =  XMath2dUtil.getAleatNumber(dim.width);
        const pos_z: number =  XMath2dUtil.getAleatNumber(dim.height);
        const pos_y: number = heightMin + XMath2dUtil.getAleatNumber(heightMax - heightMin);
        return { x: pos_x, y: pos_y, z: pos_z };
    };//end
   
    public static getAleatorySpherePointAtCC(spRadiusMin:number,spRadiusMax:number): Vector3d {
        const radius: number = XMath2dUtil.getAleatNumber(spRadiusMax - spRadiusMin) + spRadiusMin;
        const theta: number = XMath2dUtil.getAleatNumber(Math.PI * 2);
        const phi: number = XMath2dUtil.getAleatNumber(Math.PI);
        
        const x: number = radius * Math.sin(phi) * Math.cos(theta);
        const y: number = radius * Math.sin(phi) * Math.sin(theta);
        const z: number = radius * Math.cos(phi);        
        return { x, y, z };
    };//end

    public static getAleatorySpherePoint(spCenter:Vector3d,spRadiusMin:number,spRadiusMax:number): Vector3d {
        const ccCenter = Math3dUtil.getAleatorySpherePointAtCC(spRadiusMin, spRadiusMax);
        const point: Vector3d = {
            x: ccCenter.x + spCenter.x,
            y: ccCenter.y + spCenter.y,
            z: ccCenter.z + spCenter.z
        };
        return point;
    };//end

};//end class