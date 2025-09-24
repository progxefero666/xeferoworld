//src\characters\model\chanimation.ts

import { Vector3d } from "@/common/types";

/**
 * 
 */
export class ChAnimation {

    public duration:number;
    public countTracks:number;
    public rootPos:Vector3d[];
    public dirDisp:number;
    public velocity:number;

    constructor(duration:number,rootPos:Vector3d[]) {
        this.duration = duration;
        this.rootPos  = rootPos;
        this.countTracks = rootPos.length;
        this.dirDisp  = rootPos[rootPos.length-1].x - rootPos[0].x;
        this.velocity = this.dirDisp / this.duration;
    }//end

}//end 