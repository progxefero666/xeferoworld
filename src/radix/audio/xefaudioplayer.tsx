//src\radix\audio\audioplayer.tsx

import React, { useState, useRef, useEffect } from "react";
import { Box, Flex } from "@radix-ui/themes";
import { XIconButton } from "@/radix/buttons/xiconbutton";
import { RdxThContainers } from "@/radix/rdxthcontainers";
import { ButtonsStyle } from "@/radix/rdxtheme";
import { LIB_ICON } from "@/radix/rdxthicons";


const contStyle = {
    backgroundColor: 'rgba(255,0,0,1.0)',    
};
const barStyle = {
    backgroundColor: 'rgba(0,255,0,1.0)',    
};
export interface AudioPlayerProps {
    src: string;
    position?: number;
    disabled?:boolean;
    onPlayPause?: () => void; 
};
  
export const XeferoAudioPlayer = ({src,position}: AudioPlayerProps) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    const [volume, setVolume] = useState(1);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const barContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (position) {
            console.log('AudioPlayer received position');
            setCurrentTime(position);
        }
    },[]); 

    // Play / Pause
    const togglePlayPause = () => {
        if (audioRef.current) {
            isPlaying ? audioRef.current.pause() : audioRef.current.play();
            setIsPlaying(!isPlaying);
            //onPlayPause?.();
        }
    };//end 

    // set Current Time position
    const handleTimeUpdate = () => {
        if (audioRef.current){
            setCurrentTime(audioRef.current.currentTime)
        }
    };//end

    // change volume
    const handleVolumeChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const newValue = parseFloat(target.value);
        if (audioRef.current) {
            audioRef.current.volume = newValue;
            setVolume(newValue);
        }
    };

    // handle bar clics
    const handleProgressBarClick = (e: MouseEvent) => {
        if (!audioRef.current || !barContainerRef.current) return;
        //if (disabled) {return;}
        const rect = barContainerRef.current.getBoundingClientRect();
        const percentage = (e.clientX - rect.left) / rect.width;
        audioRef.current.currentTime = percentage * (audioRef.current.duration || 0);
        setCurrentTime(audioRef.current.currentTime);
    };//end 

    return (
        <Flex width="100%" direction="row"  justify="between" align="center" py="1" px="1" 
              style={RdxThContainers.BORDER_SIMPLE}>
        
            <Box width="auto">                
                <audio ref={audioRef} src={src} onTimeUpdate={handleTimeUpdate} />
                {isPlaying ?  
                    <XIconButton icon={LIB_ICON.PAUSE}
                                onclick={togglePlayPause}
                                xstyle={ButtonsStyle.ICONPLAYER_STYLE}
                                disabled={false} /> :            
                    <XIconButton icon={LIB_ICON.PLAY}
                                onclick={togglePlayPause}
                                xstyle={ButtonsStyle.ICONPLAYER_STYLE}
                                disabled={false} /> }
            </Box>

            <Box ref={barContainerRef} width="100%" px="2"
                  onClick={(e) => handleProgressBarClick(e as unknown as MouseEvent)}>
                <Flex width="100%" height="30px" style={contStyle}>
                    <Flex height="30px"
                          style={{backgroundColor: 'rgba(0,255,0,1.0)',
                                  width:`${(currentTime/(audioRef.current?.duration||1))*100}%`}} />
                </Flex>
            </Box>
            
            <Box  width="auto">
                <XIconButton icon={LIB_ICON.VOLUMEON}
                             onclick={() => setShowVolumeSlider(!showVolumeSlider)}
                             xstyle={ButtonsStyle.ICONPLAYER_STYLE} />
                {showVolumeSlider && (
                <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow-lg">
                    <input disabled={false}
                        type="range"
                        className="w-24"
                        value={volume} min={0} max={1} step={0.01}
                        onChange={(e) => handleVolumeChange(e as unknown as Event)} />
                </div> )}
            </Box>

        </Flex>
    );

};//end component