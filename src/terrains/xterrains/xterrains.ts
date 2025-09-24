//src\zone3d\xterrains\xterrains.ts

import * as THREE from 'three'


/**
 * class XTerrains
 */
export class XTerrains {

    public static readonly AXIS_V: string = "Y"; // three.js axis vertical
    public static readonly AXIS_H: string = "X"; // three.js axis horizontal
    public static readonly AXIS_D: string = "Z"; // three.js axis depth

    public static readonly VALUE_ONE_METER: number = 1;
    public static readonly VALUE_TEN_METER: number = 10;
    public static readonly VALUE_ONEHUND_METER: number = 100;
    public static readonly VALUE_FIVEHUND_METER: number = 500;
    public static readonly VALUE_KILOMETER: number = 100;

    public static readonly UNIT_ONE_METER: string = "meter";
    public static readonly UNIT_TEN_METER: string = "meterx10";
    public static readonly UNIT_ONEHUND_METER: string = "meterx100";
    public static readonly UNIT_FIVEHUND_METER: string = "meterx500";
    public static readonly UNIT_KILOMETER: string = "meterx1000";

    public static DEF_UNIT_DIMENSION: string = XTerrains.UNIT_ONEHUND_METER;

};//end class 


/**
 * class XTerrainsUtils.getSubdivisions
 */
export class XTerrUtils {

    //100/0.1-->1000
    public static getSubdivisions(dimUnit:string,sideLength: number): number {
        let result: number = 1;
        if(dimUnit === XTerrains.UNIT_ONE_METER) {
            result= Math.floor(sideLength / XTerrains.VALUE_ONE_METER);
        }
        return result;
    };//end 

    public static getSubdivisionsOld(dimUnit:string,sideLength: number): number {
        let result: number = 1;
        if(dimUnit === XTerrains.UNIT_ONEHUND_METER) {
            result= Math.floor(sideLength / 0.1);
        }
        //alert(result);
        return result;
    };//end 

    public static getDimensionUnit(dimUnit:string,sideLength: number): number {
        let unit: number = 1.0;
        if(dimUnit === XTerrains.UNIT_ONE_METER) {
            unit= sideLength / XTerrains.VALUE_ONE_METER;
        }            
        else if(dimUnit === XTerrains.UNIT_TEN_METER) {
            unit= sideLength / XTerrains.VALUE_TEN_METER;
        }
        else if(dimUnit === XTerrains.UNIT_ONEHUND_METER) {
            unit= sideLength / XTerrains.VALUE_ONEHUND_METER;
        }
        else if(dimUnit === XTerrains.UNIT_FIVEHUND_METER) {
            unit= sideLength / XTerrains.VALUE_FIVEHUND_METER;
        }  
        else if(dimUnit === XTerrains.UNIT_KILOMETER) {
            unit= sideLength / XTerrains.VALUE_KILOMETER;
        }
        return unit;
    };//end

};//end class

/**
 * class XTerrMaterial.getTerrainBasicMaterial
 *  - for apply colors to terrain
 */
export class XTerrMaterial {

    public static TERR_COLOR_BASE:string = "#c27d11";

    public static TERR_ROUGH_BASE:number = 0.5;
    public static TERR_METAL_BASE:number = 0.0;

    public static getTerrainBasicMaterial():THREE.MeshStandardMaterial{
        const material = new THREE.MeshStandardMaterial({
            color: XTerrMaterial.TERR_COLOR_BASE,
            vertexColors: true,
            transparent: true,
            opacity: 1.0,            
            roughness: XTerrMaterial.TERR_ROUGH_BASE,
            metalness: XTerrMaterial.TERR_METAL_BASE
        });  
        return material;
    };//end
    
    public static updateTerrainColors(geometry:THREE.PlaneGeometry) {
        const vertices = geometry.attributes.position.array;
        const colors = new Float32Array(vertices.length);
        
        let minHeight = Infinity;
        let maxHeight = -Infinity;
        
        // Encontrar rango de alturas
        for (let i = 2; i < vertices.length; i += 3) {
            const height = vertices[i];
            minHeight = Math.min(minHeight, height);
            maxHeight = Math.max(maxHeight, height);
        }
        
        // Aplicar colores
        for (let i = 0; i < vertices.length; i += 3) {
            const height = vertices[i+2];
            const normalizedHeight = maxHeight > minHeight ? 
                (height - minHeight) / (maxHeight - minHeight) : 0;
            
            let r, g, b;
            
            if (normalizedHeight < 0.3) {
                // Verde oscuro (valles)
                r = 0.1 + normalizedHeight * 0.3;
                g = 0.3 + normalizedHeight * 0.4;
                b = 0.1;
            } else if (normalizedHeight < 0.6) {
                // Verde claro a marrón (colinas)
                const t = (normalizedHeight - 0.3) / 0.3;
                r = 0.4 + t * 0.3;
                g = 0.7 - t * 0.2;
                b = 0.1 + t * 0.2;
            } else if (normalizedHeight < 0.8) {
                // Gris (rocas)
                const t = (normalizedHeight - 0.6) / 0.2;
                r = 0.7 - t * 0.2;
                g = 0.5 - t * 0.2;
                b = 0.3 + t * 0.2;
            } else {
                // Blanco (nieve)
                const t = (normalizedHeight - 0.8) / 0.2;
                r = 0.5 + t * 0.5;
                g = 0.3 + t * 0.7;
                b = 0.5 + t * 0.5;
            }
            
            colors[i] = r;
            colors[i + 1] = g;
            colors[i + 2] = b;
        }
        
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    };//end

};//end class