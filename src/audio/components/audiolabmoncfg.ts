//src\lib\audio\audiomanager.ts

import { TDimension } from "@/common/types";



/**
 * class AudioMonitorConfig.CTRL_VOLUME_STYLE
 */
export class AudioMonitorCfg {

    public static INIT_CV_DIM: TDimension = { width: 1800, height: 140 };

    public static BACKCOLOR_DEFAULT: any = "#000000";
    public static AXIS_HORZ_COLOR: any = "#10c500";
    public static WAVE_COLOR_DEF: any = "#ffffff";

    public static REGION_COLOR_DEF: any = "rgba(250, 79, 6, 0.5)";

    public static MARK_SIZE_DEFAULT: number = 4;
    public static MARK_SIZE_MEDIUM: number = 8;
    public static MARK_SIZE_LARGE: number = 11;
    public static MARK_COLOR_DEFAULT: any = "#787777";

    public static CTRL_VOLUME_STYLE = {
        background: 'rgba(169, 168, 168, 1)',
        border: "1px solid rgba(0, 0, 0, 1)"
    };

};//end 