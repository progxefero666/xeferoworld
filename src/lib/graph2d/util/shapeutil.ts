//src\graph2d\util\shapeutil.ts

import { Dim2d, Point2d } from "@/graph2d/types2d";

/**
 * class ShapeUtil.getRectPoints
 * Utility class for geometric calc.
 */
export class ShapeUtil {


    public static getRectPoints(center:Point2d,dim:Dim2d):Point2d[] {
        const point_0:Point2d = {x:center.x - dim.width/2, y:center.y - dim.height/2};
        const point_1:Point2d = {x:center.x + dim.width/2, y:center.y - dim.height/2};
        const point_2:Point2d = {x:center.x + dim.width/2, y:center.y + dim.height/2};
        const point_3:Point2d = {x:center.x - dim.width/2, y:center.y + dim.height/2};
        return [point_0, point_1, point_2, point_3];
    }//end

}//end class