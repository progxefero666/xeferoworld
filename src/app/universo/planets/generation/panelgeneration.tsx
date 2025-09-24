"use client";

import { Box, Flex, Text, Separator, Switch, Tabs } from "@radix-ui/themes";
import { ReloadIcon } from "@radix-ui/react-icons";
import { TextureParameters } from "@/universo3d/planets/textureplanetsparams";
import { generateRandomParameters } from "@/universo3d/planets/genplanetmatunct";
import { Slider } from "@/app/zone3d/planets/comp/inputxslider";
import { XButton } from "@/radix/buttons/xbutton";
import { OpConstants } from "@/common/constants";
import { ButtonsStyle } from "@/radix/rdxtheme";
import { LIB_ICON } from "@/radix/rdxthicons";

interface PanelGenerationProps {
    parameters: TextureParameters;
    onParametersChange: (parameters: TextureParameters) => void;
    //onGenerate: () => void;
    isGenerating: boolean;
};

export function PanelGeneration({ parameters, onParametersChange, isGenerating }: PanelGenerationProps) {

    const updateParameter = (key: keyof TextureParameters, value: number | boolean) => {
        onParametersChange({
            ...parameters,
            [key]: value,
        });
    };

    const handleRandomize = () => {
        const randomParams = generateRandomParameters();
        onParametersChange(randomParams);
        //setTimeout(onGenerate, 100);
    };

    return (
        <Flex direction="column" gapY="2">

            <XButton text="Aleatory" 
                     color={ButtonsStyle.COLOR_ALEATORY}
                     icon={LIB_ICON.ALEATORY} 
                     onclick={handleRandomize}
                     disabled={isGenerating} />  

            {/*!isGenerating ? 
                <XButton text={OpConstants.OP_TEXT_GENERATE} 
                        color={ButtonsStyle.COLOR_GENERATE}
                          icon={LIB_ICON.RUN} 
                          onclick={onGenerate}/>: 
                <Flex align="center" gap="2">
                    <ReloadIcon className="animate-spin" />
                    Generating...
                </Flex>
            */}

            <Tabs.Root defaultValue="material">
                <Tabs.List>
                    <Tabs.Trigger value="material">Material</Tabs.Trigger>
                    <Tabs.Trigger value="texture_base">Tx Base</Tabs.Trigger>
                    <Tabs.Trigger value="texture_extend">Tx Extend</Tabs.Trigger>
                </Tabs.List>

                <Box pt="3">
                    <Tabs.Content value="material">
                        {/* textureSize */}
                        <Box py="2">
                            <Slider
                                label="Size"
                                value={parameters.textureSize}
                                min={512}
                                max={4096}
                                step={256}
                                onChange={(value) => updateParameter("textureSize", value)}/>
                            <Text size="2">
                                {parameters.textureSize}x{parameters.textureSize} pixels
                            </Text>
                        </Box>
                        < hr/>
                        {/* Material Properties */}
                        <Box py="2">
                            <Text size="3" weight="bold" mb="3">
                                Material Properties
                            </Text>
                            <Flex direction="column" gap="3">
                                <Slider
                                    label="Metallicness"
                                    value={parameters.metallicness}
                                    min={30}
                                    max={70}
                                    onChange={(value) => updateParameter("metallicness", value)}/>
                                <Slider
                                    label="Roughness"
                                    value={parameters.roughness}
                                    min={20}
                                    max={40}
                                    onChange={(value) => updateParameter("roughness", value)}/>
                                <Slider
                                    label="Detail Level"
                                    value={parameters.detailLevel}
                                    min={50}
                                    max={100}
                                    onChange={(value) => updateParameter("detailLevel", value)}/>
                            </Flex>
                        </Box>

                        <hr/>

                        {/* Base Color */}
                        <Box py="2">
                            <Text size="3" weight="bold" mb="3">
                                Base Color
                            </Text>
                            <Flex direction="column" gap="3">
                                <Slider
                                    label="Hue"
                                    value={parameters.baseColorHue}
                                    min={0}
                                    max={360}
                                    onChange={(value) => updateParameter("baseColorHue", value)}
                                    showColorPreview={true}/>
                                <Slider
                                    label="Saturation"
                                    value={parameters.baseColorSaturation}
                                    min={0}
                                    max={100}
                                    onChange={(value) => updateParameter("baseColorSaturation", value)}/>
                                <Slider
                                    label="Lightness"
                                    value={parameters.baseColorLightness}
                                    min={10}
                                    max={90}
                                    onChange={(value) => updateParameter("baseColorLightness", value)}
                                />
                            </Flex>
                        </Box>

                        <hr/>

                        {/* Noise and Texture */}
                        <Box py="2">
                            <Text size="3" weight="bold" mb="3">
                                Noise & Texture
                            </Text>
                            <Flex direction="column" gap="3">
                                <Slider
                                    label="Noise Intensity"
                                    value={parameters.noiseIntensity}
                                    min={0}
                                    max={100}
                                    onChange={(value) => updateParameter("noiseIntensity", value)}/>
                                <Slider
                                    label="Noise Scale"
                                    value={parameters.noiseScale}
                                    min={10}
                                    max={200}
                                    onChange={(value) => updateParameter("noiseScale", value)}/>
                                <Slider
                                    label="Noise Coherence"
                                    value={parameters.noiseCoherence}
                                    min={0}
                                    max={100}
                                    onChange={(value) => updateParameter("noiseCoherence", value)}/>
                            </Flex>
                        </Box>

                    </Tabs.Content>

                    <Tabs.Content value="texture_base">
        
                        {/* Band Configuration */}
                        <Box py="2">
                            <Text size="3" weight="bold" mb="3">
                                Band Configuration
                            </Text>
                            <Flex direction="column" gap="3">
                                <Slider
                                    label="Band Count"
                                    value={parameters.bandCount}
                                    min={3}
                                    max={20}
                                    onChange={(value) => updateParameter("bandCount", value)}/>
                                <Slider
                                    label="Band Height"
                                    value={parameters.bandHeight}
                                    min={20}
                                    max={150}
                                    onChange={(value) => updateParameter("bandHeight", value)}/>
                                <Slider
                                    label="Band Variation"
                                    value={parameters.bandVariation}
                                    min={0}
                                    max={100}
                                    onChange={(value) => updateParameter("bandVariation", value)}/>
                                <Slider
                                    label="Color Variation Range"
                                    value={parameters.colorVariationRange}
                                    min={0}
                                    max={100}
                                    onChange={(value) => updateParameter("colorVariationRange", value)}/>
                            </Flex>
                        </Box>

                        <hr/>

                        {/* Polar Effects */}
                        <Box py="2">
                            <Flex align="center" justify="between" mb="3">
                                <Text size="3" weight="bold">
                                    Polar Effects
                                </Text>
                                <Switch
                                    checked={parameters.polarColorEnabled}
                                    onCheckedChange={(checked) => updateParameter("polarColorEnabled", checked)}/>
                            </Flex>
                            {parameters.polarColorEnabled && (
                                <Flex direction="column" gap="3">
                                    <Slider
                                        label="Polar Hue"
                                        value={parameters.polarColorHue}
                                        min={0}
                                        max={360}
                                        onChange={(value) => updateParameter("polarColorHue", value)}
                                        showColorPreview={true}
                                    />
                                    <Slider
                                        label="Polar Intensity"
                                        value={parameters.polarIntensity}
                                        min={0}
                                        max={100}
                                        onChange={(value) => updateParameter("polarIntensity", value)}
                                    />
                                </Flex>
                            )}
                        </Box>

                        <hr />

                        {/* Band Curvature */}
                        <Box py="2">
                            <Text size="3" weight="bold" mb="3">
                                Band Curvature
                            </Text>
                            <Flex direction="column" gap="3">
                                <Slider
                                    label="Curvature Amount"
                                    value={parameters.bandCurvature}
                                    min={0}
                                    max={100}
                                    onChange={(value) => updateParameter("bandCurvature", value)}
                                />
                                <Slider
                                    label="Curvature Variation"
                                    value={parameters.curvatureVariation}
                                    min={0}
                                    max={100}
                                    onChange={(value) => updateParameter("curvatureVariation", value)}
                                />
                            </Flex>
                        </Box>

                        <hr />


                        <Separator size="3" />           
                    </Tabs.Content>

                    <Tabs.Content value="texture_extend">
                        {/* Global Zones */}
                        <Box py="2">
                            <Flex align="center" justify="between" mb="3">
                                <Text size="3" weight="bold">
                                    Global Tonal Zones
                                </Text>
                                <Switch
                                    checked={parameters.globalZonesEnabled}
                                    onCheckedChange={(checked) => updateParameter("globalZonesEnabled", checked)}
                                />
                            </Flex>
                            {parameters.globalZonesEnabled && (
                                <Slider
                                    label="Zone Intensity"
                                    value={parameters.globalZoneIntensity}
                                    min={0}
                                    max={100}
                                    onChange={(value) => updateParameter("globalZoneIntensity", value)}
                                />
                            )}
                        </Box>

                        {/* Geological Features */}
                        <Box py="2">
                            <Flex align="center" justify="between" mb="3">
                                <Text size="3" weight="bold">
                                    Geological Rays
                                </Text>
                                <Switch
                                    checked={parameters.geologicalRaysEnabled}
                                    onCheckedChange={(checked) => updateParameter("geologicalRaysEnabled", checked)}/>
                            </Flex>
                            {parameters.geologicalRaysEnabled && (
                                <Flex direction="column" gap="3">
                                    <Slider
                                        label="Ray Count"
                                        value={parameters.rayCount}
                                        min={2}
                                        max={20}
                                        onChange={(value) => updateParameter("rayCount", value)}
                                    />
                                    <Slider
                                        label="Ray Intensity"
                                        value={parameters.rayIntensity}
                                        min={0}
                                        max={100}
                                        onChange={(value) => updateParameter("rayIntensity", value)}
                                    />
                                </Flex>
                            )}
                        </Box>

                        <hr />

                        {/* Atmospheric Effects */}
                        <Box py="2">
                            <Flex align="center" justify="between" mb="3">
                                <Text size="3" weight="bold">
                                    Atmospheric Effects
                                </Text>
                                <Switch
                                    checked={parameters.atmosphericEnabled}
                                    onCheckedChange={(checked) => updateParameter("atmosphericEnabled", checked)}
                                />
                            </Flex>
                            {parameters.atmosphericEnabled && (
                                <Slider
                                    label="Atmospheric Intensity"
                                    value={parameters.atmosphericIntensity}
                                    min={0}
                                    max={100}
                                    onChange={(value) => updateParameter("atmosphericIntensity", value)}
                                />
                            )}
                        </Box>

                        <hr />
                    </Tabs.Content>
                </Box>
            </Tabs.Root>
                    
        </Flex>
    )

};//end component
