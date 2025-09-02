
'use server';

import { type NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs"
import path from "path"

//import { getCompleteAudio } from "@/audio/services/audio-actions";

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

export async function POST(request: NextRequest) {
    try {
        const { fileName } = await request.json();
        const result = await getCompleteAudio(fileName);
        return NextResponse.json(result);
    } 
    catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: "Error interno del servidor",
            },
            { status: 500 },
        )
    }
};//end 
