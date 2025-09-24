//src\lib\character\biped\bipedutil.ts

import { BipedSystem } from "@/characters/biped/bipedsystem";

/*
-------------------------------------------------------------
Doc
-------------------------------------------------------------

- Use frame rate 30 fps -> complete walk cycle

- La velocidad media de una persona al caminar suele estar entre 
4 y 6 kilómetros por hora (km/h), o lo que es lo mismo, 
entre 15 y 12 minutos por kilómetro, siendo una velocidad de 4,8 a 5 km/h 

Con 5 Km/h 
...........................................................
  1 km en 12 minutes -> 1km/12 km per minute -->
   1000/12 meters per minute ->
  (1000/12 meters)/60 seconds -> 
  (1000/720 meters) per second -> 
  1.38 meters per second

Example
..........................................................
const height = 1.75; // meters
const speed = 1.38; // m/s (5 km/h)
getStrideLength(height, speed)  ≈ 0.726 m
getStrideTime(strideLength, speed)  ≈ 0.53 s por paso
 (un stride completo ~1.06 s)

/**
 * class BipedUtil
 */
export class BipedUtil {

    /**
     * Calculate length stride by height and velocity
     * Fórmula biomecánica típica: 0.415 * altura
     * (velocity not influyed very much)
     */
    public static getStrideLength(height:number,speed:number): number {
        return BipedSystem.BIOMEC_FACTOR * height;
    }//end 

    /**
     * Calculate time complete stride cycle
     */
    public static  getStrideTime(strideLength:number,speed:number): number {
        return strideLength / speed;
    }//end

    public static  getBipedStrideTime(height:number,speed:number): number {
        const strideLength = this.getStrideLength(height, speed);
        return this.getStrideTime(strideLength, speed);
    }//end

    public static  getBipedStrideFrameTime(frameRate:number,height:number,speed:number): number {
        const strideLength = this.getStrideLength(height, speed);
        const strideTime = this.getStrideTime(strideLength, speed);
        return strideTime / frameRate;
    }//end

}//end