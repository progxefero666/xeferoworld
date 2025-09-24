//src\app_server\serverfileutil.ts

import * as fs from "fs/promises";


/**
 * 
    public static async createFile(fileContent: ArrayBuffer, filePath: string): Promise<boolean> {
 * SystemFileUtil.createFile(fileContent: ArrayBuffer, filePath: string)
 */
export class ServerFileUtil {
  

    public static async createDir(dirPath: string): Promise<boolean> {
        try {
            await fs.mkdir(dirPath, { recursive: true });
            return true;
        } catch (error) {throw error;}
    }

    public static async checkOrCreateDir(dirPath: string): Promise<boolean> {
        if (await ServerFileUtil.fileExists(dirPath)) {
            return true;
        }
        return await ServerFileUtil.createDir(dirPath);
    }
    static getFileName(filePath: string): string {
        const baseName = filePath.split('/').pop() || ''; 
        return baseName.split('.').slice(0, -1).join('.'); 
    }

    static getFileExtension(fileName: string) {
        return fileName.split('.').pop()!;
    }
    
    //SystemFileUtil.sanitizedFileName
    public static sanitizedFileName(fileName: string): string {
        const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
        return sanitizedFileName;
    }


    public static async readFile(filePath: string): Promise<string> {
        try {
            // Verificar si el archivo existe antes de intentar leerlo
            await fs.access(filePath, fs.constants.F_OK);

            // Leer el archivo y devolver su contenido como una cadena
            const content = await fs.readFile(filePath, { encoding: "utf-8" });
            
            return content;
        } catch (error) {

            throw error;
        }
    }

    public static async readImageFileBuffer(filePath: string): Promise<Buffer> {
        try {
            await fs.access(filePath, fs.constants.F_OK);
            const buffer = await fs.readFile(filePath);
            buffer.byteLength
            return buffer;
        } catch (error) {

            throw error;
        }
    }

    /*
    public static async readImageFileBlob(filePath: string): Promise<Blob> {
        try {
            await fs.access(filePath, fs.constants.F_OK);
            const buffer = await fs.readFile(filePath);
            const blob = new Blob([buffer], { type:MMBase.getImageFileMimeType(filePath) });
            return blob;
        } 
        catch (error) {
            console.error(`Error al leer el archivo de imagen "${filePath}":`, error);
            throw error;
        }
    }*/

    public static async readAudioFile(filePath: string): Promise<Blob> {
        try {
            // Verificar si el archivo existe antes de intentar leerlo
            await fs.access(filePath, fs.constants.F_OK);

            // Leer el archivo como un Buffer
            const buffer = await fs.readFile(filePath);

            // Convertir el Buffer en un Blob con el tipo MIME adecuado
            const blob = new Blob([buffer], { type: "audio/mp3" }); // Cambia "audio/mp3" según el formato del archivo

            return blob;
        } catch (error) {
            console.error(`Error al leer el archivo de audio "${filePath}":`, error);
            throw error;
        }
    }

    public static async createFile(fileContent: ArrayBuffer, filePath: string): Promise<boolean> {
        try {
            const buffer = Buffer.from(fileContent);
            await fs.writeFile(filePath, buffer);
            return true;
        } catch (error) {

            throw error;
        }
    }

    public static async deleteDir(dirPath: string): Promise<boolean> {
        try {
            await fs.rm(dirPath, { recursive: true, force: true });
            return true;
        } catch (error) {
            throw error;
        }
    }

    public static async copyFile(sourcePath: string, destinationPath: string): Promise<boolean> {
        try {
            await fs.copyFile(sourcePath, destinationPath);
            return true;
        } catch (error) {

            throw error;
        }
    }

    public static async replaceFileContent(filePath: string, content: string): Promise<boolean> {
        try {
            await fs.writeFile(filePath, content, "utf-8");
            return true;
        } catch (error) {

            throw error;
        }
    }

    public static async fileExists(filePath: string): Promise<boolean> {
        try {
            await fs.access(filePath);
            return true;
        } catch (error) {
            return false;
        }
    }

    public static async deleteFile(filePath: string): Promise<boolean> {
        try {
            await fs.unlink(filePath);
            return true;
        } catch (error) {
            throw error;
        }
    }

    public static async dirExists(dirPath: string): Promise<boolean> {
        try {
            const stats = await fs.stat(dirPath);
            if (stats.isDirectory()) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    }

    public static async copyDir(sourceDir: string, destinationDir: string): Promise<boolean> {
        try {
            await fs.cp(sourceDir, destinationDir, { recursive: true });
            return true;
        } catch (error) {
            throw error;
        }
    }

}//end class

/*

import path from "path";
import { ServerFileUtil } from "../../common/server/serverfileutil";

export async function getTextFile(fname: string): Promise<string> {

    const filePath: string = path
        .join("C:\\claudeapps\\nextapps\\aigenerator\\public", fname);

    console.log("getTextFile: ", filePath);
    const fileContent: string = await ServerFileUtil.readFile(filePath);
    return fileContent;
}//end action
*/