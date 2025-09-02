//src\lib\audio\model\wordtimestamp.ts

import { AudioHelper } from "../helper/audiohelper";

/**
 * class AudioPart
 *    duration,timeStart,timeEnd in seconds
 */
export class AudioPart {

    public name:       string;
    public duration:   number;
    public timeStart:  number;
    public timeEnd:    number;
    public durationText: string;
    public timeStartText: string;
    public timeEndText: string;

    //timeStart and timeEnd in seconds
    constructor(name:string, timeStart:number, timeEnd:number) {
        this.name      = name;        
        this.timeStart = timeStart;
        this.timeEnd   = timeEnd;
        this.duration      = timeEnd - timeStart;
        this.durationText  = AudioHelper.getTimeFormatted(this.duration);
        this.timeStartText = AudioHelper.getTimeFormatted(this.timeStart);
        this.timeEndText   = AudioHelper.getTimeFormatted(this.timeEnd);
    };//end

};//end