//src\lib\audio\audioeditor.tsx

import { useEffect, useRef, useState } from "react";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { RdxThContainers } from "@/radix/rdxthcontainers";
import { XOuputText } from "@/radix/data/outputtext";
import { TDimension } from "@/common/types";
import { Point2d } from "@/lib/graph2d/types2d";
import { AudioWave } from "@/audio/model/audiowave";
import { AudioLabMonitor } from "@/audio/components/audiolabmon";
import { AudioGraphs } from "@/audio/graph/audiographs";
import { IntParameter } from "@/common/intparam";
import { XText } from "@/radix/data/xtext";
import { XInputZoom } from "@/radix/input/inpzoom";
import { XAudio } from "@/audio/model/xaudio";
import { AudioMonitorCfg } from "@/audio/components/audiolabmoncfg";
import { AudioClient } from "@/audio/clients/clientaudiolab";
import { AudioPart } from "@/audio/model/audiopart";

import { PanelAudioParts } from "@/radix/audio/audioparts";



const textDefault:string = 
    "Hello. This is a computer application, and this is a text audio analysis "+
    "test to detect individual words. This is the final sentence.";
    
const paramZoom:IntParameter = 
    new IntParameter("zoom",{min:1,max:100},1,"Zoom",true,1);

/**
 * Audio Editor Component
 */
interface AudioEditorProps { 
    value?: string; 
};

export function AudioLaboratory({ }: AudioEditorProps) {

    const canvasDim  = useRef<TDimension>(AudioMonitorCfg.INIT_CV_DIM);
    const audioFname = useRef<string>("audio_1.wav");
    const xaudio     = useRef<XAudio|null>(null); 
    const audioWave  = useRef<AudioWave|null>(null); 
    
    const [audioLoaded, setAudioLoaded]   = useState<boolean>(false);
    const [graphReady, setGraphReady]     = useState<boolean>(false);
    const [graphPoints, setGraphPoints]   = useState<Point2d[]>([]);
    const [audioParts, setAudioParts]     = useState<AudioPart[]>([]);
    const [subUrlAudios, setSubUrlAudios] = useState<string[]>([]);
    const [zoom, setZoom] = useState<number>(1);

    useEffect(() => {
        if(audioLoaded){return;}
        loadAudio();
    }, []);

 
    const loadAudio = async () => {

        const resp_xaudio: XAudio|null 
            = await AudioClient.getAudioObject(audioFname.current);
        if(resp_xaudio === null){
            alert("Error loading main audio.");
            return;
        }
                   
        const resp_audioParts: AudioPart[]|null 
            = await AudioClient.getAudioAnalisisParts(audioFname.current);
        if(resp_audioParts === null || resp_audioParts.length === 0) {
            alert("Error loading audio parts.");
            return;
        }

        const audioFragments: string[]|null = await AudioClient
                .getArrayAudioWavFragmentUrl(audioFname.current, resp_audioParts);
        if (audioFragments === null) {
            alert("Error loading audio fragments.");
            return;
        }

        const resp_audioWave:AudioWave|null 
            = await AudioClient.getAudioWave(audioFname.current);
        if(resp_audioWave === null) {
            alert("Error loading audio wave.");
            return;
        }

        //if all ok
        xaudio.current = resp_xaudio; 
        audioWave.current = resp_audioWave;
        setAudioParts(resp_audioParts);
        setSubUrlAudios(audioFragments);
        setAudioLoaded(true);
        generateGraph();

    };//end
    
    const generateGraph = () => {        
        const graphPoints: Point2d[] = AudioGraphs
                .getAudioWaveGraph(canvasDim.current!, audioWave.current!);
        setGraphPoints(graphPoints);   
        setGraphReady(true);     
    };//end graphReady

    const onZoomChange = (value:number) =>{
        console.log(value);
        setZoom(value);
    };//end


    return (
        <Flex width="100%" direction="column" pt="0" px="2" gapY="2" 
              style={RdxThContainers.MAIN_CONTENT}>
            
            <Grid width="100%" height="auto" rows="auto" columns="33% 33% 34%" p="0" >

                <Box gridColumn="1" gridRow="1" pt="1" >
                    <XOuputText direction="column" label="File Name"
                                value={audioFname.current} />
                </Box>
                
                <Flex gridColumn="2" gridRow="1" direction={"column"} align="baseline"
                      justify="center" px="4" py="0" >

                    <XInputZoom config={paramZoom} value={zoom}
                                onchange={onZoomChange} />
                </Flex>

                <Box gridColumn="3" gridRow="1">
                    Options
                </Box>                                
            </Grid>

            <Box width="100%">
                {(audioLoaded && !graphReady)?
                    <AudioLabMonitor xaudio={xaudio.current}/>:null}
                {(audioLoaded && graphReady)?
                    <AudioLabMonitor audioparts={audioParts}
                                  graphpoints={graphPoints}
                                  xaudio={xaudio.current}/>:null}                
            </Box>

            {audioLoaded ?
            <PanelAudioParts audioparts={audioParts}  
                             subUrlAudios={subUrlAudios}/>:null}

        </Flex>
    )

};//end component

/*
const resp_analisis:VocalAnalysisResult|null 
    = await AudioClient.getAudioAnalisis(audioFname.current);
console.log(resp_analisis);
*/