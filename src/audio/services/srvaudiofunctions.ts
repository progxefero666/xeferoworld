//src\lib\audiolab\srvaudioutil.ts
'use server';

import dotenv from 'dotenv';
dotenv.config();

import ffmpeg from 'fluent-ffmpeg';
import path from "path";
import * as fs from "fs/promises";
import audioDecode from "audio-decode";

import { PassThrough } from 'stream';
import { AudioPart } from "@/audio/model/audiopart";
import { readFAudioBuffer } from '@/audio/services/srvaudioutil';

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

/**
 * Action Server: getAudioParts
 */
export async function getAudioParts(filename: string): Promise<string|null> {
    
    let buffer:Buffer|null = await readFAudioBuffer(filename);
    if(buffer === null) {return null;}

    const audioBuffer = await audioDecode(buffer); 
    const {sampleRate} = audioBuffer;    
    const amplitudes: number[] 
        = Array.from(audioBuffer.getChannelData(0));
    const timePerSample = 1.0 / sampleRate;
    const instMin:number  = getMinValue(amplitudes);

    const parts: AudioPart[] = [];
    let inNewPArt:boolean = false;
    let timeStart:number = 0.0;
    let timeEnd:number = 0.0;
    let countSilFrames:number = 0;

    for (let idx=0;idx<amplitudes.length;idx++) { 
        if(Math.abs(amplitudes[idx])>=(instMin*1.0)) {
            if(!inNewPArt) {
                timeStart = idx * timePerSample;
                inNewPArt = true;
            }
        }
        else {
            countSilFrames++;
            if(countSilFrames > 50) {
                if(inNewPArt) {                    
                    const partName: string = "region_"+idx.toString();
                    timeEnd = idx * timePerSample;
                    parts.push(new AudioPart(partName,timeStart,timeEnd));
                    inNewPArt = false;
                }
                countSilFrames = 0;
            }
        }
    }//end for

    return JSON.stringify(parts);
};//end 

/**
 * Action Server: getAudioWavFragment
 */
export async function getAudioWavFragment(fname:string,timeStart:number,duration:number): Promise<string|null>  {

    function getWavBytesPerSample(filebuffer: Buffer): number {
        const bitDepth = filebuffer.readUInt16LE(34); // <-- Bit depth WAV
        return (bitDepth / 8); 
    };//end

    const filePath = path.join(process.cwd(),"public","audios",fname);
    const filebuffer: Buffer = await fs.readFile(filePath);
    const bytesPerSample:number = getWavBytesPerSample(filebuffer);
    const channels:number = 1; 
    
    const audioBuffer: AudioBuffer = await audioDecode(filebuffer); 
    const {sampleRate} = audioBuffer;
    
    const startByte:number = Math.floor(timeStart * sampleRate * bytesPerSample * channels)
    const endByte = Math.floor((timeStart + duration) * sampleRate * bytesPerSample * channels)

    // Mantener el header WAV (primeros 44 bytes)
    const wavHeader = filebuffer.slice(0, 44);
    const audioData = filebuffer.slice(44 + startByte, 44 + endByte);

    // Crear nuevo buffer con header actualizado
    const newSize = audioData.length;
    const newBuffer = Buffer.concat([wavHeader, audioData]);
    newBuffer.writeUInt32LE(newSize + 36, 4); // ChunkSize
    newBuffer.writeUInt32LE(newSize, 40); // Subchunk2Size
    const fragmentArray = new Uint8Array(newBuffer)

    const fragmentData:number[] = Array.from(fragmentArray);
    const uint8Array = new Uint8Array(fragmentData);
    return JSON.stringify(Array.from(uint8Array));
};//end

export async function getAudioMp3Fragment(fname:string, timeStart:number, duration:number): Promise<string|null> {
    return new Promise(async (resolve, reject) => {
        try {
            const filePath = path.join(process.cwd(), "public", "audios", fname);
            const outputStream = new PassThrough();
            const chunks: Buffer[] = [];
            outputStream.on('data', (chunk) => chunks.push(chunk));
            outputStream.on('end', () => {
                const buffer = Buffer.concat(chunks);
                const fragmentArray = new Uint8Array(buffer);
                resolve(JSON.stringify(Array.from(fragmentArray)));
            });
            outputStream.on('error', (err) => reject(err));

            ffmpeg(filePath)
                .setStartTime(timeStart)
                .duration(duration)
                .format('mp3')
                .output(outputStream)
                .on('error', (err) => reject(err))
                .run();
        } catch (err) {
            reject(err);
        }
    });
}//end