'use server';

import OpenAI from 'openai';

// Inicializa cliente una sola vez
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Genera imagen a partir de un prompt y la devuelve serializada como texto (hexadecimal).
 * @param prompt Texto para la generación de imagen
 * @returns Promise<string> Cadena en hexadecimal con los bytes de la imagen PNG
 */


export async function generateImage(prompt: string): Promise<string> {
    const response = await client.images.generate({
        model: "dall-e-3", // o "dall-e-2" si prefieres
        prompt,
        size: "1024x1024",
        quality: "standard", // xo "hd" para mayor calidad
        n: 1,        
    });

    // La respuesta oficial es un array con objetos que tienen 'url' con la imagen
    return response.data![0].url!;
};//END 



// Paso 2: convertir a hex (sin compresión adicional)
//const hexString = buffer.toString('hex');
//return hexString; // Promise<string>