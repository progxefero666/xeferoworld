//src\zone3d\three\util\threelightsutil.ts

import * as THREE from 'three'

/**
 * class LightsCfg
 */
export class LightsCfg {

    public static TYPE_AMBIENT:number     = 0;
    public static TYPE_HEMISPHERE:number  = 1;
    public static TYPE_DIRECTIONAL:number = 2;
    public static TYPE_POINT:number       = 3;
    public static TYPE_SPOT:number        = 4;
    public static TYPE_RECTAREA:number    = 5;    
}//end

/**
 * class three LightsUtil.createDirectLight
 */
export class LightsUtil {

    public static createDirectLight(color:any,intensity:number): THREE.DirectionalLight {
        const light = new THREE.DirectionalLight(color,intensity);        
        light.castShadow = true;
        light.shadow.mapSize.set(2048, 2048);
        light.shadow.bias = -0.0001;
        light.shadow.normalBias = 0.02
        return light;
    }//end 

}//end 