
//src\lib\graph2d\functions\imagedatafunc.ts

import { TDimension } from "@/common/types";
import { ImageUtil } from "../util/imageutil";


/**
 * class ImageDataFunc.getImageDataFromCanvas
 */
export class ImageDataFunc {

    public static drawImageData(canvas: HTMLCanvasElement,
                                imagedimension: TDimension,
                                imageData: ImageData): void {
        const ctx: CanvasRenderingContext2D | null
            = canvas.getContext("2d", { willReadFrequently: true });
        ctx!.clearRect(0, 0, canvas.width, canvas.height);
        const offCanvas = document.createElement("canvas");
        offCanvas.width = imagedimension.width;
        offCanvas.height = imagedimension.height;
        offCanvas.getContext("2d")!.putImageData(imageData, 0, 0);
        ctx!.drawImage(offCanvas, 0, 0, canvas.width, canvas.height);
    }

    public static exportCanvasImage(fileName: string, dataURL: string) {
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = fileName;
        link.style.display = "none";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Si es un ObjectURL, liberar memoria
        if (dataURL.startsWith("blob:")) {
            URL.revokeObjectURL(dataURL);
        }
    }

    public static downloadTexture = async (imageName:string,mimetype:string,imageData:ImageData) => {
        const imageDownload:string 
            = await ImageUtil.getImageUrlFromImageData(imageData,mimetype);
        const link = document.createElement("a");
        link.href = imageDownload;   // aquí va tu ObjectURL o DataURL
        link.download = imageName;   // el nombre de archivo que quieras
        document.body.appendChild(link); 
        link.click();
        document.body.removeChild(link);
        if (imageDownload.startsWith("blob:")) {
            URL.revokeObjectURL(imageDownload);
        }
    };//end
    
    public static getImageDataFromCanvas(canvas: HTMLCanvasElement): ImageData {
        const ctx = canvas.getContext("2d");
        return ctx!.getImageData(0, 0, canvas.width, canvas.height);
    };//end

    public static drawImageDataToCanvas(canvas: HTMLCanvasElement, imageData: ImageData): void {
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.putImageData(imageData, 0, 0);
    };//end

}