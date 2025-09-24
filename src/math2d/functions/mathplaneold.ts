//src\math2d\functions\mathplane.ts

import { TDimension, Point2d } from "@/common/types";
import { Plane2dCell } from "@/math2d/model/planecell";


/**
 * class Math2dPlane.getPlanePolyFaces(this.dimension,subdivX,subdivY);
 */
export class Math2dPlaneOld {

    /* used types:
        export type TDimension = {
            width:  number;
            height: number;
        };    
    export class Plane2dPolyFace {
        
        
        public indices:number[] = [];
        public points:Vector2d[];
        
        //calculated after
        public position:Vector2d;

    */
   /*
    public static getPlaneTrianglesConfig(subdivX: number, subdivY: number): number[][] {
        let trsConfig: number[][] = [];
        const vertCountX = subdivX + 1;
        
        // Para cada celda del grid
        for (let row = 0; row < subdivY; row++) {
            for (let col = 0; col < subdivX; col++) {
                const topLeft = row * vertCountX + col;
                const topRight = topLeft + 1;
                const bottomLeft = (row + 1) * vertCountX + col;
                const bottomRight = bottomLeft + 1;
                
                // Triángulo 1: topLeft, bottomLeft, topRight
                trsConfig.push([topLeft, bottomLeft, topRight]);
                
                // Triángulo 2: topRight, bottomLeft, bottomRight
                trsConfig.push([topRight, bottomLeft, bottomRight]);
            }
        }
        
        return trsConfig;
    }
    public static getPlanePoints(dimension:TDimension,subdivX:number,subdivY:number): Vector2d[] {
        
        const stepX = dimension.width / subdivX;
        const stepZ = dimension.height / subdivY;
        const halfW = dimension.width / 2;
        const halfH = dimension.height / 2;

        // y representa Z coordinate
        // Orden: fila por fila, Z+ a Z-, X- a X+
        const vertices: Vector2d[] = [];
        for (let row=0;row<(subdivY+1);row++) {
            for (let col=0;col<(subdivX+1);col++) {
                const coord_x = -halfW + col * stepX;
                const coord_y = halfH - row * stepZ;
                vertices.push({x:coord_x,y:coord_y});
            }
        }
        return vertices;
    }//end


    */

}//end

/*
    GeoFunction
    public static getThreePlaneGeometryVertex(sideLength:number,subdivisions:number):Float32Array {
        const geometry = new THREE.PlaneGeometry(sideLength, sideLength, subdivisions, subdivisions);
        geometry.rotateX(-Math.PI / 2);
        return geometry.attributes.position.array as Float32Array;
    } 
*/