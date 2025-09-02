//src\radix\audio\audioplayerbar.tsx

import React, { useEffect, useState } from 'react';
import { Flex } from "@radix-ui/themes";

import { XIconButton } from '@/radix/buttons/xiconbutton';
import { LIB_ICON } from '@/radix/rdxthicons';
import { AudioBase } from '@/audio/audiobase';

/**
 * Jsx Audio Player Bar
 */
export interface AudioPlayerBarProps {
    disabled?: boolean;
    mode: string;
    exeOperation: (operationId: string) => void
}
export function AudioPlayerBar({ mode, exeOperation, disabled }: AudioPlayerBarProps) {

    const [btnPlayVisible, setBtnPlayVisible] = useState(false);

    const [btnResetDisabled, setBtnResetDisabled] = useState(true);
    const [btnPlayDisabled, setBtnPlayDisabled] = useState(true);
    const [btnPauseDisabled, setBtnPauseDisabled] = useState(true);
    const [btnPrevDisabled, setBtnPrevDisabled] = useState(true);
    const [btnNextDisabled, setBtnNextDisabled] = useState(true);

    useEffect(() => {
        if (disabled !== undefined && disabled === true) {
            setBtnResetDisabled(true);
            setBtnPlayDisabled(true);
            setBtnPauseDisabled(true);
            setBtnPrevDisabled(true);
            setBtnNextDisabled(true);
        }
        else {
            setBtnPrevDisabled(false);
            setBtnNextDisabled(false);            
            if(mode){
                if (mode === 'playing') {
                    setBtnPlayVisible(false);
                    setBtnResetDisabled(true);
                    setBtnPlayDisabled(true);
                    setBtnPauseDisabled(false);                  
                }
                else if (mode === 'stopped') {
                    setBtnPlayVisible(true);
                    setBtnResetDisabled(false);
                    setBtnPlayDisabled(false);
                    setBtnPauseDisabled(true);                  
                }                
            }
        }
    }, []);

    const onExecCommand = (commandId: string, item: string | null) => {
        exeOperation(commandId);
    };//end

    return (
        <Flex direction="row" gapX="1" >

            <XIconButton
                icon={LIB_ICON.MOVE_START}
                operation={AudioBase.OP_RESET}
                exeOperation={() => onExecCommand(AudioBase.OP_RESET, null)}
                disabled={btnResetDisabled} />

            <XIconButton
                icon={LIB_ICON.PREVIOUS}
                operation={AudioBase.OP_PREVIOUS}
                exeOperation={() => onExecCommand(AudioBase.OP_PREVIOUS, null)}
                disabled={btnPrevDisabled} />



            {btnPlayVisible ?
                <XIconButton
                    icon={LIB_ICON.PLAY}
                    operation={AudioBase.OP_PLAY}
                    exeOperation={() => onExecCommand(AudioBase.OP_PLAY, null)}
                    disabled={btnPlayDisabled}/> :
                <XIconButton 
                        icon         = {LIB_ICON.PAUSE}
                        operation    = {AudioBase.OP_PAUSE}
                        exeOperation = {() => onExecCommand(AudioBase.OP_PAUSE, null)}
                        disabled     = {btnPauseDisabled} /> }

            <XIconButton
                icon={LIB_ICON.NEXT}
                operation={AudioBase.OP_NEXT}
                exeOperation={() => onExecCommand(AudioBase.OP_NEXT, null)}
                disabled={btnNextDisabled} />

        </Flex>
    );

};//end component