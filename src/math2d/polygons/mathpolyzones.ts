

import { Circunf2d, Point2d } from "@/common/types";
import { XMath2dPoly } from "@/math2d/polygons/mathpoly";


/**
 * class XMath2dPolyAdv
 *    Implem. polylabel (pole of inaccessibility)
 */
export class XMath2dPolyZones {


    // polylabel cell estruct 
    public static createCell(coords: Point2d, h: number, polygon: Point2d[]) {
        const d = XMath2dPoly.pointToPolygonDist({x:coords.x,y:coords.y}, polygon);
        return { x: coords.x, y: coords.y, h, d, max: d + h * Math.SQRT2 };
    }//end

    // heap max por 'max'
    public static heapPush(heap: any[], item: any) {
        heap.push(item);
        let i = heap.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (heap[p].max >= heap[i].max) break;
            [heap[p], heap[i]] = [heap[i], heap[p]];
            i = p;
        }
    }//end

    public static heapPop(heap: any[]) {
        const n = heap.length;
        if (n === 0) return undefined;
        const top = heap[0];
        const last = heap.pop();
        if (n === 1) return top;
        heap[0] = last;
        let i = 0;
        while (true) {
            const l = i * 2 + 1, r = l + 1;
            let largest = i;
            if (l < heap.length && heap[l].max > heap[largest].max) largest = l;
            if (r < heap.length && heap[r].max > heap[largest].max) largest = r;
            if (largest === i) break;
            [heap[i], heap[largest]] = [heap[largest], heap[i]];
            i = largest;
        }
        return top;
    }//end

    /**
     * getBiggerIntCircunf: center and radius of largest inscribed circle.
     * @param points array of Vector2d (single ring, no holes)
     * @param precision target precision (default 1.0). Lower -> more precise, slower.
     */
    public static getBiggerIntCircunf(points:Point2d[]): Circunf2d {
        const precision = 1.0;
        const bounds = XMath2dPoly.getBounds(points);
        const cellSize = Math.min(bounds.width, bounds.height);

        // degenerated polygon 
        if (cellSize === 0) {            
            return {position:{x:bounds.minX,y:bounds.minY},radius:0};
        }

        const h = cellSize / 2;
        const heap: any[] = [];

        // cubrir bbox con una rejilla inicial de celdas
        for (let x = bounds.minX; x < bounds.maxX; x += cellSize) {
            for (let y = bounds.minY; y < bounds.maxY; y += cellSize) {
                const cellCoords:Point2d = {x:x + h,y:y + h};
                const cell = XMath2dPolyZones.createCell(cellCoords, h, points);
                XMath2dPolyZones.heapPush(heap, cell);
            }
        }

        // use centroid y bbox-center like cells semilla
        const centroid = XMath2dPoly.getPolygonCentroid(points);
        const centroidCell = XMath2dPolyZones.createCell(centroid,h,points);

        const bboxCenterX:number = bounds.minX + (bounds.width /2);
        const bboxCenterY:number = bounds.minY + (bounds.height/2);
        const bboxCenter:Point2d = {x:bboxCenterX,y:bboxCenterY};
        const bboxCenterCell = XMath2dPolyZones.createCell(bboxCenter,h, points);

        XMath2dPolyZones.heapPush(heap, centroidCell);
        XMath2dPolyZones.heapPush(heap, bboxCenterCell);

        // best cell found var
        let best = { x: centroidCell.x, y: centroidCell.y, d: centroidCell.d };
        if (bboxCenterCell.d > best.d) best = { 
            x: bboxCenterCell.x, 
            y: bboxCenterCell.y, 
            d: bboxCenterCell.d };

        // pop/process
        while (heap.length > 0) {
            const cell = XMath2dPolyZones.heapPop(heap);
            if (!cell) break;
            if (cell.max - best.d <= precision) continue;
            if (cell.d > best.d) best = { x: cell.x, y: cell.y, d: cell.d };

            // subdivide cell in 4
            const h2 = cell.h / 2;
            const c1_coords:Point2d ={x:cell.x - h2,y:cell.y - h2};
            const c2_coords:Point2d ={x:cell.x + h2,y:cell.y - h2};
            const c3_coords:Point2d ={x:cell.x - h2,y:cell.y + h2};
            const c4_coords:Point2d ={x:cell.x + h2,y:cell.y + h2};
            const c1 = XMath2dPolyZones.createCell(c1_coords, h2, points);
            const c2 = XMath2dPolyZones.createCell(c2_coords, h2, points);
            const c3 = XMath2dPolyZones.createCell(c3_coords, h2, points);
            const c4 = XMath2dPolyZones.createCell(c4_coords, h2, points);
            XMath2dPolyZones.heapPush(heap, c1);
            XMath2dPolyZones.heapPush(heap, c2);
            XMath2dPolyZones.heapPush(heap, c3);
            XMath2dPolyZones.heapPush(heap, c4);
        }

        const cfRadius:number = Math.max(0, best.d);
        return { position:{x:best.x,y:best.y},radius:cfRadius};
    }//end

}//end

