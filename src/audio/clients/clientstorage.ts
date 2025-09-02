//src\audio\clients\clientstorage.ts

import { uploadAudioFile } from "../services/srvupload";


/**
 * class AudioClientStorage
 */
export class AudioClientStorage {

    //uploadAudioFile
    public static async storeAudioFile(file:File): Promise<boolean> {

        try {
            const formData = new FormData();
            formData.append("file", file);
            const response = await fetch("/api/audio/upload", {
                method: "POST",
                body: formData
            });
            if (!response.ok) {
                throw new Error("Failed to upload audio file");
            }
            alert(`File upload success.`);
            return true;
        } 
        catch (error) {
            alert("Error at store audio file: " + error);
            return false;
        }
    };//end

    public static async uploadFAudio(file:File): Promise<boolean> {
        const formData = new FormData();
        formData.append("file", file);
        console.log("step 1", file.name);

        const arrayBuffer = await file.arrayBuffer();
        const audioArray = Array.from(new Uint8Array(arrayBuffer));
        const audioSerial = audioArray.join(',');

        const result:boolean = await uploadAudioFile(file.name,audioSerial);
        console.log("step 2");
        return result;
    };//end

    /*
    uploadAudioFile

export async function getCompleteAudio(fileName: string) {
    try {
        const audioPath = path.join(process.cwd(), "public", "audios", fileName)
        const audioBuffer = await fs.readFile(audioPath)
        // Convertir a Uint8Array para serialización
        const audioArray = new Uint8Array(audioBuffer)
        return {
            success: true,
            audioData: Array.from(audioArray),
            fileName: fileName,
            mimeType: "audio/wav",
        }
    } 
    catch (error) {
        console.error("Error loading audio:", error)
        return {
            success: false,
            error: "No se pudo cargar el archivo de audio",
        }
    }
};//end    
       public static async storeAudioFile(file:File): Promise<boolean> {

        try {
            const formData = new FormData();
            formData.append("file", file);
            const response = await fetch("/api/audio/upload", {
                method: "POST",
                body: formData
            });
            if (!response.ok) {
                throw new Error("Failed to upload audio file");
            }
            alert(`File upload success.`);
            return true;
        } 
        catch (error) {
            alert("Error at store audio file: " + error);
            return false;
        }
    };//end
    */

};//end