"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Box, Flex, Button } from "@radix-ui/themes"
import { XInputDecimal } from "../input/inpdecimal"



const containerStyle= {
    border: "2px solid var(--blue-6)",
    borderRadius: "6px",
    padding: "10px",
    backgroundColor: "var(--blue-2)",
    minWidth: "450px",
};

const controlsStyle = {
    backgroundColor: "var(--gray-1)",
    borderRadius: "6px",
};

interface AudioPartControlsProps {
    onloadpart: ((audioData: number[], fileName: string, startTime: number, duration: number) => void) | null
};

export default function XAudioPartControls({ onloadpart }: AudioPartControlsProps) {

    const [fileName, setFileName] = useState("audio_1.wav")
    const [startTime, setStartTime] = useState("0.0")
    const [duration, setDuration] = useState("1.0")
    const [loading, setLoading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)


    //`(${fragmentAudio.startTime}s - ${fragmentAudio.duration}s)`
    const onTimeInithange = (value: any, name?: string) => {
        setStartTime(value as string);
    };//end

    const onTimeDurationChange = (value: any, name?: string) => {
        setDuration(value as string);
    };//end


    const handleLoadFragment = async () => {
        if (!onloadpart) return

        const start = Number.parseFloat(startTime)
        const dur = Number.parseFloat(duration)

        if (isNaN(start) || isNaN(dur) || start < 0 || dur <= 0) {
            alert("Por favor, introduce valores válidos para el tiempo de inicio y duración")
            return
        }

        setLoading(true)
        try {
            const response = await fetch("/api/audio/fragment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fileName, startTime: start, duration: dur }),
            })

            const result = await response.json()
            if (result.success) {
                onloadpart(result.audioData, result.fileName, result.startTime, result.duration)
            }
            else {
                alert("Error: " + result.error)
            }
        }
        catch (error) {
            alert("Error al crear el fragmento de audio")
        }
        finally {
            setLoading(false)
        }
    };

    return (
        <Flex width="100%" direction="column" style={containerStyle}>

            <Flex width="100%" direction='row' gapX="2">

                <XInputDecimal  label="Time Start"
                                format="000:000"
                                value={startTime}
                                step={0.01}
                                onchange={onTimeInithange} />

                <XInputDecimal  label="Duration"
                                format="000:000"
                                value={duration}
                                step={0.01}
                                onchange={onTimeDurationChange} />
            </Flex>

            <Flex width="100%" direction='row' gapX="2" >
                <Button onClick={handleLoadFragment} disabled={loading || !fileName} size="2" color="green">
                    {loading ? "Procesando..." : "Crear Fragmento"}
                </Button>                
            </Flex>    

        </Flex>
    )

};//end

