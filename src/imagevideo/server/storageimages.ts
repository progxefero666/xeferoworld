//src\zone3d\server\storageimages.ts
'use server';

import path from "path";
import * as fs from "fs/promises";
import dotenv from 'dotenv';
dotenv.config();

export async function readFImageBuffer(filename: string): Promise<Buffer|null> {
    const fileFolder: string = process.env.IMAGES_DATA_FOLDER!;
    const filePath: string = path.join(fileFolder, filename); 
    let buffer:Buffer|null = null; 
    try {buffer = await fs.readFile(filePath);}
    catch (error) {
        console.error("Error reading audio file:", error);
        return null;
    }
    return buffer;
};//end

export async function storeImage(filename:string, imageBuffer:Buffer): Promise<boolean> {

    const fileFolder: string = process.env.IMAGES_DATA_FOLDER!;
    const filePath: string = path.join(fileFolder, filename);
    try {
        await fs.writeFile(filePath, imageBuffer);
    }
    catch (error) {
        console.error("Error storing image file - ", error);
        return false;
    }
    return true;

}//end action