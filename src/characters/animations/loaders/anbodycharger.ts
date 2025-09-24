//src\zone3d\three\loaders\glbcharacterutil.ts


import * as THREE from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { CharacterSystem } from "@/characters/charactersystem";

import { GlbAnUtil } from "src/zone3d/three/loaders/anmutil";
import { ArmBodyAnimation } from "@/characters/animations/model/anarmbody";
import { Vector3d } from "@/common/types";


/*
    if (plAnWalkStartOld) { 
        if(plAnDeltaSum<plAnWalkStartOld!.duration){
            plAnWalkStartOld!.mixer.update(delta);
            plAnWalkStartOld!.model.updateMatrixWorld(true); 

            const handPos = AnArmBodyCharger
                .getBonePosition(plAnWalkStartOld!,PlayerCfg.BONE_HANDRIGHT);
            //console.log(handPos);
            plAnDeltaSum+=delta;
        }            
    }    
*/

/**
 * class AnArmBodyCharger.getAnBonePosition
 */
export class AnArmBodyCharger {

    public static  async chargeAnimation(gltf:GLTF,scene:THREE.Scene): Promise<ArmBodyAnimation> {
        scene.add(gltf.scene);
        const anmMixer = new THREE.AnimationMixer(gltf.scene);
        const anmActions: Record<string, THREE.AnimationAction> = {};
        const action = anmMixer.clipAction(gltf.animations[0]);
        action.reset();
        anmActions[CharacterSystem.ARMBODY_ANM_ACTBASE] = action;

        anmMixer.addEventListener("finished", (e) => {
            //console.log("Animation finished");
        });
        return new ArmBodyAnimation
            (gltf.scene,anmMixer,anmActions,gltf.animations[0].duration);
    }//end

    public static playAnimation(bodyAnimation: ArmBodyAnimation): boolean {
        const action = bodyAnimation.actions[CharacterSystem.ARMBODY_ANM_ACTBASE];
        if (!action) return false;
        if (bodyAnimation.current && bodyAnimation.current !== action) {
            bodyAnimation.current.stop();
        }
        action.play();
        bodyAnimation.current = action;
        return true;
    }//end

    public static getAnSceneBone(root: THREE.Object3D, name: string): THREE.Bone | null {
        let boneResult: THREE.Bone | null = null;
        root.traverse((object: any) => {
            if (object.isBone && object.name === name) {
                boneResult = object;//console.log("Bone found");
            }
        });
        return boneResult;
    }//end 

    private static _bonePosTemp = new THREE.Vector3();
    public static getBonePosition(animation:ArmBodyAnimation,boneName:string): Vector3d {
        const root = animation.model;
        if (!root) { console.error("No model"); return { x: 0, y: 0, z: 0 }; }

        const bone = AnArmBodyCharger.getAnSceneBone(root, boneName);
        //if(!bone) {console.error("Bone not found"); return {x:0,y:0,z:0};}
        root.updateMatrixWorld(true);  
        bone!.getWorldPosition(AnArmBodyCharger._bonePosTemp);
        return {x:AnArmBodyCharger._bonePosTemp.x, 
                y:AnArmBodyCharger._bonePosTemp.y,
                z:AnArmBodyCharger._bonePosTemp.z };
    }//end 

}//end 


export function stopAnimation(bodyAnimation: ArmBodyAnimation): void {
    bodyAnimation.mixer.stopAllAction();
    bodyAnimation.current = null;
}//end