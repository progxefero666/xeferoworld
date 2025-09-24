"use client"

import { useState, useRef, useEffect } from "react"
import { Box, Flex, Button, Text, Slider } from "@radix-ui/themes"
import { PlayIcon, PauseIcon, StopIcon } from "@radix-ui/react-icons"



const playerStyles = {
    container: {
        border: "2px solid var(--gray-6)",
        borderRadius: "8px",
        backgroundColor: "var(--gray-2)",
        minWidth: "400px",
    },
    controls: {
        gap: "12px",
        alignItems: "center",
    },
    timeDisplay: {
        fontFamily: "monospace",
        fontSize: "14px",
        color: "var(--gray-11)",
    },
}

interface AudioPlayerProps {
    audioData?: number[];
    fileName?: string;
};

export default function XAudioPlayer({ audioData, fileName }: AudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [audioUrl, setAudioUrl] = useState<string>("");
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (audioData && audioData.length > 0) {
            const uint8Array = new Uint8Array(audioData);
            const blob = new Blob([uint8Array], { type: "audio/wav" });
            const url = URL.createObjectURL(blob);
            setAudioUrl(url);

            return () => {
                URL.revokeObjectURL(url);
            }
        }
    }, [audioData])

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);
        const handleEnded = () => setIsPlaying(false);

        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("loadedmetadata", updateDuration);
        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("timeupdate", updateTime);
            audio.removeEventListener("loadedmetadata", updateDuration);
            audio.removeEventListener("ended", handleEnded);
        }
    }, [audioUrl]);

    const handlePlay = () => {
        if (audioRef.current) {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    const handlePause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleStop = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    };

    const handleSeek = (value: number[]) => {
        if (audioRef.current) {
            audioRef.current.currentTime = value[0];
            setCurrentTime(value[0]);
        }
    };

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = (time % 60).toFixed(2);
        return `${minutes}:${seconds.padStart(5, "0")}`;
    };

    return (
        <Box px="2" py="2" style={playerStyles.container}>

            {fileName && (
                <Text size="2" color="gray" mb="3">
                    Archivo: {fileName}
                </Text>
            )}

            {audioUrl && (
                <>
                    <audio ref={audioRef} src={audioUrl} preload="metadata" />

                    <Flex style={playerStyles.controls} mb="3">
                        <Button onClick={handlePlay} disabled={!audioUrl || isPlaying} size="2">
                            <PlayIcon />
                        </Button>

                        <Button onClick={handlePause} disabled={!audioUrl || !isPlaying} size="2">
                            <PauseIcon />
                        </Button>

                        <Button onClick={handleStop} disabled={!audioUrl} size="2">
                            <StopIcon />
                        </Button>

                        <Text style={playerStyles.timeDisplay}>
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </Text>
                    </Flex>

                    <Box mb="2">
                        <Text size="2" color="gray" mb="1">
                            Posición temporal
                        </Text>
                        <Slider
                            value={[currentTime]}
                            onValueChange={handleSeek}
                            max={duration || 100}
                            step={0.01}
                            disabled={!audioUrl} />
                    </Box>
                </>
            )}

            {!audioUrl && (
                <Text size="2" color="gray">
                    Not audio loaded.
                </Text>
            )}
        </Box>
    )

};//end component
