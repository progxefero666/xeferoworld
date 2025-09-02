//src\workflows\workflowscfg.ts

import { Option } from "@/common/option";


/**
 * class Zone3dConfig
 */
export class Characters3dConfig {

    public static readonly APP_FOLDER: string = `/characters3d/`;

    public static readonly SECTION_MODEL: string = "Model";

    public static readonly SECTIONS: Option[] = [   
        new Option(Characters3dConfig.SECTION_MODEL, "Model 3D"),
    ];


};//end class