//src\terrains\functions\texturecolorutil.ts

import { TDimension } from "@/common/types";


/**
 * class TextureColorUtil
 */
export class TextureColorUtil {

    public static hexToRgb(hex: string): [number, number, number] {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [ parseInt(result[1], 16),
                          parseInt(result[2], 16),
                          parseInt(result[3], 16)]: [0, 0, 0];
    };//end 

    /**
     * Linearly interpolates between two colors.
     * @param factor The interpolation factor (0 to 1).
     * @returns The interpolated color as [r, g, b].
     */
    public static getLerpColor(color1:number[],color2:number[],factor:number): number[] {
        const r = color1[0] + factor * (color2[0] - color1[0]);
        const g = color1[1] + factor * (color2[1] - color1[1]);
        const b = color1[2] + factor * (color2[2] - color1[2]);
        return [r, g, b];
    };//end 

    /**
     * Applies a coastal effect to soften the transition between water and land.
     * @param waterColor The RGB color of the water.
     * @param landColor The RGB color of the shore.
     * @param distance The max distance in pixels for the effect.
     */
    public static applyCoastalEffect(imageDim: TDimension,imageData:ImageData,
                                     waterColor:number[],landColor:number[],                                     
                                     distance: number) {

        // Use 0.75 to make the blend more subtle towards the 
        const blendFactor:number = 1;
        const blendSubfactor:number = 0.75;
        const data = imageData.data;
        
        // First pass: identify all water pixels
        const isWater = new Array(imageDim.width * imageDim.height).fill(false);
        for (let i = 0; i < data.length; i += 4) {
            if (data[i] === waterColor[0] && 
                data[i + 1] === waterColor[1] && 
                data[i + 2] === waterColor[2]) {
                isWater[i / 4] = true;
            }
        }

        const newData = new Uint8ClampedArray(data);

        // Second pass: apply the blend effect
        // Only apply effect to water pixels
        for (let y = 0; y < imageDim.height; y++) {

            for (let x = 0; x < imageDim.width; x++) {

                const index = y * imageDim.width + x;                
                if (!isWater[index]) continue; 

                //............................................................................................
                // calculate minSqDist to nearest land pixel
                let minSqDist = Infinity;
                const searchRadius = distance;
                for (let j = -searchRadius; j <= searchRadius; j++) {
                    for (let i = -searchRadius; i <= searchRadius; i++) {
                        const nx = x + i;
                        const ny = y + j;
                        if (nx >= 0 && nx < imageDim.width && ny >= 0 && ny < imageDim.height) {
                            const nIndex = ny * imageDim.width + nx;
                            if (!isWater[nIndex]) {
                                const sqDist = i * i + j * j;
                                if (sqDist < minSqDist) {
                                    minSqDist = sqDist;
                                }
                            }
                        }
                    }
                }
                //............................................................................................

                //............................................................................................
                const dist = Math.sqrt(minSqDist);
                if (dist <= distance) {
                    const factor = blendFactor - (dist / distance);                    
                    const blendedColor = TextureColorUtil
                        .getLerpColor(waterColor,landColor,(factor*blendSubfactor));
                    const pixelIndex = index * 4;
                    newData[pixelIndex] = blendedColor[0];
                    newData[pixelIndex + 1] = blendedColor[1];
                    newData[pixelIndex + 2] = blendedColor[2];
                }
                //............................................................................................
            
            }//end for width

        }//end for height

        data.set(newData);
    };//end function


    /* original
    public static applyCoastalEffect(imageDim: TDimension,imageData:ImageData,
        
        waterColor: ARRColor,
        landColor: ARRColor,
        distance: number) {
        const data = imageData.data;
        const isWater = new Array(imageDim.width * imageDim.height).fill(false);

        // First pass: identify all water pixels
        for (let i = 0; i < data.length; i += 4) {
            if (data[i] === waterColor.value[0] && data[i + 1] === waterColor.value[1] && data[i + 2] === waterColor.value[2]) {
                isWater[i / 4] = true;
            }
        }

        const newData = new Uint8ClampedArray(data);

        // Second pass: apply the blend effect
        for (let y = 0; y < imageDim.height; y++) {
            for (let x = 0; x < imageDim.width; x++) {
                const index = y * imageDim.width + x;
                if (!isWater[index]) continue; // Only apply effect to water pixels

                let minSqDist = Infinity;

                // Search for the nearest land pixel in a search box
                const searchRadius = distance;
                for (let j = -searchRadius; j <= searchRadius; j++) {
                    for (let i = -searchRadius; i <= searchRadius; i++) {
                        const nx = x + i;
                        const ny = y + j;

                        if (nx >= 0 && nx < imageDim.width && ny >= 0 && ny < imageDim.height) {
                            const nIndex = ny * imageDim.width + nx;
                            if (!isWater[nIndex]) {
                                const sqDist = i * i + j * j;
                                if (sqDist < minSqDist) {
                                    minSqDist = sqDist;
                                }
                            }
                        }
                    }
                }

                const dist = Math.sqrt(minSqDist);

                if (dist <= distance) {
                    const factor = 1.0 - (dist / distance);
                    // Use 0.75 to make the blend more subtle towards the land
                    const blendedColor = TextureColorUtil.getLerpColor(waterColor, landColor, factor * 0.75);
                    const pixelIndex = index * 4;
                    newData[pixelIndex] = blendedColor.value[0];
                    newData[pixelIndex + 1] = blendedColor.value[1];
                    newData[pixelIndex + 2] = blendedColor.value[2];
                }
            }
        }

        data.set(newData);
    };//end function
    */


}//end