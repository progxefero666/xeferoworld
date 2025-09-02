//src\terrains\model\terrainzone.ts

import { Vector2d } from "@/common/types";

export interface TerrainZone {
    id: string;
    center: Vector2d;
    polygon: Vector2d[];
    area: number;
}