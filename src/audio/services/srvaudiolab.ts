//src\lib\audiolab\srvaudiolab.ts
'use server';

import dotenv from 'dotenv';
import { readFAudioBuffer } from "@/audio/services/srvaudioutil";
dotenv.config();

import audioDecode from "audio-decode";
const fft = require('fft-js').fft,signal = [1,0,1,0];

import { VocalAnalysisResult } from "@/audio/model/vocalanalysisresult";
import { WordAnalysis } from "@/audio/model/wordanalysis";
import { VowelSegment } from "@/audio/model/vowelsegment";
import { AudioPart } from '@/audio/model/audiopart';
import { getAudioParts } from './srvaudiofunctions';

//import { getAudioParts } from '@/audio/services/srvaudioutil';

// Tamaño de la ventana FFT. Potencia de 2. 1024 es un buen punto de partida.
const FFT_SIZE = 1024; 
// Solapamiento entre ventanas. Cuánto avanzamos en cada paso.
const HOP_LENGTH = FFT_SIZE / 4; 
// Umbral de energía para considerar una vocal. MUY dependiente del audio.
const ENERGY_THRESHOLD = 1.5; 
// Min frequency for vocals (en Hz).
const VOCAL_FREQ_MIN = 300; 
// Max frequency for vocals (en Hz).
const VOCAL_FREQ_MAX = 2000; 

export async function analyzeAudioForVowels(filename: string): Promise<string|null> {

    // 1. Decodificar el audio (tu código actual)
    const buffer: Buffer | null = await readFAudioBuffer(filename);
    if(buffer === null) return null;

    const audioBuffer = await audioDecode(buffer); 
    const sampleRate = audioBuffer.sampleRate;
    const amplitudes = Array.from(audioBuffer.getChannelData(0)); 
    
    // 2. Preparar el resultado
    const analysisResult = new VocalAnalysisResult(sampleRate);
    const resp_audioparts:string|null = await getAudioParts(filename);    
    if(resp_audioparts === null) {return null;}
    
    //const audioParts:AudioPart[]|null = await getAudioParts(filename);
    const audioParts:AudioPart[]|null = JSON.parse(resp_audioparts) as AudioPart[]|null;

    // 3. Analizar cada palabra
    for (const wordInfo of audioParts!) {
        const wordAnalysis = new WordAnalysis(wordInfo.name, wordInfo.timeStart, wordInfo.timeEnd);
        const startSample = Math.floor(wordInfo.timeStart * sampleRate);
        const endSample = Math.floor(wordInfo.timeEnd * sampleRate);
        let isVowelActive = false;
        let vowelStartTime = 0;

        // 4. Iterar sobre los samples de la palabra, ventana a ventana (esto es el núcleo)
        for (let i = startSample; i < endSample; i += HOP_LENGTH) {
            const frame = amplitudes.slice(i, i + FFT_SIZE);
            if (frame.length < FFT_SIZE) continue; // Ignorar el último frame si es incompleto

            // 5. Aplicar FFT
            const phasors = fft(frame); // Obtener el resultado de la FFT (números complejos)
            // 6. Calcular la energía en la banda de frecuencia de las vocales
            let energy = 0;
            const minIndex = Math.floor(VOCAL_FREQ_MIN * FFT_SIZE / sampleRate);
            const maxIndex = Math.ceil(VOCAL_FREQ_MAX * FFT_SIZE / sampleRate);
            for (let j = minIndex; j <= maxIndex; j++) {
                const real = phasors[j][0];
                const imag = phasors[j][1];
                energy += Math.sqrt(real * real + imag * imag); // Magnitud
            }
            const averageEnergy = energy / (maxIndex - minIndex + 1);
            const currentTime = i / sampleRate;

            // 7. Lógica de detección de inicio/fin de vocal
            if (averageEnergy > ENERGY_THRESHOLD && !isVowelActive) {
                isVowelActive = true;
                vowelStartTime = currentTime;
            } else if (averageEnergy < ENERGY_THRESHOLD && isVowelActive) {
                isVowelActive = false;
                // ¡Vocal terminada! La añadimos al resultado.
                const segment = new VowelSegment(vowelStartTime, currentTime);
                wordAnalysis.addVowelSegment(segment);
            }
        }

        // Si la vocal seguía activa al final de la palabra, la cerramos.
        if (isVowelActive) {
            const segment = new VowelSegment(vowelStartTime, wordInfo.timeEnd);
            wordAnalysis.addVowelSegment(segment);
        }
        analysisResult.addWord(wordAnalysis);
    }
    // 8. Devolver el resultado como un string JSON
    return analysisResult.toJsonString();
};//end

/*
 function getAudioParts(filename: string): Promise<AudioPart[]|null> {
    
    let buffer:Buffer|null = await readFAudioBuffer(filename);
    if(buffer === null) {return null;}

    const audioBuffer = await audioDecode(buffer); 
    const {duration,sampleRate} = audioBuffer;
    
    const amplitudes: number[] 
        = Array.from(audioBuffer.getChannelData(0));

    const timePerSample = 1.0 / sampleRate;

    let instMin:number= 1.0;
    for (let idx=0;idx<amplitudes.length;idx++) {  
        const valueCalc: number = Math.abs(amplitudes[idx]);
        if(valueCalc>0) {
            if(valueCalc<instMin) {
                instMin = valueCalc;
            }
        }
    }

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
    return parts;

}//end 
*/