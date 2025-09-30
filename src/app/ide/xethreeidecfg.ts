//src\ide\xethreeidecfg.ts

import { TCameraConfig, TDimension } from "@/common/types";
import { OrbitCameraConf } from "@/zone3d/three/systems/orbitcamcontrol";

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
 * class IdeWorldCfg.ORBIT_CAM_CONFIG
 */
export class IdeWorldCfg {

    public static HDR_MOTOR:string = '/ide/hdr/studio_small_09_2k.hdr';

    public static SKYBOX_RADIUS:number = 2500;
    public static SKYBOX_NAME:string = 'skybox';
    public static SKYBOX_TYPE:string = 'jpg';

    public static SKYBOX_DAY_FOLDER = "/ide/skybox/skybox_day";
    public static SKYBOX_NIGHT_FOLDER = "/ide/skybox/skybox_night";

    public static AMB_LIGHT_INT:number = 10;
    public static AMB_LIGHT_COLOR:any = '#ffffff';

    public static ORBIT_CAM_CONFIG: OrbitCameraConf = {
        rotDegreesY:270,
        elevation:1.6,
        distance:10
    };

}//end