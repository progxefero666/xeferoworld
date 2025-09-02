"use client"

import { useState } from "react"
import { Container, Box, Flex, Text, Separator } from "@radix-ui/themes"
import XAudioPlayer from "@/radix/audio/xaudioplayer";

import AudioControls from "@/radix/audio/audiocontrols";
import { XText } from "@/radix/data/xtext";
import { TextStyle } from "@/radix/rdxtheme";
import XAudioPartControls from "@/radix/audio/audiopartcontrols";
import { SeparatorH } from "@/radix/container/separatorh";


export default function AudioVercel() {
    const [completeAudio, setCompleteAudio] = useState<{
        audioData: number[]
        fileName: string
    } | null>(null);

    const [fragmentAudio, setFragmentAudio] = useState<{
        audioData: number[]
        fileName: string
        startTime: number
        duration: number
    } | null>(null);

    const handleLoadComplete = (audioData: number[], fileName: string) => {
        setCompleteAudio({ audioData, fileName })
    };

    const handleLoadPart = (audioData: number[], fileName: string, startTime: number, duration: number) => {
        setFragmentAudio({ audioData, fileName, startTime, duration })
    };


    const getPartInfo = ():string => {
        if(fragmentAudio){
            const info:string = 'startTime(s): ' + fragmentAudio!.startTime +
                                ' - duration(s): ' + fragmentAudio!.duration;
            return info;
        }
        return "";
    };//end

    return (
        <Flex width="100%" direction="row" gapY="2">

            <Flex width="50%" direction="column" gapY="2" pr="2">

                <XText value="Audio Base" style={TextStyle.ST_CONT_HEADER_COLOR}  />
                <AudioControls onLoadComplete={handleLoadComplete}  />
                <XAudioPlayer
                    audioData={completeAudio?.audioData}
                    fileName={completeAudio?.fileName}/>
                <SeparatorH />   

                <XText value="Audio Part" style={TextStyle.ST_CONT_HEADER_COLOR}  />
                <XAudioPartControls onloadpart={handleLoadPart}/>
                <XAudioPlayer
                    audioData={fragmentAudio?.audioData}
                    fileName={fragmentAudio?.fileName}/>
                <XText value={getPartInfo()} />                   
            </Flex>


            <Flex width="50%" direction="column" gapY="2" pl="2">
          
            </Flex>
        </Flex>
    )

};//end
