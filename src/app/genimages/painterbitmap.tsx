
import { useState, useEffect, useRef } from "react";
import { Box,Flex, } from "@radix-ui/themes";


import { TDimension } from "@/common/types";
import { CvPainter } from "@/lib/graph2d/painters/cvpaint";
import { Point2d } from "../../lib/graph2d/types2d";

//import { PainterTextureCanvas } from "@/zone3d/textures/texturecanvas";

const containerStyle = {
    background: 'rgba(0, 0, 0, 1)',
    border: '1px solid rgb(167, 176, 188)',
};

interface PainterBitmapProps {
    canvasdim:TDimension;
    bitmap:ImageBitmap|null;    
    bitmapDim?: TDimension;
};

export function PainterBitmap({canvasdim,bitmap,bitmapDim}: PainterBitmapProps) {

    const [ready, setReady] = useState<boolean>(false);
    const ctrlCanvas = useRef<CvPainter | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if(ready){return;}
        if(!canvasRef.current) return;
        const ctx = canvasRef.current!.getContext('2d');
        ctrlCanvas.current = new CvPainter(ctx!,{width:400,height:400}, "#000000");    
        setReady(true);
        if(bitmap!== null) {renderImage();}     
    },[]);    

    const renderImage= () => {
        let size:TDimension = bitmapDim ?? {width:bitmap!.width, height:bitmap!.height};
        let aspectRatio = size.width / size.height;
        if(size.width > canvasdim.width || size.height > canvasdim.height) {
            if(size.width > canvasdim.width) {
                size.width = canvasdim.width;
                size.height = size.width / aspectRatio;
            }
            else {
                size.height = canvasdim.height;
                size.width = size.height * aspectRatio;
            }
        }

        let coords:Point2d = {
            x: (canvasdim.width - size.width) / 2,
            y: (canvasdim.height - size.height) / 2
        };

        ctrlCanvas.current!.drawImageBitmapDim(bitmap!,coords,size);
    };//end 

    return (
        <Flex width="100%" direction="column" px="3" py="2" style={containerStyle} >
            <canvas ref={canvasRef}
                    width={canvasdim.width} height={canvasdim.height}
                    style={{background:'rgb(0, 0, 0)'}} />
        </Flex>
    );

}//end PrimaryBar
