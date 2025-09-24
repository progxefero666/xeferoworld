//src\codegen\filesystem\fsvalidation.ts


import { FsConstants } from "./fsconfig";

export class FsValidation {

    /**
     * Checks if the given path is a valid file path.
     */
    public static isValidFilePath(path: string): boolean {
        // Basic validation for a file path
        return typeof path === 'string' && 
                      path.length > 0 && 
                      !path.includes(FsConstants.PATH_PARENT);
    };//end


    /**
     * Checks if the given path is a valid directory path.
     */ 
    public static isValidDirectoryPath(path: string): boolean {
        return typeof path === 'string' && path.length > 0 && 
                     !path.includes(FsConstants.PATH_PARENT) && 
                     !path.endsWith(FsConstants.PATH_BAR);  
    };//end


}//end class