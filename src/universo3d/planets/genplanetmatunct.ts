//src\zone3d\three\materials\generatorfunct.ts

import { TextureParameters } from "@/universo3d/planets/textureplanetsparams"


// Utility functions for color manipulation
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
    h /= 360
    s /= 100
    l /= 100

    const a = s * Math.min(l, 1 - l)
    const f = (n: number) => {
        const k = (n + h * 12) % 12
        return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    }

    return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)]
}

// Simple noise function
function noise(x: number, y: number, scale: number): number {
    const nx = x / scale
    const ny = y / scale

    // Simple pseudo-random noise
    const n = Math.sin(nx * 12.9898 + ny * 78.233) * 43758.5453
    return (n - Math.floor(n)) * 2 - 1
}

// Perlin-like noise for more coherent patterns
function coherentNoise(x: number, y: number, scale: number, coherence: number): number {
    const baseNoise = noise(x, y, scale)
    const octave1 = noise(x, y, scale * 0.5) * 0.5
    const octave2 = noise(x, y, scale * 0.25) * 0.25

    const coherenceFactor = coherence / 100
    return baseNoise * (1 - coherenceFactor) + (octave1 + octave2) * coherenceFactor
}

function getIndividualBandCurvature(x: number, y: number, bandIndex: number, params: TextureParameters): number {
    if (params.bandCurvature === 0) return 0

    // Each band has its own curvature pattern
    const bandSeed = bandIndex * 123.456
    const stormCenters = 2 + Math.floor(Math.sin(bandSeed) * 3) // 2-5 storm centers per band

    let totalCurvature = 0

    for (let i = 0; i < stormCenters; i++) {
        // Storm center positions (pseudo-random but consistent)
        const centerX = (Math.sin(bandSeed + i * 2.1) + 1) * 0.5
        const centerY = (bandIndex + 0.5) / params.bandCount

        // Distance from storm center
        const dx = x - centerX
        const dy = (y - centerY) * 3 // Stretch vertically to keep storms in band
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Storm intensity decreases with distance
        const stormRadius = 0.15 + Math.sin(bandSeed + i) * 0.1
        if (distance < stormRadius) {
            const intensity = (1 - distance / stormRadius) * (params.bandCurvature / 100)
            // Create swirl pattern
            const angle = Math.atan2(dy, dx) + distance * 8 * Math.PI
            const swirl = Math.sin(angle) * intensity * (params.curvatureVariation / 100)
            totalCurvature += swirl
        }
    }

    return totalCurvature
}

function getStormColorVariation(x: number, y: number, bandIndex: number, params: TextureParameters): number {
    if (params.bandCurvature === 0) return 1

    const bandSeed = bandIndex * 123.456
    const stormCenters = 2 + Math.floor(Math.sin(bandSeed) * 3)

    let colorVariation = 1

    for (let i = 0; i < stormCenters; i++) {
        const centerX = (Math.sin(bandSeed + i * 2.1) + 1) * 0.5
        const centerY = (bandIndex + 0.5) / params.bandCount

        const dx = x - centerX
        const dy = (y - centerY) * 3
        const distance = Math.sqrt(dx * dx + dy * dy)

        const stormRadius = 0.15 + Math.sin(bandSeed + i) * 0.1
        if (distance < stormRadius) {
            const intensity = 1 - distance / stormRadius

            // Different storm types based on seed
            const stormType = Math.sin(bandSeed + i * 3.7)

            if (stormType > 0.3) {
                // Bright luminous storms (lightning-like)
                const brightnessFactor = 1 + intensity * 0.8 * (params.bandCurvature / 100)
                colorVariation *= brightnessFactor
            } else if (stormType < -0.3) {
                // Dark storms (deep cyclones)
                const darknessFactor = 1 - intensity * 0.6 * (params.bandCurvature / 100)
                colorVariation *= Math.max(0.2, darknessFactor)
            } else {
                // Color-shifted storms (different hue)
                // This will be handled separately in the main function
            }
        }
    }

    return Math.max(0.1, Math.min(2.0, colorVariation))
}

function getStormHueShift(x: number, y: number, bandIndex: number, params: TextureParameters): number {
    if (params.bandCurvature === 0) return 0

    const bandSeed = bandIndex * 123.456
    const stormCenters = 2 + Math.floor(Math.sin(bandSeed) * 3)

    let hueShift = 0

    for (let i = 0; i < stormCenters; i++) {
        const centerX = (Math.sin(bandSeed + i * 2.1) + 1) * 0.5
        const centerY = (bandIndex + 0.5) / params.bandCount

        const dx = x - centerX
        const dy = (y - centerY) * 3
        const distance = Math.sqrt(dx * dx + dy * dy)

        const stormRadius = 0.15 + Math.sin(bandSeed + i) * 0.1
        if (distance < stormRadius) {
            const intensity = 1 - distance / stormRadius
            const stormType = Math.sin(bandSeed + i * 3.7)

            // Color-shifted storms (middle range)
            if (stormType >= -0.3 && stormType <= 0.3) {
                const hueVariation = Math.sin(bandSeed + i * 5.2) * 60 // ±60 degrees
                hueShift += hueVariation * intensity * (params.bandCurvature / 100)
            }
        }
    }

    return hueShift
}

function seededRandom(seed: number): number {
    const x = Math.sin(seed) * 43758.5453
    return x - Math.floor(x)
}

/*
baseColorHue: 200,
baseColorSaturation: 60,
baseColorLightness: 40,
rayCount: 6,
rayIntensity: 40,
*/
function applyGeologicalRays(x: number, y: number, params: TextureParameters, textureSize: number): number {
    if (params.geologicalRaysEnabled === false || params.rayIntensity === 0) return 1

    const nx = x / textureSize
    const ny = y / textureSize

    let rayEffect = 1

    const rayBaseSeed = params.baseColorHue * 0.1 + params.rayIntensity * 0.01 + params.rayCount * 0.001
    const numRays = Math.max(2, Math.min(6, Math.floor(2 + seededRandom(rayBaseSeed) * 4))) // 2-6 rays deterministically

    for (let i = 0; i < numRays; i++) {
        const rayId = rayBaseSeed + i * 7.123 + params.rayCount * 0.1

        // Ray starts from a random edge point
        const startAngle = (i / numRays) * Math.PI * 2 + seededRandom(rayId) * 0.8
        let currentX = 0.5 + Math.cos(startAngle) * 0.45
        let currentY = 0.5 + Math.sin(startAngle) * 0.45

        // Ray travels in segments with direction changes
        const segments = 8 + Math.floor(seededRandom(rayId * 1.3) * 4) // 8-12 segments per ray
        let currentAngle = startAngle + Math.PI + seededRandom(rayId * 2.1) * 0.6 // Initial direction toward center

        let minDistanceToRay = 1.0

        for (let segment = 0; segment < segments; segment++) {
            const segmentProgress = segment / segments

            const angleChange =
                seededRandom(rayId * 3.7 + segment * 1.4) * 0.8 - 0.4 + (seededRandom(rayId * 5.2 + segment * 0.8) * 0.4 - 0.2) // Multiple frequency changes
            currentAngle += angleChange

            // Segment length varies (some longer, some shorter)
            const segmentLength = 0.08 + (seededRandom(rayId * 4.1 + segment * 1.1) * 0.08 - 0.04)

            // Next point in the ray path
            const nextX = currentX + Math.cos(currentAngle) * segmentLength
            const nextY = currentY + Math.sin(currentAngle) * segmentLength

            const segmentDx = nextX - currentX
            const segmentDy = nextY - currentY
            const segmentLength2 = segmentDx * segmentDx + segmentDy * segmentDy

            if (segmentLength2 > 0) {
                // Project point onto line segment
                const t = Math.max(0, Math.min(1, ((nx - currentX) * segmentDx + (ny - currentY) * segmentDy) / segmentLength2))

                const closestX = currentX + t * segmentDx
                const closestY = currentY + t * segmentDy

                const distanceToSegment = Math.sqrt((nx - closestX) ** 2 + (ny - closestY) ** 2)
                minDistanceToRay = Math.min(minDistanceToRay, distanceToSegment)
            }

            currentX = nextX
            currentY = nextY

            // Stop if ray goes too far outside the texture
            if (currentX < -0.2 || currentX > 1.2 || currentY < -0.2 || currentY > 1.2) break
        }

        const baseWidth = 0.012 + seededRandom(rayId * 2.8) * 0.008 // Varying width per ray

        if (minDistanceToRay < baseWidth * 3) {
            // Larger influence area
            const normalizedDistance = minDistanceToRay / (baseWidth * 3)

            if (normalizedDistance < 0.33) {
                const coreFactor = (0.33 - normalizedDistance) / 0.33
                const coreEffect = Math.pow(coreFactor, 1.5) * (params.rayIntensity / 100) * 0.6 // Less intense
                rayEffect *= 1 - coreEffect
            } else if (normalizedDistance < 0.66) {
                const transitionFactor = (0.66 - normalizedDistance) / 0.33
                const transitionEffect = transitionFactor * (params.rayIntensity / 100) * 0.2
                rayEffect *= 1 - transitionEffect
            } else {
                const outerFactor = (1.0 - normalizedDistance) / 0.34
                const outerEffect = outerFactor * (params.rayIntensity / 100) * 0.1
                rayEffect *= 1 - outerEffect
            }
        }
    }

    return Math.max(0.3, Math.min(1.5, rayEffect)) // Less extreme range for better integration
};//end

export async function generatePlanetaryTextureUrl(imageData:ImageData,mimetype: string): Promise<string> {

    const canvas = document.createElement("canvas");
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("No se pudo obtener el contexto del canvas");
    ctx.putImageData(imageData, 0, 0);

    // Si el mimetype es 'dataurl', retorna el DataURL directamente
    if (mimetype === 'dataurl') {
        return canvas.toDataURL();
    }

    // Para mimetypes como 'image/png', 'image/jpeg', retorna ObjectURL
    const blob: Blob = await new Promise((resolve, reject) => {
        canvas.toBlob(blob => {
            if (blob) resolve(blob);
            else reject(new Error("No se pudo convertir el canvas a Blob"));
        }, mimetype);
    });
    return URL.createObjectURL(blob);
}; 

export async function generatePlanetaryTexture(params: TextureParameters): Promise<ImageData> {
    return new Promise((resolve, reject) => {
        try {
            const textureSize = params.textureSize;
            if (!textureSize || !Number.isFinite(textureSize) || textureSize < 1) {
                throw new Error(`Invalid texture size: ${textureSize}. Must be a finite number greater than 0.`);
            }

            const width = Math.floor(textureSize);
            const height = Math.floor(textureSize);

            // Create canvas for generation
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            if (!ctx) throw new Error("Could not get canvas context")

            const imageData = ctx.createImageData(width, height);
            const data = imageData.data;

            // Generate base color
            const baseColor = hslToRgb(params.baseColorHue, params.baseColorSaturation, params.baseColorLightness);

            const bandColors: [number, number, number][] = [];
            for (let i = 0; i < Math.max(1, params.bandCount); i++) {
                const bandSeed = params.baseColorHue * 0.1 + i * 123.456;
                const hueVariation = (seededRandom(bandSeed) - 0.5) * params.colorVariationRange;
                const satVariation = (seededRandom(bandSeed + 1) - 0.5) * 20;
                const lightVariation = (seededRandom(bandSeed + 2) - 0.5) * 30;

                const bandHue = (params.baseColorHue + hueVariation + 360) % 360;
                const bandSat = Math.max(0, Math.min(100, params.baseColorSaturation + satVariation));
                const bandLight = Math.max(10, Math.min(90, params.baseColorLightness + lightVariation));

                bandColors.push(hslToRgb(bandHue, bandSat, bandLight));
            }

            // Generate polar colors if enabled
            const polarColor = params.polarColorEnabled
                ? hslToRgb(params.polarColorHue, params.baseColorSaturation, params.baseColorLightness)
                : baseColor;

            // Process each pixel
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const pixelIndex = (y * width + x) * 4;

                    // Normalized coordinates (0-1)
                    const nx = x / width;
                    const ny = y / height;

                    // Calculate latitude (0 = equator, 1 = poles)
                    const latitude = Math.abs(ny - 0.5) * 2;

                    // Base color
                    let [r, g, b] = [...baseColor];

                    const currentBandIndex = Math.floor(ny * params.bandCount);
                    const bandCurvature = getIndividualBandCurvature(nx, ny, currentBandIndex, params);
                    const curvedY = Math.max(0, Math.min(1, ny + bandCurvature));

                    // Apply horizontal bands with curvature
                    const bandPosition = (curvedY * params.bandCount) % 1;
                    const bandIndex = Math.floor(curvedY * params.bandCount) % bandColors.length;
                    let currentBandColor = [...bandColors[bandIndex]];

                    const stormColorVariation = getStormColorVariation(nx, ny, currentBandIndex, params);
                    const stormHueShift = getStormHueShift(nx, ny, currentBandIndex, params);

                    // Apply hue shift to band color if there's a storm effect
                    if (Math.abs(stormHueShift) > 1) {
                        const originalHue = params.baseColorHue + (Math.random() - 0.5) * params.colorVariationRange;
                        const shiftedHue = (originalHue + stormHueShift + 360) % 360;
                        currentBandColor = hslToRgb(shiftedHue, params.baseColorSaturation, params.baseColorLightness);
                    }

                    // Band height variation
                    const bandHeightFactor = Math.max(0.1, params.bandHeight / 100);
                    if (bandPosition < bandHeightFactor) {
                        const bandMix = Math.sin((bandPosition * Math.PI) / bandHeightFactor);
                        r = r * (1 - bandMix) + currentBandColor[0] * bandMix;
                        g = g * (1 - bandMix) + currentBandColor[1] * bandMix;
                        b = b * (1 - bandMix) + currentBandColor[2] * bandMix;
                    }

                    r *= stormColorVariation;
                    g *= stormColorVariation;
                    b *= stormColorVariation;

                    // Apply polar effects
                    if (params.polarColorEnabled && latitude > 0.7) {
                        const polarMix = ((latitude - 0.7) / 0.3) * (params.polarIntensity / 100);
                        r = r * (1 - polarMix) + polarColor[0] * polarMix;
                        g = g * (1 - polarMix) + polarColor[1] * polarMix;
                        b = b * (1 - polarMix) + polarColor[2] * polarMix;
                    }

                    // Apply noise and texture
                    if (params.noiseIntensity > 0) {
                        const noiseValue = coherentNoise(x, y, Math.max(1, params.noiseScale), params.noiseCoherence);
                        const noiseFactor = 1 + noiseValue * (params.noiseIntensity / 100) * 0.3;
                        r *= noiseFactor;
                        g *= noiseFactor;
                        b *= noiseFactor;
                    }

                    
                    const rayEffect = applyGeologicalRays(x, y, params, params.textureSize);
                    r *= rayEffect;
                    g *= rayEffect;
                    b *= rayEffect;
                    

                    // Clamp values and apply to image data
                    data[pixelIndex] = Math.max(0, Math.min(255, Math.round(r)));
                    data[pixelIndex + 1] = Math.max(0, Math.min(255, Math.round(g)));
                    data[pixelIndex + 2] = Math.max(0, Math.min(255, Math.round(b)));
                    data[pixelIndex + 3] = 255; // Alpha
                }
            }

            resolve(imageData);
        } 
        catch (error) {
            reject(error);
        }
    });
};

export function generateRandomParameters(): TextureParameters {
    return {
        // Base colors - random hues with varied saturation/lightness
        baseColorHue: Math.floor(Math.random() * 360),
        baseColorSaturation: 40 + Math.floor(Math.random() * 50), // 40-90
        baseColorLightness: 25 + Math.floor(Math.random() * 40), // 25-65

        // Band configuration - varied planetary structures
        bandCount: 4 + Math.floor(Math.random() * 12), // 4-16
        bandHeight: 30 + Math.floor(Math.random() * 100), // 30-130
        bandVariation: Math.floor(Math.random() * 80), // 0-80
        colorVariationRange: 20 + Math.floor(Math.random() * 60), // 20-80
        allowColorRepetition: Math.random() > 0.3, // 70% chance true

        // Polar effects - sometimes dramatic
        polarColorEnabled: Math.random() > 0.2, // 80% chance
        polarColorHue: Math.floor(Math.random() * 360),
        polarIntensity: 20 + Math.floor(Math.random() * 70), // 20-90

        // Band curvature - storm effects
        bandCurvature: Math.floor(Math.random() * 80), // 0-80
        curvatureVariation: Math.floor(Math.random() * 80), // 0-80

        // Global zones
        globalZonesEnabled: Math.random() > 0.3, // 70% chance
        globalZoneIntensity: 15 + Math.floor(Math.random() * 60), // 15-75

        // Noise and texture
        noiseIntensity: 10 + Math.floor(Math.random() * 70), // 10-80
        noiseScale: 20 + Math.floor(Math.random() * 150), // 20-170
        noiseCoherence: 30 + Math.floor(Math.random() * 60), // 30-90

        // Geological features - dramatic cracks
        geologicalRaysEnabled: Math.random() > 0.25, // 75% chance
        rayCount: 3 + Math.floor(Math.random() * 15), // 3-18
        rayIntensity: 25 + Math.floor(Math.random() * 65), // 25-90

        // Atmospheric effects
        atmosphericEnabled: Math.random() > 0.4, // 60% chance
        atmosphericIntensity: 10 + Math.floor(Math.random() * 50), // 10-60

        // Material properties - realistic ranges
        metallicness: 35 + Math.floor(Math.random() * 30), // 35-65
        roughness: 25 + Math.floor(Math.random() * 20), // 25-45
        detailLevel: 60 + Math.floor(Math.random() * 35), // 60-95

        textureSize: [512, 768, 1024, 1536, 2048][Math.floor(Math.random() * 5)], // Random common texture sizes
    }

};//end

