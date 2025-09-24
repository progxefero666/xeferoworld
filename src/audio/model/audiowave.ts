//src\lib\audio\audiowave.ts


/**
 * class AudioWave
 */
export class AudioWave {

    public length:       number;
    public sampleRate:   number;
    public timePerSample:number;
    public amplitudes_0: number[];
    public amplitudes_1: number[]|null;
    public duration:     number;

    constructor(length: number, 
                sampleRate: number,
                amplitudes_0: number[],
                amplitudes_1: number[] | null) {

        this.length = length;
        this.sampleRate = sampleRate;
        this.amplitudes_0 = amplitudes_0;
        this.amplitudes_1 = amplitudes_1;
        
        this.timePerSample = 1.0 / sampleRate;
        this.duration = this.length * this.timePerSample;
    };//end constructor


    public toJsonString(): string {
        return JSON.stringify(this, null, 4);
    };//end

};//end