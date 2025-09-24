//src\lib\audiolab\srvaudioutil.ts
'use server';

import dotenv from 'dotenv';
dotenv.config();

import audioDecode from "audio-decode";
import { AudioWave } from '@/audio/model/audiowave';
import { readFAudioBuffer } from '@/audio/services/srvaudioutil';

/**
 * Action Server: readFAudioWave
 * timePerSample = 1.0 / samplerate;
 */
export async function readFAudioWave(filename: string): Promise<string|null> {

    let buffer:Buffer|null = await readFAudioBuffer(filename);
    if(buffer === null) {return null;}

    const audioBuffer = await audioDecode(buffer); 
    const {numberOfChannels,sampleRate} = audioBuffer;
    
    const amplitudes_0: number[] 
        = Array.from(audioBuffer.getChannelData(0));
        
    let amplitudes_1: number[] | null = null;
    if(numberOfChannels > 1) {
        amplitudes_1 = Array.from(audioBuffer.getChannelData(1)); 
    }
    //InstMax: 0.47181615233421326 InstMin: 0.000030518509447574615
    const audioWave:AudioWave = new AudioWave(
        amplitudes_0.length,
        audioBuffer.sampleRate,    
        amplitudes_0, amplitudes_1
    );
    return audioWave.toJsonString();
};//end

function getAmplitudesMedia(amplitudes:number[]):number {    
    let sum:number=0;
    for(let idx=0; idx < amplitudes.length; idx++) {
        sum += Math.abs(amplitudes[idx]);
    }
    return sum / amplitudes.length;
};//end

/**
 * Server Action: readFAudioWaveEscaled
 * @param zoom --> 0 to 100.0
 */
export async function readFAudioWaveEscaled(filename:string,zoom:number): Promise<string|null> {

    let buffer:Buffer|null = await readFAudioBuffer(filename);
    if(buffer === null) {return null;}

    const audioBuffer = await audioDecode(buffer); 
    const {numberOfChannels,sampleRate} = audioBuffer;
    
    const amplitudes_0:number[] = Array.from(audioBuffer.getChannelData(0));
        
    let amplitudes_1:number[]|null = null;
    if(numberOfChannels > 1) {
        amplitudes_1 = Array.from(audioBuffer.getChannelData(1)); 
    }
    //InstMax: 0.47181615233421326 InstMin: 0.000030518509447574615
    const audioWave:AudioWave = new AudioWave(
        amplitudes_0.length,
        audioBuffer.sampleRate,    
        amplitudes_0, amplitudes_1
    );
    return audioWave.toJsonString();
};//end