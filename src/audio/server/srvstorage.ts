'use server';


import path from "path";
import * as fs from "fs/promises";
import { promisify } from "util";

import { exec } from 'child_process';
import dotenv from 'dotenv';
dotenv.config();

const execAsync = promisify(exec);


export async function storeAudio(filename:string, audiobuffer:Buffer): Promise<boolean> {

    const fileFolder: string = process.env.AUDIOS_DATA_FOLDER!;
    const filePath: string = path.join(fileFolder, filename);
    try {
        await fs.writeFile(filePath, audiobuffer);
    }
    catch (error) {
        console.error("Error storing audio file - ", error);
        return false;
    }
    return true;

}//end action


export async function readFileAudio(filename: string): Promise<string | null> {
    const fileFolder: string = process.env.AUDIOS_DATA_FOLDER!;
    const filePath: string = path.join(fileFolder, filename);
    let data: Buffer | null = null;
    try {
        data = await fs.readFile(filePath);
    }
    catch (error) {
        console.error("Error reading audio file - ", error);
        return null;
    }
    return data.toString();
}//end

/*
import fs from "fs";
import audioDecode from "audio-decode";

async function analyzeAmplitude(filePath: string) {
  const buffer = fs.readFileSync(filePath);
  const audioBuffer = await audioDecode(buffer); // <- PCM data

  const { numberOfChannels, length, sampleRate } = audioBuffer;

  const samples = audioBuffer.getChannelData(0); // canal izquierdo
  const amplitudes = Array.from(samples); // Float32Array [-1, 1]

  // Detectar silencios simples (umbral bajo)
  const threshold = 0.01;
  const silentSections = [];

  let start = null;
  for (let i = 0; i < amplitudes.length; i++) {
    const amp = Math.abs(amplitudes[i]);
    if (amp < threshold) {
      if (start === null) start = i;
    } else {
      if (start !== null) {
        const duration = (i - start) / sampleRate;
        if (duration > 0.5) { // silencio mayor a 0.5s
          silentSections.push({ from: start / sampleRate, to: i / sampleRate });
        }
        start = null;
      }
    }
  }

  return silentSections;
}

*/