//src\app\zone3d\universo3d\main\mainheader.tsx

import { useRef } from "react";
import { Flex, Box } from "@radix-ui/themes";
import { TDimension } from "@/common/types";


interface UniverseTextureProps {
    test?: () => void;
}
export function UniverseTexture({ }: UniverseTextureProps) {

    const canvasDimRef = useRef<TDimension>({width:400,height:400});
    const canvasRef = useRef<HTMLCanvasElement>(null);    
        
    const ontest = () => {
    };//end
          
    return(
        <Flex width="100%" direction="column" pt="1" px="2" pb="2" >
            <p>Texture content goes here</p>
        </Flex> 
    )

};//end component