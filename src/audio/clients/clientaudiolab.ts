//src\audio\clients\clientaudiolab.ts

import { parseCollection, parseItem } from "@/common/parsers/javascriptparser";

import { XAudio } from "@/audio/model/xaudio";
import { AudioWave } from "@/audio/model/audiowave";
import { AudioHelper } from "@/audio/helper/audiohelper";
import { AudioPart } from "@/audio/model/audiopart";
import { VocalAnalysisResult } from "@/audio/model/vocalanalysisresult";


import { analyzeAudioForVowels } from "@/audio/services/srvaudiolab";
import { getAudioObject } from "@/audio/services/srvxaudio";
import { readFAudioWave } from "@/audio/services/srvaudiowave";
import { getAudioParts, getAudioWavFragment } from "@/audio/services/srvaudiofunctions";



/**
 * class AudioClient.getAudioWave
 */
export class AudioClient {

    public static async getAudioObject(fname: string): Promise<XAudio|null> {
        const xaudio_resp: string|null = await getAudioObject(fname);
        if(xaudio_resp === null) {return null;}
        const xaudio: XAudio|null = AudioHelper.parseXAudio(xaudio_resp);
        return xaudio;
    };//end

    public static async getAudioWave(fname: string): Promise<AudioWave|null> {
        const response:string|null = await readFAudioWave(fname);
        if(response === null) {alert("Error reading audio.");return null;}        
        const resp_audioWave:AudioWave|null = parseItem<AudioWave>(response!)
        return resp_audioWave;
    };//end

    public static async getAudioParts(fname: string): Promise<AudioPart[]> {
        const response:string|null = await getAudioParts(fname);
        return parseCollection<AudioPart>(response!)!;
    };//end

    public static async getAudioWavFragmentUrl(fname:string,audiopart:AudioPart): Promise<string|null> {

        const resp_part:string|null = await getAudioWavFragment
                    (fname,audiopart.timeStart,audiopart.duration);
        if(resp_part === null)    {
            alert("Error loading audio part");
            return null;
        }
        const arr: number[] = JSON.parse(resp_part);
        const uint8Array = new Uint8Array(arr);
        const blob = new Blob([uint8Array.buffer], {type:"audio/wav"});                           
        return URL.createObjectURL(blob);
    };//end

    public static async getArrayAudioWavFragmentUrl(fname:string,
                                                    audioparts:AudioPart[]): Promise<string[]|null> {
        const audiosUrls: string[] = [];
        for (const part of audioparts) {
            const url = await AudioClient.getAudioWavFragmentUrl(fname, part);
            if(url===null) {
                alert("Error loading audio part.");
                return null;
            }
            audiosUrls.push(url);
        }
        return audiosUrls;
    };//end

    public static async getAudioAnalisis(fname:string): Promise<VocalAnalysisResult|null> {
        const response:string|null = await analyzeAudioForVowels(fname);
        return parseItem<VocalAnalysisResult>(response!)!;
    };//end

    public static async getAudioAnalisisParts(fname: string): Promise<AudioPart[]|null> {
        const resp_analisis:VocalAnalysisResult|null 
            = await AudioClient.getAudioAnalisis(fname);
        if(resp_analisis === null) {return null;}
        const audioParts:AudioPart[] = [];    
        for(let idx=0;idx<resp_analisis.words.length;idx++) {
            const wordAnalysis = resp_analisis.words[idx];
            const wordPart:AudioPart = new AudioPart(
                wordAnalysis.word, 
                wordAnalysis.startTime, 
                wordAnalysis.endTime
            );
            audioParts.push(wordPart);
        }
        return audioParts;
    }//end

    
}//end