//src\zone3d\three\threeutil.ts

import { Vector3d } from '@/common/types';
import * as THREE from 'three'
import { ThreeLine3d } from '../objects/thline3d';
import { Pivot3d } from '@/math3d/pivot/pivot3d';
import { GeoFunction } from './geofunction';
import { GlSystem3d } from '../../glsystem3d';

/**
 * class ThreeUtil.getPivotAxisLines
 */
export class ThreeUtil {

    public static getColorsBuffer(colors: string[]): Float32Array {
        const numPoints = colors.length;
        const colorValues = new Float32Array(numPoints * 3);
        for (let i = 0; i < numPoints; i++) {
            const color = new THREE.Color(colors[i]);
            colorValues[i * 3] = color.r;
            colorValues[i * 3 + 1] = color.g;
            colorValues[i * 3 + 2] = color.b;
        }
        return colorValues;
    };
        
    public static getVector3dArray(vector3d: Vector3d): number[] {
        return [vector3d.x, vector3d.y, vector3d.z];
    };//end

    public static getThreeVertex(point: Vector3d): THREE.Vector3 {
        return new THREE.Vector3(point.x, point.y, point.z);
    };//end
    
    public static toThreeVector(coords: number[]): THREE.Vector3 {
        return new THREE.Vector3(coords[0], coords[1], coords[2]);
    };//end

    public static  getPivotAxisLines(pivot:Pivot3d): ThreeLine3d[] {
        const lines:ThreeLine3d[] = [];
        lines[0] = GeoFunction.generateThreeLine(
            pivot.pivotAxis[0].axis_vertex_0, 
            pivot.pivotAxis[0].axis_vertex_1,
            GlSystem3d.AXIS_X_COLOR
        );
        lines[1] = GeoFunction.generateThreeLine(
            pivot.pivotAxis[1].axis_vertex_0, 
            pivot.pivotAxis[1].axis_vertex_1,
            GlSystem3d.AXIS_Y_COLOR
        ); 
        lines[2] = GeoFunction.generateThreeLine(
            pivot.pivotAxis[2].axis_vertex_0, 
            pivot.pivotAxis[2].axis_vertex_1,
            GlSystem3d.AXIS_Z_COLOR
        );
        return lines;
    };//end

    public static toThreeVectors(coords_0:number[],coords_1:number[]): THREE.Vector3[] {
        return [ThreeUtil.toThreeVector(coords_0),
                ThreeUtil.toThreeVector(coords_1)];
    };//end

    // manejar el caso GLTF (JSON)
    //const json = JSON.stringify(result, null, 2);
    //saveFile(new TextEncoder().encode(json), 'merged.gltf');
    public static downloadObject3dFile(data: ArrayBuffer, filename: string) {
        const blob = new Blob([data], { type: "application/octet-stream" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }//end

};//end class