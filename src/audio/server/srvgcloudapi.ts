'use server';

import { TextToSpeechClient } from '@google-cloud/text-to-speech';


// @ts-nocheck
import type { VoiceOption, SynthesizeRequestOptions } from '@/lib/googlecloud/types';
import { storeAudio } from '@/audio/server/srvstorage';
import { serviceAccountCredentials } from '@/lib/googlecloud/glcloudconfig';



/*
const mockVoices: VoiceOption[] = [
    { name: 'en-US-Standard-A', languageCodes: ['en-US'], ssmlGender: 'MALE', naturalSampleRateHertz: 24000 },
    { name: 'en-US-Standard-B', languageCodes: ['en-US'], ssmlGender: 'MALE', naturalSampleRateHertz: 24000 },
    { name: 'en-US-Standard-C', languageCodes: ['en-US'], ssmlGender: 'FEMALE', naturalSampleRateHertz: 24000 },
    { name: 'en-US-Standard-D', languageCodes: ['en-US'], ssmlGender: 'MALE', naturalSampleRateHertz: 24000 },
    { name: 'en-US-Wavenet-A', languageCodes: ['en-US'], ssmlGender: 'MALE', naturalSampleRateHertz: 24000 },
    { name: 'en-US-Wavenet-F', languageCodes: ['en-US'], ssmlGender: 'FEMALE', naturalSampleRateHertz: 24000 },
    { name: 'en-GB-Standard-A', languageCodes: ['en-GB'], ssmlGender: 'FEMALE', naturalSampleRateHertz: 24000 },
    { name: 'en-GB-Standard-B', languageCodes: ['en-GB'], ssmlGender: 'MALE', naturalSampleRateHertz: 24000 },
    { name: 'es-ES-Standard-A', languageCodes: ['es-ES'], ssmlGender: 'FEMALE', naturalSampleRateHertz: 24000 },
    { name: 'es-US-Standard-A', languageCodes: ['es-US'], ssmlGender: 'FEMALE', naturalSampleRateHertz: 24000 },
    { name: 'fr-FR-Standard-E', languageCodes: ['fr-FR'], ssmlGender: 'FEMALE', naturalSampleRateHertz: 24000 },
    { name: 'fr-FR-Wavenet-A', languageCodes: ['fr-FR'], ssmlGender: 'FEMALE', naturalSampleRateHertz: 24000 },
    { name: 'de-DE-Standard-F', languageCodes: ['de-DE'], ssmlGender: 'FEMALE', naturalSampleRateHertz: 24000 },
    { name: 'it-IT-Standard-A', languageCodes: ['it-IT'], ssmlGender: 'FEMALE', naturalSampleRateHertz: 24000 },
    { name: 'ja-JP-Standard-A', languageCodes: ['ja-JP'], ssmlGender: 'FEMALE', naturalSampleRateHertz: 24000 },
];
    //Returning mock data for getVoices()
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockVoices;
*/

export async function getVoices(): Promise<VoiceOption[]> {

    try {
        const client = new TextToSpeechClient({credentials:serviceAccountCredentials});
        const [response] = await client.listVoices({});
        const voices = response.voices;
        if (!voices) {return [];}

        // Filter for clarity, removing unspecified genders 
        // and ensuring language codes exist.
        return voices
            .filter(voice => voice.ssmlGender && voice.ssmlGender !== 'SSML_VOICE_GENDER_UNSPECIFIED' && 
                             voice.languageCodes && voice.languageCodes.length > 0)
            .map(voice => ({
                languageCodes: voice.languageCodes as string[],
                name: voice.name as string,
                ssmlGender: voice.ssmlGender as 'MALE' | 'FEMALE' | 'NEUTRAL',
                naturalSampleRateHertz: voice.naturalSampleRateHertz as number,
            }));
    } 
    catch (error) {
        console.error('ERROR fetching voices', error);
        return [];
    }

};//end


export async function synthesizeSpeech(options: SynthesizeRequestOptions): Promise<Buffer|null> {

    if (!options.text || !options.languageCode || !options.voiceName) {
        throw new Error("Text, language code, and voice name are required.");
    }

    try {
        const client = new TextToSpeechClient({ credentials: serviceAccountCredentials });

        const request = {
            input: { text: options.text },
            voice: { languageCode: options.languageCode,
                     name: options.voiceName,
                     ssmlGender: options.ssmlGender
            },
            audioConfig: { audioEncoding: "LINEAR16" as const },
        };

        const [response] = await client.synthesizeSpeech(request);

        if (response.audioContent instanceof Uint8Array) {
            const filename = `audio-${Date.now()}.wav`;
            storeAudio(filename, Buffer.from(response.audioContent));
            return Buffer.from(response.audioContent);
        }
        throw new Error("Invalid audio content format received.");
    } 
    catch (error) {
        console.error('ERROR synthesizing speech:', error);
        return null;
    }

};//end