//src\zone3d\three\cameras\thcamerautil.ts

import { Pivot3d, Axis3d } from "@/math3d/pivot/pivot3d";
import * as THREE from "three";
import { ThreeUtil } from "../util/threeutil";
import { TState3d } from "../threetypes";
import { TCameraConfig, TDimension } from "@/common/types";


/**
 * class CameraUtil.createPerspCamera(canvasDim:TDimension,config:TCameraConfig)
 */
export class CameraUtil {

    public static createPerspCamera(canvasDim:TDimension,config:TCameraConfig):THREE.PerspectiveCamera {
        const aspect = canvasDim.width / canvasDim.height;
        return  new THREE.PerspectiveCamera(config.fov,aspect,config.near,config.far);
    }//end

    public static setPivotState = (camera: THREE.PerspectiveCamera,
                                   pivot:Pivot3d,dist:number,incY:number): void => {
        const pivotCalc: Pivot3d = pivot.getClone();
        pivotCalc.moveInAxis(0, Axis3d.DIR_NEGATIVE, dist);
        pivotCalc.moveInAxis(1, Axis3d.DIR_POSITIVE, incY);
        camera.position.set(
            pivotCalc.position[0],
            pivotCalc.position[1],
            pivotCalc.position[2]
        );
        camera.quaternion.copy(ThreeUtil.eulerToQuaternion(pivotCalc.rotation));
    };//end

    public static getPlCameraState = (pivot:Pivot3d,dist:number,incY:number):TState3d=> {
        const pivotCalc:Pivot3d = pivot.getClone();
        pivotCalc.moveInAxis(0,Axis3d.DIR_NEGATIVE,dist);
        pivotCalc.moveInAxis(1,Axis3d.DIR_POSITIVE,incY); 
        const camPos:number[] = pivotCalc.position;
        const camRot:THREE.Quaternion = ThreeUtil.eulerToQuaternion(pivotCalc.rotation);
        return {position:camPos,rotation:camRot};
    };//end

    public static getPlCameraTarget = (pivot:Pivot3d,incY:number):number[] => {
        const pivotCalc:Pivot3d = pivot.getClone();
        pivotCalc.moveInAxis(0,Axis3d.DIR_POSITIVE,1);
        pivotCalc.moveInAxis(1,Axis3d.DIR_POSITIVE,incY);    
        return pivotCalc.position;
    };//end

}//end
