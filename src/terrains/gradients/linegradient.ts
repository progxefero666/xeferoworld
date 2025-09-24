//src\terrains\model\gradient.ts

import { TRange } from "@/common/types";
import { Point2d, Scale2d } from "@/lib/graph2d/types2d";
import { XMath2d } from "@/math2d/xmath2d";
import { PointGradient } from "./pointgradient";


/**
 * class LineGradient 
 */
export class LineGradient {

    public startPoint: Point2d;
    public endPoint:   Point2d;
    public intensity:  TRange;
    public radius:     TRange;
    public rotation:   number;
    public length:     number=0;

    public gradients:PointGradient[] = [];

    constructor(startPoint:Point2d,endPoint:Point2d,                
                intensity:TRange,  radius:TRange) {

        this.startPoint = startPoint;
        this.endPoint   = endPoint;
        this.intensity  = intensity;
        this.radius     = radius;
        this.rotation   = XMath2d.getPointsAngleInPlain(startPoint,endPoint);
        this.init();
    }//end

    public init() {        
        this.length = Math.floor(XMath2d.getPointsDistance(this.startPoint,this.endPoint));        
        const listpoints = XMath2d.getLinePoints
            (this.startPoint,this.endPoint,this.length/2);
            
        const intensityUnit = (this.intensity.max - this.intensity.min)/listpoints.length;    
        const radiusUnit = (this.radius.max - this.radius.min)/listpoints.length;
        let currentInt = this.intensity.max;
        let currentRadius = this.radius.max;
        for(let pointIdx=0;pointIdx<listpoints.length;pointIdx++) {
            this.gradients[pointIdx] = new PointGradient(   
                listpoints[pointIdx],
                currentInt,
                currentRadius);
            currentInt -= intensityUnit;
            currentRadius -= radiusUnit;            
        }        
    }//end

    public toJSonString() {        
        return JSON.stringify(this);
    }//end

}//end 

    //public listpoints: Point2d[]=[];
    //public listintensity: number[]=[];
    //public listradius: number[]=[];
