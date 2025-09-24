//src\lib\planeutils.ts

import { TDimension } from "@/common/types";
import { Point2d } from "@/lib/graph2d/types2d";
import { XMath2d } from "../xmath2d";
import { XMath2dUtil } from "./xmath2dutil";
import { XMath2dPoly } from "../polygons/mathpoly";



/**
 * class PlaneUtil.findSafeRandomPosition Point2d
 */
export class PlaneUtil {

    /*
    public static findSafeRandomPosition = (dimension:TDimension,radius: number): Point2d => {
        const boundsX: number[] = [(dimension.width/2)*(-1),dimension.width/2];
        const boundsY: number[] = [(dimension.height/2)*(-1),dimension.height/2];

        const center:Point2d = {x:0,y:0};
        let point:Point2d = {x:0,y:0};
        let pointFound: boolean = false;
        while(!pointFound){
            point = XMath2dUtil.getAleatoryPoint(center,dimension);
            const distToLimits: number = XMath2dPoly
                .getMinDistToLimits(center,boundsX,boundsY, point);
            
            if(distToLimits <= radius){pointFound = true;}
        }
        return point;

        return {x:0,y:0};
    }//end
    */

    public static findSafeRandomPosition = (dimension:TDimension,radius: number): Point2d => {
        const position01:Point2d = PlaneUtil.findSafeRandomPosition01(radius);
        const coord_x = position01.x * dimension.width;
        const coord_y = position01.y * dimension.height;
        return {x:coord_x,y:coord_y};
    }//

    /**
     * Finds a safe random position for a circle (gradient) to ensure it fits within the 1x1 canvas.
     * @param radius The radius of the circle.
     * @returns An object containing the safe x and y coordinates.
     */
    public static findSafeRandomPosition01 = (radius: number): Point2d => {
        let x, y;
        const maxAttempts = 100;
        let attempts = 0;

        do {
            x = Math.random();
            y = Math.random();
            attempts++;
            if (attempts > maxAttempts) {
                console.warn("Could not find a safe position.Placing it at center.");
                return { x: 0.5, y: 0.5 };
            }
        } while (
            x - radius < 0 ||
            x + radius > 1 ||
            y - radius < 0 ||
            y + radius > 1
        );

        return { x, y };
    };

}//end 