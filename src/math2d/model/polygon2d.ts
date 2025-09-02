// src/math2d/model/polygon2d.ts

import { TDimension } from "@/common/types";
import { Vector2d } from "@/math2d/math2dtypes";
import { XMath2d } from "../xmath2d";
import { XMath2dPoly } from "../polygons/math2dpoly";

const geometric = require("geometric");

/**
 * class Polygon 2D
 */
export class Polygon2d {

    public points:    Vector2d[];
    public dimension: TDimension = XMath2d.DIM_0;

    constructor(points: Vector2d[]) {
        this.points     = points;
        this.dimension  = XMath2dPoly.getPolyDimBounds(this.points);
    };//end

    public isPointInside(point: Vector2d): boolean {
        return geometric.pointInPolygon(point, this.points);
    };//end

};//end class