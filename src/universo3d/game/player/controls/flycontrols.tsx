//src\universo3d\game\player\controls\plmachinecontrols.tsx

import React, { useState, useRef, forwardRef} from "react";
import { Box, Flex } from "@radix-ui/themes";
import { RdxThContainers } from "@/radix/rdxthcontainers";
import { FXRowSlider } from "@/radix/future/rowslider";
import { FXColumnSlider } from "@/radix/future/columnslider";
import { Radar } from "../monitor/radar";
import { FlyRollMonitor, FlyRollControlRef } 
    from "@/universo3d/game/player/monitor/flyrollmonitor";
import { FlyControlRoll } from "./flycontrolroll";


const CONTROL_STYLE = {
    border: '1px solid rgba(0, 0, 0, 1)',
};

interface PlMachineControlsProps {
    phyvelocity:number;
    maxphyvelocity:number;
    execroll:(rollRight:boolean) => void;
    execpitch:(pitchDown:boolean) => void;
    changevelocity:(increment:boolean) => void;
};

export interface PlMachineControlsRef {
    updateParams: () => void;
};

export const PlFlyControls = forwardRef<PlMachineControlsRef, PlMachineControlsProps>((props, ref) => {
    const { phyvelocity,maxphyvelocity,changevelocity,execroll,execpitch } = props;

    const vertCtrlssHeight:number = 182;
    const flyRollControlRef = useRef<FlyRollControlRef>(null);


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
            
        <Flex width="100%" height="auto" direction="row" px="2" py="2" gapX="2" 
            style={RdxThContainers.BORDER_RED}>
            
            <Flex width="auto" height="auto" direction="row" gapX="2"
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
            
            <Flex width="100%" height="auto" direction="column" gapY="2" >
                
                <Flex width="100%" height="auto" direction="row" >
                    <Box width="auto" height="182px" style={CONTROL_STYLE}>   
                        <FlyRollMonitor ref={flyRollControlRef}                                         
                                        value={0.0}  />
                    </Box>                       
                    <Box width="auto" height="182px" style={CONTROL_STYLE}> 
                        <Radar />
                    </Box>
                </Flex>

                <Flex width="100%" height="auto" direction="row" px="2" py="2"
                    style={CONTROL_STYLE} >
                    <Box width="60%" height="auto" > 
                        <FlyControlRoll changeValue={onRollControlChange}/>
                    </Box>
                    <Box width="40%" height="auto" >
                                          
                    </Box>                    
                </Flex>

            </Flex>
            
        </Flex>
    );

});//end