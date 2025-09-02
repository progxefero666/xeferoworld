"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Box, Flex, Button} from "@radix-ui/themes"
import { uploadAudioFile } from "@/audio/services/srvupload"
import { XInputText } from "@/radix/input/inptext"
import { AudioClientStorage } from "@/audio/clients/clientstorage"


const controlsStyles = {
    container: {
        border: "2px solid var(--blue-6)",
        borderRadius: "6px",
        padding: "10px",
        backgroundColor: "var(--blue-2)",
        minWidth: "450px",
    },
    section: {
        marginBottom: "10px",
        padding: "8px",
        backgroundColor: "var(--gray-1)",
        borderRadius: "6px",
    },
};

interface AudioControlsProps {
    onLoadComplete?: ((audioData: number[], fileName: string) => void) | null
};

export default function AudioControls({ onLoadComplete }: AudioControlsProps) {

    const [fileName, setFileName] = useState("audio_1.wav");
    const [startTime, setStartTime] = useState("0.0");
    const [duration, setDuration] = useState("5.0");
    const [loading, setLoading] = useState(false);
    
    const fileInputRef = useRef<HTMLInputElement>(null);


    const onFileNameChange = (value: any, name?: string) => {
        setFileName(value as string);
    };//end
 
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!event.target.files?.[0]) return;

        setLoading(true); 
        //let result:boolean = await AudioClientStorage.storeAudioFile(file!);

        alert('uploadFAudio');
        let result:boolean = await AudioClientStorage.uploadFAudio(file!);

        if (result) {setFileName(file!.name);}
        setLoading(false);
    };//end


    const handleLoadComplete = async () => {
        if (!onLoadComplete) return;

        setLoading(true);
        const response = await fetch("/api/audio/complete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fileName }),
        });
        const result = await response.json();

        if (result.success) {
            onLoadComplete(result.audioData, result.fileName);
        } 
        else {alert("Error: " + result.error);}
        setLoading(false);
    };//end

    return (
        <Flex width="100%" direction="column" gapY="2" style={controlsStyles.container}>

            <Flex width="100%" direction="row" gapX="2" >
                <Flex direction="row" justify="start" >
                    <XInputText label="File Name"
                                direction="row"
                                onchange={onFileNameChange}
                                value={fileName}
                                minlen={4}
                                maxlen={25}/>   
                </Flex>
                <Flex direction="row" justify="end" >
                    <Button onClick={handleLoadComplete} disabled={loading || !fileName} size="3">
                        {loading ? "Loading..." : "Load Audio"}
                    </Button>
                </Flex>
            </Flex>

            <Box width="100%">
                <input type="file"
                    ref={fileInputRef}
                    accept="audio/*"
                    onChange={handleFileUpload} />
            </Box>
            
        </Flex>
    )

};//end

/*
const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
        const formData = new FormData();
        formData.append("audioFile", file);
        const result = await uploadAudioFile(formData);
        if (result.success) {
            setFileName(result.fileName!);
            alert(`Archivo ${result.fileName} subido correctamente`);
        }
        else {alert("Error: " + result.error);;}
    }
    catch (error) {alert("Error al subir el archivo");}      
    setLoading(false);
};   
*/
