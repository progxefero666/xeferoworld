'use server';

import { type NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs"
import path from "path"


export async function getAudioFragment(fileName: string, startTime: number, duration: number) {
    try {
        const audioPath = path.join(process.cwd(), "public", "audios", fileName)
        const audioBuffer = await fs.readFile(audioPath)

        // Para WAV con sample rate 24000, calculamos los bytes
        const sampleRate = 24000
        const bytesPerSample = 2 // 16-bit audio
        const channels = 1 // mono

        const startByte = Math.floor(startTime * sampleRate * bytesPerSample * channels)
        const endByte = Math.floor((startTime + duration) * sampleRate * bytesPerSample * channels)

        // Mantener el header WAV (primeros 44 bytes)
        const wavHeader = audioBuffer.slice(0, 44)
        const audioData = audioBuffer.slice(44 + startByte, 44 + endByte)

        // Crear nuevo buffer con header actualizado
        const newSize = audioData.length
        const newBuffer = Buffer.concat([wavHeader, audioData])

        // Actualizar el tamaño en el header WAV
        newBuffer.writeUInt32LE(newSize + 36, 4) // ChunkSize
        newBuffer.writeUInt32LE(newSize, 40) // Subchunk2Size

        const fragmentArray = new Uint8Array(newBuffer)
        return {
            success: true,
            audioData: Array.from(fragmentArray),
            fileName: `${fileName}_fragment_${startTime}s_${duration}s.wav`,
            mimeType: "audio/wav",
            startTime,
            duration,
        }
    } 
    catch (error) {
        console.error("Error creating audio fragment:", error)
        return {
            success: false,
            error: "No se pudo crear el fragmento de audio",
        }
    }

};//end

export async function POST(request: NextRequest) {
    const mimeType:string = 'audio/wav';
    try {
        const { fileName, startTime, duration } = await request.json()
        const result = await getAudioFragment(fileName, startTime, duration)
        return NextResponse.json(result)
    } 
    catch (error) {
        return NextResponse.json(
            {success:false,error:'Internal server error.'},
            {status:500},
        )
    }
};//end
