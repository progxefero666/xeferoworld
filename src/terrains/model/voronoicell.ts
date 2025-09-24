//src\terrains\model\voronoicell.ts

import { Line2d } from '@/common/types';
import { Vector2d } from '@/math2d/math2dtypes';

export interface VoronoiCell {
    site: Vector2d;
    polygon: Vector2d[];
    edges: Line2d[];
}//end
