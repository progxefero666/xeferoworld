//src\lib\audiolab\srvaudioutil.ts
'use server';

import dotenv from 'dotenv';
dotenv.config();

import ffmpeg from 'fluent-ffmpeg';
import path from "path";
import * as fs from "fs/promises";
import audioDecode from "audio-decode";

import { PassThrough } from 'stream';
import { AudioWave } from "@/audio/model/audiowave";
import { AudioPart } from "@/audio/model/audiopart";

const WavEncoder = require("wav-encoder");

function getMaxValue(values: number[]): number {
    let max = 0;
    for (let idx=0;idx<values.length;idx++) {  
        const absVal = Math.abs(values[idx]);
        if (absVal > max) max = absVal;
    }
    return max;
};//end 

function getMinValue(values: number[]): number {
    let instMin:number= 1.0;
    for (let idx=0;idx<values.length;idx++) {  
        const valueCalc: number = Math.abs(values[idx]);
        if(valueCalc>0) {
            if(valueCalc<instMin) {
                instMin = valueCalc;
            }
        }
    };
    return instMin;
};//end 


export async function getAudioMimeType(format: string): Promise<string> {
    const formatLower = format.toLowerCase();    
    if (formatLower.includes('wav')) return 'audio/wav';
    if (formatLower.includes('mp3')) return 'audio/mpeg';
    if (formatLower.includes('flac')) return 'audio/flac';
    if (formatLower.includes('ogg')) return 'audio/ogg';
    if (formatLower.includes('m4a')) return 'audio/mp4';  
    if (formatLower.includes('aac')) return 'audio/mp4';    
    return 'audio/octet-stream';
};//end

export async function getAudioFormat(buffer: Buffer): Promise<string> {
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

export async function readFAudioBuffer(filename: string): Promise<Buffer|null> {
    const fileFolder: string = process.env.AUDIOS_DATA_FOLDER!;
    const filePath: string = path.join(fileFolder, filename); 
    let buffer:Buffer|null = null; 
    try {buffer = await fs.readFile(filePath);}
    catch (error) {
        console.error("Error reading audio file:", error);
        return null;
    }
    return buffer;
}//end