//src\app\universo\game\gamemonitor.tsx

import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import * as THREE from 'three'

import { Box, Flex} from "@radix-ui/themes";
import { TDimension } from "@/common/types";
import { GameScene } from "../gamescene";
import { SliderSimple } from "@/radix/sliders/slidersimple";
import { GameConfig } from "@/app/universo/game/gameconfig";
import { OrbitCamControl } from "@/zone3d/three/systems/orbitcamcontrol";
import { XIconButton } from "@/radix/buttons/xiconbutton";
import { ButtonsStyle } from "@/radix/rdxtheme";
import { LIB_ICON } from "@/radix/rdxthicons";
import { ThreeFbxUtil } from "@/zone3d/three/loaders/threefbxutil";


let renderer: THREE.WebGLRenderer | null = null;
let orbitCamera: OrbitCamControl | null = null;


interface PlayerOrbitMonitorProps {
    canvasdim: TDimension;
    gamesc: GameScene;
}

export interface PlayerOrbitMonitorRef {
    updateParams: () => void;
}

let scene:THREE.Scene|null = null;
let monCamera: THREE.PerspectiveCamera | null = null;

export const PlayerOrbitMonitor = forwardRef<PlayerOrbitMonitorRef, PlayerOrbitMonitorProps>((props, ref) => {
    const { canvasdim,gamesc } = props;
 
    const monCsswidth= canvasdim.width + "px";
    const monCssheight= canvasdim.height + "px";
    const threeContainerRef = useRef<HTMLCanvasElement>(null);

    const divOverCanvasRef = useRef<HTMLDivElement>(null);

    const [wglready, setWglReady] = useState<boolean>(false);
    
    let obj1:THREE.Object3D|null = null;
    let obj2:THREE.Object3D|null = null;

    useEffect(() => {
        if (typeof window === "undefined" || typeof document === "undefined") return;
        if (wglready) { return; }

        renderer = new THREE.WebGLRenderer({ canvas: threeContainerRef.current! });
        renderer.setSize(canvasdim.width, canvasdim.height);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setClearColor(GameConfig.SCENE_BACKCOLOR, 1.0); 

        scene = new THREE.Scene();
        orbitCamera = new OrbitCamControl(canvasdim,50,180);

        /*
        monCamera = new THREE.PerspectiveCamera(
            GameConfig.PLCAMERA_FOV,1, 
            GameConfig.PLCAMERA_NEAR,
            GameConfig.PLCAMERA_FAR);
        monCamera.position.set(0,1,20);

        loadObjects();
        */
       
        animate();
        setWglReady(true);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (renderer && renderer.domElement.parentNode) {
                renderer.domElement.parentNode.removeChild(renderer.domElement);
            }
        };
    }, []);

    const handleResize = () => {
        renderer!.setSize(canvasdim.width, canvasdim.height);
    };//end
 
    const updateParams = () => {console.log('updateParams');};
    useImperativeHandle(ref, () => ({updateParams}), []);

    //ThreeFbxUtil.loadFbx
    const loadObjects = async () => {        
        obj1 = await ThreeFbxUtil.loadFbx("/universo/ship/xwingv1.fbx");
        obj2 = await ThreeFbxUtil.loadFbx("/universo/ship/xwingv2.fbx");
        scene!.add(obj1);
        scene!.add(obj2);
        scene!.add(new THREE.GridHelper(1000,1000));
    }//end 

    /**
     * Main animation loop
     */
    const animate = () => {
        requestAnimationFrame(animate);        
        //renderer!.render(scene!,orbitCamera!.cam);        
        renderer!.render(gamesc.scene, orbitCamera!.cam);
    };//end 

    const onExpand =() => {
        console.log("onclick expand");
    };//end

    const renderOrbitCamControls = () => {
        return(
            <Flex width="100%" height="30px" direction="row" align="center" gapX="2" >
                <Box width="33%" >
                    <SliderSimple config={OrbitCamControl.sliderViewRotCfg} 
                                index={0} 
                                value={OrbitCamControl.ORBCAMERA_ROTY_DEF} 
                                onchange={orbitCamera!.updateParam}  />
                </Box>              
                <Box width="33%" >
                    <SliderSimple config={OrbitCamControl.sliderViewDistCfg} 
                                index={1} 
                                value={OrbitCamControl.ORBCAMERA_DIST_DEF} 
                                onchange={orbitCamera!.updateParam}  />
                </Box>      
                <Box width="33%" >
                    <SliderSimple config={OrbitCamControl.sliderViewElevCfg} 
                                index={2} 
                                value={OrbitCamControl.ORBCAMERA_ELEV_DEF} 
                                onchange={orbitCamera!.updateParam}  />
                </Box>                               
            </Flex>
        )
    };//end 

    return (
        <Flex width="100%" direction="column"  >
            
            
            <Flex width="100%" direction="row" justify="between">
                <Box width="100%">
                    Player View
                </Box>
                <Box width="auto">
                   <XIconButton icon={LIB_ICON.EXPAND} 
                                color={ButtonsStyle.COLOR_EXPAND}
                                onclick={onExpand} />
                </Box>
            </Flex>
            
            <Box width="100%" style={{position:'relative',width:monCsswidth,height:monCssheight}}>
                <canvas ref={threeContainerRef} 
                        style={{zIndex: 1,
                            position:'absolute',left:0,top:0,
                            width: monCsswidth,
                            height: monCssheight,
                            backgroundColor: GameConfig.SCENE_BACKCOLOR}} />

            </Box>

            {wglready?renderOrbitCamControls():null}
        </Flex>
    );

});//end