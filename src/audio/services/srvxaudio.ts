//src\lib\audiolab\srvaudioutil.ts
'use server';

import dotenv from 'dotenv';
dotenv.config();

import audioDecode from "audio-decode";
import { getAudioFormat, 
         getAudioMimeType, 
         readFAudioBuffer } from '@/audio/services/srvaudioutil';

/**
 * Action Server function 
 *   to get audio object as XAudio serialized to JSON
 */
export async function getAudioObject(fname:string): Promise<string|null> {

    const fbuffer:Buffer|null = await readFAudioBuffer(fname);
    if(fbuffer===null) {return null;}

    const audioBuffer = await audioDecode(fbuffer); // <- PCM data
    const { numberOfChannels, length, sampleRate, duration } = audioBuffer;
    const format = await getAudioFormat(fbuffer);
    const mimetype:string = await getAudioMimeType(format);
    const audioObject: any = {
        fname,
        format,
        mimetype,
        duration,
        length,
        channels: numberOfChannels,
        samplerate: sampleRate,
        timePerSample: 1.0 / sampleRate,
        fbuffer: Array.from(fbuffer!),
        srcbuffer:fbuffer!
    };
    return JSON.stringify(audioObject);
};//end