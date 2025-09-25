//src\universo3d\game\player\playerarmy.ts

import * as THREE from 'three';
import { FlySystemUtil } from '@/system3d/flysystem/flysystemutil';

import { TCylinderConfig, Vector3d } from '@/common/types';
import { System3d } from '@/system3d/system3d';
import { MVector3d } from '@/math3d/pivot/mathpivot3d';
import { BulletSimple } from '@/app/universo/game/armament/bulletsimple';
import { Player } from '@/app/universo/game/player/player';
import { PlayerConfig } from './playerconfig';


/*
gunsight     // Mira de arma/cañón
targeting reticle  // Mira de targeting
HUD crosshair      // Crosshair del HUD
Elige un tiempo-a-mirilla 𝜏
τ fijo (sensación de respuesta).

Regla típica: 0.4–0.6 s.

Elige vida útil de la bala 
Típico: 1.5–2.5 s.
*/
export class PlayerArmy {

    //force attack
    public player:Player;
    //public cannonsCoord:Vector3d[] = [];
    public bulletsA_mat:THREE.MeshBasicMaterial;  
    public bulletsA: BulletSimple[];

    //constructor
    constructor(player:Player){
        this.player = player;

        this.bulletsA_mat = new THREE.MeshBasicMaterial
                ({color:PlayerConfig.BULLETS_A_CFG.color});
        this.bulletsA = [];
    }//end

    public fireBulletA(coordsInit:Vector3d,direction:MVector3d):BulletSimple{
        console.log('bullet fired');
        const bullet = new BulletSimple(
            this.bulletsA_mat,
            PlayerConfig.BULLETS_A_CFG,            
            PlayerConfig.ATT_TIME_TO_CONVERG,
            PlayerConfig.ATT_BULL_A_PHYVEL,
            coordsInit,direction);
        return bullet;    
    }//end

    public fireBulletsA() {
        const cannonsCoord:Vector3d[] = this.player.getCannonsPosition();
        const cannondDir:MVector3d[] = this.player.getCannonsDirections(cannonsCoord);
        
        const newBulletR:BulletSimple = this.fireBulletA(cannonsCoord[0],cannondDir[0]);        
        //const newBulletL:BulletSimple = this.fireBulletA(cannonsCoord[1],cannondDir[1]);
        this.bulletsA.push(newBulletR);
        
    }//end

    public dinamic(delta:number) {

        if(this.bulletsA.length>0){
            this.bulletsA.forEach(bullet => bullet.dinamic(delta));
            //check collision for active bullets
            for(let idx=0;idx<this.bulletsA.length;idx++){
                if(this.bulletsA[idx].active){

                }
            }
            //remove dead bullets
            this.bulletsA = this.bulletsA.filter(bullet => bullet.active);
        }
    }//end


}//end