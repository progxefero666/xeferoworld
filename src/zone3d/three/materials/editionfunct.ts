

import type { TGroupParameter } from "@/common/types"

/**
 * Applies base color and material property modifications to texture ImageData
 * @param imageData - Original texture as ImageData
 * @param baseColorGroup - Base color parameters (hue, saturation, lightness)
 * @param materialPropsGroup - Material properties parameters (metallicness, roughness)
 * @returns Modified ImageData with applied parameters
 */
export function applyTextureEdition(
    imageData: ImageData,
    baseColorGroup: TGroupParameter,
    materialPropsGroup: TGroupParameter): ImageData {
        
    // Create a copy of the original image data
    const modifiedImageData = new ImageData(new Uint8ClampedArray(imageData.data), imageData.width, imageData.height)

    // Extract parameters from groups
    const hue = baseColorGroup.parameters.find((p) => p.id === "hue")?.value || 0
    const saturation = baseColorGroup.parameters.find((p) => p.id === "saturation")?.value || 50
    const lightness = baseColorGroup.parameters.find((p) => p.id === "lightness")?.value || 50

    const metallicness = materialPropsGroup.parameters.find((p) => p.id === "metallicness")?.value || 50
    const roughness = materialPropsGroup.parameters.find((p) => p.id === "roughness")?.value || 30

    // Process each pixel
    const data = modifiedImageData.data
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        const a = data[i + 3]

        // Convert RGB to HSL
        const hsl = rgbToHsl(r, g, b)

        // Apply base color modifications
        hsl.h = (hue / 360) % 1 // Normalize hue to 0-1
        hsl.s = Math.max(0, Math.min(1, hsl.s * (saturation / 50))) // Adjust saturation
        hsl.l = Math.max(0, Math.min(1, hsl.l * (lightness / 50))) // Adjust lightness

        // Convert back to RGB
        const rgb = hslToRgb(hsl.h, hsl.s, hsl.l)

        // Apply material properties (metallicness affects contrast, roughness affects brightness)
        const metallicFactor = metallicness / 100
        const roughnessFactor = roughness / 100

        // Metallicness increases contrast
        const contrast = 1 + metallicFactor * 0.5
        rgb.r = Math.max(0, Math.min(255, (rgb.r - 128) * contrast + 128))
        rgb.g = Math.max(0, Math.min(255, (rgb.g - 128) * contrast + 128))
        rgb.b = Math.max(0, Math.min(255, (rgb.b - 128) * contrast + 128))

        // Roughness affects overall brightness
        const brightnessFactor = 1 - roughnessFactor * 0.3
        rgb.r = Math.max(0, Math.min(255, rgb.r * brightnessFactor))
        rgb.g = Math.max(0, Math.min(255, rgb.g * brightnessFactor))
        rgb.b = Math.max(0, Math.min(255, rgb.b * brightnessFactor))

        // Update pixel data
        data[i] = Math.round(rgb.r)
        data[i + 1] = Math.round(rgb.g)
        data[i + 2] = Math.round(rgb.b)
        data[i + 3] = a // Keep original alpha
    }

    return modifiedImageData
}

/**
 * Convert RGB to HSL color space
 */
function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
    r /= 255
    g /= 255
    b /= 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h: number, s: number
    const l = (max + min) / 2

    if (max === min) {
        h = s = 0 // Achromatic
    } else {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0)
                break
            case g:
                h = (b - r) / d + 2
                break
            case b:
                h = (r - g) / d + 4
                break
            default:
                h = 0
        }
        h /= 6
    }

    return { h, s, l }
}

/**
 * Convert HSL to RGB color space
 */
function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
    let r: number, g: number, b: number

    if (s === 0) {
        r = g = b = l // Achromatic
    } else {
        const hue2rgb = (p: number, q: number, t: number): number => {
            if (t < 0) t += 1
            if (t > 1) t -= 1
            if (t < 1 / 6) return p + (q - p) * 6 * t
            if (t < 1 / 2) return q
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
            return p
        }

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s
        const p = 2 * l - q
        r = hue2rgb(p, q, h + 1 / 3)
        g = hue2rgb(p, q, h)
        b = hue2rgb(p, q, h - 1 / 3)
    }

    return {
        r: r * 255,
        g: g * 255,
        b: b * 255,
    }
}
