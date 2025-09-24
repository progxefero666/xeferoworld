//src\app\terrains3d\genmodel\functions\genmodelfunct.ts

import * as THREE from 'three';
import { LineBasicMaterial, MeshStandardMaterial } from 'three'

import { NumberParameter } from "@/common/numberparam";
import { XMath2dUtil } from "@/math2d/functions/xmath2dutil";
import { Point2d, Scale2d } from "@/lib/graph2d/types2d";
import { PlaneUtil } from "@/math2d/functions/planeutils";
import { Keyvalue } from "@/common/keyvalue";
import { CircunfGradient } from "@/terrains/gradients/cfgradient";
import { HeightMapTerrainConfig } from "@/terrains/model/heightmapterrcfg";
import { GenColorMaterial } from '@/zone3d/three/materials/genmatcolor';
import { GeoFunction } from '@/zone3d/three/functions/geofunction';
import { Graph2d } from '@/lib/graph2d/graph2d';
import { PointGradient } from '../gradients/pointgradient';
import { TDimension } from '@/common/types';

/**
 * class GenHeightMapFunctions.getGradientIndex
 */
export class GenHeightMapFunctions {

    /*
        0:Terrains3dConfig.GRADRANGE_INTENSITY,
        1:Terrains3dConfig.GRADRANGE_RADIUS,
        2:Terrains3dConfig.GRADRANGE_SCALE_X,
        3:Terrains3dConfig.GRADRANGE_SCALE_Y,
        4:Terrains3dConfig.GRADRANGE_ROTATION
    */
    public static getAleatoryGradParamsPos01(paramsRanges: NumberParameter[]) {

        const intensity: number = XMath2dUtil
            .getAleatNumberInRange(paramsRanges[0].range.min, paramsRanges[0].range.max);

        const radius: number = XMath2dUtil
            .getAleatNumberInRange(paramsRanges[1].range.min, paramsRanges[1].range.max);

        const scale_x: number = XMath2dUtil
            .getAleatNumberInRange(paramsRanges[2].range.min, paramsRanges[2].range.max);
        const scale_y: number = XMath2dUtil
            .getAleatNumberInRange(paramsRanges[3].range.min, paramsRanges[3].range.max);
        
        const rotationDegrees: number = XMath2dUtil
            .getAleatNumberInRange(paramsRanges[4].range.min, paramsRanges[4].range.max);
        
        const rotation: number = XMath2dUtil.toRadians(rotationDegrees);

        const position: Point2d = PlaneUtil.findSafeRandomPosition01(radius);

        const update_params: Keyvalue[] = [
            new Keyvalue("intensity", intensity),
            new Keyvalue("radius", radius),
            new Keyvalue("scale_x", scale_x),
            new Keyvalue("scale_y", scale_y),
            new Keyvalue("rotation", rotation),
            new Keyvalue("position_x", position.x),
            new Keyvalue("position_y", position.y)
        ];
        return update_params;
    };//end

    public static getAleatoryGradParams(dimension:TDimension,paramsRanges: NumberParameter[]) {

        const intensity: number = XMath2dUtil
            .getAleatNumberInRange(paramsRanges[0].range.min, paramsRanges[0].range.max);

        const radius: number = XMath2dUtil
            .getAleatNumberInRange(paramsRanges[1].range.min, paramsRanges[1].range.max);

        const scale_x: number = XMath2dUtil
            .getAleatNumberInRange(paramsRanges[2].range.min, paramsRanges[2].range.max);
        const scale_y: number = XMath2dUtil
            .getAleatNumberInRange(paramsRanges[3].range.min, paramsRanges[3].range.max);
        
        const rotationDegrees: number = XMath2dUtil
            .getAleatNumberInRange(paramsRanges[4].range.min, paramsRanges[4].range.max);
        
        const rotation: number = XMath2dUtil.toRadians(rotationDegrees);

        const position: Point2d = PlaneUtil.findSafeRandomPosition(dimension,radius);

        const update_params: Keyvalue[] = [
            new Keyvalue("intensity", intensity),
            new Keyvalue("radius", radius),
            new Keyvalue("scale_x", scale_x),
            new Keyvalue("scale_y", scale_y),
            new Keyvalue("rotation", rotation),
            new Keyvalue("position_x", position.x),
            new Keyvalue("position_y", position.y)
        ];
        return update_params;
    };//end
    

    public static generatePointGradient(position:Point2d,intensity:number,radius:number): PointGradient {
        return new PointGradient(position,intensity,radius);
    }//end 

    public static generateCfGradient(id: string, params: Keyvalue[]): CircunfGradient {
        const intensity: number = params[0].value;       
        const radius: number = params[1].value;
        const scale: Scale2d = { x: params[2].value, y: params[3].value };
        const rotation: number = params[4].value;
        const position: Point2d = { x: params[5].value, y: params[6].value };
        return new CircunfGradient(id, position, radius, scale, rotation, intensity);
    };//end

    public static genImageDataGradients = (paramRanges:NumberParameter[],count:number):CircunfGradient[]  => {          
        const gradients:CircunfGradient[] = [];
        for(let idx=0;idx<count;idx++){
            const elem_id:string = 'new_' + idx.toString();
            const elem_params:Keyvalue[] = GenHeightMapFunctions.getAleatoryGradParamsPos01(paramRanges);
            const elem:CircunfGradient = GenHeightMapFunctions.generateCfGradient(elem_id, elem_params);
            gradients.push(elem);
        }
        return gradients;
    };//end

    public static genCfsGradients = (dimension:TDimension,paramRanges:NumberParameter[],count:number):CircunfGradient[]  => {          
        const gradients:CircunfGradient[] = [];
        for(let idx=0;idx<count;idx++){
            const elem_id:string = 'new_' + idx.toString();
            const elem_params:Keyvalue[] = GenHeightMapFunctions
                        .getAleatoryGradParams(dimension,paramRanges);
            const elem:CircunfGradient = GenHeightMapFunctions
                        .generateCfGradient(elem_id, elem_params);
            gradients.push(elem);
        }
        return gradients;
    };//end    
   

    public static getGradientIndex(id:string,gradients: CircunfGradient[]): number {
        let index: number = -1;
        for(let idx=0; idx<gradients.length; idx++) {
            if(gradients[idx].id === id) {
                index = idx;
                break;
            }
        }
        return index;
    };


};//end

/**
 * class GeneratorTerrain.generateTerrain
 */
export class GeneratorTerrainFunc {

    /*
    const angle  = -grad.rotation * (Math.PI / 180);
    export class Gradient {
        public id: string;
        public position: Point2d;
        public radius: number;
        public scale: Scale2d;
        public rotation: number //0.0 degrees
        public intensity: number; 
    */
    
    /**
     * Mountains are black (0), ground is white (backcolor)
     * Backcolor white 255
     * grad position and params in [0..1]
     */   
    public static genHeightMapTextureData(size:number,gradients:CircunfGradient[]): ImageData {

        const width = size;
        const height = size;
        const backcolor = 255;
       
        // Uint8ClampedArray with RGBA (4 values por píxel)
        const pixels = new Uint8ClampedArray(width * height * 4);
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let maxIntensity = 0;
                for (const grad of gradients) {

                    const dx     = (x - grad.position.x * width) / (grad.radius * width);
                    const dy     = (y - grad.position.y * height) / (grad.radius * width);
                    const angle  = grad.rotation * (-1);
                    const cos    = Math.cos(angle);
                    const sin    = Math.sin(angle);
                    const tdx    = (dx * cos - dy * sin) / grad.scale.x;
                    const tdy    = (dx * sin + dy * cos) / grad.scale.y;
                    const distSq = tdx * tdx + tdy * tdy;
                    if (distSq < 1) {
                        const falloff = Math.exp(-distSq * 5);
                        const currentIntensity = grad.intensity * falloff;
                        maxIntensity = Math.max(maxIntensity, currentIntensity);
                    }
                }//end for gradients
                const finalIntensity = Math.min(maxIntensity, 1.0);
              
                const color = backcolor - Math.round(backcolor * finalIntensity);
                const index = (y * width + x) * 4;
                pixels[index] = color;
                pixels[index + 1] = color;
                pixels[index + 2] = color;
                pixels[index + 3] = Graph2d.COLOR_ALPHA_MAX;                                
            }//end for x
        }//end for y

        return new ImageData(pixels, width, height);
    };//end

    public static getTerrainMaterial = (textureData: ImageData): MeshStandardMaterial => {
        const material: MeshStandardMaterial = GenColorMaterial.getStandardMaterial("#ffffff",0.5, 0.5,1.0);
        if (textureData) {
            const canvasTexture = new THREE.CanvasTexture(textureData);
            canvasTexture.needsUpdate = true;
            material.map = canvasTexture;
            material.color.set(0xffffff);
        }
        else {
            material.map = null; // No texture
            material.color.set(0xffffff); // Default gray color
        }
        material.needsUpdate = true;
        return material;
    };

    public static generateTerrain = (terrainCfg: HeightMapTerrainConfig,
        texturedata: ImageData,
        wireColor: any,
        modeWire: boolean): THREE.Mesh => {

        const terrain_geometry: THREE.PlaneGeometry = GeoFunction
            .getThreePlaneGeometry(terrainCfg.sideLength, terrainCfg.subdivisions);

        let terrain_material: MeshStandardMaterial | null = null;
        if (modeWire) {
            terrain_material = GenColorMaterial.getGridMaterial(wireColor, 1.0);
        }
        else {
            terrain_material = GeneratorTerrainFunc.getTerrainMaterial(texturedata!);
        }

        const terrain_newMesh = new THREE.Mesh(terrain_geometry, terrain_material);
        terrain_newMesh.receiveShadow = true;
        terrain_newMesh.castShadow = true;

        const { position, uv } = terrain_newMesh.geometry.attributes;

        if (!texturedata) {
            for (let i = 0; i < position.count; i++) {
                position.setY(i, 0);
            }
        }
        else {
            const { width, height, data } = texturedata;
            for (let i = 0; i < position.count; i++) {
                const u = uv.getX(i);
                const v = 1 - uv.getY(i); // Invert v to match canvas coordinates
                const x = Math.floor(u * (width - 1));
                const y = Math.floor(v * (height - 1));
                // Black (0) is high, White (255) is low
                const R_INDEX = (y * width + x) * 4;
                const heightValue = (255 - data[R_INDEX]) / 255.0;
                const calculatedHeight = heightValue * terrainCfg.maxHeight;
                position.setY(i, calculatedHeight);
            }//end for
        }
        position.needsUpdate = true;
        terrain_newMesh.geometry.computeVertexNormals();
        terrain_newMesh.geometry.computeBoundingBox();
        terrain_newMesh.geometry.computeBoundingSphere();
        return terrain_newMesh;
    };//end 

}//end


        //const intensity: number = 0.99;
        //const rotation: number = 0.0;
        //console.log('intensity:' + intensity.toString());
        //console.log('position x:' + position.x);
        //console.log('position y:' + position.y);