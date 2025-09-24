//src\universo3d\game\machines\xwing\xwingconfig.ts

import { TDimension3d } from "@/common/types";


/*
1. Aceleración: 3,700 G
Lectura correcta: 3,700 G (no 3.7 G)
Conversión:

1 G = 9.81 m/s² (aceleración gravitatoria terrestre)
3,700 G = 3,700 × 9.81 = 36,297 m/s²

Aceleración X-Wing = 36,297 m/s²
*/
/**
 * class XWingConfig
 */
export class XWingConfig {
   

    public static MASS:number =  10.000; //kg
    public static VELOCITY_MAX = 291.47; //m/s 
    public static ACELERATION_MAX = 36.297; //m/s² 

    //in meters
    public static DIMENSION:TDimension3d = {
        width:  11.76,
        height: 2.4,
        depth:  13.4
    };

  
}//end