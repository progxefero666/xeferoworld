//C:\Development\apps\aigenerator\src\app\gcloudapi\audiolabconfig.ts

import { Option } from "@/common/option";

export class AudioLabConfig {

    public static readonly AUDIO_VERCEL: string = "audio_vercel";
    public static readonly AUDIO_LAB: string = "audio_lab";
    public static readonly GOOGLE_API: string = "google_api";

    public static readonly SECTIONS: Option[] = [
        new Option(AudioLabConfig.AUDIO_VERCEL, "Vercel Audio"),
        new Option(AudioLabConfig.AUDIO_LAB, "Audio Lab"),
        new Option(AudioLabConfig.GOOGLE_API, "Google API")
    ];

};//end