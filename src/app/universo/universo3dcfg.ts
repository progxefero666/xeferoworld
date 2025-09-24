//src\workflows\workflowscfg.ts

import { Option } from "@/common/option";


/**
 * class Universo3dConfig.GL_LAYOUT_W_DEF
 */
export class Universo3dConfig {

    public static readonly APP_FOLDER: string = `/universe3d/`;
    public static readonly SECTION_GAME: string = "game";
    public static readonly SECTION_PLANETS: string = "planets";
    public static readonly SECTIONS: Option[] = [
        new Option(Universo3dConfig.SECTION_GAME, "Terrains 3D"),
        new Option(Universo3dConfig.SECTION_PLANETS, "Planets"), 
    ];
    
    public static readonly TX_FORMATS: string = "*.png, *.jpg, *.jpeg";

    public static GL_LAYOUT_W_DEF: number = 720;
    public static GL_LAYOUT_H: number = 640;
};//end class