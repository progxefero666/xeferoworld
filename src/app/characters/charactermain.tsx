//src\app\zone3d\head\headeditor.tsx

import { useState, useEffect} from "react";
import * as THREE from 'three';

import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Box, Flex, Text, Button, } from "@radix-ui/themes";
import { RdxThContainers } from "@/radix/rdxthcontainers";
import { MainMonitor } from "@/app/characters/charactmonitor";
import { Characters3dConfig } from "@/app/characters/moduleconfig";
import { GlbAnimationLoader } from "@/zone3d/three/loaders/animationloader";
import { PlayerCfg } from "@/characters/playerconfig";
import { BipedConfig } from "@/characters/biped/bipedconfig";
import { CharacterPlayer } from "@/characters/model/chplayer";
import { GlbAnUtil } from "@/zone3d/three/loaders/anmutil";
import { Vector3d } from "@/common/types";

//Con 5 Km/h-> (1000/720 meters) per second -> 
//             1.38 meters per second    
const bipedConfig = new BipedConfig(1.9,1.38);
let player: CharacterPlayer | null = null;

export function CharacterMain() {

    const [ready, setReady] = useState<boolean>(false);

    useEffect(() => {
        if(ready) {return;}
        player = new CharacterPlayer();
        setReady(true);
    }, []);


    const init = async () => {

    };//end

    const renderHeader = () => {
        return (
            <Flex width="100%" direction="row" justify="between"  pb="2" align="center" >
                <Box px="2">
                    <Text size="3" weight="bold" color="gray">
                        Character Editor
                    </Text>
                </Box>
                <Box pt="1" px="1">
                    {/*
                    <Button onClick={testA} color="green">
                        Generate
                    </Button>                    
                    */}
                </Box>
            </Flex>         
        );
    };//end


    return (
        <Flex width="100%" direction="row" px="2" py="1" >
            
            <Flex width="40%" direction="column" 
                  style={RdxThContainers.PRIMARY_CONTENT}>
                {renderHeader()}    
                Editor
            </Flex>

            <Flex width="60%" direction="column" align="center"
                  style={RdxThContainers.SECONDARY_CONTENT} >
                {ready ? 
                <MainMonitor canvasdim={Characters3dConfig.CANVAS_DIM} 
                                player={player!} />:null}
            </Flex>

        </Flex>
    )

};//end component