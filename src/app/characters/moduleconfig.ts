//src\workflows\workflowscfg.ts

import { Option } from "@/common/option";
import { TDimension } from "@/common/types";


/**
 * class Characters3dConfig.ARMBODY_ANM_ACTBASE
 */
export class Characters3dConfig {

    public static readonly APP_FOLDER: string = `/characters3d/`;

    public static readonly SECTION_MODEL: string = "Model";

    public static readonly SECTIONS: Option[] = [   
        new Option(Characters3dConfig.SECTION_MODEL, "Model 3D"),
    ];


    public static CANVAS_DIM: TDimension = {width:600,height:500};

};//end class