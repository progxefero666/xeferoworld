//src\terrains\functions\voronoi.ts

import { Delaunay } from 'd3-delaunay';
import { Line2d, TDimension } from '@/common/types';
import { Vector2d } from '@/math2d/math2dtypes';
import { XMath2dPoly } from '@/math2d/polygons/mathpoly';
import { VoronoiCell } from '@/terrains/model/voronoicell';


/**
 * class VoronoiCalculator
 */
export class VoronoiCalculator {


    /**
     * Generate random points in area
     *    clustering: number = 0.5 -> Distribución semi-agrupada (valor por defecto)
     *    clustering: number = 1.0 -> Puntos muy agrupados 
     */
    public static getVoronoiRandomPoints(count:number,dimension:TDimension,clustering:number):Vector2d[] {
        const points: Vector2d[] = [];
        for (let pointIdx=0;pointIdx<count;pointIdx++) {
            const coord_x = dimension.width * (Math.random() * clustering + (1 - clustering) * Math.random());
            const coord_y = dimension.height * (Math.random() * clustering + (1 - clustering) * Math.random());
            points.push({ x: coord_x, y: coord_y });
        }
        return points;
    }//end

    /**
     * Calculate Voronoi diagram cells for a set of points within given bounds.
     */
    public static calculateVoronoi(points: Vector2d[], bounds: TDimension): VoronoiCell[] {

        // convert to format array [[x, y], ...]
        const delaunayPoints: [number, number][] = points.map(p => [p.x, p.y]);
        const delaunay = Delaunay.from(delaunayPoints);
        const voronoi = delaunay.voronoi([0, 0, bounds.width, bounds.height]);

        // Process cells
        const cells: VoronoiCell[] = [];
        for (let pointIndex=0;pointIndex<points.length;pointIndex++) {
            const polygonPath = voronoi.renderCell(pointIndex);
            if (!polygonPath) {continue;}
            const polygon: Vector2d[] = this.parseSvgPathToPoints(polygonPath);
            const edges: Line2d[] = XMath2dPoly.getEdges(polygon);
            cells.push({ site: points[pointIndex], polygon, edges });
        }
        return cells;
    }//end

    // Parsear path SVG a puntos Vector2d
    public static parseSvgPathToPoints(path: string): Vector2d[] {
        const points: Vector2d[] = [];

        // Eliminar el "M" inicial y el "Z" final, luego reemplazar "L" con un separador común
        // Luego, dividir por el separador
        const cleanedPath = path.replace(/^M/, '').replace(/Z$/, '').replace(/L/g, '|');
        const coordsPairs = cleanedPath.split('|');

        for (const pair of coordsPairs) {
            const trimmedPair = pair.trim();
            if (trimmedPair) { 
                const coords = trimmedPair.split(',');
                if (coords.length === 2) {
                    const x = parseFloat(coords[0].trim());
                    const y = parseFloat(coords[1].trim());
                    if (!isNaN(x) && !isNaN(y)) {
                        points.push({ x: x, y: y });
                    } 
                    else {
                        console.warn(`invalid Coords: ${coords[0]}, ${coords[1]}`);
                    }
                } 
                else {
                    console.warn(`Par de coordenadas mal formado: ${trimmedPair}`);
                }
            }
        }
        return points;
    }//end

}//end