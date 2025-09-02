"use server"

import { promises as fs } from "fs"
import path from "path"

/**
 * Server Action for store audio file 
 * in filesystem folder -->/public/audios
 */
export async function uploadAudioFile(name:string, audioSerial: string): Promise<boolean> {
    let result:boolean = true;
    try {        
        const audioArray = audioSerial.split(',').map(Number);
        const arrayBuffer: ArrayBuffer = new Uint8Array(audioArray).buffer; 
        const audioDir = path.join(process.cwd(), "public", "audios");
        const filePath = path.join(audioDir, name);
        const buffer = Buffer.from(arrayBuffer);
        await fs.writeFile(filePath, buffer);
    }
    catch (error) {
        console.error("Error uploading audio file:", error);
        result = false;
    }
    return result;
};//end

/*
export async function uploadAudioFileByFormData(formData: FormData) {
    try {
        const file = formData.get("audioFile") as File
        if (!file) {
            return {
                success: false,
                error: "No se proporcionó ningún archivo",
            }
        }

        // Validar que sea un archivo de audio
        if (!file.type.startsWith("audio/")) {
            return {
                success: false,
                error: "El archivo debe ser de audio",
            }
        }

        // Crear directorio si no existe
        const audioDir = path.join(process.cwd(), "public", "audios")
        await fs.mkdir(audioDir, { recursive: true })

        // Generar nombre único para evitar conflictos
        const timestamp = Date.now()
        const originalName = file.name
        const extension = path.extname(originalName)
        const baseName = path.basename(originalName, extension)
        const fileName = `${baseName}_${timestamp}${extension}`

        // Guardar archivo
        const filePath = path.join(audioDir, fileName)
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        await fs.writeFile(filePath, buffer)

        return {
            success: true,
            fileName: fileName,
            originalName: originalName,
            size: file.size,
        }
    } catch (error) {
        console.error("Error uploading audio file:", error)
        return {
            success: false,
            error: "Error al subir el archivo de audio",
        }
    }
};//end
*/