//src\zone3d\cityblocks\cbgenerator.ts


import { TDimension, Vector2d } from "@/common/types";
import { XMath2dUtil } from "@/math2d/xmath2dutil";
import { System3d } from "@/math3d/system3d";
import { PlaneBlocks3d, PlaneBlocksConfig } from "@/terrains/planeblocks3d";


/**
 * class CityBlocksGenerator
 */
export class CityBlocksbGenerator {

    public static generatePlaneZones_modA1(size:number,cellSize:number): PlaneBlocks3d|null {
        const position:Vector2d = System3d.CC;
        const planeZones = new PlaneBlocks3d(position,size,cellSize);    
        
        const radiusMin:number = XMath2dUtil.getPercent100(size,PlaneBlocksConfig.ZONE_SIZE_MIN);
        const radiusMax:number = XMath2dUtil.getPercent100(size,PlaneBlocksConfig.ZONE_SIZE_MAX);
        //planeZones.blocksSpaceUsed
        while(planeZones.blocksSpaceUsed < PlaneBlocksConfig.BLOCKS_SPACE_MAX) {
            const aleat_point:Vector2d = planeZones.getAleatoryPoint();
            
            const aleat_radius:number = XMath2dUtil
                 .getAleatNumberInRange(radiusMin,radiusMax);
                 
            // Add block to the zone
        }
        return planeZones;
    }//end

}//end