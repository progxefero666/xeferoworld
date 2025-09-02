//src\zone3d\three\exporters\threeglbexporter.ts

import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";

import { ThreeUtil } from "@/zone3d/three/util/threeutil";

/**
 * class GlbExporterUtil
 */
export class GlbExporterUtil {
    
    public static async exportFBXtoGLB(objFbx: THREE.Object3D,outputName:string): Promise<void> {

        const scene = new THREE.Scene();
        scene.add(objFbx);

        const exporter = new GLTFExporter();
        const result = await exporter.parseAsync(scene, { binary: true }) as ArrayBuffer;
        ThreeUtil.downloadObject3dFile(result, outputName);
    }//end


}//end