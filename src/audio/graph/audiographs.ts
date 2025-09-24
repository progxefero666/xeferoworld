//src\lib\audio\audiographs.ts

import { TDimension, TRange } from "@/common/types";
import { XMath2dUtil } from "@/math2d/functions/xmath2dutil";
import { Point2d } from "@/lib/graph2d/types2d";
import { AudioWave } from "@/audio/model/audiowave";
import { AudioMark } from "@/audio/model/audiomark";
import { AudioMonitorCfg } from "@/audio/components/audiolabmoncfg";

/**
 * class AudioGraphs.getAudioWaveGraph
 * This class is a placeholder for future audio graph functionalities.
 */
export class AudioGraphs {

    public static readonly FACTOR_FRAMES: number = 100.0;

    //duration: 05.248 seconds
     //length/amplitudes.length:125963 / 100 = 1.259,63

    public static getAudioWaveMarks(canvasDim:TDimension,audioWave: AudioWave): AudioMark[] {

        const durationSeconds: number = audioWave.length * audioWave.timePerSample;
        const durationMiliseconds: number = Math.floor(durationSeconds * 1000);
        const unitX: number = canvasDim.width / durationMiliseconds;

        const marks:AudioMark[] = [];
        let groupIndex: number = 0;
        for (let idx=0;idx<durationMiliseconds;idx++) {
            const coordX: number = Math.floor(idx * unitX);
            const coordY: number = 5;

            let size: number = AudioMonitorCfg.MARK_SIZE_DEFAULT;
            if(groupIndex === 0) {
                size = AudioMonitorCfg.MARK_SIZE_MEDIUM;
            }
            const mark: AudioMark = new AudioMark(
                {x:coordX,y:coordY},size, 
                AudioMonitorCfg.MARK_COLOR_DEFAULT);
            marks.push(mark);

            groupIndex++;
            if(groupIndex >= 100) {groupIndex = 0;}            
        }//end for
        
        return marks;
    };//end

    public static getAudioWaveGraph(canvasDim:TDimension,audioWave: AudioWave): Point2d[] {

        const countframes: number = Math.floor(audioWave.length/AudioGraphs.FACTOR_FRAMES);
        const graphAmplitudeY:number =  canvasDim.height/2
        const graphCenterY:number = Math.floor(canvasDim.height/2);        
        const unitX: number = canvasDim.width / countframes;



        let waveAmpMax: number = 0;
        for (let idx=0;idx<countframes;idx++) {
            const frameIndex: number = idx * AudioGraphs.FACTOR_FRAMES;
            const currAmp: number = Math.abs(audioWave.amplitudes_0[frameIndex]);
            if(currAmp> waveAmpMax) {
                waveAmpMax = currAmp;
            }            
        }
        
        const graphPoints:Point2d[] = [];
        for (let idx=0;idx<countframes;idx++) {
            const frameIndex: number = idx * AudioGraphs.FACTOR_FRAMES;
            const coordX:number = Math.floor(idx * unitX);
            let coordY:number = 0;
            if(audioWave.amplitudes_0[frameIndex]>=0){
                const amp: number = audioWave.amplitudes_0[frameIndex];
                const percCalc:number = XMath2dUtil.getPercent100(waveAmpMax,amp);
                const valueY = XMath2dUtil.getValue100(graphAmplitudeY,percCalc);
                coordY = graphCenterY - valueY;
            }
            else {
                const amp: number = Math.abs(audioWave.amplitudes_0[frameIndex]);
                const percCalc:number = XMath2dUtil.getPercent100(waveAmpMax,amp);
                const valueY = XMath2dUtil.getValue100(graphAmplitudeY,percCalc);
                coordY = graphCenterY + valueY;
            }
            graphPoints.push({x:coordX,y:coordY});            
        }//end for
        return graphPoints;
    };//end


    public static getChannelWaveRange(wave:number[]): TRange{
        let min:number = wave[0];
        let max:number = wave[0];
        for (let i=0;i<wave.length;i++) {
            if (wave[i] < min) {
                min = wave[i];
            }
            if (wave[i] > max) {
                max = wave[i];
            }
        }
        return {min, max};
    };//end

    /*
    public static getSteroAudioWaveGraph(canvasDim:TDimension,audioWave: AudioWave): void {

        const channel_0_range: TRange = AudioGraphs.getChannelWaveRange(audioWave.amplitudes_0);
        let channel_1_range: TRange|null = null;
        if(audioWave.amplitudes_1!== null){
            channel_1_range = AudioGraphs.getChannelWaveRange(audioWave.amplitudes_1);
        }
        console.log("Channel 0 Range:", channel_0_range);
        if(channel_1_range !== null) {
            console.log("Channel 1 Range:", channel_1_range);
        }

    };//end
    */

};//end