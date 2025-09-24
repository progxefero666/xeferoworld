//src/universo3d/spaceship/controls/radar/radarcontrol.tsx

import React, { useRef, forwardRef, useImperativeHandle, useEffect } from "react";
import { Box } from "@radix-ui/themes";
import { Point2d, TDimension } from "@/common/types";
import { TCfMarksConfig } from "@/lib/graph2d/types2d";
import { CvPainter } from "@/lib/graph2d/painters/cvpaint";

export const CTR_MARKS_CONFIG: TCfMarksConfig = {
    color: "#ffffff",
    radiusLen: 12,
    countSectors: 4,
    countDiv: 5,
    countSubdiv: 5,
};

interface RadarProps {
    elements?: any[];
};

export interface RadarRef {
    changeValue: (newValue: number) => void;
};

const EXT_BORDER_COLOR: any = "#2d2d2dff";
const INT_BORDER_COLOR: any = "#0a0a0aff";

export const Radar = forwardRef<RadarRef, RadarProps>((props, ref) => {

    const sideLength = 180;
    const cssSideLen = '180px';
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const cvPainter = useRef<CvPainter | null>(null);
    
    useEffect(() => {
       const canvas = canvasRef.current;
        if (!canvas) return;
        if (!canvas.getContext("2d")) return;
        const cvDim:TDimension = {width:sideLength,height:sideLength};
        cvPainter.current = new CvPainter
            (canvas.getContext("2d")!,cvDim,"#207100ff");
        renderCanvas();
    }, []);
    
    const changeValue = (value: number) => {     
    };

    useImperativeHandle(ref, () => ({
        changeValue,
    }), []);

    const renderCanvas = () => {
        renderBase();
        renderGrid();
        renderAxis();
        renderCfs();
    };

    const renderBase = () => {
        cvPainter.current!.fillback()
        let point:Point2d = {x:0,y:0};
        let dim:TDimension = {width:sideLength,height:sideLength};
        cvPainter.current!.drawRect(point,dim,EXT_BORDER_COLOR);
        dim.width -=2;
        dim.height -=2;
        point= {x:2,y:2};
        cvPainter.current!.drawRect(point,dim,INT_BORDER_COLOR);
    };//end

    const renderGrid = () => {
        const countSubdiv:number = 28;
        const lenUnit:number = sideLength/countSubdiv;

        for (let x=0;x<countSubdiv;x++) {
            const coordX:number = Math.floor(x*lenUnit);
            const start:Point2d = {x:coordX,y:2};
            const end:Point2d   = {x:coordX,y:sideLength-2};
            cvPainter.current!.drawLine(start,end,1,"rgba(0,0,0,0.5)");
        }

        for (let y=0;y<countSubdiv;y++) {
            const coordY:number = Math.floor(y*lenUnit);
            const start:Point2d = {x:2,y:coordY};
            const end:Point2d   = {x:sideLength-2,y:coordY};     
            cvPainter.current!.drawLine(start,end,1,"rgba(0,0,0,0.5)");       
        }
    };//end

    const renderAxis = () => {
        let start:Point2d = {x:2,y:Math.floor(sideLength/2)};
        let end:Point2d   = {x:sideLength-2,y:Math.floor(sideLength/2)};
        cvPainter.current!.drawLine(start,end,1,"#ffffffff");

        start= {x:Math.floor(sideLength/2),y:2};
        end  = {x:Math.floor(sideLength/2),y:sideLength-2};
        cvPainter.current!.drawLine(start,end,1,"#ffffffff");        
    };//end

    const renderCfs = () => {
        const cfsColor:any="#ffffffff";
        let center:Point2d = {
            x:Math.floor(sideLength/2),
            y:Math.floor(sideLength/2)
        };
        const countCfs:number = 5;
        const radiusMax:number = Math.floor(sideLength/2)-4;
        const radiusInc:number = Math.floor(radiusMax/countCfs);

        for (let cfIdx=1;cfIdx<=countCfs;cfIdx++) {
            const radius:number = cfIdx*radiusInc;
            cvPainter.current!.drawCf(center,radius,1,cfsColor);
        }
        
    };//end

    return (
        <Box width="auto" height="auto" >
            <canvas ref={canvasRef}
                    width={cssSideLen}
                    height={cssSideLen}/>
        </Box>
    );
})//end