
//src\app\zone3d\page_monitor.tsx

import { useState, useEffect, useRef } from "react";

import * as THREE from 'three'
import { Box, Flex, Text } from "@radix-ui/themes";
import { RdxThContainers } from "@/radix/rdxthcontainers";
import { TDimension } from "@/common/types";

import { TerrainScene } from "./terrainscene";
import { GlTerrain } from "@/terrains/xterrains/glmodel/glterrain";

let renderer: THREE.WebGLRenderer | null = null;
let terrScene: TerrainScene | null = null;

/**
 * Jsx Component Three WebGL Monitor
 */
interface CompProps {
    terrain: GlTerrain | null;
    glblocks:THREE.Mesh[];
    onExport?: () => void;
};
export function TestThreeMonitor({terrain,glblocks }: CompProps) {

    const canvasDimRef = useRef<TDimension>({ width: 700, height: 650 });
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [wglready, setWglReady] = useState<boolean>(false);
    
    useEffect(() => {
        if (typeof window === "undefined" || typeof document === "undefined") return;
        if (wglready) { return; }

        const init = async () => {
            const aspect = canvasDimRef.current.width / canvasDimRef.current.height;
            renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current! });
            renderer.setSize(canvasDimRef.current.width, canvasDimRef.current.height);
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;

            terrScene = new TerrainScene(renderer, aspect);
            if(terrain){loadTerrain();}

            animate();
            setWglReady(true);
            window.addEventListener('resize', handleResize);
        };//end

        init();        
        return () => {
            // unmount cleanup
            window.removeEventListener('resize', handleResize);
            if (renderer && renderer.domElement.parentNode) {
                renderer.domElement.parentNode.removeChild(renderer.domElement);
            }
        };
    }, []);

    const handleResize = () => {
        const aspect = canvasDimRef.current.width / canvasDimRef.current.height;
        renderer!.setSize(window.innerWidth, window.innerHeight);
        terrScene!.onResize(aspect, renderer!);
    };//end
 
    // Load terrain into the scene
    const loadTerrain = () => {
        terrScene!.scene.add(terrain!.mesh!);
        
        for(let idx=0;idx<glblocks.length;idx++){             
            terrScene!.scene.add(glblocks[idx]);
        }
        
    };//end

    // Animation loop
    const animate = () => {
        requestAnimationFrame(animate);
        if (terrScene!.orbitControls) {
            terrScene!.orbitControls.update();
        }
        renderer!.render(terrScene!.scene!, terrScene!.camera!);
    };//end animate function

    return (
        <Flex width="100%" direction="column" justify="start" px="2" py="1" gapY="2"
            style={RdxThContainers.SECONDARY_CONTENT}>
            <Box width="100%">
                <canvas ref={canvasRef}
                    width={canvasDimRef.current.width}
                    height={canvasDimRef.current.height}
                    style={{ backgroundColor: 'black' }} />
            </Box>
            <Flex width="100%" direction="row">
                <Text size="2">Canvas player commands</Text>
            </Flex>
        </Flex>
    );
    
};//end component