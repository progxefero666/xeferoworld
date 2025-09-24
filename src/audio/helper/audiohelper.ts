//src\lib\audio\audioutil.ts

import { XMath2dUtil } from "@/math2d/functions/xmath2dutil";

import { AudioPart } from "@/audio/model/audiopart";


/**
 * class AudioUtil.getAudioUrl
 */
export class AudioHelper {

    public static getTimeMilliseconds(time:number): number {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        const centiseconds = Math.floor((time - Math.floor(time)) * 1000); 
        return (minutes * 60 + seconds) * 1000 + centiseconds;
    };//end

    public static getAudioPosition(timeSeconds:number,percent100:number): number {
        return XMath2dUtil.getValue100(timeSeconds, percent100);
    };//end

    // Parsea un string JSON de XAudio y convierte fbuffer a Uint8Array
    public static parseXAudio = (obj: string): any | null => {
        if (obj == null) {
            return null;
        }
        const jsonParsed = JSON.parse(obj);
        jsonParsed.srcbuffer = jsonParsed.fbuffer;
        // Si fbuffer es un array de números, conviértelo a Uint8Array
        if (jsonParsed.fbuffer && Array.isArray(jsonParsed.fbuffer)) {
            jsonParsed.fbuffer = new Uint8Array(jsonParsed.fbuffer);
        }
        return jsonParsed;
    };

    //format -->min:sec:cent 00:00:000
    public static getTimeFormatted(time:number): string {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        const centiseconds = Math.floor((time - Math.floor(time)) * 1000); // milisegundos

        const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        const formattedCents = centiseconds.toString().padStart(3, '0');

        return `${formattedMinutes}:${formattedSeconds}:${formattedCents}`;
    };//end

    public static getAudioUrl(buffer:Buffer,mimetype:string): string {
        const blob = new Blob([new Uint8Array(buffer)], { type: mimetype });
        return URL.createObjectURL(blob);
    };//end

    public static getAudioMimeType(format: string): string {
        const formatLower = format.toLowerCase();    
        if (formatLower.includes('wav')) return 'audio/wav';
        if (formatLower.includes('mp3')) return 'audio/mpeg';
        if (formatLower.includes('flac')) return 'audio/flac';
        if (formatLower.includes('ogg')) return 'audio/ogg';
        if (formatLower.includes('m4a')) return 'audio/mp4';  
        if (formatLower.includes('aac')) return 'audio/mp4';    
        return 'audio/octet-stream';
    };//end

    public static getAudioFormat(buffer:Buffer): string {
        const header = buffer.subarray(0, 16);     
        // WAV/RIFF
        if (header.subarray(0, 4).toString('ascii') === 'RIFF' && 
            header.subarray(8, 12).toString('ascii') === 'WAVE') {        
            // Analizar subchunk para obtener más detalles
            const fmtChunk = buffer.subarray(12, 20);
            if (fmtChunk.toString('ascii', 0, 4) === 'fmt ') {
                const audioFormat = buffer.readUInt16LE(20); // formato de audio
                const bitDepth = buffer.readUInt16LE(34);    // bits por muestra            
                return `wav (${audioFormat === 1 ? 'pcm' : 'Compressed'}, ${bitDepth}-bit)`;
            }
            return 'wav';
        }    
        if (header[0] === 0xFF && (header[1] & 0xE0) === 0xE0)  {return 'mp3';}
        if (header.subarray(0, 4).toString('ascii') === 'fLaC') {return 'flac';}
        if (header.subarray(0, 4).toString('ascii') === 'OggS') {return 'ogg';}
        if (header.subarray(4, 8).toString('ascii') === 'ftyp') {return 'm4a/aac';}
        return 'Unknown';
    };//end

}