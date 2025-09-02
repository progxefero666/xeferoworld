//src\graph2d\graph2d.ts

import { Dim2d, Point2d } from "@/lib/graph2d/types2d";


/**
 * class Graph2d.POINT_DEF
 */
export class Graph2d {

    public static readonly POINT_DEF:Point2d = {x:0,y:0};

    public static readonly DIM_DEF:Dim2d     = {width:0,height:0};

    public static readonly ROTATION_NONE: number = 0;

    public static init() {
        // Initialization logic if needed
    }

}//end class Graph2d