//src\app\terrains3d\genmodel\mapeditor.tsx

import { useEffect, useRef, useState } from "react";
import { Box, Flex, Switch,Text } from "@radix-ui/themes";
import * as THREE from 'three';

import { TDimension } from "@/common/types";
import { RdxThContainers } from "@/radix/rdxthcontainers";
import { XText } from "@/radix/data/xtext";
import { XButton } from "@/radix/buttons/xbutton";
import { OpConstants } from "@/common/constants";
import { LIB_ICON } from "@/radix/rdxthicons";
import { ButtonsStyle } from "@/radix/rdxtheme";
import { XSelect } from "@/radix/inputgroup/inpselect";
import { DocFormats } from "@/common/docformats";
import { ImageDataFunc } from "@/lib/graph2d/functions/imagedatafunc";
import { HeightMapTerrainConfig } from "@/terrains/model/heightmapterrcfg";

import { GeneratorTerrainFunc } from "@/terrains/functions/heightmapfunct";
import { Terrains3dConfig } from "../terrains3dcfg";
import { TerrainHeightMapMonitor } from "./heightmapmonitor";


/**
 * Terrain Views:
 *    Canvas Texture
 *    Webgl Terrain Mesh
 */
interface HeightMapViewerProps {
    terrainConfig:HeightMapTerrainConfig;
    imagedimension:TDimension;
    imagedata:ImageData|null;
};
export function HeightMapViewer({terrainConfig, imagedimension, imagedata}: HeightMapViewerProps) {

    const [imageFormat, setImageFormat] = useState<string>(Terrains3dConfig.IMAGE_TYPE_DEF);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [viewHeightMap, setViewHeightMap] = useState<boolean>(true);

    const [terrainMesh, setTerrainMesh] = useState<THREE.Mesh|null>(null);
    const [isWireframe, setIsWireframe] = useState(false);
    const [wireframeColor, setWireframeColor] = useState('#00ff00');

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !imagedata) return;
        if (!canvas.getContext("2d")) return;
        drawMapInCanvas();
        generateMesh();
    }, [imagedata]); 

    const drawMapInCanvas= () => {
        const ctx:CanvasRenderingContext2D|null 
            = canvasRef.current!.getContext("2d", { willReadFrequently: true });
        ctx!.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
        const offCanvas = document.createElement("canvas");
        offCanvas.width = imagedimension.width;
        offCanvas.height = imagedimension.height;
        offCanvas.getContext("2d")!.putImageData(imagedata!, 0, 0);
        ctx!.drawImage(offCanvas, 0, 0, canvasRef.current!.width, canvasRef.current!.height);        
    };//end

    const generateMesh = () => {
        const gen_terrainMesh:THREE.Mesh = GeneratorTerrainFunc
            .generateTerrain(terrainConfig,imagedata!,wireframeColor,isWireframe);
        setTerrainMesh(gen_terrainMesh);
    };

    const onHeightMapDownload= () => {
        if(imagedata===null) return;
        const imageName:string = "heightmap." + imageFormat; 
        const mimetype:string = DocFormats.getMimetype(imageFormat); 
        ImageDataFunc.downloadTexture(imageName,mimetype,imagedata);
    };//end

    const onChangeImageFormat = (value:string,name?:string) => {
        setImageFormat(value);
    };//end

    const onViewHeightMap = () => {
        setViewHeightMap(!viewHeightMap);
    };//end

    const onViewWireframe = () => {
       const showWf:boolean = !isWireframe; 
       setIsWireframe(showWf);
    };//end

    const renderHeader = () => {
        return(
            <Flex width="100%" direction="row" justify="between" py="1"
                  style={RdxThContainers.HEADER_MAIN} > 
                <Flex gapX="2">
                    {viewHeightMap? 
			            <Switch size="2" onClick={onViewHeightMap} defaultChecked /> :
			            <Switch size="2" onClick={onViewHeightMap}/> }
                    <XText value="Height Map" />                    
		        </Flex>
                <Flex width="auto" direction="row" px="2" gapX="2">
                    <XSelect collection={Terrains3dConfig.IMAGE_TYPES} 
                             value={Terrains3dConfig.IMAGE_TYPE_DEF} 
                             onchange={onChangeImageFormat} />
                    <XButton text={OpConstants.OP_TEXT_DOWNLOAD}
                                icon={LIB_ICON.DOWNLOAD}
                                color={ButtonsStyle.COLOR_DOWNLOAD}
                                onclick={onHeightMapDownload} />
                </Flex>                  
            </Flex> 
        )
    };//end

    const renderWebglMonitor = () => {
        return(
            <Flex width="100%" direction="column" justify="start" px="2" py="1" gapY="2">
                <Flex width="100%" direction="row" justify="between" py="1"
                    style={RdxThContainers.HEADER_MAIN} > 
                    <Box width="auto" pr="2" >
                        <XText value="Terrain 3d Model" />
                    </Box>  
                    <Flex gapX="2">
                        {isWireframe? 
                            <Switch size="2" onClick={onViewWireframe} defaultChecked />:
                            <Switch size="2" onClick={onViewWireframe}/>}
                        <XText value="Grid" />                    
                    </Flex>  
                </Flex>                    
                <Box width="100%">
                    {(terrainMesh!==null)?
                        <TerrainHeightMapMonitor mesh={terrainMesh}  />                      
                    :null}
                </Box>
            </Flex>
        )
    };//end

    return(
        <Flex width="100%" direction="column" justify="center" px="2" gapY="2" >  
            {renderHeader()}
            {viewHeightMap? <canvas ref={canvasRef}
                                    width={Terrains3dConfig.CANVAS_HEIGHTMAP_DIM.width}
                                    height={Terrains3dConfig.CANVAS_HEIGHTMAP_DIM.height} />:null}
            {renderWebglMonitor()}
        </Flex>
    )
    
}//end