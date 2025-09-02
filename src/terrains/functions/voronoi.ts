//src\terrains\functions\voronoi.ts
import { TDimension } from '@/common/types';
import { Vector2d } from '@/math2d/math2dtypes';
import { XMath2dPoly } from '@/math2d/polygons/math2dpoly';
import { Delaunay } from 'd3-delaunay';

export interface VoronoiCell {
    site: Vector2d;
    polygon: Vector2d[];
    edges: [Vector2d, Vector2d][];
}

/**
 * class VoronoiCalculator
 */
export class VoronoiCalculator {

    // Generate aleatory points in area
    //clustering: number = 0.5 -> Distribución semi-agrupada (valor por defecto)
    //clustering: number = 1.0 -> Puntos muy agrupados
    static generateRandomPoints(count:number,dimension:TDimension,clustering: number): Vector2d[] {

        const points: Vector2d[] = [];

        for (let i = 0; i < count; i++) {
            const coord_x = dimension.width * (Math.random() * clustering + (1 - clustering) * Math.random());
            const coord_y = dimension.height * (Math.random() * clustering + (1 - clustering) * Math.random());
            points.push({x:coord_x,y:coord_y});
        }

        return points;
    }//end

    // Calcular diagrama de Voronoi
    static calculateVoronoi(points:Vector2d[],bounds:TDimension ): VoronoiCell[] {

        // convert to format array [[x, y], ...]
        const delaunayPoints: [number, number][] = points.map(p => [p.x, p.y]);
        const delaunay = Delaunay.from(delaunayPoints);
        const voronoi = delaunay.voronoi([0, 0, bounds.width, bounds.height]);

        // Process cells
        const cells: VoronoiCell[] = [];
        for (let i = 0; i < points.length; i++) {            
            const polygonPath = voronoi.renderCell(i);
            if (!polygonPath) continue;

            const polygon: Vector2d[] = this.parseSvgPathToPoints(polygonPath);
            const edges:[Vector2d, Vector2d][] = XMath2dPoly.getEdges(polygon);
            cells.push({ site: points[i], polygon, edges });
        }

        return cells;
    }//end

    // Parsear path SVG a puntos Vector2d
    private static parseSvgPathToPoints(path: string): Vector2d[] {
        const points: Vector2d[] = [];
        const commands = path.split(/(?=[LM])/); // Split en comandos M y L

        for (const cmd of commands) {
            if (cmd.startsWith('M') || cmd.startsWith('L')) {
                const coords = cmd.substring(1).trim().split(/\s+/);
                if (coords.length >= 2) {
                    const x = parseFloat(coords[0]);
                    const y = parseFloat(coords[1]);
                    points.push({x:x,y:y});
                }
            }
        }

        return points;
    }//end

}//end