//src\zone3d\three\cameras\orbitcamera.ts

import * as THREE from 'three';

import { TDimension, Point2d, TCameraConfig } from '@/common/types';
import { CircunfUtil } from '@/math2d/functions/circunfutil';
import { XMath2dUtil } from '@/math2d/functions/xmath2dutil';
import { SliderConfig } from '@/radix/sliders/sliderconfig';
import { XMath2d } from '@/math2d/xmath2d';


export type OrbitCameraConf = {
    rotDegreesY: number;
    elevation: number;
    distance: number;
};

/**
 * class OrbitCamera
 */
export class OrbitCamControl {
    
    public static sliderViewRotCfg: SliderConfig 
        = new SliderConfig("camera_rotY","Rot.",{min:0,max:360});

    public static sliderViewDistCfg: SliderConfig 
        = new SliderConfig("camera_distCC","Dist.",{min:1,max:100});

    public static sliderViewElevCfg: SliderConfig 
        = new SliderConfig("camera_elev","Dist.",{min:0,max:50});

    public static ORBCAMERA_ROTY_DEF: number = 0;
    public static ORBCAMERA_DIST_DEF: number = 15;
    public static ORBCAMERA_ELEV_DEF: number = 0;

    public cam: THREE.PerspectiveCamera;
    public cvDim:TDimension;

    public elevation: number = 0;
    public distance: number = 15;
    public rotationY: number = 0;
    
    public config:TCameraConfig = {fov:60,near:0.1,far:5000}

    constructor(cvDim:TDimension,orbitConfig:OrbitCameraConf) {
        this.cvDim      = cvDim;
        this.elevation   = orbitConfig.elevation;
        this.distance    = orbitConfig.distance;
        this.rotationY = XMath2dUtil.toRadians(orbitConfig.rotDegreesY);
        this.cam = new THREE.PerspectiveCamera(
            this.config.fov,
            XMath2d.getAspect(this.cvDim),
            this.config.near,this.config.far);

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