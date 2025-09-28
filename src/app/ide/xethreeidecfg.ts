//src\ide\xethreeidecfg.ts

import { TCameraConfig, TDimension } from "@/common/types";

/**
 * class IdeConfig.LIGHT_OBJ_RADIUS
 */
export class IdeConfig {

    public static DESKTOP_CONTENT = {
        backgroundColor: 'rgba(0, 0, 0, 1)',
        border: '1px solid rgba(47, 0, 255, 1)',
    };
    
    public static MCANVAS_DIM:TDimension ={width:700,height:500};

    public static LIGHT_OBJ_RADIUS:number = 1.0;
    public static LIGHT_OBJ_COLOR:any = '#FFFF00';
    
    public static CAM_MAIN_CFG:TCameraConfig = {fov:60.0,near:1.0,far:1000};


}//end

/**
 * class IdeWorldCfg.SKYBOX_TYPE
 */
export class IdeWorldCfg {

    public static SKYBOX_SIZE:number = 2500;
    public static SKYBOX_NAME:string = 'skybox';
    public static SKYBOX_TYPE:string = 'jpg';

    public static SKYBOX_DAY_FOLDER = "/ide/skybox/skybox_day";
    public static SKYBOX_NIGHT_FOLDER = "/ide/skybox/skybox_night";

}//end