//src\zone3d\glsystem3d.ts

import {Option} from "@/common/option";

/**
 * class GlSystem3d.UPLOAD_FILES_FORMATS
 */
export class GlSystem3d {

    public static readonly AXIS_X_COLOR: string = "#0000FF"; // Red
    public static readonly AXIS_Y_COLOR: string = "#ccff00"; // Green
    public static readonly AXIS_Z_COLOR: string = "#3cff00"; // Blue

//public static readonly GL_OBJECT_INIT:GlObject = new GlObject(System3d.CC,null,new Float32Array(0));

    public static UPLOAD_FILES_FORMATS:string = "*.jpeg,*.jpg,*.png";

    public static IMAGE_FORMATS:Option[] = [
        new Option("jpg", "jpg"),
        new Option("png", "png"),        
        new Option("json", "json"),
    ];

};//end class