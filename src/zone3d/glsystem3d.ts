//src\zone3d\glsystem3d.ts

import {Option} from "@/common/option";

/**
 * class GlSystem3d
 */
export class GlSystem3d {

    public static UPLOAD_FILES_FORMATS:string = "*.jpeg,*.jpg,*.png";

    public static IMAGE_FORMATS:Option[] = [
        new Option("jpg", "jpg"),
        new Option("png", "png"),        
        new Option("json", "json"),
    ];

};//end class