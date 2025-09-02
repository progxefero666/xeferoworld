//src\zone3d\xterrains\glmodel\glterrain.ts

import * as THREE from 'three'

import { Vector3d } from "@/common/types";
import { Math3dPlane } from '@/math3d/functions/math3dplane';
import { GeoFunction } from '@/zone3d/three/util/geofunction';
import { XTerrains, XTerrMaterial, XTerrUtils } from '@/terrains/xterrains/xterrains';
import { Plane3d_Y } from '@/terrains/xterrains/objects/plane3dy';


/**
 * class GlTerrain
 *  - dir 3d --> Y top  
 *  - Aspect Ratio --> 1:1
 */
export class GlTerrain extends Plane3d_Y {
    
    public static MODE_WIREFRAME:boolean = false;

    public dimUnit:  string = XTerrains.UNIT_ONEHUND_METER;
    public material: THREE.MeshStandardMaterial| null = null;
    public geometry: THREE.PlaneGeometry| null = null;
    public mesh:     THREE.Mesh|null = null;
    //this.rectangle: Rectangle2d; 

    constructor(center:Vector3d,sidelen:number) {
        super(center, sidelen,XTerrUtils.getSubdivisions(XTerrains.UNIT_ONEHUND_METER,sidelen));  
        this.vertex   =  Math3dPlane.getPlaneVertex(this.center,this.sidelen,this.countsub);                          
        this.generateMesh();
    };//end constructor

    private generateMesh() {            
        this.material = XTerrMaterial.getTerrainBasicMaterial(GlTerrain.MODE_WIREFRAME);       
        this.geometry = GeoFunction
            .toThreePlaneGeometry(this.sidelen,this.countsub,this.vertex);  
        this.updateMesh();
    };//end

    public modifyMesh(new_vertex:Vector3d[][]) {   
        this.vertex = new_vertex;
        this.geometry = GeoFunction
            .toThreePlaneGeometry(this.sidelen,this.countsub,this.vertex);  
        this.updateMesh();     
    };//end

    public updateMesh() {
        XTerrMaterial.updateTerrainColors(this.geometry!);
        this.mesh = new THREE.Mesh(this.geometry!, this.material!);
        this.mesh.rotation.x =  (Math.PI / 2) *(-1);
        this.mesh.position.set(this.center.x, this.center.y, this.center.z);              
    };//end

};//end class