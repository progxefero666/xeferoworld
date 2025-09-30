//src\universo3d\game\player\playerarmy.ts

import * as THREE from 'three';
import { FlySystemUtil } from '@/system3d/flysystem/flysystemutil';

import { TCylinderConfig, Vector3d } from '@/common/types';
import { System3d } from '@/system3d/system3d';
import { MVector3d } from '@/math3d/pivot/mathpivot3d';
import { BulletModA } from '@/app/universo/game/armament/bullets_a';
import { Player } from '@/app/universo/game/player/player';
import { PlayerArmyCfg, PlayerShipCfg } from './playerconfig';
import { GlbUtil } from '@/zone3d/three/loaders/glbutil';
import { Pivot3d } from '@/math3d/pivot/pivot3d';
import { XMath2d } from '@/math2d/xmath2d';


/**
 * class GenWeapons.genBulletA();
 */
export class GenWeapons {

    public static MODEL_BULLET_A:THREE.Mesh = GenWeapons.genBulletModelA();

    public static genBulletModelA():THREE.Mesh {
        
        const config:TCylinderConfig = PlayerArmyCfg.BULLETS_A_CFG; 

        const material = new THREE.MeshBasicMaterial({color:config.color});        
        const geometry = new THREE.CylinderGeometry(            
            config.radius,config.radius,config.len,
            config.radialseg,config.lenseg
        );
        const objMesh:THREE.Mesh = new THREE.Mesh(geometry, material); 
        const vertexBase = GlbUtil.getGlMeshVertexArray(objMesh);
        const pivot:Pivot3d = new Pivot3d();
        const vertexMesh:Float32Array = pivot
            .rotateArrayPointsInAxis(0,vertexBase,XMath2d.ROTATION_90);
        objMesh.geometry.setAttribute('position', new THREE.BufferAttribute(vertexMesh,3));
        objMesh.geometry.attributes.position.needsUpdate = true;
        objMesh.geometry.computeBoundingBox();
        objMesh.geometry.computeBoundingSphere();    
        return objMesh;
    }//end 

    public static genBulletA():THREE.Mesh {
        return GenWeapons.MODEL_BULLET_A.clone();
    }//end 

}//end

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
export class PlayerSystemAttack {

    //force attack
    public player:Player;
 
    public bulletsA: BulletModA[];

    //constructor
    constructor(player:Player){
        this.player = player;
        this.bulletsA = [];
    }//end

     //const objMesh:THREE.Mesh =GenWeapons.genBulletA();
    public fireBulletsA() {
        const cannonsCoord:Vector3d[] = this.player.getCannonsPosition();
        const cannondDir:MVector3d[] = this.player.getCannonsDirections(cannonsCoord);
           
        const newBulletR:BulletModA = new BulletModA(cannonsCoord[0],cannondDir[0]);    
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