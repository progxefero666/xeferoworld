//src\math2d\functions\mathplane.ts

import { TDimension, Point2d } from "@/common/types";
import { Plane2dCell } from "../model/planecell";
import { XMath2dPoly } from "../polygons/mathpoly";



/**
 * class Math2dPlane
 */
export class Math2dPlane {
    //const arrayPoints:number[] = Array.from(vertex:Float32Array);

    public static getPlanePointsInXZPos(dimension: TDimension, subdivX: number, subdivY: number): Point2d[] {

        const unitX = dimension.width / subdivX;
        const unitZ = dimension.height / subdivY;
        const vertices: Point2d[] = [];
        for (let col = 0; col < (subdivX + 1); col++) {
            for (let row = 0; row < (subdivY + 1); row++) {
                const coord_x = col * unitX;
                const coord_y = row * unitZ;
                vertices.push({ x: coord_x, y: coord_y });
            }
        }
        return vertices;
    }//end


    public static getPlanePoints(dimension: TDimension, subdivX: number, subdivY: number): Point2d[] {
        const unitX = dimension.width / subdivX;
        const unitZ = dimension.height / subdivY;
        const offsetX = -dimension.width / 2;
        const offsetY = -dimension.height / 2;

        const vertices: Point2d[] = [];
        // row-major: primero filas, luego columnas
        for (let row = 0; row <= subdivY; row++) {
            for (let col = 0; col <= subdivX; col++) {
                const coord_x = offsetX + col * unitX;
                const coord_y = offsetY + row * unitZ;
                vertices.push({ x: coord_x, y: coord_y });
            }
        }
        return vertices;
    }

    public static getPlanePointsOld(dimension: TDimension, subdivX: number, subdivY: number): Point2d[] {
        const unitX = dimension.width / subdivX;
        const unitZ = dimension.height / subdivY;
        const offsetX = -dimension.width / 2;
        const offsetY = -dimension.height / 2;

        const vertices: Point2d[] = [];
        for (let col = 0; col <= subdivX; col++) {
            for (let row = 0; row <= subdivY; row++) {
                const coord_x = offsetX + col * unitX;
                const coord_y = offsetY + row * unitZ;
                vertices.push({ x: coord_x, y: coord_y });
            }
        }
        return vertices;
    }

    public static getCellIndicesOld(row: number, col: number, vertCountX: number): number[] {
        const topLeft = row * vertCountX + col;
        const topRight = topLeft + 1;
        const bottomLeft = (row + 1) * vertCountX + col;
        const bottomRight = bottomLeft + 1;

        return [topLeft, topRight, bottomRight, bottomLeft];
    }//end


    public static getAdjacentCells(faceIdx: number, subdivX: number, subdivY: number): number[] {
        const neighbors: number[] = [];
        const col = faceIdx % subdivX;
        const row = Math.floor(faceIdx / subdivX);
        for (let dRow = -1; dRow <= 1; dRow++) {
            for (let dCol = -1; dCol <= 1; dCol++) {
                if (dRow === 0 && dCol === 0) continue;
                const nRow = row + dRow;
                const nCol = col + dCol;
                if (nRow >= 0 && nRow < subdivY && nCol >= 0 && nCol < subdivX) {
                    neighbors.push(nRow * subdivX + nCol);
                }
            }
        }
        return neighbors;
    }//end


    public static getPlanePolyCellsOld(dimension: TDimension, subdivX: number, subdivY: number): Plane2dCell[] {
        const vertices = Math2dPlane.getPlanePoints(dimension, subdivX, subdivY);
        let faces: Plane2dCell[] = [];
        for (let row = 0; row < subdivY; row++) {
            for (let col = 0; col < subdivX; col++) {
                const indices = Math2dPlane.getCellIndicesOld(row, col, subdivX + 1);
                const points = indices.map(idx => vertices[idx]);
                faces.push(new Plane2dCell(indices, points));
            }
        }
        return faces;
    }//end

    public static getCellIndices(col: number, row: number, subdivX: number, subdivY: number): number[] {
        if (col < 0 || row < 0 || col >= subdivX || row >= subdivY) {
            throw new Error("cell out of range");
        }
        // row-major: stride = subdivX + 1
        const stride = subdivX + 1;
        const topLeft = row * stride + col;
        const topRight = row * stride + (col + 1);
        const bottomLeft = (row + 1) * stride + col;
        const bottomRight = (row + 1) * stride + (col + 1);
        return [topLeft, topRight, bottomRight, bottomLeft];
    }//end



    public static getPlanePolyCells(dimension: TDimension,
                                    subdivX: number, subdivY: number): Plane2dCell[] {
        const vertices = Math2dPlane.getPlanePoints(dimension, subdivX, subdivY);
        const faces: Plane2dCell[] = [];
        // row-major: primero filas, luego columnas
        for (let row = 0; row < subdivY; row++) {
            for (let col = 0; col < subdivX; col++) {
                const indices = Math2dPlane.getCellIndices(col, row, subdivX, subdivY);
                const points: Point2d[] = indices.map(idx => vertices[idx]);
                faces.push(new Plane2dCell(indices, points));
            }
        }
        return faces;
    }//end


    //Math2dPlane.getPolyFacesInsideIndex
    public static getPolyCellsInsideIndex(gridFaces: Plane2dCell[], polyPoints: Point2d[]): number[] {

        const listFacesIndex: number[] = [];
        for (let faceIdx = 0; faceIdx < gridFaces.length; faceIdx++) {
            const isInside: boolean = XMath2dPoly
                .pointInside(gridFaces[faceIdx].position, polyPoints);
            if (isInside) { listFacesIndex.push(faceIdx); }
        }
        return listFacesIndex;
    }//end


}//end 