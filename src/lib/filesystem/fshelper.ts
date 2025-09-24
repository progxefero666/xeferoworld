//src\codegen\filesystem\fshelper.ts

/**
 * class FsHelper
 */
export class FsHelper {
    
    
    public static hasExtension(filePath: string): boolean {
        return filePath.split('/').pop()!.includes('.');
    };//end


    public static getFileName(filePath: string): string {
        return filePath.split('/').pop()!.split('.').shift()!;
    };//end  


    public static getFileExtension(fileName: string) {
        return fileName.split('.').pop()!;
    };//end

    public static generateFileName(name: string,ext:string): string {
        return name.concat(".").concat(ext);
    };

    /**
     * Normalizes a file path by removing redundant 
     * slashes and resolving relative segments.
     */
    public static normalizePath(path: string): string {
        return path.replace(/\/+/g, '/').replace(/^\//, '').replace(/\/$/, '');
    };//end  

    /**
     * Joins two paths into a single path.
     */
    public static joinPaths(basePath: string, relativePath: string): string {
        return `${basePath}/${relativePath}`;
    };//end


    /**
     * Checks if the given path is an absolute path.
     */
    public static isAbsolutePath(path: string): boolean {

        return path.startsWith('/');
    };//end


};//end class


/*
  public static stringToArrayBuffer(jsonString: string): ArrayBuffer {
        const encoder = new TextEncoder(); // Codifica strings en Uint8Array
        const uint8Array = encoder.encode(jsonString); // Uint8Array
        const arrayBuffer = uint8Array.buffer.slice(0) as ArrayBuffer; // Forzar el tipo a ArrayBuffer
        return arrayBuffer;
    }
*/