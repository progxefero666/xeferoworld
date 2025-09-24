//src\lib\graph2d\util\imageutil.ts

import { TDimension } from "@/common/types";


export type ExportFormat = "png" | "jpg";

/**
 * ImageUtil.getImageUrlFromImageData
 */
export class ImageUtil {

    /*
    // in píxeles
    const width = 200;
    const height = 100;

    // Uint8ClampedArray con RGBA (4 valores por píxel)
    const pixels = new Uint8ClampedArray(width * height * 4);

    // Ejemplo: llenar con rojo opaco
    for (let i = 0; i < pixels.length; i += 4) {
    pixels[i] = 255;     // R
    pixels[i + 1] = 0;   // G
    pixels[i + 2] = 0;   // B
    pixels[i + 3] = 255; // A
    }

    // Crear el ImageData directamente
    const imgData = new ImageData(pixels, width, height);
    */

    public static  async getImageUrlFromImageData(imageData:ImageData,mimetype: string): Promise<string> {

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

    public static exportTexture(imageData: ImageData, format: ExportFormat, filename:string) {
        // Create a canvas to convert ImageData to downloadable format
        const canvas = document.createElement("canvas");
        canvas.width = imageData.width;
        canvas.height = imageData.height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
            throw new Error("Could not get canvas context");
        }

        // Put the image data on the canvas
        ctx.putImageData(imageData, 0, 0);

        // Convert to blob and download
        canvas.toBlob(
            (blob) => {
                if (!blob) {
                    throw new Error("Could not create blob from canvas");
                }

                // Create download link
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = `${filename}.${format}`;

                // Trigger download
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // Clean up
                URL.revokeObjectURL(url);
            },
            `image/${format}`,
            format === "jpg" ? 0.95 : undefined,
        )
    };

    public static hexToArrayBuffer(hexImage: string): ArrayBuffer {
        const len = hexImage.length / 2;
        const buffer = new ArrayBuffer(len);
        const view = new Uint8Array(buffer);
        for (let i = 0; i < len; i++) {
            view[i] = parseInt(hexImage.substr(i * 2, 2), 16);
        }
        return buffer;
    };


     public static async arrayBufferToImageBitmap(buffer: ArrayBuffer, mimeType: string): Promise<ImageBitmap> {
        const blob = new Blob([buffer], { type: mimeType });
        return await createImageBitmap(blob); 
    };

    public static getURLImageSource(mimetype:string,imbuffer: ArrayBuffer): string {
        const blob = new Blob([imbuffer], {type: mimetype});
        return URL.createObjectURL(blob);
    };
    //.................................................................................   
    // ImageURLs
    //.................................................................................   
    static getHtmImageDataURL = async (image: HTMLImageElement, mimetype: string, dim: TDimension): Promise<string> => {
        const canvas = document.createElement("canvas");
        canvas.width = dim.width;
        canvas.height = dim.height;
        const ctx = canvas.getContext("2d");
        ctx!.drawImage(image, 0, 0, dim.width, dim.height);
        return canvas.toDataURL(mimetype);
    };
    public static async getCvImage(url: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve(img);
            img.onerror = (err) => reject(err);
        });
    }


    public static async getHtmlImages(objsUrls: string[]): Promise<HTMLImageElement[]> {
        try {
            const images = await Promise.all(objsUrls.map(url => ImageUtil.getCvImage(url)));
            return images;
        } 
        catch (error) { console.error("Error loading images:", error);
            return [];
        }
    };

    static async dataURLToArrayBuffer(dataURL: string): Promise<ArrayBuffer> {
        const response = await fetch(dataURL);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as ArrayBuffer);
            reader.onerror = () => reject(reader.error);
            reader.readAsArrayBuffer(blob);
        });
    }
    static getDataURL = async (file: File, dimension: TDimension): Promise<string> => {
        const srcOriginal = URL.createObjectURL(file);
        const img = new Image();
        img.src = srcOriginal;
        await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
        });

        // Crear una miniatura usando Canvas
        const canvas = document.createElement("canvas");
        canvas.width = dimension.width;
        canvas.height = dimension.height;
        const ctx = canvas.getContext("2d");
        ctx!.drawImage(img, 0, 0, dimension.width, dimension.height);
        const dataURL = canvas.toDataURL(file.type);

        URL.revokeObjectURL(srcOriginal);
        return dataURL;
    };//end

    static async getResizedArrayBuffer(file: File, dimension: TDimension): Promise<ArrayBuffer> {
        const resizedDataURL = await ImageUtil.getDataURL(file, dimension);
        return ImageUtil.dataURLToArrayBuffer(resizedDataURL);
    };//end

    //.................................................................................   
    // ImageBitmaps
    //.................................................................................
    public static async getImageBitmap(url: string): Promise<ImageBitmap> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = async () => {
                const imageBitmap = await createImageBitmap(img);
                resolve(imageBitmap);
            }    
            img.onerror = (err) => reject(err);
        });
    };//end

    public static async geArrayImageBitmap(objsUrls: string[]): Promise<ImageBitmap[]> {
        let images: ImageBitmap[] = [];
        try {
            images = await Promise.all(objsUrls.map(url => ImageUtil.getImageBitmap(url)));
           
        } 
        catch (error) { console.error("Error loading images:", error);
            return [];
        }
         return images;
    };//end


    public static async createImageBitmap(buffer:ArrayBuffer,mimeType:string): Promise<ImageBitmap> {
        const blob = new Blob([buffer], { type: mimeType });
        return await createImageBitmap(blob); 
    };//end


    public static loadImage(url: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve(img);
            img.onerror = (error) => reject(error);
        });
    };//end

    public static loadImages(urls: string[]): Promise<HTMLImageElement[]> {
        return Promise.all(urls.map(url => this.loadImage(url)));
    };//end


    //.................................................................................   
    // Files
    //.................................................................................   
    static getFileHTMLImageElement(file: File): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = URL.createObjectURL(file);            
            img.onload = () => resolve(img);
            img.onerror = (error) => {
                URL.revokeObjectURL(img.src); //
                reject(new Error("Error al cargar la imagen")); 
            };
        });
    };//end

    static getFileDataURL = async (file: File, dim: TDimension): Promise<string> => {
        const srcOriginal = URL.createObjectURL(file);
        const img = new Image();
        img.src = srcOriginal;
        await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
        });

        // Crear una miniatura usando Canvas
        const canvas = document.createElement("canvas");
        canvas.width = dim.width;
        canvas.height = dim.height;
        const ctx = canvas.getContext("2d");
        ctx!.drawImage(img, 0, 0, dim.width, dim.height);
        const dataURL = canvas.toDataURL(file.type);

        URL.revokeObjectURL(srcOriginal);
        return dataURL;
    };//end

    static async getImageDimension(file: File): Promise<TDimension> {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
        });
        return Promise.resolve({ width: img.width, height: img.height });
    };//end


    //.................................................................................   
    // Buffers (ArrayBuffer)
    //.................................................................................
    /*
    static async getFileResizedArrayBuffer(file: File, dim: Dim2d): Promise<ArrayBuffer> {
        const resizedDataURL = await ImageLoader.getFileDataURL(file, dim);
        return ImageLoader.getUrlImageBuffer(resizedDataURL);
    };//end

    static async getFileImageBitmap(file: File, dim: Dim2d): Promise<ImageBitmap> {
        const dataURL = await ImageLoader.getFileDataURL(file, dim);
        const arrayBuffer = await ImageLoader.getUrlImageBuffer(dataURL);
        return ImageLoader.createImageBitmap(arrayBuffer, file.type);
    };//end    

    public static createImageObjectUrlFromBf(mimetype:string,imbuffer: ArrayBuffer): string {
        const blob = new Blob([imbuffer], {type: mimetype});
        return URL.createObjectURL(blob);
    };//end

    static async getUrlImageBuffer(dataURL: string): Promise<ArrayBuffer> {
        const response = await fetch(dataURL);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as ArrayBuffer);
            reader.onerror = () => reject(reader.error);
            reader.readAsArrayBuffer(blob);
        });
    };//end

    public static async createArrayImageBitmapsFbfs(imgbuffers:ArrayBuffer[]): Promise<ImageBitmap[]> {
        let mimetype = "image/png"; 
        let cvimages: ImageBitmap[] = [];
        try {
            for (let idx=0;idx<imgbuffers.length;idx++) {
                cvimages[idx] = await ImageLoader.createImageBitmap(imgbuffers[idx], mimetype);
            }
        }
        catch (error) {
            console.error("Error loading images:", error);
            return [];
        }
        return [];
    };//end
    */

}//end class

/**
 * Converts an ImageData object to a data URI.
 * @param imageData The ImageData to convert.
 * @returns A string containing the data URI.
 */
export function imageDataToDataURI(imageData: ImageData): string {
    const canvas = document.createElement('canvas');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');
    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL('image/png');
}

/**
 * Converts a data URI to an ImageData object.
 * @param dataURI The data URI to convert.
 * @returns A promise that resolves with the new ImageData object.
 */
export function dataURIToImageData(dataURI: string): Promise<ImageData> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                reject(new Error('Could not get canvas context'));
                return;
            }
            ctx.drawImage(image, 0, 0);
            resolve(ctx.getImageData(0, 0, image.width, image.height));
        };
        image.onerror = (err) => {
            reject(err);
        };
        image.src = dataURI;
    });
}
