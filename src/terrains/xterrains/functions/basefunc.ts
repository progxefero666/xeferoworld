//src\zone3d\xterrains\funcbase.ts
import * as THREE from 'three'
import { TDimension, Vector3d } from "@/common/types";
import { Math3dTerrains } from "@/terrains/xterrains/functions/math3dterrains";

import { Math3dUtil } from "../../../math3d/functions/math3dutil";
import { XMath2dUtil } from "../../../math2d/functions/xmath2dutil";
import { Vector2d } from '@/math2d/math2dtypes';
import { XMath2d } from '@/math2d/xmath2d';


//XMath2dPoly.isPointInsidePoly



export class XMountainFunctions {

    public static MA1_RADIUS_INTENS_FACTOR: number = 0.5;

    public static  getIntensityAlgoritmMA1(intensity:number,distPercent:number): number {
        const distForzeValue: number = XMath2dUtil.getValue100(intensity, distPercent);

        const intensityPowBase:number = (intensity-distForzeValue)/2.0;
        const intensityPowCalc = Math.pow(intensityPowBase,2);
        const intensityPow = XMath2dUtil.getValue100(intensityPowCalc, distPercent);

        const intensitySqrtBase: number = (intensity-distForzeValue)/1.0;
        const intensitySqrtCalc = intensitySqrtBase;
        const percentCalc:number = 100-distPercent;
        const intensitySqrt = XMath2dUtil.getValue100(intensitySqrtCalc,percentCalc);

        const intensityApply:number = (intensityPow + intensitySqrt);
        return intensityApply;
    };

};//end

export class XTerrBaseFunctions {
 

    public static applyRadialForze(terrVertex:Vector3d[][],forzeCenter:Vector2d,forzeRadius:number): Vector3d[][] {
        
        const forzeIntensity = XMountainFunctions.MA1_RADIUS_INTENS_FACTOR * forzeRadius;
        
        for (let axisvH = 0; axisvH < terrVertex.length; axisvH++) {
            for (let axisvDeep=0;axisvDeep<terrVertex[axisvH].length;axisvDeep++) {
                const vertexCoord2d:Vector2d = {
                    x:terrVertex[axisvH][axisvDeep].x,
                    y:terrVertex[axisvH][axisvDeep].z};

                const distToForceCenter: number 
                    = XMath2d.getPointsDistance(forzeCenter, vertexCoord2d);

                if(distToForceCenter<forzeRadius) {
                    const distPercent:number = XMath2dUtil.getPercent100(forzeRadius, distToForceCenter);
                    terrVertex[axisvH][axisvDeep].y = XMountainFunctions
                        .getIntensityAlgoritmMA1(forzeIntensity,distPercent);                
                }
            }//end for axis deep
        }//end for axis horizontal
        return terrVertex;

    };//end


};//end class 

    /*
                        if(forzeMode ===XTerrBaseFunctions.FX_A_MODE_POW) {
                        terrVertex[axisvH][axisvDeep].y = (terrVertex[axisvH][axisvDeep].y + intensityApply)/2.0;
                    }
                    else {
                        terrVertex[axisvH][axisvDeep].y += intensityApply;
                    }
           function getIntensityApply(distForzeValue:number): number {
            if(forzeMode ===XTerrBaseFunctions.FX_A_MODE_POW) {
                let intensityPow:number = (forzeIntensity-distForzeValue)/2.0;
                let intensityApply = Math.pow(intensityPow,2);
                return intensityApply;
            }
            else if(forzeMode === XTerrBaseFunctions.FX_A_MODE_SQRT) {
                    let intensitySqrt: number = (forzeIntensity-distForzeValue)/1.0;
                    let intensityApply = Math.sqrt(intensitySqrt);
                    return intensityApply;
            }
            else {
                return 0;
            }
        };
    */