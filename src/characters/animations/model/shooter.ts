//src\characters\animations\model\shooter.ts

import { TDimension3d, TTimePosition } from '@/common/types';
import { Math3dUtil } from '@/math3d/functions/math3dutil';
import { GlbAnimationLoader } from '@/zone3d/three/loaders/animationloader';
import { GlbAnUtil } from '@/zone3d/three/loaders/anmutil';
import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';


//const timeUnitB: number =animation.animations[0].duration / frames.length;
//frames[0].position
//{x: 0.006231921911239624, y: 1.1002813720703124, z: 0.004413867890834808}
/**
 * class ShooterAnimation
 */
export class ShooterAnimation {    

    public url:string;
    //public group:THREE.Group;
    public gltf:GLTF|null=null;
    public frames:TTimePosition[]=[];
    public timeUnit: number=0;
    public dirDistance:number=0;
    public dimension:TDimension3d={width:0,height:0,depth:0};
    public radius:number=0;
    public listObj:THREE.SkinnedMesh[]=[];

    constructor(url:string) {//group:THREE.Group
        this.url = url;     
        //this.group = group;
    }//end

    public async loadAnimation():Promise<boolean>{
        this.gltf = await GlbAnimationLoader.readAnimation(this.url);
        this.frames = GlbAnUtil.getCmKeyframes(this.gltf);     
        this.timeUnit = this.frames[1].time- this.frames[0].time;
        this.dirDistance = Math.abs(Math3dUtil.getAxisTranslation(0,
            this.frames[0].position,
            this.frames[this.frames.length-1].position));     
        const times:number[] = this.getListTimes();            
        this.listObj = await GlbAnUtil.readKfListSkinMesh(this.url,times,true);     
        
        const meshWidth = GlbAnUtil.getSkinMeshSize(this.listObj[0],2);    
        this.dimension = {
            width:meshWidth,
            height:GlbAnUtil.getSkinMeshSize(this.listObj[0],1),
            depth:meshWidth
        };

        if(this.dimension.width>this.dimension.depth) {
            this.radius = this.dimension.width/2;
        }
        else {
            this.radius = this.dimension.depth/2;
        }

        return true; 
    }//end

    public loadPose(poseIndex:number){
        if(poseIndex === this.listObj.length) {
            poseIndex = 0;
        };
        //this.group.clear();
        //this.group.add(this.listObj[poseIndex]);
    }//end

    public getListTimes():number[]{
        const framesTimes: number[] = [];
        for(let i=0;i<this.frames.length;i++){
            framesTimes.push(this.frames[i].time);
        }        
        return framesTimes;
    }//end
        
}//end