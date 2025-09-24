//src\common\math\xmath.ts

import { XMath2d }   from "@/math2d/xmath2d";
//import { Vector2d }  from "@/math2d/math2dtypes";
import { Line2d, TDimension, Point2d } from "@/common/types";
import { Rectangle2d } from "@/math2d/model/rectangle2d";


import { point, polygon, booleanPointInPolygon } from "@turf/turf";
const geometric = require('geometric');

/**
 * class XMath2dPoly.getPolyRadius
 */
export class XMath2dPoly  {
 
    //use @turf/turf
    //Convert Point2d to GeoJSON format [lon, lat]
    public static isPointInsidePolygon(p: Point2d, poly: Point2d[]): boolean {
        const turfPoint = point([p.x, p.y]);
        const coords = poly.map(pt => [pt.x, pt.y]);
        if (coords[0][0] !== coords[coords.length - 1][0] || coords[0][1] !== coords[coords.length - 1][1]) {
            coords.push(coords[0]);
        }
        const turfPolygon = polygon([coords]);
        return booleanPointInPolygon(turfPoint, turfPolygon);
    }//

    //polygon: Vector2d array
    public static pointInsideXYPos(pt:Point2d,polygon:Point2d[]): boolean {
        let inside = false;
        const x = pt.x, y = pt.y;
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            const xi = polygon[i].x, yi = polygon[i].y;
            const xj = polygon[j].x, yj = polygon[j].y;
            const intersect = ((yi > y) !== (yj > y)) &&
                (x < (xj - xi) * (y - yi) / (yj - yi + 0 /* avoid -0 */) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
    }//end     
        
    public static pointInside(pt: Point2d, polygon: Point2d[]): boolean {
        let inside = false;
        const { x, y } = pt;
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            const xi = polygon[i].x, yi = polygon[i].y;
            const xj = polygon[j].x, yj = polygon[j].y;
            const intersect =
                (yi > y) !== (yj > y) &&
                x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

            if (intersect) inside = !inside;
        }
        return inside;
    }//end


    public static getArea(polygon: Point2d[]): number {
        let area = 0;
        const n = polygon.length;
        
        for (let i = 0; i < n; i++) {
        const current = polygon[i];
        const next = polygon[(i + 1) % n];
        area += (current.x * next.y) - (next.x * current.y);
        }
        
        return Math.abs(area) / 2;
    }//end


    public static getRectanglePoints(center: Point2d, dim: TDimension): Point2d[] {
        const points: Point2d[] = [
            { x: center.x - dim.width / 2, y: center.y - dim.height / 2 },
            { x: center.x + dim.width / 2, y: center.y - dim.height / 2 },
            { x: center.x + dim.width / 2, y: center.y + dim.height / 2 },
            { x: center.x - dim.width / 2, y: center.y + dim.height / 2 }
        ];        
        return points;
    };//end

    public static getRectanglePolygon(rectangle: Rectangle2d): Point2d[] {
        return rectangle.points;
    };//end

    
    public static getPointBoundsX(points:Point2d[]): number[] {
        let min:number = Infinity;
        let max:number = -Infinity;       
        for(let idx=0; idx<points.length; idx++) {
            if(points[idx].x < min) {
                min = points[idx].x;
            }
            if(points[idx].x > max) {
                max = points[idx].x;
            }
        }
        return [min,max];
    };//end

    public static getPointBoundsY(points:Point2d[]): number[] {
        let min:number = Infinity;
        let max:number = -Infinity;
        for(let idx=0; idx<points.length; idx++) {
            if(points[idx].y < min) {
                min = points[idx].y;
            }
            if(points[idx].y > max) {
                max = points[idx].y;
            }
        }
        return [min,max];
    };//end
    
     public static getPolyBounds(points:Point2d[]): number[][] {
        const boundsX:number[] =XMath2dPoly.getPointBoundsX(points);
        const boundsY:number[] =XMath2dPoly.getPointBoundsY(points);     
        return [boundsX,boundsY];
    };//end

    public static getPolyDimension(points:Point2d[]): TDimension {
        const bounds: number[][] = XMath2dPoly.getPolyBounds(points);   
        return {
            width: bounds[0][1] - bounds[0][0],
            height: bounds[1][1] - bounds[1][0]
        };
    };//end

    public static getPolyRadius(points:Point2d[]): number {
        const center:Point2d = XMath2dPoly.getCenter(points);
        let radius:number = 0.0;
        for (let p of points) {
            const dist = XMath2d.getPointsDistance(center, p);
            if (dist > radius) {radius = dist;}
        }
        return radius;
    };//end

    public static getCenter(points: Point2d[]): Point2d {
        const bounds:number[][] = XMath2dPoly.getPolyBounds(points);
        const dimension: TDimension = {
            width: bounds[0][1] - bounds[0][0],
            height: bounds[1][1] - bounds[1][0]
        };
        const centerX:number= bounds[0][0] + (dimension.width/2);
        const centerY:number= bounds[1][0] + (dimension.height/2);
        return {x:centerX,y:centerY};
    }//end

    // centroide (geométrica) del polígono (fallback razonable)
    public static getPolygonCentroid(polygon: Point2d[]): Point2d {
        let area = 0, cx = 0, cy = 0;
        for (let i = 0; i < polygon.length; i++) {
            const a = polygon[i];
            const b = polygon[(i + 1) % polygon.length];
            const f = a.x * b.y - b.x * a.y;
            area += f;
            cx += (a.x + b.x) * f;
            cy += (a.y + b.y) * f;
        }
        area *= 0.5;
        if (Math.abs(area) < 1e-12) {
            // degenerado -> usar bbox center
            const b = XMath2dPoly.getBounds(polygon);
            return { x: b.minX + b.width / 2, y: b.minY + b.height / 2 };
        }
        cx /= (6 * area);
        cy /= (6 * area);
        return { x: cx, y: cy };
    }

    public static getMinDistToLimits(center: Point2d,
        boundsX: number[],
        boundsY: number[],
        point: Point2d): number {
        let distX: number = 0;
        if (point.x >= center.x) { distX = boundsX[1] - point.x; }
        else { distX = point.x - boundsX[0]; }
        let distY: number = 0;
        if (point.y >= center.y) { distY = boundsY[1] - point.y; }
        else { distY = point.y - boundsY[0]; }
        return Math.min(distX, distY);
    };//end

    public static getEdges(polygon: Point2d[]): Line2d[] {
        const edges: Line2d[] = [];
        for (let i = 0; i < polygon.length; i++) {
            const current = polygon[i];
            const next = polygon[(i + 1) % polygon.length];
            edges.push({start:current,end:next});
        }
        return edges;
    }//end

    public static getBounds(polygon: Point2d[]) {
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        for (let p of polygon) {
            if (p.x < minX) minX = p.x;
            if (p.x > maxX) maxX = p.x;
            if (p.y < minY) minY = p.y;
            if (p.y > maxY) maxY = p.y;
        }
        return { minX, minY, maxX, maxY, width: maxX - minX, height: maxY - minY };
    }//end



    // distancia signada: positiva si inside, negativa si fuera
    public static pointToPolygonDist(point:Point2d, polygon: Point2d[]): number {
        let inside = XMath2dPoly.pointInsideXYPos({ x:point.x, y:point.y }, polygon);
        let minDist = Infinity;
        for (let i = 0; i < polygon.length; i++) {
            const a = polygon[i];
            const b = polygon[(i + 1) % polygon.length];
            const d = XMath2d.getDistancePointToLine({x:point.x,y:point.y}, a, b);
            if (d < minDist) minDist = d;
        }
        return (inside ? minDist : -minDist);
    }


    public static isPointInsideRect(rectangle: Rectangle2d, point: Point2d): boolean {
        const polygon: Point2d[] = XMath2dPoly.getRectanglePolygon(rectangle);
        return XMath2dPoly.pointInsideXYPos(point,polygon)
    }//end



}//end


/*


public static getIntRadius(center: Vector2d,points: Vector2d[]): number {
    const edges: Line2d[] = XMath2dPoly.getEdges(points);
    let radius:number = 1000000000;
    for (let idx=0;idx<edges.length;idx++) {
        const edgeDistance:number 
            = XMath2d.getDistancePointToLineOld(center,edges[idx]);
        if(edgeDistance < radius) {
            radius = edgeDistance;
        }    
    }
    return radius;
}//end
*/