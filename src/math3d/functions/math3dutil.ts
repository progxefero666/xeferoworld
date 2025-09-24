//

import { TDimension, Vector3d } from "@/common/types";
import { XMath2dUtil } from "@/math2d/functions/xmath2dutil";
import { XMath2d } from "@/math2d/xmath2d";

/**
 * class Math3dUtil.getPoint3d
 */
export class Math3dUtil {

    public static getDistance(p1: Vector3d, p2: Vector3d): number {
        return Math.sqrt(
            Math.pow(p2.x - p1.x, 2) +
            Math.pow(p2.y - p1.y, 2) +
            Math.pow(p2.z - p1.z, 2)
        );
    };//end

    public static getCenter(p1: Vector3d, p2: Vector3d): Vector3d {
        return {
            x: (p1.x + p2.x) / 2,
            y: (p1.y + p2.y) / 2,
            z: (p1.z + p2.z) / 2
        };
    };
	
	static getAxisTranslation(axisIndex:number,p1:Vector3d,p2:Vector3d):number{
		let translation:number=0.0;
        if(axisIndex===0){  
            translation =p2.x-p1.x;
        }
        else if(axisIndex===1){
            translation = p2.y-p1.y;
        }
        else if(axisIndex===2){
            translation =p2.z-p1.z;
        }	
		return translation;
	}//end

	static getTranslation(p1:Vector3d,p2:Vector3d):number[]{
		const translation:number[] = [];
		translation[0] = p2.x-p1.x;
		translation[1] = p2.y-p1.y;
		translation[2] = p2.z-p1.z;		
		return translation;
	}//end    

	static getTranslatedPoint(point:Vector3d,translation:number[] ):Vector3d{
		return {x:point.x+translation[0],
                y:point.y+translation[1],
                z:point.z+translation[2]};
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

    public static getCfPoint(center:Vector3d,radius:number,angle_h:number):Vector3d{
        var coord_x = center.x + ( radius * Math.cos(angle_h));
        var  coord_z = center.z + ( radius * Math.sin(angle_h));		
        return {x:coord_x,y:center.y,z:coord_z};	
    }//end
    
    public static getCfPoints(center:Vector3d,radius:number,countPoints:number):Vector3d[]{
        const cfPoints: Vector3d[] = [];
        const angleUnit:number = (Math.PI * 2) / countPoints;
        let angle:number = 0;
        for(let idx=0;idx<countPoints;idx++) {
            cfPoints.push(Math3dUtil.getCfPoint(center, radius, angle));
            angle = XMath2d.getAngleInc(angle, angleUnit);
        }
        return cfPoints;
    }//end

    public static getPoint3d(coords: number[]): Vector3d {
        return {x:coords[0],y:coords[1],z:coords[2]};
    };//end
        

    public static getCoordsArray(vector3d: Vector3d): number[] {
        return [vector3d.x, vector3d.y, vector3d.z];
    };//end
    
    public static getCoordsVector(coords: number[] ): number[] {
        return [coords[0], coords[1], coords[2]];
    };//end

};//end class