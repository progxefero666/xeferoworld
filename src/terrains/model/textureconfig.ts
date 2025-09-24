//src\terrains\model\textureconfig.ts

import { ColorRamp } from "@/terrains/model/colorramp";


/**
 * class TerrainConfig
 */
export class TextureConfig {
    
    public sideImage: number;
    public backcolor: any = '#FFFFFF';
    public rampcolor: ColorRamp;
    public bias: number; // 0-1, midpoint for color transition
    public scale: number;

    constructor(sideImage:number,backcolor:any,rampcolor:ColorRamp,scale:number,bias:number) {
        this.sideImage = sideImage;
        this.backcolor = backcolor;
        this.rampcolor = rampcolor;
        this.scale = scale;
        this.bias = bias;
    };//end 

}//end