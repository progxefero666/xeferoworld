//src\app\testcomp\page.tsx

"use client";

import { useState } from "react";
import { Box, Text, Flex, Grid } from "@radix-ui/themes";

import { GoogleApiTextToSpeech } from "@/app/audiozone/sections/gcloudapi";
import { LayoutPageOneColumn } from "@/layouts/lypageonecolumn";
import { AudioLaboratory } from "@/app/audiozone/sections/audiolab";
import { AudioLabConfig } from "./audiolabconfig";
import AudioVercel from "./sections/audiovercel";


/**
 * Page Test Components
 */
export default function GCloudApiPage() {

    const [section, setSection] = useState<string>(AudioLabConfig.SECTIONS[1].id)

    const loadSection = (sectionId: string) => {
        setSection(sectionId);
    };//end


    const headerContent = () => {
        return (
            <Flex direction="row" align="center" gapX="2" px="4" >
                <Text size="3" weight="bold" color="gray">
                    Xefero Computing
                </Text>
            </Flex>
        );
    };//end

    const renderSect_audioVercel = () => {
        return (
            <LayoutPageOneColumn
                headertitle={"Vercel Audio"}
                headercontent={headerContent()}
                main={<AudioVercel />}
                options={AudioLabConfig.SECTIONS}
                onselection={loadSection} />            
            
        );
    };
    const renderSect_audioLab = () => {
        return (
            <LayoutPageOneColumn
                headertitle={"Audio Lab."}
                headercontent={headerContent()}
                main={<AudioLaboratory />}
                options={AudioLabConfig.SECTIONS}
                onselection={loadSection} />
        );
    };
    const renderSect_googleApi = () => {
        return (
            <LayoutPageOneColumn
                headertitle={"Google cloud api text-to-speech"}
                headercontent={headerContent()}
                main={<GoogleApiTextToSpeech />}
                options={AudioLabConfig.SECTIONS}
                onselection={loadSection} />
        );
    };

    return (
        <>
            {section === AudioLabConfig.AUDIO_VERCEL && renderSect_audioVercel()}
            {section === AudioLabConfig.AUDIO_LAB && renderSect_audioLab()}
            {section === AudioLabConfig.GOOGLE_API && renderSect_googleApi()}
        </>
    );

}//end class
