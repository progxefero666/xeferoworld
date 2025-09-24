//src\terrains\planeblocks\functions\generateblocks.ts

import * as THREE from 'three';
import { Plane2dCell } from "@/math2d/model/planecell";
import { Block } from '@/system3d/model/block';
import { Point2d, TDimension, TDimension3d, TRange, Vector3d } from '@/common/types';
import { Point3d } from '@/lib/graph3d/types3d';
import { Vector2d } from '@/math2d/math2dtypes';
import { Math2dPlane } from '@/math2d/functions/mathplane';
import { XMath2dUtil } from '@/math2d/functions/xmath2dutil';
import { XMath2dPoly } from '@/math2d/polygons/mathpoly';
import { XMath2d } from '@/math2d/xmath2d';

import { ElipseUtil } from '@/math2d/functions/elipseutil';
import { GenColorMaterial } from '@/zone3d/three/materials/genmatcolor';


/**
 * class GenerateBlocks.genBlocksMA1
 */
export class BlocksGenerator {

    public static MA1_RADIUS_INTENS_FACTOR: number = 0.5;

    public static  getHeightAlgoritmMA1(maxHeight:number,distPercent:number): number {
        const distForzeValue: number = XMath2dUtil.getValue100(maxHeight, distPercent);

        const intensityPowBase:number = (maxHeight-distForzeValue)/2.0;
        const intensityPowCalc = Math.pow(intensityPowBase,2);
        const intensityPow = XMath2dUtil.getValue100(intensityPowCalc, distPercent);

        const intensitySqrtBase: number = (maxHeight-distForzeValue)/1.0;
        const intensitySqrtCalc = intensitySqrtBase;
        const percentCalc:number = 100-distPercent;
        const intensitySqrt = XMath2dUtil.getValue100(intensitySqrtCalc,percentCalc);

        const intensityApply:number = (intensityPow + intensitySqrt);
        return intensityApply;
    };
        
    public static genBlocksMA1(gridCells:Plane2dCell[],
                                    cellDim:TDimension,
                                    polyCenter:Point2d,
                                    polyPoints: Point2d[],                                    
                                    maxHeight:number):THREE.Mesh[]{

        const material: THREE.MeshStandardMaterial 
            = GenColorMaterial.getStandardMaterial('#ff6200',0.85,0.3);

        const polyRadius:number  = XMath2dPoly.getPolyRadius(polyPoints); 

        const listCellsIndex:number[] = Math2dPlane
                .getPolyCellsInsideIndex(gridCells,polyPoints);

        const listBlocks:THREE.Mesh[] = []; 
        for(let idx:number=0;idx<listCellsIndex.length;idx++) {
            const cellIndex = listCellsIndex[idx];
            //const height = 10;  
            //const height = Math.random() * maxHeight;     
            const distToCenter: number 
                = XMath2d.getPointsDistance(polyCenter,gridCells[cellIndex].position);
            const distPercent:number = XMath2dUtil.getPercent100(polyRadius, distToCenter);
            const height:number = this.getHeightAlgoritmMA1(maxHeight, distPercent);

            const geom = new THREE.BoxGeometry(cellDim.width,height,cellDim.height); 
            const glBlock = new THREE.Mesh(geom,material);
                glBlock.position.x = gridCells[cellIndex].position.x;
                glBlock.position.y = height/2;
                glBlock.position.z = gridCells[cellIndex].position.y;  
            listBlocks.push(glBlock);    
        }//end for

        return listBlocks;           
    }//end    



}//end


/*
public static generateBlocksMA1(gridCells:Plane2dCell[],
                                terrGridCellDim:TDimension,
                                polyCenter:Point2d,
                                polyPoints: Point2d[],                                    
                                maxHeight:number):Block[] {

    const polyRadius:number  = XMath2dPoly.getPolyRadius(polyPoints);        
    const width_half:number  = terrGridCellDim.width/2;
    const depth_half:number  = terrGridCellDim.height/2;

    //!!! problema !!!!
    const listCellsIndex:number[] = Math2dPlane
            .getPolyCellsInsideIndex(gridCells,polyPoints);

    const listBlocks:Block[] = [];
    for(let faceIdx:number=0;faceIdx<listCellsIndex.length;faceIdx++) {
        
        const includeCell:boolean = true;

        if(includeCell){
            const planeFace:Plane2dCell= gridCells[faceIdx];                  

            //const height = 10;  
            //const height = Math.random() * 20;
            const distToCenter: number 
                = XMath2d.getPointsDistance(polyCenter,planeFace.position);
            const distPercent:number = XMath2dUtil.getPercent100(polyRadius, distToCenter);
            const height:number = this.getHeightAlgoritmMA1(maxHeight, distPercent);
                                                        
            const block_center:Vector3d ={
                x:planeFace.position.x + width_half,
                y:height/2, 
                z:planeFace.position.y + depth_half};        

            const block_size:TDimension3d = {
                width:terrGridCellDim.width,
                height:height,
                depth:terrGridCellDim.height
            };                
            listBlocks.push(new Block(block_center, block_size));
        }
    }//end for

    return listBlocks;
}//end

public static applyRadialForze(terrVertex:Vector3d[][],forzeCenter:Vector2d,forzeRadius:number): Vector3d[][] {
    
    const forzeIntensity = XMountainFunctions.MA1_RADIUS_INTENS_FACTOR * forzeRadius;
    
    for (let axisvH = 0; axisvH < terrVertex.length; axisvH++) {
        for (let axisvDeep=0;axisvDeep<terrVertex[axisvH].length;axisvDeep++) {
            const vertexCoord2d:Vector2d = {
                x:terrVertex[axisvH][axisvDeep].x,
                y:terrVertex[axisvH][axisvDeep].z};

            const distToForceCenter: number 
                = XMath2d.getPointsDistance(forzeCenter, vertexCoord2d);

            if(distToForceCenter<forzeRadius) {
                const distPercent:number = XMath2dUtil.getPercent100(forzeRadius, distToForceCenter);
                terrVertex[axisvH][axisvDeep].y = XMountainFunctions
                    .getIntensityAlgoritmMA1(forzeIntensity,distPercent);                
            }
        }//end for axis deep
    }//end for axis horizontal
    return terrVertex;

};//end    
*/
