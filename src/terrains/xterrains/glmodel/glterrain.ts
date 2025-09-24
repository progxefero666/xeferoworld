//src\zone3d\xterrains\glmodel\glterrain.ts

import * as THREE from 'three'

import { Vector3d } from "@/common/types";
import { Math3dTerrains } from '@/terrains/xterrains/functions/math3dterrains';
import { GeoFunction } from '@/zone3d/three/functions/geofunction';
import { XTerrains, XTerrMaterial, XTerrUtils } from '@/terrains/xterrains/xterrains';
import { Plane3d_Y } from '@/terrains/xterrains/objects/plane3dy';
import { GenColorMaterial } from '@/zone3d/three/materials/genmatcolor';
import { TerrainControl } from '../terraincontrol';
import { Plane2dCell } from '@/math2d/model/planecell';
import { Math2dPlane } from '@/math2d/functions/mathplane';


/**
 * class GlTerrain
 *  - dir 3d --> Y top  
 *  - Aspect Ratio --> 1:1
 */
export class GlTerrain extends Plane3d_Y {
    
    public static MODE_WIREFRAME:boolean = true;

    public dimUnit:  string = XTerrains.UNIT_ONE_METER;
    public material: THREE.MeshStandardMaterial| null = null;
    public geometry: THREE.PlaneGeometry| null = null;
    public mesh:     THREE.Mesh|null = null;
    public modeGrid:boolean = true;

    public planeVertex: Vector3d[] = [];
    public gridFaces: Plane2dCell[] = [];

    constructor(center:Vector3d,sidelen:number) {
        super(center, sidelen,XTerrUtils.getSubdivisions(XTerrains.UNIT_ONE_METER,sidelen));  
        
        this.planeVertex = GeoFunction.getThreePlaneGeoVertex(sidelen,this.countsub);
        
        this.gridFaces = Math2dPlane.getPlanePolyCells(this.dimension,this.countsub,this.countsub);

        this.vertex = Math3dTerrains.getPlaneTwoDimVertex(this.center,this.sidelen,this.countsub);                          
        this.generateMesh();
    };//end constructor

    
    private generateMesh() {         
        if(this.modeGrid) {
            this.material = GenColorMaterial.getGridMaterial(TerrainControl.GRID_COLOR,0.9);
        }
        else {
            this.material = XTerrMaterial.getTerrainBasicMaterial(); 
        }
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