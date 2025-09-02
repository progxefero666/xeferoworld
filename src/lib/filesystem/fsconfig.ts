//src\codegen\filesystem\fsconfig.ts

import JSZip from 'jszip';

/**
 * class FsConstants.PATH_PARENT
 */
export class FsConstants {
    public static readonly DEF_ENCODE_TEXT="utf-8";

    public static readonly TYPE_FOLDER: string = "folder";
    public static readonly TYPE_FILE: string = "file";
    public static readonly PATH_BAR: string = "/";
    public static readonly PATH_PARENT: string = "..";

}//end class

/**
 * class FileSystemConfig 
 */
export class FsConfig {
    public static readonly TYPE_FILE: string = "file";

}//end class