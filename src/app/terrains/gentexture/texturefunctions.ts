//src\app\terrains3d\gentexture\texturefunctions.ts

import { TDimension, Point2d } from "@/common/types";
import { TerrainsPainter } from "../painterterrains";
import { RiversGenerator } from "@/terrains/functions/genrivers";
import { TRiverConfig } from "@/terrains/terraintypes";


export const drawImageData = (canvas: HTMLCanvasElement,
    imagedimension: TDimension,
    imagedata: ImageData) => {
    const ctx: CanvasRenderingContext2D | null
        = canvas.getContext("2d", { willReadFrequently: true });
    ctx!.clearRect(0, 0, canvas.width, canvas.height);
    const offCanvas = document.createElement("canvas");
    offCanvas.width = imagedimension.width;
    offCanvas.height = imagedimension.height;
    offCanvas.getContext("2d")!.putImageData(imagedata, 0, 0);
    ctx!.drawImage(offCanvas, 0, 0, canvas.width, canvas.height);
};//end

/*
// Generate river more savage and detail
//   River Points = GeneratorLines.genRayLinePoints(
        startPoint,
        endPoint,
        8,   // More subdivisiones and detail
        100, // more init desplacement
        0.75 // Un poco más rugoso
*/
export const drawSingleRiver = (texturePainter: TerrainsPainter) => {
    const startPoint: Point2d = { x: 50, y: 50 };
    const endPoint: Point2d = { x: 350, y: 350 };
    const rayPoints: Point2d[] = RiversGenerator.generateRiverPoints(startPoint, endPoint, 7, 50, 0.7);
    texturePainter.renderSingleRiver(rayPoints);
};//end

/*
River System
    maxLevels: number = 3
    baseDisp: number = 100,
    baseSubdiv: number = 8    
*/
export const drawComplexRiver = (texturePainter: TerrainsPainter) => {

    const maxLevels: number = 2;

    const riverConfig: TRiverConfig = {
        branchingProbability: 0.2,
        lengthReductionFactor: 0.6,
        maxBranchAngle: 60,
        displacementReduction: 0.7,
        subdivisionReduction: 0.8
    };

    const maxDisp: number = 60;
    const countSubdiv: number = 9;
    const roughness: number = 0.65;
    const maxSubBranchs: number = 5;
    const startPoint: Point2d = { x: 50, y: 50 };
    const endPoint: Point2d = { x: 350, y: 350 };

    const riverPoints: Point2d[][] = RiversGenerator.generateComplexRiverA(
        startPoint, endPoint, riverConfig,
        maxDisp, countSubdiv, roughness,
        maxSubBranchs, maxLevels
    );
    texturePainter.renderComplexRiver(riverPoints);

};//end

export const drawPlaneZones = (texturePainter: TerrainsPainter) => {
 
    //texturePainter.renderSingleRiver(rayPoints);
};//end
