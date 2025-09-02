//src\lib\planeutils.ts

import { Point2d } from "@/lib/graph2d/types2d";



/**
 * class PlaneUtil.findSafeRandomPosition Point2d
 */
export class PlaneUtil {

    /**
     * Finds a safe random position for a circle (gradient) to ensure it fits within the 1x1 canvas.
     * @param radius The radius of the circle.
     * @returns An object containing the safe x and y coordinates.
     */
    public static findSafeRandomPosition = (radius: number): Point2d => {
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