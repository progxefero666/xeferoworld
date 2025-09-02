//src\lib\character\biped\bipedconfig.ts

import { XMath2dUtil } from "@/math2d/xmath2dutil";
import { BipedSystem } from "@/lib/character/biped/bipedsystem";
import { BipedUtil }   from "@/lib/character/biped/functions/bipedutil";


/**
 * class BipedConfig
 *   Velocities in meter x second
 */
export class BipedConfig {

    public cmv: number=0.0;
    public height: number;
    
    public walkSpeed: number;
    public walkStrideTime:number=0.0;//(s)

    public gunTipRotV:number = 0.0;
    public gunTipDistance:number = 0.0; 

    constructor(height:number,speed:number) {
        this.height = height;
        this.walkSpeed = speed;
    }//end

    public init(){
        this.cmv = XMath2dUtil
            .getPercent100(this.height,BipedSystem.BIOMEC_FACTOR);
        this.walkStrideTime = BipedUtil.getBipedStrideTime(this.height, this.walkSpeed);
    }//end

    public setGun(gunTipRotV:number,gunTipDistance:number){
        this.gunTipRotV = gunTipRotV;
        this.gunTipDistance = gunTipDistance;
    }

    public getWalkStrideFrameTime(frameRate:number): number {
        return this.walkStrideTime / frameRate;
    }//end

}//end

