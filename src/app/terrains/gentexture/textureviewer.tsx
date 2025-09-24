//src\app\terrains3d\gentexture\textureviewer.tsx

import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';

import { Flex, Box, Switch } from "@radix-ui/themes";
import { HeightMapTerrainConfig } from "@/terrains/model/heightmapterrcfg";
import { TDimension } from "@/common/types";
import { XText } from "@/radix/data/xtext";
import { ButtonsStyle, TextStyle } from "@/radix/rdxtheme";

import { XButton } from "@/radix/buttons/xbutton";
import { OpConstants } from "@/common/constants";
import { XSelect } from "@/radix/inputgroup/inpselect";
import { RdxThContainers } from "@/radix/rdxthcontainers";
import { LIB_ICON } from "@/radix/rdxthicons";
import { DocFormats } from "@/common/docformats";
import { ImageDataFunc } from "@/lib/graph2d/functions/imagedatafunc";

import { Terrains3dConfig } from "@/app/terrains//terrains3dcfg";
import { TerrainsPainter } from "@/app/terrains/painterterrains";


/**
 * Terrain 3d Generator Texture Viewer
 */
interface TextureViewerProps {
    terrainConfig: HeightMapTerrainConfig;
    terrainMesh?: THREE.Mesh | null;
    imagedimension: TDimension;
    imagedata: ImageData | null;
    imagecolordata: ImageData | null;
};
export function TextureViewer({ terrainConfig, terrainMesh, 
                                imagedimension, imagedata, imagecolordata }: TextureViewerProps) {

   const [ready, setReady] = useState<boolean>(false);

    const [imageFormat, setImageFormat] = useState<string>(Terrains3dConfig.IMAGE_TYPE_DEF);
    const [viewHeightMap, setViewHeightMap] = useState<boolean>(true);
    const [isWireframe, setIsWireframe] = useState(false);
    const [wireframeColor, setWireframeColor] = useState('#00ff00');
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const texturePainter = useRef<TerrainsPainter|null>(null);
    

    useEffect(() => {
        if(ready){return}

        const canvas = canvasRef.current;
        //if (!canvas || !imagedata) return;
        if (!canvas) return;
        if (!canvas.getContext("2d")) return;
        texturePainter.current = new TerrainsPainter
            (canvas.getContext("2d")!,Terrains3dConfig.CANVAS_HEIGHTMAP_DIM);                                          
        executeOnInit();        
        setReady(true);
    }, []);

    const executeOnInit = () => {
        drawMapInCanvas();        
        //drawRiverInCanvas();
        //drawRiverSystemInCanvas(texturePainter.current);
    };//end

    const drawMapInCanvas = () => {
        if(imagecolordata){
            console.log('render image color data');
            ImageDataFunc.drawImageData
                (canvasRef.current!,imagedimension,imagecolordata!);
        }
        else {
            ImageDataFunc.drawImageData
                (canvasRef.current!,imagedimension,imagedata!);
        }        
    };//end

    const onViewHeightMap = () => {
        setViewHeightMap(!viewHeightMap);
    };//end

    const onChangeImageFormat = (value: string, name?: string) => {
        setImageFormat(value);
    };//end

    const onHeightMapDownload = () => {
        if (imagedata === null) return;
        const imageName: string = "texture." + imageFormat;
        const mimetype: string = DocFormats.getMimetype(imageFormat);
        ImageDataFunc.downloadTexture(imageName, mimetype, imagedata);
    };//end

    const onViewWireframe = () => {
        const showWf: boolean = !isWireframe;
        setIsWireframe(showWf);
    };//end

    const renderHeader = () => {
        return (
            <Flex width="100%" direction="row" justify="between" py="1"
                style={RdxThContainers.HEADER_MAIN} >
                <Flex gapX="2">
                    {viewHeightMap ?
                        <Switch size="2" onClick={onViewHeightMap} defaultChecked /> :
                        <Switch size="2" onClick={onViewHeightMap} />}
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
    }//end

    const renderWebglMonitor = () => {
        return (
            <p>a</p>
        )
    }//end

    return (
        <Flex width="100%" direction="column" justify="center" px="2" gapY="2" >  
            {renderHeader()}
            <canvas ref={canvasRef} style={{ backgroundColor:'#ffffff' }}
                    width={Terrains3dConfig.CANVAS_HEIGHTMAP_DIM.width}
                    height={Terrains3dConfig.CANVAS_HEIGHTMAP_DIM.height} />
            {renderWebglMonitor()}
        </Flex>
    )

}