//src\app\universo\game\gamemonitor.tsx
//import * as THREE from 'three'


import React, { useEffect, useRef, useState } from "react";
import { Flex} from "@radix-ui/themes";
import { RdxThContainers } from "@/radix/rdxthcontainers";
import { TDimension } from "@/common/types";
import { Universo3dConfig } from "@/app/universo/universo3dcfg";
import { GameWebGlApplication, GameMonitorRef } from "@/app/universo/game/gameapplication";
import { GameAircraft } from "@/app/universo/game/spacegame";
import { PlayerShipCfg } from "@/app/universo/game/player/playerconfig";
import { GameScene } from "@/app/universo/game/gamescene";
import { PlFlyBasicControls } from "./player/controls/flybasiccontrols";

//import { GAMEPAD_BUTTONS, GAMEPAD_DEADZONE } from '@/lib/gamepad';
//import { GamepadsContext } from '@/lib/gamepad/GamepadContext';
//import { useGamepads } from '@/lib/gamepad/useGamepads';


const game: GameAircraft = new GameAircraft();

export function SpaceGameMonitor() {

    //........................................................................................
    // game pad
    //.......................................................................................
     /*
    const gamepads = useGamepads();

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
        const dz = GAMEPAD_DEADZONE;

        const lx = Math.abs(axes[0]) < dz ? 0 : axes[0]; // left X (no usado)
        const ly = Math.abs(axes[1]) < dz ? 0 : axes[1]; // left Y → throttle
        const rx = Math.abs(axes[2]) < dz ? 0 : axes[2]; // right X → roll
        const ry = Math.abs(axes[3]) < dz ? 0 : axes[3]; // right Y → pitch

        // throttle: arriba acelera, abajo frena (Y invertido)
        if (ly < 0) game.changePlayerVelocity(true);
        else if (ly > 0) game.changePlayerVelocity(false);

        // roll: derecha → rollRight, izquierda → rollLeft
        if (rx > 0) game.execPlayerRoll(true);
        else if (rx < 0) game.execPlayerRoll(false);

        // pitch: abajo → pitchDown, arriba → pitchUp (Y invertido)
        if (ry > 0) game.execPlayerPitch(true);
        else if (ry < 0) game.execPlayerPitch(false);
    };

    const handleGamepadAxesOld = (axes: number[]) => {
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
        handleGamepadEvents(Array.isArray(gamepads) ? gamepads : [gamepads]);
    }, [gamepads]);
    */
    //........................................................................................

    const [wglready, setWglReady] = useState<boolean>(false);
    const layoutRef = useRef<HTMLDivElement>(null);
    const canvasDim = useRef<TDimension>({ width: 0, height: 640 });

    const gameMonitorRef = useRef<GameMonitorRef>(null);
    const [gameScene, setGameScene] = useState<GameScene | null>(null);

    useEffect(() => {
        const init = async () => {
            if (typeof window === "undefined" || typeof document === "undefined") return;

            const dim_width  = layoutRef.current?.clientWidth ?? Universo3dConfig.GL_LAYOUT_W_DEF;
            canvasDim.current.width = Math.floor(dim_width);
            canvasDim.current.height = Universo3dConfig.GL_LAYOUT_H;
            const result = await loadPlayer();
            if(result){loadMainScene();}            
        };
        init();
    }, []);

    const loadPlayer = async ():Promise<boolean> => {
        const result = await game.createPlayer(canvasDim.current);
        if (!result) { alert("Error loading game"); return false; }
        return true;
    };//end

    const loadMainScene = async () => {
        const game_scene: GameScene = new GameScene(true);
        game_scene.loadPlayer(game.player!.glmachine!);
        //game.chargeRapierWorld(game_scene);
        setGameScene(game_scene);
        setWglReady(true);
    };//end

    // jsx
    //.........................................................................................
    return (
        <Flex width="100%" direction="row" style={RdxThContainers.PRIMARY_CONTENT} >

            <Flex width="18%" direction="column" py="1" mb="2">
                {wglready ? 
                <PlFlyBasicControls 
                    phyvelocity={game.player!.getCurrVelocityKmH()}
                    maxphyvelocity={PlayerShipCfg.getMaxVelocityKmH()}
                    changevelocity={game.changePlayerVelocity}
                    execroll={game.execPlayerRoll}
                    execpitch={game.execPlayerPitch} /> : null}
            </Flex>

            <Flex width="82%" direction="column" px="2" py="1" gapY="2" mb="2">
                {/*<Box width="100%">{renderLayoutHeader()}</Box> */}
                {wglready ? 
                <GameWebGlApplication 
                    ref={gameMonitorRef}
                    canvasdim={canvasDim.current}
                    gamesc={gameScene!}
                    game={game} />:null}
            </Flex>

        </Flex>
    );

}//end component

/*
    const onLayoutReset = () => {
    };//end
    const renderLayoutHeader = () => {
        return (
            <Flex width="100%" direction="row" justify="between" pt="1" px="2" pb="2" align="center" >
                <Box >
                    <XText value="Layout 3D"
                        style={TextStyle.ST_CONT_HEADER_COLOR} />
                </Box>
                <Flex width="auto" direction="row" gapX="2" align="center" >
                    <XButton text={OpConstants.OP_TEXT_RESET}
                        icon={LIB_ICON.RESET}
                        color={ButtonsStyle.COLOR_RESET}
                        onclick={onLayoutReset} />
                </Flex>
            </Flex>
        )
    };//end
*/