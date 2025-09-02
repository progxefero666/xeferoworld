//src\app\diagrams\page\secondcontent.tsx

//src\app\diagrams\page\maincontent.tsx

import { useState, useEffect, useRef } from "react";
import { Box, Grid, Flex, Text, Button, Link, TextField } from "@radix-ui/themes";
import { CvPainterDiagrams } from "@/lib/graph2d/components/diagramcanvas";


//import ball from "../../../public/shapes/ball.png";
import { ImageUtil } from "@/lib/graph2d/util/imageutil";


const secondContentStyle = {
    background: 'rgb(56, 56, 56)',
    border: '1px solid rgb(167, 176, 188)',
};
const canvasStyle = {
    background: 'rgba(0, 0, 0, 1)',
    padding: '0',
};
interface CompProps {
    value?: string;
}
export function CanvasMonitor({value}: CompProps) {

    const [ready, setReady] = useState<boolean>(false);
    const ctrlCanvas = useRef<CvPainterDiagrams | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const init = async () => {
             
        const ctx = canvasRef.current!.getContext('2d');
        ctrlCanvas.current = new CvPainterDiagrams(ctx!,{width:400,height:400}, "#000000");    
  
        setReady(true);
        test_a();
    };

    useEffect(() => {
        if(ready){return;}
        if(!canvasRef.current) return;
        init();        
    },);    

    const test_a= async () => {
        ctrlCanvas.current?.render_a();
    }

    const test_b= async () => {
        //const imageBitmap = await ImageLoader.getImageBitmap(ball.src);   
        //ctrlCanvas.current?.render_c(imageBitmap);
    }

    return (
        <Flex width="100%" direction="column" px="3" py="2" style={secondContentStyle} >
            <canvas ref={canvasRef}
                    width="600" height="600"
                    style={canvasStyle} />
        </Flex>
    );

}//end PrimaryBar
