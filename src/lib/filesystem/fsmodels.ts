//src\filesystem\fstypes.ts


/**
 * class FileCode represents a file with its properties.
 */
export class FileCode {
    
    public id: string;
    public ext: string;
    public format: string;
    public code: string;

    constructor(id:string,ext:string,format:string,code:string) {
        this.id     = id;
        this.ext    = ext;
        this.format = format;
        this.code   = code;
    }//end
    
}//end class