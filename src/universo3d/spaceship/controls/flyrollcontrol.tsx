//src/universo3d/spaceship/controls/flyrollcontrol.tsx

import React, { useRef, useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { Box, Container, Flex, Slider } from "@radix-ui/themes";
import { FlyRollPainter } from "./flyrollpainter";
import { TDimension } from "@/common/types";
import { XMath2d } from "@/math2d/xmath2d";
import { TCfMarksConfig } from "@/lib/graph2d/types2d";

export const CTR_MARKS_CONFIG: TCfMarksConfig = {
    color: "#ffffff",
    radiusLen: 12,
    countSectors: 4,
    countDiv: 5,
    countSubdiv: 5,
};

interface FlyRollControlProps {
    id: string;
    sideLength: number;
    value: number;
};

export interface FlyRollControlRef {
    changeValue: (newValue: number) => void;
};

export const FlyRollControl = forwardRef<FlyRollControlRef, FlyRollControlProps>((props, ref) => {



    const [rotation, setRotation] = useState<number>(XMath2d.RAD * 15);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const controlPainter = useRef<FlyRollPainter | null>(null);
    const cssDimension = `${props.sideLength}px`;


    useEffect(() => {
       const canvas = canvasRef.current;
        if (!canvas) return;
        if (!canvas.getContext("2d")) return;
        controlPainter.current = new FlyRollPainter(canvas.getContext("2d")!,
                                                    props.sideLength,
                                                    CTR_MARKS_CONFIG);
        renderControl();
    }, []);

    
    const changeValue = (newRotation: number) => {
        setRotation(newRotation);
    };

    useImperativeHandle(ref, () => ({
        changeValue,
    }), []);

    const renderControl = () => {
        controlPainter.current!.render(rotation);
    };

    return (
        <Box width={cssDimension} height={cssDimension}>
            <canvas ref={canvasRef}
                    width={cssDimension}
                    height={cssDimension}/>
        </Box>
    );
})//end