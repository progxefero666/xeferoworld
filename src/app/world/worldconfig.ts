//src\app\terrains\worldplane\worldplanecfg.ts

import { Option } from "@/common/option";
import { TDimension, TPolyColor, Point2d } from "@/common/types";


/**
 * class WorldPlaneCfg.ZONE_DEF_COLOR
 */
export class WorldPlaneCfg {
    public static readonly SECTION_WORLDPLANE: string = "genworldplane";


    public static readonly SECTIONS: Option[] = [
        new Option(WorldPlaneCfg.SECTION_WORLDPLANE, "Gen. World Plane"),       
    ];

    static readonly CC:Point2d = {x:0,y:0};

    static readonly IMAGECANVAS_BACKCOLOR:string = "#000000";
    static readonly IMAGECANVAS_DIM:TDimension = { width:500,height:500}

    static readonly DEF_SIDE_LENGTH:number = 1000;
    static readonly DEF_CELL_SIZE_LENGTH:number = 10;

    static readonly WP_DEF_DIM:TDimension = { 
        width: WorldPlaneCfg.DEF_SIDE_LENGTH,
        height: WorldPlaneCfg.DEF_SIDE_LENGTH
    };


    public static readonly ZONE_DEF_COLOR:TPolyColor={
        back:   "#6d6d6dff", 
        border: "#44ff00ff"
    };


}//end
