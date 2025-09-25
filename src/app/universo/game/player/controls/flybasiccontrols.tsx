//src\universo3d\game\player\controls\plmachinecontrols.tsx

import React, { useRef, forwardRef} from "react";
import { Box, Flex } from "@radix-ui/themes";
import { RdxThContainers } from "@/radix/rdxthcontainers";
import { FXColumnSlider } from "@/radix/future/columnslider";

import { FlyRollMonitor, FlyRollControlRef } 
    from "@/app/universo/game/player/monitor/flyrollmonitor";
import { FlyControlRoll } from "src/app/universo/game/player/controls/flycontrolroll";


const CONTROL_STYLE = {
    border: '1px solid rgba(0, 0, 0, 1)',
};

interface PlFlyBasicControlsProps {
    phyvelocity:number;
    maxphyvelocity:number;
    execroll:(rollRight:boolean) => void;
    execpitch:(pitchDown:boolean) => void;
    changevelocity:(increment:boolean) => void;
};

export interface PlFlyBasicControlsRef {
    updateParams: () => void;
};

export const PlFlyBasicControls = forwardRef<PlFlyBasicControlsRef, PlFlyBasicControlsProps>((props, ref) => {
    const { phyvelocity,maxphyvelocity,changevelocity,execroll,execpitch } = props;

    const vertCtrlssHeight:number = 182;

    const onRollControlChange = (operation:string,value: number) => {       
        if(operation === "press_left") {execroll(false);}
        if(operation === "press_right") {execroll(true);}
    };//end

    const onPitchControlChange= (operation:string,value: number) => {
        if(operation === "press_down") {execpitch(true);}
        if(operation === "press_up") {execpitch(false);}        
    };//end

    const onVelocityControlChange= (operation:string,value: number) => {
        if(operation === "press_down") {
            changevelocity(false);
        }
        if(operation === "press_up") {
            changevelocity(true);
        }        
    };//end

    return (            
        <Flex width="100%" height="auto" direction="column" px="2" py="2" 
              style={RdxThContainers.BORDER_RED}>
            
            <Flex width="100%" height="auto" direction="row" gapX="2"
                  style={CONTROL_STYLE}>

                <FXColumnSlider valuemax={maxphyvelocity}
                                value={phyvelocity} 
                                height={vertCtrlssHeight}
                                onchange={onVelocityControlChange} />

                <FXColumnSlider valuemax={100}
                                value={50} 
                                height={vertCtrlssHeight} 
                                onchange={onPitchControlChange} />                     
            </Flex>
            
            <Flex width="100%" height="auto" direction="row" gapY="2" >
                <FlyControlRoll changeValue={onRollControlChange}/>
            </Flex>
            
        </Flex>
    )
});
