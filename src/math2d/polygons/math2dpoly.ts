//src\common\math\xmath.ts

import { XMath2d }   from "@/math2d/xmath2d";
import { Vector2d }  from "@/math2d/math2dtypes";
import { Polygon2d } from "@/math2d/model/polygon2d";
import { TDimension } from "@/common/types";
import { Rectangle2d } from "../model/rectangle2d";


const geometric = require("geometric");

/**
 * class XMath2dPoly.isPointInsidePoly
 */
export class XMath2dPoly  {
 
    public static getArea(polygon: Vector2d[]): number {
        let area = 0;
        const n = polygon.length;
        
        for (let i = 0; i < n; i++) {
        const current = polygon[i];
        const next = polygon[(i + 1) % n];
        area += (current.x * next.y) - (next.x * current.y);
        }
        
        return Math.abs(area) / 2;
    }//end

    public static getRectanglePoints(center: Vector2d, dim: TDimension): Vector2d[] {
        const points: Vector2d[] = [
            { x: center.x - dim.width / 2, y: center.y - dim.height / 2 },
            { x: center.x + dim.width / 2, y: center.y - dim.height / 2 },
            { x: center.x + dim.width / 2, y: center.y + dim.height / 2 },
            { x: center.x - dim.width / 2, y: center.y + dim.height / 2 }
        ];        
        return points;
    };//end

    public static getRectanglePolygon(rectangle: Rectangle2d): Polygon2d {
        return new Polygon2d(rectangle.points);
    };//end

    public static isPointInsidePoly(polygon:Polygon2d,point: Vector2d): boolean {
        const result:boolean = geometric.pointInPolygon(point,polygon.points)
        return result;
    };//end

    public static isPointInsideRect(rectangle: Rectangle2d, point: Vector2d): boolean {
        const polygon: Polygon2d = XMath2dPoly.getRectanglePolygon(rectangle);
        return geometric.pointInPolygon(point,polygon.points)
    };//end

     public static getPolyDimBounds(points:Vector2d[]): TDimension {
        const rect_bounds = geometric.polygonBounds(points);
        const dim_bounds:TDimension = {
            width: rect_bounds[1][0] - rect_bounds[0][0],
            height: rect_bounds[1][1] - rect_bounds[0][1]
        };
        return dim_bounds;
    };//end

    public static getEdges(polygon: Vector2d[]): [Vector2d, Vector2d][] {
        const edges: [Vector2d, Vector2d][] = [];

        for (let i = 0; i < polygon.length; i++) {
            const current = polygon[i];
            const next = polygon[(i + 1) % polygon.length];
            edges.push([current, next]);
        }

        return edges;
    }//end


}//end class