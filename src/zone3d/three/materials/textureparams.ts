//src\textures\model\textureparams.ts


export interface TextureParameters {
    // Base colors
    baseColorHue: number;
    baseColorSaturation: number;
    baseColorLightness: number;

    // Band configuration
    bandCount: number;
    bandHeight: number;
    bandVariation: number

    // Color variations
    colorVariationRange: number;
    allowColorRepetition: boolean;

    // Polar effects
    polarColorEnabled: boolean;
    polarColorHue: number;
    polarIntensity: number;

    // Band curvature
    bandCurvature: number;
    curvatureVariation: number;

    // Global tonal zones
    globalZonesEnabled: boolean;
    globalZoneIntensity: number;

    // Noise and texture
    noiseIntensity: number
    noiseScale: number
    noiseCoherence: number

    // Geological features
    geologicalRaysEnabled: boolean;
    rayCount: number;
    rayIntensity: number;

    // Atmospheric effects
    atmosphericEnabled: boolean;
    atmosphericIntensity: number;

    // Material properties
    metallicness: number;
    roughness: number;
    detailLevel: number;

    // Texture size parameter
    textureSize: number;
};
