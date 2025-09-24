import { CharacterSystem } from '@/characters/charactersystem';
import { PlayerCfg } from '@/characters/playerconfig';
import { Vector3d } from '@/common/types';
import { Math3dUtil } from '@/math3d/functions/math3dutil';
import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';


export class DeltaShooterAnimation {

    public gltf: GLTF;
    public model: THREE.Object3D;
    public mixer: THREE.AnimationMixer;
    public actions: Record<string, THREE.AnimationAction> = {};
    public duration: number = 0;
    public current: THREE.AnimationAction | null = null;

    public handBoneName: string;
    public handPosInit: Vector3d = { x: 0, y: 0, z: 0 };
    public handPosLast: Vector3d = { x: 0, y: 0, z: 0 };
    public gunPosInit: Vector3d;
    public gunPosLast: Vector3d = { x: 0, y: 0, z: 0 };

    constructor(appScene: THREE.Scene, gltf: GLTF, handBoneName: string, gunPosInit: Vector3d) {
        this.gltf = gltf;
        this.handBoneName = handBoneName;
        this.gunPosInit = gunPosInit;

        appScene.add(this.gltf.scene);
        this.duration = this.gltf.animations[0].duration;
        this.mixer = new THREE.AnimationMixer(this.gltf.scene);
        this.model = this.gltf.scene;

        const action = this.mixer.clipAction(this.gltf.animations[0]);
        action.reset();
        this.actions[CharacterSystem.ARMBODY_ANM_ACTBASE] = action;
        //this.mixer.addEventListener("finished", (e) => {});
    }//end

    public init() {
        const action = this.actions[CharacterSystem.ARMBODY_ANM_ACTBASE];
        if (!action) return false;
        if (this.current && this.current !== action) {
            this.current.stop();
        }
        action.play();
        this.current = action;
        //capture hand init position        
        this.mixer.update(0.0);
        this.model.updateMatrixWorld(true);
        this.handPosInit = this.getBonePosition(this.handBoneName);
        this.handPosLast = this.handPosInit;
        this.gunPosLast = this.gunPosInit;
    }//end

    //this.model.rotateY(Math.PI/180); //rotate to back

    public update(delta: number, pos: Vector3d): Vector3d {

        this.mixer.update(delta);

        // aplicar traslación al modelo raíz
        this.model.position.set(pos.x, pos.y, pos.z);
        //this.model.rotateY(Math.PI); 
        //console.log(this.model.position);
        this.model.updateMatrixWorld(true);

        // obtener posición del hueso de la mano
        const handPos: Vector3d = this.getBonePosition(this.handBoneName);
        const trans: number[] = Math3dUtil.getTranslation(this.handPosLast, handPos);
        const gunPos: Vector3d = Math3dUtil.getTranslatedPoint(this.gunPosLast, trans);

        // actualizar históricos
        this.handPosLast = handPos;
        this.gunPosLast = gunPos;

        return gunPos;
    }//end

    /*
    public update(delta:number):Vector3d {
        this.mixer.update(delta);
        this.model.updateMatrixWorld(true);
        const handPos:Vector3d = this.getBonePosition(this.handBoneName);
        const trans:number[]   = Math3dUtil.getTranslation(this.handPosLast,handPos);
        const gunPos:Vector3d  = Math3dUtil.getTranslatedPoint(this.gunPosLast,trans);
        this.handPosLast = handPos;
        this.gunPosLast  = gunPos;
        return gunPos;
    }//end
    */
    public stop() {
        this.mixer.stopAllAction();
        this.current = null;
    }//end

    public getBone(name: string): THREE.Bone | null {
        let boneResult: THREE.Bone | null = null;
        this.model.traverse((object: any) => {
            if (object.isBone && object.name === name) {
                boneResult = object;
            }
        });
        return boneResult;
    }//end 

    public getBonePosition(boneName: string): Vector3d {
        const bone = this.getBone(boneName);
        this.model.updateMatrixWorld(true);
        const boneThreePos = new THREE.Vector3()
        bone!.getWorldPosition(boneThreePos);
        return {
            x: boneThreePos.x,
            y: boneThreePos.y,
            z: boneThreePos.z
        };
    }//end     

}//end 

