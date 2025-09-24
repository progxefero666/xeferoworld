//src\terrains\lib\functions\generatortexture.ts


import { ColorRamp } from "@/terrains/model/colorramp";
import { TextureColorUtil } from "@/terrains/functions/texturecolorutil";
import { TDimension } from "@/common/types";


/**
 * Generates a colored texture from a heightmap ImageData.
 * @param heightmap The source heightmap ImageData (grayscale).
 * @param colorRamp The color ramp with start, middle, and end colors, and a bias.
 * @param waterColorHex The hex color for water (areas of 0 height).
 * @returns A new ImageData object representing the colored texture.
 */
export function genTextureFromHeightmap(
    heightmap: ImageData,
    colorRamp: ColorRamp,
    bias: number,
    waterColorHex: string): ImageData {

    const { width, height, data } = heightmap;
    const textureData = new Uint8ClampedArray(width * height * 4);

    const startColor:number[] = TextureColorUtil.hexToRgb(colorRamp.start);
    const middleColor:number[] = TextureColorUtil.hexToRgb(colorRamp.middle);
    const endColor:number[] = TextureColorUtil.hexToRgb(colorRamp.end);
    const waterColor:number[] = TextureColorUtil.hexToRgb(waterColorHex);


    for (let i = 0; i < data.length; i += 4) {
        // Height is stored in the R channel (it's grayscale)
        const heightValue = data[i];
        const pixelIndex = i;

        // Pure white (255) in the heightmap is the lowest point (water)
        if (heightValue === 255) {
            textureData[pixelIndex] = waterColor[0];
            textureData[pixelIndex + 1] = waterColor[1];
            textureData[pixelIndex + 2] = waterColor[2];
            textureData[pixelIndex + 3] = 255;
        } else {
            // The heightmap is: 0=black=highest, 255=white=lowest
            // We normalize it to a 0-1 range where 0 is the start of land and 1 is the highest peak.
            // Use 254 to prevent full white from being land
            const normalizedHeight = (254 - heightValue) / 254.0; 

            let finalColor: number[];

            if (normalizedHeight <= bias) {
                // Interpolate between start and middle
                const factor = normalizedHeight / bias; // scale 0-bias range to 0-1
                finalColor = TextureColorUtil.getLerpColor(startColor, middleColor, factor);
            } else {
                // Interpolate between middle and end
                // scale bias-1 range to 0-1
                const factor = (normalizedHeight - bias) / (1 - bias); 
                finalColor = TextureColorUtil.getLerpColor(middleColor, endColor, factor);
            }

            textureData[pixelIndex] = finalColor[0];
            textureData[pixelIndex + 1] = finalColor[1];
            textureData[pixelIndex + 2] = finalColor[2];
            textureData[pixelIndex + 3] = 255;
        }
    }

    const resImageData = new ImageData(textureData, width, height);

    // Apply the coastal effect
    const resImageDim:TDimension = {width:width,height:height};
    TextureColorUtil.applyCoastalEffect(resImageDim,resImageData,waterColor,startColor,8);

    return resImageData;
}//end 
