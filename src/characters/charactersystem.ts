//src\characters\chsystem.ts

import * as THREE from 'three';


//velocity:number = dirDisp / anWalkFrontDur; //meters x sec
//Con 5 Km/h-> (1000/720 meters) per second -> 
//             1.38 meters per second    
//bipedConfig = new BipedConfig(1.9,1.38);

/*  
PlayerCfg.SRC_AN_WALKSTART_DISP
................................................
duration:1.5 
count tracks: 45
velocity: 0.6602

PlayerCfg.SRC_AN_WALKFRONT_DISP
................................................
duration:1.0333
count tracks: 31
velocity: 2.1876 m x sec
*/
        

/**
 * class CharacterSystem.SRC_TERRAIN_FBX
 */
export class CharacterSystem {

    public static FRAME_RATE: number = 30;
    public static ARMBODY_ANM_ACTBASE:string = "default";

    public static SRC_TERRAIN: string='/terrains/terrain.glb';

    //const frameDuration = 1/CharacterSystem.FRAME_RATE;
    
}//end