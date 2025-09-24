//src\app\zone3d\math3d\math3dplane.ts

import { TDimension, Vector3d } from "@/common/types";

/**
 * class Math3dPlane.getPlaneVertex(position, sidelen, countsubdiv);
 */
export class Math3dTerrains {

    /**
     * Get points of plane Y with aspect ratio 1:1
     *   - for create three.js PlaneGeometry
     */
    public static getPlaneTwoDimVertex(position: Vector3d, sidelen: number, countsubdiv: number): Vector3d[][] {
        let points: Vector3d[][] = [];
        const sizeUnit = sidelen / countsubdiv;
        const half_sidelen = sidelen / 2;
        for (let xindex = 0; xindex <= countsubdiv; xindex++) {
            points[xindex] = [];
            for (let zindex = 0; zindex <= countsubdiv; zindex++) {
                points[xindex][zindex] = {
                    x: position.x + xindex * sizeUnit - half_sidelen,
                    y: position.y,
                    z: position.z + zindex * sizeUnit - half_sidelen,
                };
            }
        }
        return points;
    };//end

}//end class