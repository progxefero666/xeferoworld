//src\app\universe3d\universomain.tsx

import React, { useEffect, useRef, useState } from "react";
import { Box, Flex, Text, Tabs, Grid } from "@radix-ui/themes";

import * as THREE from 'three'

import { RdxThContainers } from "@/radix/rdxthcontainers";

import { TDimension } from "@/common/types";

import { GAMEPAD_BUTTONS, GAMEPAD_DEADZONE } from '@/lib/gamepad';

import { GamepadsContext } from '@/lib/gamepad/GamepadContext';
import { useGamepads } from '@/lib/gamepad/useGamepads';
import { XText } from "@/radix/data/xtext";
import { XButton } from "@/radix/buttons/xbutton";
import { OpConstants } from "@/common/constants";
import { ButtonsStyle, TextStyle } from "@/radix/rdxtheme";
import { LIB_ICON } from "@/radix/rdxthicons";
import { GameMonitor, GameMonitorRef } from "./gamemonitor";
import { SliderRow } from "@/radix/sliders/ftsliderrow";
import { FlyRollControl, FlyRollControlRef } from "@/universo3d/spaceship/controls/flyrollcontrol";
import { FtValueColumn, FtValueColumnRef } from "@/radix/future/ftvaluecolumn";
import { SliderColumn } from "@/radix/sliders/ftslidercolumn";
import { UniversoScene } from "./scene/universoscene";
import { UniverseTexture } from "../util/universotexture";
import { UniversoPrompt } from "../util/universoprompt";

const rollControlStyle = {
    border: '1px solid rgba(0, 0, 0, 1)',
};


const panel3dStyle = {
    backgroundColor: 'rgba(34, 34, 36, 1)',
    border: '1px solid rgba(0, 0, 0, 1)',
};

interface Universo3dMainProps {
    value?: string;
}
export default function Universo3dGame({ }: Universo3dMainProps) {

    const gamepads = useGamepads();

    const [currentTab, setCurrentTab] = useState<string>("controls");

    const [wglready, setWglReady] = useState<boolean>(false);
    const [showLayout4, setShowLayout4] = useState<boolean>(true);

    const layoutRef = useRef<HTMLDivElement>(null);
    const layoutDimRef = useRef<TDimension>({width:0,height:640});

    const playerMonitorDimRef = useRef<TDimension>({width:0,height:320});
    
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const playerMonitorRef = useRef<GameMonitorRef>(null);

    const flyRollControlRef = useRef<FlyRollControlRef>(null);

    const vertValueRef = useRef<FtValueColumnRef>(null);

    // Función principal que redirige eventos de gamepad
    const handleGamepadEvents = (pads: any[]) => {
        if (!pads || pads.length === 0) return;
        const pad = pads[0];
        if (pad && pad.buttons && pad.axes) {
            handleGamepadButtons(pad.buttons);
            handleGamepadAxes(pad.axes);
        }
    };

    const handleGamepadButtons = (buttons: any[]) => {
        buttons.forEach((btn, idx) => {
            if (btn.pressed) {
                const name = GAMEPAD_BUTTONS[idx] || `Botón ${idx}`;
                switch (name) {
                    case "A":
                        console.log("A (botón principal) pulsado");
                        break;
                    case "B":
                        console.log("B pulsado");
                        break;
                    case "X":
                        console.log("X pulsado");
                        break;
                    case "Y":
                        console.log("Y pulsado");
                        break;
                    case "LB":
                        console.log("LB (Left Bumper) pulsado");
                        break;
                    case "RB":
                        console.log("RB (Right Bumper) pulsado");
                        break;
                    case "LT":
                        console.log("LT (Left Trigger) pulsado");
                        break;
                    case "RT":
                        console.log("RT (Right Trigger) pulsado");
                        break;
                    case "Back":
                        console.log("Back pulsado");
                        break;
                    case "Start":
                        console.log("Start pulsado");
                        break;
                    case "LS":
                        console.log("LS (Left Stick Button) pulsado");
                        break;
                    case "RS":
                        console.log("RS (Right Stick Button) pulsado");
                        break;
                    case "DPadUp":
                        console.log("DPad Arriba pulsado");
                        break;
                    case "DPadDown":
                        console.log("DPad Abajo pulsado");
                        break;
                    case "DPadLeft":
                        console.log("DPad Izquierda pulsado");
                        break;
                    case "DPadRight":
                        console.log("DPad Derecha pulsado");
                        break;
                    case "Guide":
                        console.log("Guide/Xbox pulsado");
                        break;
                    default:
                        console.log(`Botón desconocido (${idx}) pulsado`);
                        break;
                }
            }
        });
    };

    // Función para manejar ejes
    const handleGamepadAxes = (axes: number[]) => {
        axes.forEach((val, idx) => {
            // Aplica zona muerta: si el valor está dentro de la zona, se considera 0
            const axisValue = Math.abs(val) < GAMEPAD_DEADZONE ? 0 : val;
            switch (idx) {
                case 0:
                    if (axisValue !== 0) console.log("Stick izquierdo X:", axisValue);
                    break;
                case 1:
                    if (axisValue !== 0) console.log("Stick izquierdo Y:", axisValue);
                    break;
                case 2:
                    if (axisValue !== 0) console.log("Stick derecho X:", axisValue);
                    break;
                case 3:
                    if (axisValue !== 0) console.log("Stick derecho Y:", axisValue);
                    break;
                default:
                    break;
            }
        });
    };

    useEffect(() => {
        if (typeof window === "undefined" || typeof document === "undefined") return;

        layoutDimRef.current.width = layoutRef.current?.clientWidth ?? 720;
        playerMonitorDimRef.current.width = Math.floor(layoutDimRef.current.width / 2);
        playerMonitorDimRef.current.height = 320;
        setWglReady(true);
    }, []);

    /*
    useEffect(() => {
        handleGamepadEvents(Array.isArray(gamepads) ? gamepads : [gamepads]);
    }, [gamepads]);
        */


    const onRotationZChange = (id: string, rotationCCW: boolean|undefined) => {
        if (id === "roll") {
            playerMonitorRef.current?.execPlayerRoll(true);
        }
    };//end

    const onElevationChange = (id: string, rotationCCW: boolean|undefined) => {
        
        /*if (id === "elevation") {
            playerMonitorRef.current?.execPlayerElevation(!!value);
        }*/
        //console.log(value);
    };//end

    const onLayoutReset = () => {
    
    };//end

    const onViewExpand = () => {
    
    };//end    
    
    const onViewClose = () => {
    
    };//end  

    // jsx public static BORDER_SIMPLE = { border: '1px solid rgb(167, 176, 188)' };
    //.........................................................................................
    const renderAircraftControls = () => {
        return (
            <Flex width="100%" direction="row"  pt="2" gapX="5">
                
                <Box width="10%" height="auto" style={RdxThContainers.BORDER_SIMPLE}>
                    <SliderColumn  height={182} id="elevation" onchange={onElevationChange}/>
                </Box>

                <Flex width="90%" direction="column"  py="2" gapY="2"
                      style={RdxThContainers.BORDER_SIMPLE}>
                    <Box width="100%">    
                        <SliderRow id="roll"  
                                        height={32}
                                        onchange={onElevationChange} />
                    </Box>

                    <Flex width="90%" direction="row" pl="2" gapX="2">
                        <Box width="182px" height="182px" style={rollControlStyle}>   
                            <FlyRollControl ref={flyRollControlRef}
                                            id="flyRollControl" 
                                            sideLength={180}
                                            value={0.0}  />
                        </Box>    
                   
                        <Box width="50px">   
                            <FtValueColumn ref={vertValueRef}
                                              id="valueEnergy"
                                              height={182} 
                                              valuemax={100}
                                              value={50}  />
                        </Box>                                                
                    </Flex>                                      
                </Flex>                

            </Flex>

        )
    };//end

    const renderColumnEdition = () => {
        return (
            <Flex width="100%" direction="column" px="2" py="1" mb="2" >
                {/*<UniversoMainHeader execgetaitexture={getOpenAiTexture} /> */}
               
                <Flex width="100%" direction="column" gapY="2" >
                    <Tabs.Root defaultValue={currentTab}>
                        <Tabs.List >
                            <Tabs.Trigger value="controls">Player Controls</Tabs.Trigger>
                            <Tabs.Trigger value="prompt">Prompt</Tabs.Trigger>
                            <Tabs.Trigger value="texture">Texture</Tabs.Trigger>
                        </Tabs.List>
                        <Box pt="1">
                            <Tabs.Content value="controls">
                                {renderAircraftControls()}
                            </Tabs.Content>
                            <Tabs.Content value="prompt">
                                <UniversoPrompt />
                            </Tabs.Content>
                            <Tabs.Content value="texture">
                                <UniverseTexture />
                            </Tabs.Content>
                        </Box>
                    </Tabs.Root>
                </Flex>
            </Flex>
        )
    };//end

    const renderLayoutHeader= () => {
        return(
            <Flex width="100%" direction="row" justify="between"  pt="1" px="2"  pb="2" align="center" >
                <Box >                 
                    <XText value="Layout 3D" 
                            style={TextStyle.ST_CONT_HEADER_COLOR} />
                </Box>
                <Flex  width="auto" direction="row" gapX="2" align="center" >            

                    <XButton text={OpConstants.OP_TEXT_RESET}
                             icon={LIB_ICON.RESET}
                             color={ButtonsStyle.COLOR_RESET}
                             onclick={onLayoutReset} />

                    {showLayout4 ? 
                    <XButton text="Expand"
                                icon={LIB_ICON.EXPAND}
                                color={ButtonsStyle.COLOR_OPEN} 
                                onclick={onViewExpand}/> :
                    <XButton text="Layout" 
                             icon={LIB_ICON.VIEWGRID}
                             color={ButtonsStyle.COLOR_APICALL} 
                             onclick={onViewClose}/>}

                </Flex>
                
            </Flex> 
        )
    };//end
    
    return (
        <Flex width="100%" direction="row" style={RdxThContainers.PRIMARY_CONTENT} >

            <Flex width="40%" direction="column" px="2" py="1" mb="2">
                {renderColumnEdition()}
            </Flex>

            <Flex width="60%" direction="column" px="2" py="1" mb="2">

                <Box ref={layoutRef} height="640px" width="100%"
                    style={panel3dStyle}>

                    <Grid columns="50% 50%" rows="auto 320px 320px">
                        <Box gridRow="1" gridColumn="1 / 3" >
                            {renderLayoutHeader()}
                        </Box>
                        
                        <Box gridRow="2" gridColumn="1" style={RdxThContainers.BORDER_SIMPLE}>
                            {wglready && <GameMonitor ref={playerMonitorRef} canvasdim={playerMonitorDimRef.current} />}
                        </Box>
                        <Box gridRow="2" gridColumn="2" style={RdxThContainers.BORDER_SIMPLE}>
                            <Text>Cell 12</Text>
                        </Box>
                        <Box gridRow="3" gridColumn="1" style={RdxThContainers.BORDER_SIMPLE}>
                            <Text>Cell 21</Text>
                        </Box>
                        <Box gridRow="3" gridColumn="2" style={RdxThContainers.BORDER_SIMPLE}>
                            <Text>Cell 22</Text>
                        </Box>                                                
                    </Grid>

                </Box>

            </Flex>

        </Flex>

    );

}//end component

/*
<InputRotation3d id="rotationZ" onchange={onRotationChange} />
<SliderVerticalOld id="elevation"
    range={{ min: 0, max: 90.0 }}
    value={0}
    step={0.1} onchange={onElevationChange} />        
*/