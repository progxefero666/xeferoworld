import * as THREE from 'three';


export class ArmBodyAnimation {
    
    public model: THREE.Object3D;
    public mixer: THREE.AnimationMixer;
    public actions: Record<string, THREE.AnimationAction>;
    public duration: number;
    public current: THREE.AnimationAction | null;

    constructor(model:THREE.Object3D,
                mixer:THREE.AnimationMixer,
                actions:Record<string,THREE.AnimationAction>,
                duration:number,
                current?: THREE.AnimationAction) {

        this.model = model;
        this.mixer = mixer;
        this.actions = actions;
        this.duration = duration;
        this.current = current || null;
    }//end

}//end 