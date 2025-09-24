//src\app\terrains\worldplane\wpeditor.tsx

import { useState, useEffect, useRef } from "react";
import { Box, Flex, Grid, Text, } from "@radix-ui/themes";
import { RdxThContainers } from "@/radix/rdxthcontainers";
import { WorldPlane3d } from "@/terrains/worldplane3d";
import { XButton } from "@/radix/buttons/xbutton";
import { OpConstants } from "@/common/constants";
import { ButtonsStyle } from "@/radix/rdxtheme";
import { LIB_ICON } from "@/radix/rdxthicons";
import { GenVoronoi } from "@/terrains/functions/genvoronoi";
import { WorldPlaneCfg } from "../worldconfig";
import { NumberParameter } from "@/common/numberparam";
import { SliderNumber } from "@/radix/sliders/slidernumber";
import { Zone2d } from "@/terrains/model/zone";
import { TDimension } from "@/common/types";
import { SliderConfig } from "@/radix/sliders/sliderconfig";
import { SliderSimple } from "@/radix/sliders/slidersimple";


const slCfg_planeSideLength:SliderConfig = new SliderConfig
    ('pl_sidelength','Plane Length',{min:2000,max:10000},10);

const slCfg_planeCellSize:SliderConfig = new SliderConfig
    ('pl_cellsize','Cell Size',{min:1,max:100},1);

const slCfg_planeCountZones:SliderConfig = new SliderConfig
    ('pl_countzones','Count Zones',{min:50,max:400},1);

const slCfg_voronoiClustering:SliderConfig = new SliderConfig
    ('voronoi_clustering','Count Zones',{min:0.05,max:0.99},0.05);

let worldPlane = new WorldPlane3d(WorldPlaneCfg.CC,
                         WorldPlaneCfg.DEF_SIDE_LENGTH,
                         WorldPlaneCfg.DEF_CELL_SIZE_LENGTH);
                  
/**
 * World Plane Editor
 */
interface WorldPlaneEditorProps {
    onworldplanechange : (newWorldPlane: WorldPlane3d) => void;
};

export function WorldPlaneEditor({onworldplanechange}: WorldPlaneEditorProps) {

    const [voronoiClust,setVoronoiClust] = useState<number>(0.2);
    const [planeCountZones,setPlaneCountZones] = useState<number>(12);
    const [planeSideLength,setPlaneSideLength] = useState<number>(WorldPlaneCfg.DEF_SIDE_LENGTH);
    const [cellSideLength,setCellSideLength] = useState<number>(WorldPlaneCfg.DEF_CELL_SIZE_LENGTH);

    useEffect(() => {    
        generateData();
    }, []);

    const onChangePlaneParam= (index:number,value:number) => {
        if(index===0){ setPlaneSideLength(value);}
        if(index===1){ setCellSideLength(value);}
        if(index===2){ setPlaneCountZones(value);}
        if(index===3){ setVoronoiClust(value); }        
    };//end

    const generateData = () => {
        const planeDim:TDimension = {width:planeSideLength,height:planeSideLength};
        const zones:Zone2d[] = GenVoronoi.generateZonesModA(planeDim,voronoiClust,planeCountZones);

        worldPlane = new WorldPlane3d(WorldPlaneCfg.CC,planeSideLength,cellSideLength);
        worldPlane.init(zones,WorldPlaneCfg.IMAGECANVAS_DIM);
        onworldplanechange(worldPlane);
    };

    // Render Jsx
    //...................................................................................

    const renderHeader = () => {
        return (
            <Flex width="100%" direction="row" justify="between"  align="center" >
                <Box width="100%" px="2">
                    <Text size="3" weight="bold" color="gray">
                        World Plane
                    </Text>
                </Box>
                <Box width="100%" pt="1" px="1">
                    <Box width="50%" >
                        <XButton text={OpConstants.OP_TEXT_GENERATE}
                                icon={LIB_ICON.RUN}
                                color={ButtonsStyle.COLOR_GENERATE}
                                onclick={() => generateData()} />
                    </Box>
                </Box>
            </Flex>         
        );
    };//end

    return (
        <Flex  direction="column" gapY="2" pr="2"   
              style={RdxThContainers.PRIMARY_CONTENT} >

            {renderHeader()}

            <Grid columns="50% 50%" rows="auto auto" width="97%" gap="2">

                <Box gridRow="1" gridColumn="1" >
                    <SliderSimple index    = {0} 
                                    config   = {slCfg_planeSideLength}
                                    value    = {planeSideLength}
                                    onchange = {onChangePlaneParam} />
                </Box>

                <Box gridRow="1" gridColumn="2" >
                    <SliderSimple index    = {1} 
                                    config   = {slCfg_planeCellSize}
                                    value    = {cellSideLength}
                                    onchange = {onChangePlaneParam} />
                </Box>

                <Box gridRow="2" gridColumn="1">
                    <SliderSimple index    = {2} 
                                    config   = {slCfg_planeCountZones}
                                    value    = {planeCountZones}
                                    onchange = {onChangePlaneParam} />
                </Box>
                <Box gridRow="2" gridColumn="2">
                    <SliderSimple index    = {3} 
                                  config   = {slCfg_voronoiClustering}
                                  value    = {voronoiClust}
                                  onchange = {onChangePlaneParam} />
                </Box>
            </Grid>

        </Flex>
    )

}//end component

