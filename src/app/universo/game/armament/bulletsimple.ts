//src\universo3d\game\military\bullets\bulletmod_a.ts

import { TCylinderConfig, Vector3d } from '@/common/types';
import { MVector3d } from '@/math3d/pivot/mathpivot3d';
import { FlySystemUtil } from '@/system3d/flysystem/flysystemutil';
import * as THREE from 'three';

/**
 * class BulletSimple
 */
export class BulletSimple {

    public config:TCylinderConfig;
    public distMax:number;
    public phyVelocity:number;
    public tickVelocity:number;
    public coordsInit:Vector3d;
    public direction: MVector3d;

    public active:boolean;
    public mesh: THREE.Mesh;

    constructor(material:THREE.MeshBasicMaterial,
                config:TCylinderConfig,                    
                distMax:number, phyvelocity:number,
                coordsInit:Vector3d, direction:MVector3d){

        this.config       = config;            
        this.distMax      = distMax;
        this.phyVelocity  = phyvelocity;
        this.coordsInit   = coordsInit;
        this.direction    = direction;
        this.tickVelocity = FlySystemUtil.msToTick(this.phyVelocity);

        const bulletGeometry = new THREE.CylinderGeometry(
            config.radius,config.radius,config.len,
            config.radialseg,config.lenseg
        );
        this.mesh = new THREE.Mesh(bulletGeometry, material); 

        this.active = true;     
    };//end

 
    public dinamic(delta:number) {
        //this.active=false;
    }//end

}//end