//src\lib\audio\xaudio.ts

import { XMath2dUtil } from "@/math2d/functions/xmath2dutil";

/**
 * class XAudio
 */
export class XAudio {

    public fname: string;
	public format: string;
    public mimetype: string;
	public duration: number;
    public length: number;
    public channels: number;
    public samplerate: number;
	public timePerSample:number=0;
    public fbuffer:Buffer;
    public srcbuffer:Buffer;

    constructor(fname:string, 
                format:string, 
                mimetype:string,
                duration:number, 
                length:number, 
                channels:number,
                samplerate:number,
                fbuffer:Buffer,
                srcbuffer:Buffer) {

        this.fname = fname;
        this.format = format;
        this.mimetype = mimetype;
        this.duration = duration;
        this.length = length;
        this.channels = channels;
        this.samplerate = samplerate;
        this.fbuffer = fbuffer;
        this.srcbuffer = srcbuffer;
        this.timePerSample = 1.0 / this.samplerate;
    };//end constructor

    public getAudioPosition(percent100:number):number {
        return XMath2dUtil.getValue100(this.length, percent100);
    };

};//end 