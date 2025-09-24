//src\app\terrains3d\genmodel\mapeditor.tsx

import { useEffect, useRef, useState } from "react";
import { XText } from "@/radix/data/xtext";
import { RdxThContainers } from "@/radix/rdxthcontainers";
import { ButtonsStyle, TablesStyle, TextStyle } from "@/radix/rdxtheme";
import { Box, Flex, ScrollArea, Table, Tabs,Text } from "@radix-ui/themes";
import { OpConstants } from "@/common/constants";
import { BarCollItem } from "@/radix/bars/barcollitem";
import { XButton } from "@/radix/buttons/xbutton";
import { LIB_ICON } from "@/radix/rdxthicons";

import { NumberParameter } from "@/common/numberparam";
import { SliderNumber } from "@/radix/sliders/slidernumber";

import { CircunfGradient } from "@/terrains/gradients/cfgradient";
import { HeightMapTerrainConfig } from "@/terrains/model/heightmapterrcfg";

import { GenHeightMapFunctions } from "@/terrains/functions/heightmapfunct";

import { EditorGradient } from "./editorgradient";
import { Terrains3dConfig } from "../terrains3dcfg";
import { PanelSettings } from "./heightmapsettings";
import { PainterGradients } from "../paintergradients";
import { TDimension, TRange, Point2d } from "@/common/types";
import { GraphColoUtil } from "@/lib/graph2d/graphcolors";
import { ElipseUtil } from "@/math2d/functions/elipseutil";


import {point,Lines,lineString, bezierSpline} from '@turf/turf'; 
import { LineGradient } from "@/terrains/gradients/linegradient";
import { ImageDataFunc } from "@/lib/graph2d/functions/imagedatafunc";
import { HeightMapFunctions } from "./heightmapfunct";


const gradientsRanges: NumberParameter[] = [
    Terrains3dConfig.GRADRANGE_INTENSITY,
    Terrains3dConfig.GRADRANGE_RADIUS,
    Terrains3dConfig.GRADRANGE_SCALE_X,
    Terrains3dConfig.GRADRANGE_SCALE_Y,
    Terrains3dConfig.GRADRANGE_ROTATION];

const testCanvasDim:TDimension = {
    width:Terrains3dConfig.IMAGE_SIZE_DEF,
    height:Terrains3dConfig.IMAGE_SIZE_DEF};   


/**
 * component HeightMapEditor
 */
//chargeListGradients: (gradients: CircunfGradient[]) => void;
interface HeightMapEditorProps {    
    chargetexturedata: (data:ImageData) => void;
    onterrconfigchange: (newConfig:HeightMapTerrainConfig) =>void;
    ontexturesizechange: (size:number) => void;    
};

let hmapFunct:HeightMapFunctions;

export function HeightMapEditor({onterrconfigchange,ontexturesizechange, 
                                 chargetexturedata}: HeightMapEditorProps) {

    const [ready, setReady] = useState<boolean>(false);

    const [countNewGradients, setCountNewGradients] = useState<number>(5);
    const [gradients, setGradients] = useState<CircunfGradient[]>([]);
    const [currGrad,setCurrGrad] = useState<CircunfGradient|null>(null);

    const testCanvasRef = useRef<HTMLCanvasElement>(null);
    const testPainter = useRef<PainterGradients|null>(null);

    useEffect(() => {
        if(ready){return}
        const canvas = testCanvasRef.current;
        if (!canvas||!canvas.getContext("2d")) return;
        testPainter.current = new PainterGradients(canvas.getContext("2d")!,testCanvasDim);
        hmapFunct = new HeightMapFunctions(testPainter.current);
        paintMain();
        setReady(true);
    }, []);
        
    const paintMain = (update_gradients?:CircunfGradient[]) => {  
        hmapFunct.paintTestOneLine();

        //sendTextureData();
    };//end
        
    const sendTextureData= () => {
        const imageData:ImageData = ImageDataFunc
            .getImageDataFromCanvas(testCanvasRef.current!)
        chargetexturedata(imageData);
    };//end 

    const changeCountNewGradients= (index:number,value:number) => {
       setCountNewGradients(value);
    };//end    
    
    const generateGradients= (count:number) => {          
        const new_gradients:CircunfGradient[] = GenHeightMapFunctions
            .genImageDataGradients(gradientsRanges,count);

        let update_gradients:CircunfGradient[] = [...gradients];
        update_gradients.push(...new_gradients);
        setGradients(update_gradients);   
        paintMain(update_gradients);
    };//end

    const exeEditOperation = (operationId: string, itemId: string | null) => {
        const idx: number = GenHeightMapFunctions.getGradientIndex(itemId!, gradients);        
        if (operationId == OpConstants.OP_OPEN) {
            setCurrGrad(gradients[idx]);
        }
        if (operationId === OpConstants.OP_DELETE) {
            const new_gradients:CircunfGradient[] = gradients;
            new_gradients.splice(idx,1);
            setGradients(new_gradients);
            paintMain(new_gradients);
        }
    };//end

    const onGradientMod = (gradient: CircunfGradient) => {
        alert('onGradientMod');
    };//end
        
    const renderTable = () => {
        return (
            <Flex width="50%" direction="column" px="2" >

                <ScrollArea  type="always" scrollbars="vertical" 
                    style={{height:"300px",paddingRight:"8px"}}>
                    <Table.Root >
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeaderCell>
                                    <Text size={TablesStyle.HEADER_CELL_TEXT_SIZE}
                                        color={TablesStyle.HEADER_CELL_TEXT_COLOR} >
                                        Order
                                    </Text>
                                </Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>
                                    <Text size={TablesStyle.HEADER_CELL_TEXT_SIZE}
                                        color={TablesStyle.HEADER_CELL_TEXT_COLOR} >
                                        Id
                                    </Text>
                                </Table.ColumnHeaderCell>

                                <Table.ColumnHeaderCell>
                                    <Text size={TablesStyle.HEADER_CELL_TEXT_SIZE}
                                        color={TablesStyle.HEADER_CELL_TEXT_COLOR} >
                                        Action
                                    </Text>
                                </Table.ColumnHeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body style={{ width: "100%" }} >
                            {gradients.map((item, index) => {
                                return (
                                    <Table.Row key={index.toString()} align="center" >

                                        <Table.Cell width="auto" justify="center" >
                                            <XText value={index.toString()} align="center" />
                                        </Table.Cell>

                                        <Table.Cell width="100%" justify="start" >
                                            <XText value={item.id!} />
                                        </Table.Cell>

                                        <Table.Cell width="auto%">
                                            <BarCollItem rowId={item.id!}
                                                viewvisible={true}
                                                exeOperation={exeEditOperation} />
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>

                    </Table.Root>
                </ScrollArea>
            </Flex>
        )
    };//end renderTable

    const renderEditionPanel = () => {
        return(
            <Flex width="100%" direction="column" gapY="2">

                <Flex width="100%" direction="column" justify="center" >
                    {/*,visibility:"hidden" */}
                    <canvas ref={testCanvasRef}
                            style = {{backgroundColor:"#ffffff"}}
                            width={Terrains3dConfig.IMAGE_SIZE_DEF}
                            height={Terrains3dConfig.IMAGE_SIZE_DEF} />
                </Flex>

                <Flex width="100%" direction="row" justify="between" pb="2">
                    <Box width="50%" >
                        <SliderNumber index={0}
                                    params={Terrains3dConfig.GRADRANGE_COUNTELEMS} 
                                    onchange={changeCountNewGradients}  />
                    </Box> 
                    <Box width="50%" >
                        <XButton text={OpConstants.OP_TEXT_GENERATE}
                                icon={LIB_ICON.RUN}
                                color={ButtonsStyle.COLOR_GENERATE}
                                onclick={() => generateGradients(countNewGradients)} />
                    </Box>
                </Flex>

                {/* manager gradients */}
                <Flex width="100%" direction="row">            
                    {renderTable()}            
                    <Flex key={currGrad?.id}  width="50%" direction="column" pl="2" >
                        {(currGrad!=null) ? 
                        <EditorGradient gradient={currGrad} 
                                        ongradientmod={onGradientMod} />:null}
                    </Flex>
                </Flex>


            </Flex>
        )
    };//end renderEditionPanel

    return(
        <Box>            
            <Tabs.Root defaultValue="gen_heightmap">                
                <Tabs.List >                    
                    <Tabs.Trigger value="gen_heightmap">Height Map</Tabs.Trigger>
                    <Tabs.Trigger value="setting">Settings</Tabs.Trigger>
                </Tabs.List>
                <Box pt="2">   
                    <Tabs.Content value="gen_heightmap">
                        {renderEditionPanel()}
                    </Tabs.Content>
                    <Tabs.Content value="setting">
                        <PanelSettings onterrconfigchange={onterrconfigchange}
                                        imagesizeinit={Terrains3dConfig.IMAGE_SIZE_DEF} 
                                       ontexturesizechange={ontexturesizechange}/>
                    </Tabs.Content>                    
                </Box>

            </Tabs.Root>

        </Box>
    )

}//end component

/*
//const count_elems:number =  XMath2dUtil
//    .getAleatoryIntInRange(1,Terrains3dConfig.GRADRANGE_COUNTELEMS.range.max);      
*/