//src\workflows\workflowscfg.ts

import { DocFormats } from "@/common/docformats";
import { Option } from "@/common/option";
import { TDimension } from "@/common/types";
import { TextureParameters } from "@/universo3d/planets/textureplanetsparams";

/**
 * class PlanetsConfig.DEF_IMAGE_FORMAT
 */
export class PlanetsConfig {

    public static readonly APP_FOLDER: string = `/planets/`;

    public static readonly SC_GENERATION: string = "generation";
    public static readonly SC_EDITION: string = "edition";

    public static readonly SECTIONS: Option[] = [
        new Option(PlanetsConfig.SC_GENERATION, "Generation"),
        new Option(PlanetsConfig.SC_EDITION, "Edition"),        
    ];
    
    public static readonly DEF_IMAGE_FORMAT: string = DocFormats.FORMAT_JPG.value;

    public static EXP_IMAGE_DIMENSION:TDimension = {width:480,height:480};

    public static defaultParameters: TextureParameters = {
        baseColorHue: 200,
        baseColorSaturation: 60,
        baseColorLightness: 40,
        bandCount: 8,
        bandHeight: 80,
        bandVariation: 30,
        colorVariationRange: 40,
        allowColorRepetition: true,
        polarColorEnabled: true,
        polarColorHue: 180,
        polarIntensity: 50,
        bandCurvature: 20,
        curvatureVariation: 40,
        globalZonesEnabled: true,
        globalZoneIntensity: 30,
        noiseIntensity: 25,
        noiseScale: 50,
        noiseCoherence: 60,
        geologicalRaysEnabled: true,
        rayCount: 6,
        rayIntensity: 40,
        atmosphericEnabled: true,
        atmosphericIntensity: 20,
        metallicness: 50,
        roughness: 30,
        detailLevel: 80,
        textureSize: 1024
    };

};//end class