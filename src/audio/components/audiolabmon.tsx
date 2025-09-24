//src\app\diagrams\page\secondcontent.tsx

//src\app\diagrams\page\maincontent.tsx

import { useState, useEffect, useRef } from "react";
import { Box, Flex, ScrollArea } from "@radix-ui/themes";
import { Point2d, TRegionX } from "@/lib/graph2d/types2d";
import { TDimension } from "@/common/types";

import { AudioCanvas, AudioCanvasUtil } from "@/audio/graph/audiocanvas";
import { XAudio } from "@/audio/model/xaudio";
import { XeferoAudioPlayer } from "@/radix/audio/xefaudioplayer";
import { AudioMonitorCfg } from "@/audio/components/audiolabmoncfg";
import { AudioHelper } from "@/audio/helper/audiohelper";
import { XMath2dUtil } from "@/math2d/functions/xmath2dutil";
import { XOuputTime } from "@/radix/audio/outputtime";
import { RdxThContainers } from "@/radix/rdxthcontainers";
import { AudioPlayerBar } from "@/radix/audio/audioplayerbar";
import { XIconButton } from "@/radix/buttons/xiconbutton";
import { LIB_ICON } from "@/radix/rdxthicons";
import { ButtonsStyle } from "@/radix/rdxtheme";
import { ControlVolume } from "@/radix/audio/volumeslider";
import { AudioPart } from "@/audio/model/audiopart";
import { XMath2d } from "@/math2d/xmath2d";

const canvasContStyle = {
    background: 'rgba(0, 0, 0, 1)',
    border: '1px solid rgb(167, 176, 188)',
};
const canvasStyle = {    
    background: 'rgba(0, 0, 0, 1)'
};


interface AudioLabMonitorProps {
    xaudio?:XAudio| null;
    audioparts?:   AudioPart[];
    graphpoints?: Point2d[];
}
export function AudioLabMonitor({xaudio,audioparts,graphpoints}: AudioLabMonitorProps) {

    const [audioSrc,setAudioSrc] = useState<string>('defaudio.mp3');
    const [position,setPosition] = useState<number>(0);

    const canvasDim = useRef<TDimension>(AudioMonitorCfg.INIT_CV_DIM);
    const ctrlCanvas= useRef<AudioCanvas | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);   
    
    const [volume,setVolume] = useState<number>(50);
    const [showCtrVolumen,setShowCtrVolumen] = useState<boolean>(false);

    useEffect(() => {    
        const ctx = canvasRef.current!.getContext('2d');
        ctrlCanvas.current = new AudioCanvas(ctx!,canvasDim.current);               
        if(xaudio) {
            setPosition(0.0);
            loadXAudio();
        }     
    },[]); 

    useEffect(() => {  
        if(audioparts) {
            const cv_regions:TRegionX[] = AudioCanvasUtil
                .getCanvasArrayRegion(canvasDim.current,xaudio!.duration,audioparts!);
            ctrlCanvas.current!.updateRegions(cv_regions); 
        }  
        if(graphpoints) {renderAudio(0);}     
    },[]); 
    
    const loadXAudio = () => {
        const xaudio_format: string   = AudioHelper.getAudioFormat(xaudio!.fbuffer);//'wav'
        const xaudio_mimetype: string = AudioHelper.getAudioMimeType(xaudio_format);
        const xaudio_src: string      = AudioHelper.getAudioUrl(xaudio!.fbuffer, xaudio_mimetype);
        setAudioSrc(xaudio_src);        
    };//end

    //AudioMark[]
    const renderAudio = (coordX:number) => {
        ctrlCanvas.current!.updateLinePosition(coordX); 
        ctrlCanvas.current?.render_a(graphpoints!);
    };//end

    const onCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const coordX:number = event.clientX - rect.left;    
        const percentWidth:number = XMath2dUtil
                .getPercent100(canvasDim.current.width,coordX);          
        setPosition(xaudio!.getAudioPosition(percentWidth)); 
        renderAudio(coordX); 
    };//end 

    const onVolumeChange= (value:number,id?:string) => {
        console.log('volume:'+value);
        setVolume(value);
    };//end 

    const onPlayerBarAction = (actionId: string) => {
        console.log('action:'+actionId);
    };//end

    return (
        <Flex width="100%"  direction="column" style={canvasContStyle} >

            <ScrollArea type="always" scrollbars="horizontal"  size="3"
                        style={{width:"100%", height:'auto',paddingBottom: "10px"}}>                
                <canvas height="140" width="1800"  ref={canvasRef} style={canvasStyle}
                        onClick={onCanvasClick} />
            </ScrollArea>
                        
            <Flex direction="row" align="center" justify="between" gapX="2">
                <XeferoAudioPlayer src={audioSrc} position={position} />                      
            </Flex>              

            {xaudio ? 
            <Flex direction="row" justify="between" 
                  align="center"  py="1" px="1" gapX="2"
                  style={RdxThContainers.BORDER_SIMPLE}>
                
                <Flex width="auto" direction="row" justify="center"  px="2" >
                    <XOuputTime label="Pos:"
                                value={AudioHelper.getTimeFormatted(xaudio.duration)} />
                    <AudioPlayerBar exeOperation={onPlayerBarAction} 
                                    mode={'stopped'}  />
                </Flex>

                <Flex width="auto" justify="center"  px="2" >
                    Central content
                </Flex>

                <Flex width="auto" direction="row"  >
                   {showCtrVolumen ? 
                    <Box width="120px" mr="2" style={AudioMonitorCfg.CTRL_VOLUME_STYLE}>
                        <ControlVolume value={volume} onchange={onVolumeChange} />
                    </Box>:null}

                   {showCtrVolumen ? 
                    <XIconButton icon={LIB_ICON.VOLUMEOFF}
                            onclick={() => setShowCtrVolumen(!showCtrVolumen)}
                            xstyle={ButtonsStyle.ICONPLAYER_STYLE} />:
                    <XIconButton icon={LIB_ICON.VOLUMEON}
                            onclick={() => setShowCtrVolumen(!showCtrVolumen)}
                            xstyle={ButtonsStyle.ICONPLAYER_STYLE} />}                  
                </Flex>

            </Flex>:null}s

        </Flex>
    );

}//end PrimaryBar

//{showAudioPlayer? 
//onMonitorReady?: (canvasDim: TDimension) => void;
//const containerRef  = useRef<HTMLDivElement | null>(null);
//const canvasWitdh:number= containerRef.current!.getClientRects()[0].width;   