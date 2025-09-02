//src\zone3d\three\objects\thpivot3d.ts

import { Pivot3d } from '@/math3d/pivot/pivot3d';
import { ThreeLine3d } from '@/zone3d/three/objects/thline3d';
import { GlSystem3d } from '@/zone3d/glsystem3d';
import { GeoFunction } from '@/zone3d/three/util/geofunction';

/**
 * class ThreePivot3d
 */
export class ThreePivot3d extends Pivot3d {

    public axisLines: ThreeLine3d[] = [];

    constructor() {
        super();
        this.generateAxisLines();
    };//end constructor

    private generateAxisLines(): void {
        this.axisLines[0] = GeoFunction.generateThreeLine(
            this.pivotAxis[0].axis_vertex_0, 
            this.pivotAxis[0].axis_vertex_1,
            GlSystem3d.AXIS_X_COLOR
        );
        this.axisLines[1] = GeoFunction.generateThreeLine(
            this.pivotAxis[1].axis_vertex_0, 
            this.pivotAxis[1].axis_vertex_1,
            GlSystem3d.AXIS_Y_COLOR
        ); 
        this.axisLines[2] = GeoFunction.generateThreeLine(
            this.pivotAxis[2].axis_vertex_0, 
            this.pivotAxis[2].axis_vertex_1,
            GlSystem3d.AXIS_Z_COLOR
        );             
    };//end

};//end class