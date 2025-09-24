//src\lib\graph2d\model\coloritem.ts

import { XMath2dUtil } from "@/math2d/functions/xmath2dutil";
import { Point2d } from "../types2d";
import { TDimension } from "@/common/types";


/**
 * class ColorItem
 */
export class ColorItem {
    
    //0% --> 100%
    public blocked:boolean = false;
    public valperc:number = 0;
    public color:any;
    public radius:any;

    constructor(color:any,valpercent:number,blocked?:boolean){         
        this.color = color;
        this.valperc = valpercent;
        this.blocked = blocked??false;
    }//end
    
    public getCanvasPositionX(cvWidth:number):number{
        return XMath2dUtil.getValue100(cvWidth,this.valperc);
    }//end

    public getCanvasPosition(cvDim:TDimension):Point2d{
        const coordX = XMath2dUtil.getValue100(cvDim.width,this.valperc);  
        const coordY = Math.floor(cvDim.height/2); 
        return {x:coordX,y:coordY};
    }//end

}//end