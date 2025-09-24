//src\radix\input\inprange.tsx

import React, { useEffect, useState } from "react";

import { Box, Flex, ScrollArea, Table, Tabs, Text } from "@radix-ui/themes";
import { ButtonsStyle, CompStyle, TablesStyle } from "@/radix/rdxtheme";
import { XText } from "@/radix/data/xtext";
import { AudioPart } from "@/audio/model/audiopart";
import { XIconButton } from "@/radix/buttons/xiconbutton";
import { LIB_ICON } from "../rdxthicons";
import { XeferoAudioPlayer } from "./xefaudioplayer";



/**
 * AudioPartsTable Jsx Component
 *     onchange?: (value:number,id?:string) => void;
 */
interface PanelAudioPartsProps {
    audioparts: AudioPart[];
    subUrlAudios?: string[]
    onRowView?: (rowIndex: number) => void;
    onRowPlay?: (rowIndex: number) => void;
};

export function PanelAudioParts({ audioparts,subUrlAudios,onRowView,onRowPlay}: PanelAudioPartsProps) {

    const [audioSrc,setAudioSrc] = useState<string>('/audios/audio_1.wav');

    useEffect(() => {
        //setAudioSrc(subUrlAudios[0]);
    }, []);

    const onTableRowView = (rowIndex: number) => {
        alert(`View audio part ${rowIndex}`);
    };//end

    const onTableRowPlay = (rowIndex: number) => {
        alert(`Play audio part ${rowIndex}`);
        setAudioSrc(subUrlAudios![rowIndex]);
    };//end

    const renderTable = () => {
        return (
            <ScrollArea type="always" scrollbars="vertical" style={TablesStyle.AUDIO_PARTS_STYLE}>

                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell width="8%" justify="center">
                                <Text size={TablesStyle.HEADER_CELL_TEXT_SIZE}
                                    color={TablesStyle.HEADER_CELL_TEXT_COLOR}
                                    align="center" />
                            </Table.ColumnHeaderCell>

                            <Table.ColumnHeaderCell width="26%" justify="start">
                                <Text size={TablesStyle.HEADER_CELL_TEXT_SIZE}
                                    color={TablesStyle.HEADER_CELL_TEXT_COLOR} >
                                    duration
                                </Text>
                            </Table.ColumnHeaderCell>

                            <Table.ColumnHeaderCell width="26%" justify="start">
                                <Text size={TablesStyle.HEADER_CELL_TEXT_SIZE}
                                    color={TablesStyle.HEADER_CELL_TEXT_COLOR} >
                                    start
                                </Text>
                            </Table.ColumnHeaderCell>

                            <Table.ColumnHeaderCell width="26%" justify="start">
                                <Text size={TablesStyle.HEADER_CELL_TEXT_SIZE}
                                    color={TablesStyle.HEADER_CELL_TEXT_COLOR} >
                                    end
                                </Text>
                            </Table.ColumnHeaderCell>

                            <Table.ColumnHeaderCell width="14%" justify="start">
                                <Text size={TablesStyle.HEADER_CELL_TEXT_SIZE}
                                    color={TablesStyle.HEADER_CELL_TEXT_COLOR} />
                            </Table.ColumnHeaderCell>

                        </Table.Row>
                    </Table.Header>

                    <Table.Body style={{ width: "100%" }} >
                        {audioparts.map((item, index) => {
                            return (
                                <Table.Row key={index.toString()} align="center" >

                                    <Table.Cell width="8%" justify="center" >
                                        <XText value={index.toString()}
                                            align="center" />
                                    </Table.Cell>

                                    <Table.Cell width="26%" justify="start"  >
                                        <XText value={item.durationText} />
                                    </Table.Cell>

                                    <Table.Cell width="26%" justify="start" >
                                        <XText value={item.timeStartText} />
                                    </Table.Cell>

                                    <Table.Cell width="26%" justify="start" >
                                        <XText value={item.timeEndText} />

                                    </Table.Cell>

                                    <Table.Cell width="14%" justify="start" >
                                        <Flex direction="row" gapX="1" >
                                            <XIconButton icon={LIB_ICON.VIEW}
                                                item={index}
                                                onrowclick={onTableRowView}
                                                xstyle={ButtonsStyle.ICONBUTTON_SMALL_STYLE} />

                                            <XIconButton icon={LIB_ICON.PLAY}
                                                item={index}
                                                onrowclick={onTableRowPlay}
                                                xstyle={ButtonsStyle.ICONBUTTON_SMALL_STYLE} />
                                        </Flex>
                                    </Table.Cell>

                                </Table.Row>
                            );
                        })}
                    </Table.Body>

                </Table.Root>
            </ScrollArea>
        )
    };//end

    return (
        <Flex width="100%" direction="row" pt="2" >

            <Flex width="40%" height="auto" direction="column" px="2" >
                {renderTable()}

            </Flex>

            <Box width="60%" height="auto" >
                <Tabs.Root defaultValue="audio" >
                    <Tabs.List >
                        <Tabs.Trigger value="audio">Audio</Tabs.Trigger>
                        <Tabs.Trigger value="edition">Edition</Tabs.Trigger>
                    </Tabs.List>
                    <Box pt="3">
                        <Tabs.Content value="audio">
                            <XeferoAudioPlayer src={audioSrc} />
                        </Tabs.Content>
                        <Tabs.Content value="edition">
                                 
                        </Tabs.Content>
                    </Box>
                </Tabs.Root>                  
            </Box>

        </Flex>
    )

};//end component