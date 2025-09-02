"use client";

import { useRef, useEffect, forwardRef, useImperativeHandle, useState } from "react";
import { Box } from "@radix-ui/themes";
import { DocFormats } from "@/common/docformats";


interface CanvasImageDataProps {
    textureData: ImageData | null;
    width: number;
    height: number;
    format:string,
    onimageready?: (imageURL:string) => void;
}
export const CanvasImageData = ({ textureData, width, height,format, onimageready}: CanvasImageDataProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const sendImageData = (imageURL:string) => {
        onimageready?.(imageURL);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, width, height);

        if (textureData) {
            const tempCanvas = document.createElement("canvas");
            tempCanvas.width = textureData.width;
            tempCanvas.height = textureData.height;
            const tempCtx = tempCanvas.getContext("2d");
            if (!tempCtx) return;

            tempCtx.putImageData(textureData, 0, 0);
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(tempCanvas, 0, 0, width, height);
            const mimetype = DocFormats.getMimetype(format);
            //const imgData:ImageData = ctx.getImageData(0,0,tempCanvas.width,tempCanvas.height);
            const imageURL:string = tempCanvas.toDataURL(mimetype);            
            sendImageData(imageURL);
        } 
        else {
            ctx.fillStyle = "#1a1a1a";
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = "#666666";
            ctx.font = "16px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("Generando textura...", width / 2, height / 2)
        }
    }, [textureData, width, height]);

    return (
        <Box width="auto">
            <canvas
                ref={canvasRef}
                width={width}
                height={height}
                style={{backgroundColor: "#1a1a1a",}}/>
        </Box>
    );
};
