//src\lib\audiolab\srvaudioutil.ts
'use server';

import dotenv from 'dotenv';
dotenv.config();

import path from "path";
import * as fs from "fs/promises";
import audioDecode from "audio-decode";
const WavEncoder = require("wav-encoder");

function getMaxValue(values: number[]): number {
    let max = 0;
    for (let idx=0;idx<values.length;idx++) {  
        const absVal = Math.abs(values[idx]);
        if (absVal > max) max = absVal;
    }
    return max;
};//end 

/**
 * Action Server: getAudioWavNormalized
 */
export async function getAudioWavNormalized(fname:string): Promise<string|null>  {
    const filePath = path.join(process.cwd(),"public","audios",fname);
    const filebuffer: Buffer = await fs.readFile(filePath);
    const audioBuffer: AudioBuffer = await audioDecode(filebuffer); 
    const {sampleRate, numberOfChannels} = audioBuffer;
    const amplitudes_0: number[] = Array.from(audioBuffer.getChannelData(0));
    let amplitudes_1: number[] | null = null;
    if(numberOfChannels > 1) {
        amplitudes_1 = Array.from(audioBuffer.getChannelData(1));
    }

    // Normalización a 0.99
    const max0 = getMaxValue(amplitudes_0);
    const normFactor0 = max0 > 0 ? 0.99 / max0 : 1.0;
    const normAmplitudes_0 = amplitudes_0.map(a => a * normFactor0);

    let normAmplitudes_1: number[] | null = null;
    if (amplitudes_1) {
        const max1 = getMaxValue(amplitudes_1);
        const normFactor1 = max1 > 0 ? 0.99 / max1 : 1.0;
        normAmplitudes_1 = amplitudes_1.map(a => a * normFactor1);
    }

    let objData: number[][] = [];
    if(numberOfChannels==1){objData = [normAmplitudes_0];} 
    else {objData = [normAmplitudes_0, normAmplitudes_1!];}

    const wavData: any = {sampleRate,channelData:objData};
    const wavBuffer: Buffer = Buffer.from(await WavEncoder.encode(wavData));
    const numberData = new Uint8Array(wavBuffer);
    return JSON.stringify(Array.from(numberData));
};//end