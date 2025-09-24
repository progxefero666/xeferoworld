//src\app\terrains3d\genmodel\genterrain.tsx

import { useState } from "react";
import { Box, Flex } from "@radix-ui/themes";
import { RdxThContainers } from "@/radix/rdxthcontainers";
import { CircunfGradient } from "@/terrains/gradients/cfgradient";
import { TDimension } from "@/common/types";
import { OpConstants } from "@/common/constants";
import { XButton } from "@/radix/buttons/xbutton";
import { XText } from "@/radix/data/xtext";
import { TextStyle, ButtonsStyle } from "@/radix/rdxtheme";
import { LIB_ICON } from "@/radix/rdxthicons";
import { SeparatorV } from "@/radix/container/separatorv";
import { HeightMapTerrainConfig } from "@/terrains/model/heightmapterrcfg";
import { GeneratorTerrainFunc }   from "@/terrains/functions/heightmapfunct";
import { Terrains3dConfig } from "@/app/terrains/terrains3dcfg";
import { TextureEditor }    from "@/app/terrains/gentexture/textureeditor";
import { TextureViewer }    from "@/app/terrains/gentexture/textureviewer";
import { HeightMapEditor }  from "@/app/terrains/genheightmap/heightmapeditor";
import { HeightMapViewer }  from "@/app/terrains/genheightmap/heightmapviewer";


/**
 * Terrains Height Map 
 *   Main Page Component
 */
interface TerrainsHeightMapProps {
    value?: string;
};
export function TerrainsHeightMap({}: TerrainsHeightMapProps) {

    const [section, setSection] = useState<string>(Terrains3dConfig.SECTION_HEIGHTMAP);
    //const [section, setSection] = useState<string>(Terrains3dConfig.SECTION_TEXTURE);

    const [keyViewer, setKeyViewer] = useState<string>("init");

    const [terrainConfig, setTerrainConfig] = useState<HeightMapTerrainConfig>(Terrains3dConfig.DEF_TERRAIN_CONFIG);
    const [imageSize, setImageSize] = useState<number>(Terrains3dConfig.IMAGE_SIZE_DEF);
    const [imageDimension, setImageDimension] = useState<TDimension>({width:imageSize,height:imageSize});
    const [imageData, setImageData] = useState<ImageData|null>(null);
    const [imageColorData, setImageColorData] = useState<ImageData | null>(null);

    const onClearProject = () => {
        alert('Clear Project');
    };

    const onTerrConfigChange = (newConfig:HeightMapTerrainConfig) => {
        alert('Terrain Config Changed');
        setTerrainConfig(newConfig);
    };

    const onTextureSizeChange = (size:number) => {
        setImageSize(size);
        setImageDimension({width:size,height:size});
    };//end
    
    const chargeTextureData= (newTextureData:ImageData) => {
         setImageData(newTextureData); 
    };//end

    const chargeListGradients = async (gradients: CircunfGradient[]) => {
        const newTextureData:ImageData 
            = GeneratorTerrainFunc.genHeightMapTextureData(imageSize, gradients);
        setImageData(newTextureData);           
    };//end
    
    const editHeightMap = () => {
    };//end

    const createTexture = () => {
       setSection(Terrains3dConfig.SECTION_TEXTURE);       
    };//end

    //const textColorCfg: TextureConfig = Terrains3dConfig.TEXTCOLOR_CONFIG;
    const onCreatedTextureColor =( imgColorData:ImageData) => {
        setImageColorData(imgColorData);
        setKeyViewer(new Date().toISOString());
    };//end

    return(
        <Flex width="100%" direction="column" gapY="2" pt="2">

            <Flex direction="row" style={RdxThContainers.HEADER_MAIN} justify="between" pb="1" >
                <Box width="100%">
                    <XText value="Height Map Editor" style={TextStyle.ST_CONT_HEADER_COLOR} />
                </Box>
                <Flex width="auto" direction="row"gapX="1"> 
                    {(section===Terrains3dConfig.SECTION_HEIGHTMAP) && (
                        <XButton text="Gen. Texture"
                                    icon={LIB_ICON.IMAGE}
                                    color={ButtonsStyle.COLOR_SAVE}
                                    onclick={createTexture} />
                    )}
                    {(section===Terrains3dConfig.SECTION_TEXTURE) && (
                        <XButton text="Height Map"
                                    icon={LIB_ICON.MODEL3D}
                                    color={ButtonsStyle.COLOR_SAVE}
                                    onclick={editHeightMap} />
                    )}

                    <XButton text={OpConstants.OP_TEXT_CLEAR}
                                icon={LIB_ICON.CLEAR}
                                color={ButtonsStyle.COLOR_RESET}
                                onclick={onClearProject} />
                </Flex>
            </Flex>
            
            {(section===Terrains3dConfig.SECTION_HEIGHTMAP) && (
                <Flex direction="row" >
                    <Box width="49%" pr="2">     
                        <HeightMapEditor chargetexturedata   = {chargeTextureData}
                                         onterrconfigchange = {onTerrConfigChange}
                                         ontexturesizechange = {onTextureSizeChange} />
                    </Box>
                    <Box width="1%"> 
                        <SeparatorV />
                    </Box>    
                    <Box width="50%">                   
                        <HeightMapViewer terrainConfig={terrainConfig}
                                         imagedimension={imageDimension}
                                         imagedata={imageData} />
                    </Box>
                </Flex>
            )}
            {(section===Terrains3dConfig.SECTION_TEXTURE) && (
                <Flex direction="row" >
                    <Box width="49%" pr="2">     
                        <TextureEditor terrainConfig={terrainConfig}
                                       textColorCfg={Terrains3dConfig.TEXTCOLOR_CONFIG}
                                       imagedimension={imageDimension}
                                       imagedata={imageData} 
                                       onCreatedTextureColor={onCreatedTextureColor} />
                    </Box>
                    <Box width="1%"> 
                        <SeparatorV />
                    </Box>    
                    <Box width="50%">                   
                        <TextureViewer key={keyViewer}
                                       terrainConfig={terrainConfig}
                                       imagedimension={imageDimension}
                                       imagedata={imageData}
                                       imagecolordata={imageColorData} />
                    </Box>
                </Flex>
            )}
        </Flex>
    )

};//end component