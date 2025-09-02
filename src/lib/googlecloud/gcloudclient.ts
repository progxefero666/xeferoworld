//src\lib\googlecloud\gcloudclient.ts

import { getVoices, synthesizeSpeech } from "@/audio/server/srvgcloudapi";

export class GCloudClient  {

    public static async synthesizeSpeech(text:string,
                                         languageCode:string,
                                         voiceName: string,
                                         gender:any): Promise<Blob|null> {
        let mlGen:any = 'NEUTRAL';
        if(gender !== 'SSML_VOICE_GENDER_UNSPECIFIED'){
            mlGen = gender.ssmlGender;
        }       
        const audioBuffer = await synthesizeSpeech({
            text,
            languageCode: languageCode,
            voiceName: voiceName,
            ssmlGender: mlGen
        });        
        if(audioBuffer!== null) {
            const audioBlob = new Blob([new Uint8Array(audioBuffer)], {type:'audio/wav'});
            return audioBlob;
        }        
        return null;
    };//end 

};//end

/**
 * class GCloudTextToSpeech
 */
export class GCloudTextToSpeech {


};//end