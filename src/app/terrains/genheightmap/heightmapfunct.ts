//src\app\terrains\genheightmap\heightmapfunct.ts

import { Point2d, TDimension, TRange } from "@/common/types";
import { PainterGradients } from "../paintergradients";
import { LineGradient } from "@/terrains/gradients/linegradient";
import { bezierSpline, lineString } from "@turf/turf";
import { CircunfGradient } from "@/terrains/gradients/cfgradient";
import { GenHeightMapFunctions } from "@/terrains/functions/heightmapfunct";
import { Terrains3dConfig } from "../terrains3dcfg";
import { NumberParameter } from "@/common/numberparam";


const gradientsRanges: NumberParameter[] = [
    Terrains3dConfig.GRADRANGE_INTENSITY,
    Terrains3dConfig.GRADRANGE_RADIUS,
    Terrains3dConfig.GRADRANGE_SCALE_X,
    Terrains3dConfig.GRADRANGE_SCALE_Y,
    Terrains3dConfig.GRADRANGE_ROTATION];
    
/**
 * class HeightFunct
 */
export class HeightMapFunctions {

    public painter:PainterGradients;

    constructor(painter:PainterGradients){
        this.painter = painter;
    }//end

    public paintAleatCfGradients = (size:number) => {  
        const dimension:TDimension = {width:size,height:size};
        const testGradients:CircunfGradient[] 
            = GenHeightMapFunctions.genCfsGradients(dimension,gradientsRanges,5);            
        this.painter.paintGradients(testGradients);          
    };//end

    public paintTestOneLine = () => {  
        const startPoint:Point2d ={x:100,y:100};
        const endPoint:Point2d ={x:500,y:500};
        const intensity:  TRange ={ min:0.3, max:0.9};
        const radius:     TRange ={ min:0.05, max:0.4};
        const lineGradient:LineGradient = new LineGradient
                (startPoint,endPoint,intensity,radius);
        this.painter.paintLineGradient(lineGradient);
    };//end

    public  paintTestSplines = () => {  
        const cartesianLine = lineString([
            [-100,100],
            [-30, 120], 
            [50, -150],
            [120, -50]
        ]);
        const spline = bezierSpline(cartesianLine,{resolution:600,sharpness:0.85});
        const points: Point2d[] = spline
            .geometry.coordinates.map(p=>({x:p[0],y:p[1]}))
        this.painter.paintCurveRay(points,"#ff0000");
    };//end    


}//end
