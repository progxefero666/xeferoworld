"use client";

import { Box, Flex} from "@radix-ui/themes";


import { ButtonsStyle, TextStyle } from "@/radix/rdxtheme";
import { LIB_ICON } from "@/radix/rdxthicons";
import { XText } from "@/radix/data/xtext";
import { SeparatorH } from "@/radix/container/separatorh";

import { XButton } from "@/radix/buttons/xbutton";
import { Slider } from "@/app/zone3d/planets/comp/inputxslider";

interface EditionParameters {
    baseColorHue: number;
    baseColorSaturation: number;
    baseColorLightness: number;
    metallicness: number;
    roughness: number;
};

interface PanelEditionProps {
    parameters: EditionParameters;
    onParameterChange: (key: string, value: number) => void;
    onApplyEdition: () => void;
};

export function PanelEditionParams({ parameters, onParameterChange, onApplyEdition }: PanelEditionProps) {

    return (            
        <Flex width="100%" direction="column" px="2" py="1" gapY="2">

            <XButton text="Apply Edtion"
                        icon={LIB_ICON.EDIT}
                        color={ButtonsStyle.COLOR_EDIT}
                        onclick={onApplyEdition}/>
            <SeparatorH />

            <XText value="Base Color" style={TextStyle.ST_CONT_HEADER_COLOR} />
            <Slider
                label="Hue"
                value={parameters.baseColorHue}
                min={0}
                max={360}
                onChange={(value) => onParameterChange("baseColorHue", value)}
                showColorPreview={true} />
            <Slider
                label="Saturation"
                value={parameters.baseColorSaturation}
                min={0}
                max={100}
                onChange={(value) => onParameterChange("baseColorSaturation", value)}/>
            <Slider
                label="Lightness"
                value={parameters.baseColorLightness}
                min={10}
                max={90}
                onChange={(value) => onParameterChange("baseColorLightness", value)} />
           

            {/* Material Properties */}
            <XText value="Material Properties" style={TextStyle.ST_CONT_HEADER_COLOR} />
            <Slider
                label="Metallicness"
                value={parameters.metallicness}
                min={30}
                max={70}
                onChange={(value) => onParameterChange("metallicness", value)}/>
            <Slider
                label="Roughness"
                value={parameters.roughness}
                min={20}
                max={40}
                onChange={(value) => onParameterChange("roughness", value)}/>
        </Flex>      
    )

};//end
