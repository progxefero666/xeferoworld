//src\app\testcomp\playground.tsx


import { RdxThContainers } from "@/radix/rdxthcontainers";
import React, { useState, useEffect, useMemo,  useRef } from "react";
import { Box, Flex, Heading, Select, Text, Spinner } from "@radix-ui/themes";

import { getVoices } from "@/audio/server/srvgcloudapi";
import type { VoiceOption, GenderFilter } from "@/lib/googlecloud/types";

import { SeparatorH } from "@/radix/container/separatorh";
import { XButton } from "@/radix/buttons/xbutton";
import { LIB_ICON } from "@/radix/rdxthicons";
import { OpConstants } from "@/common/constants";
import { XInputTextArea } from "@/radix/input/inptextarea";
import { GCloudClient } from "@/lib/googlecloud/gcloudclient";

const textDefault:string = 
    "Hello. This is a computer application, and this is a text audio analysis "+
    "test to detect individual words. This is the final sentence.";
interface PageMainContentProps { 
    value?: string; 
};

export function GoogleApiTextToSpeech({ }: PageMainContentProps) {

    const [text, setText] = useState<string>(textDefault);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isFetchingVoices, setIsFetchingVoices] = useState<boolean>(true);
    
    const [allVoices, setAllVoices] = useState<VoiceOption[]>([]);
    const [audioContent, setAudioContent] = useState<Blob | null>(null);

    const [selectedLanguage, setSelectedLanguage] = useState<string>('en-US');
    const [selectedGender, setSelectedGender] = useState<GenderFilter>('ALL');
    const [selectedVoiceName, setSelectedVoiceName] = useState<string>('');

    const fetchAllVoices = async () => {
        try {
            setIsFetchingVoices(true);
            const voices = await getVoices();            
            const defaultVoice = voices.find(v => v.languageCodes.includes('en-US'));
            setAllVoices(voices);
            if(defaultVoice) {
                setSelectedLanguage('en-US');
                setSelectedVoiceName(defaultVoice.name);
            } 
            else if (voices.length > 0) {
                setSelectedLanguage(voices[0].languageCodes[0]);
                setSelectedVoiceName(voices[0].name);
            }
        } 
        catch (err) {
            alert( 'An unknown error occurred while fetching voices.');
        } 
        finally {
            setIsFetchingVoices(false);
        }
    };//end
        
    const languages = useMemo(() => {
        const langSet = new Set(allVoices.flatMap(v => v.languageCodes));
        return Array.from(langSet).sort();
    }, [allVoices]);

    const filteredVoices = useMemo(() => {
        return allVoices.filter(voice => {
            const langMatch = voice.languageCodes.includes(selectedLanguage);
            const genderMatch = selectedGender === 'ALL' || voice.ssmlGender === selectedGender;
            return langMatch && genderMatch;
        });
    }, [allVoices, selectedLanguage, selectedGender]);

    useEffect(() => {
        fetchAllVoices();
    }, []);

    useEffect(() => {
        if (filteredVoices.length > 0) {
            if(!filteredVoices.some(v => v.name === selectedVoiceName)) {
                setSelectedVoiceName(filteredVoices[0].name);
            }
        } else {
            setSelectedVoiceName('');
        }
    }, [filteredVoices, selectedVoiceName]);

    // generate text to speech
    //...............................................................................................      
    const onTextAreachange = (value:string,name?: string) => {
        setText(value);
    };//end

    const handleGenerate = async () => {
        if (!text.trim() || !selectedVoiceName) {
            alert("Please enter text and select a voice.");
            return;
        }
        setIsLoading(true);
        setAudioContent(null);
        const selectedVoice = allVoices.find(v => v.name === selectedVoiceName);
        if(!selectedVoice){
            alert("Selected voice not found.");
            setIsLoading(false);
            return;
        }
        const audioBlob = await GCloudClient.synthesizeSpeech(
            text,
            selectedLanguage,
            selectedVoiceName,
            selectedVoice.ssmlGender
        );
        if(audioBlob!== null) {setAudioContent(audioBlob);}
        setIsLoading(false);
    };//end
    
    // panel combos voices
    //...............................................................................................  
        
    const handleLanguageChange = (value: string) => {
        setSelectedLanguage(value);
        // Reset gender filter when language changes to show all options
        setSelectedGender('ALL');
    };//end

    const renderFilterLanguage = () => {
        return (
            <>
            <Text as="div" size="2" mb="1" weight="bold">Language</Text>
            <Select.Root value={selectedLanguage} onValueChange={handleLanguageChange}>
                <Select.Trigger  />
                <Select.Content position="popper">
                    {languages.map(lang => (
                        <Select.Item key={lang} value={lang}>{lang}</Select.Item>
                    ))}
                </Select.Content>
            </Select.Root>
            </>    
        )
    };//end

    const renderFilterGenero = () => {
        return (
            <>
            <Text as="div" size="2" mb="1" weight="bold">Gender</Text>
            <Select.Root value={selectedGender} 
                            onValueChange={(v) => setSelectedGender(v as GenderFilter)}>
                <Select.Trigger className="w-full"/>
                <Select.Content position="popper">
                    <Select.Item value="ALL">All</Select.Item>
                    <Select.Item value="FEMALE">Female</Select.Item>
                    <Select.Item value="MALE">Male</Select.Item>
                    <Select.Item value="NEUTRAL">Neutral</Select.Item>
                </Select.Content>
            </Select.Root>
            </>    
        )
    };//end

    const renderFilterVoiceName = () => {
        return (
            <>
            <Text as="div" size="2" mb="1" weight="bold">Voice</Text>
            <Select.Root value={selectedVoiceName} 
                            onValueChange={setSelectedVoiceName}
                            disabled={filteredVoices.length === 0}>
                <Select.Trigger 
                        className="w-full" 
                        placeholder="Select a voice" />
                <Select.Content position="popper">
                    {filteredVoices.map(voice => (
                        <Select.Item key={voice.name} 
                                    value={voice.name}>
                            {voice.name.replace(`${selectedLanguage}-`, '')}
                        </Select.Item>
                    ))}
                </Select.Content>
            </Select.Root>
            </>    
        )
    };//end

    const renderPanelVoices = () => {
        return (
            <Flex direction="row" gapY="2" align="center" py="3"  justify="start" gapX="4" >
                <Box width="auto" key={selectedLanguage}>
                    {renderFilterLanguage()}
                </Box>
                <Box width="auto" key={selectedGender.toString()}>
                    {renderFilterGenero()}
                </Box>                
                <Box width="auto" key={selectedVoiceName}>
                    {renderFilterVoiceName()}   
                </Box>
            </Flex>
        )
    };//end

    // simple audio player  URL management
    const audioUrlRef = useRef<string | null>(null);
    useEffect(() => {
        if (audioContent) {
            if (audioUrlRef.current) {
                URL.revokeObjectURL(audioUrlRef.current);
            }
            audioUrlRef.current = URL.createObjectURL(audioContent);
        } else {
            if (audioUrlRef.current) {
                URL.revokeObjectURL(audioUrlRef.current);
                audioUrlRef.current = null;
            }
        }
        // Limpieza al desmontar
        return () => {
            if (audioUrlRef.current) {
                URL.revokeObjectURL(audioUrlRef.current);
                audioUrlRef.current = null;
            }
        };
    }, [audioContent]);


    // audio wave analysis
    //...............................................................................................    
    const readServerAudioFile = async () => {
        /*
        const response:string| = await readFAudioWave("audio_1.wav");
        const audioWave:AudioWave|null = parseItem<AudioWave>(response);
        if(audioWave === null) {alert("Error reading audio file.");return;}

        AudioGraphs.getAudioWaveGraph(audioWave);
        */
    };//end

    const onMonitorReady = () => {
    };//end

    // jsx render
    //...............................................................................................
    const renderAudioPlayer = () => {
        return (
            <Flex  width="100%" direction="column"  pt="3">
                <Heading as="h3" size="4" mb="1" >Audio Player</Heading>
                <SeparatorH />                
                {audioContent && audioUrlRef.current ? (
                <Box pt="2" width="100%">
                    <audio controls src={audioUrlRef.current} className="w-full">
                        Your browser does not support the audio element.
                    </audio>                    
                </Box>):
                <Box pt="2" width="100%">
                    <Text size="2" color="gray">Generated audio will appear here</Text>
                </Box>}
            </Flex>
        )
    };//end 

    return (
 
        <Flex direction="row" style={RdxThContainers.MAIN_CONTENT}>
        
            {/* Left Panel: Filters & Player */}
            <Flex width="40%" direction="column"  py="2" px="3">

                <Heading as="h2" size="3" >Voice Configuration</Heading>
                <SeparatorH />

                {isFetchingVoices ? (
                <Flex align="center" gap="2">
                    <Spinner size="3" />
                    <Text>Loading voices...</Text>
                </Flex>) : null}

                {!isFetchingVoices?renderPanelVoices():null}
                <SeparatorH />  

                {/*isLoading?<Spinner/>:renderAudioPlayer()*/}
               
            </Flex>
            
            {/* Right Panel: Text Input & Generation */}
            <Flex width="60%" direction="column" px="2" gapY="2">

                <Flex direction="row" align="center" justify="start" gapX="2" py="2">
                    <XButton text="read audio"
                             onclick={() => readServerAudioFile()}
                             icon={LIB_ICON.SERVERFILE}
                             color="yellow" />:

                    {!isLoading ?
                    <XButton text={OpConstants.OP_TEXT_GENERATE}
                             onclick={() => handleGenerate()}
                             icon={LIB_ICON.RUN}
                             color="blue"
                             disabled={isFetchingVoices} />:
                    <XButton text="Generating..."
                             icon={LIB_ICON.RUN}
                             color="blue"
                             disabled={true} /> }
                </Flex>

                <Box width="100%" >
                    <XInputTextArea defaul={text} 
                                    placeholder="Enter the text you want to convert to speech..."
                                    autocommit={true}
                                    onchange={onTextAreachange}
                                    autofocus={true} 
                                    height="400px" 
                                    disabled={isLoading || isFetchingVoices} />
                </Box>
            </Flex>

        </Flex>

    );

};//end component