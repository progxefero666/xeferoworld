//src\universo3d\game\military\bullets\bulletmod_a.ts

import { TCylinderConfig, Vector3d } from '@/common/types';
import { MVector3d } from '@/math3d/pivot/mathpivot3d';
import { FlySystemUtil } from '@/system3d/flysystem/flysystemutil';
import * as THREE from 'three';
import { PlayerArmyCfg } from '../player/playerconfig';
import { GenWeapons } from '../player/playersysattack';

/**
 * class BulletSimple
 */
export class BulletSimple {

    public mesh: THREE.Mesh;
    public distMax:number = PlayerArmyCfg.ATT_DIST_TO_CONVERG;
    public phyVelocity:number  = PlayerArmyCfg.ATT_BULL_A_PHYVEL;
    public tickVelocity:number=FlySystemUtil.msToTick(PlayerArmyCfg.ATT_BULL_A_PHYVEL);
    public coordsInit:Vector3d;
    public direction: MVector3d;
    public active:boolean;

    constructor(coordsInit:Vector3d,direction:MVector3d){               
        this.coordsInit   = coordsInit;
        this.direction    = direction;
        this.mesh = GenWeapons.genBulletA(); 
        this.active = true;     
    };//end

    public dinamic(delta:number) {
        //this.active=false;
    }//end

}//end