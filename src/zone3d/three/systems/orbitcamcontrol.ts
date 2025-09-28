//src\zone3d\three\cameras\orbitcamera.ts

import * as THREE from 'three';

import { TDimension, Point2d } from '@/common/types';
import { CircunfUtil } from '@/math2d/functions/circunfutil';
import { XMath2dUtil } from '@/math2d/functions/xmath2dutil';
import { SliderConfig } from '@/radix/sliders/sliderconfig';


/**
 * class OrbitCamera
 */
export class OrbitCamControl {
    
    public static ORBCAMERA_ROTY_DEF: number = 0;
    public static ORBCAMERA_DIST_DEF: number = 30;
    public static ORBCAMERA_ELEV_DEF: number = 6;
    public static sliderViewRotCfg: SliderConfig = new SliderConfig("camera_rotY","Rot.",{min:0,max:360});
    public static sliderViewDistCfg: SliderConfig = new SliderConfig("camera_distCC","Dist.",{min:1,max:100});
    public static sliderViewElevCfg: SliderConfig = new SliderConfig("camera_elev","Dist.",{min:0,max:50});


    public cam: THREE.PerspectiveCamera;

    public cvDim:TDimension;
    public perspective:number = 0;
    public elevation: number = 0;
    public distance: number = 0;
    public rotationY: number = 0;

    constructor(cvDim:TDimension,perspective:number,
                rotDegreesY:number,
                elevation?:number,distance?:number) {
        this.cvDim      = cvDim;
        this.perspective = perspective;
        this.elevation   = elevation ?? OrbitCamControl.ORBCAMERA_ELEV_DEF;
        this.distance    = distance?? OrbitCamControl.ORBCAMERA_DIST_DEF;
        if(rotDegreesY){
            this.rotationY = XMath2dUtil.toRadians(rotDegreesY);
        }
        this.cam = new THREE.PerspectiveCamera(this.perspective,1.0,0.1,1000);
        this.update();    
    }//end

    public updateParam = (index:number,value:number) => {
        if(index === 0) {
            this.rotationY = XMath2dUtil.toRadians(value);
        }
        else if(index === 1) {
            this.distance = value;
        }
        else if(index === 2) {
            this.elevation = value;
        }
        this.update();
    };//end    

    public update = () => {
        const center:Point2d = {x:0.0,y:0.0};
        const coord2d:Point2d=CircunfUtil
            .getCfCoords(center,this.distance,this.rotationY);
        this.cam.position.set(coord2d.x,this.elevation,coord2d.y);
        this.cam.lookAt(0,this.elevation,0);
    }//end    

    //this.aspect = this.aspect;
    //this.updateProjectionMatrix();
    //(cvDim.width/cvDim.height)
    
}//end