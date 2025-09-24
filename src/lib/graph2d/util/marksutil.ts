//src\lib\graph2d\util\marksutil.ts

import { Point2d, TCfMarksConfig } from "@/lib/graph2d/types2d";
import { XMath2d } from "@/math2d/xmath2d";
import { CircunfUtil } from "@/math2d/functions/circunfutil";
import { Line2d } from "@/lib/graph2d/model/line2d";


/**
 * class MarksUtil.getCfMarks(center: Point2d
 */
export class MarksUtil {

    //src\graph2d\model\line2d.ts with color
    public static getCfMarks(center: Point2d,
                             radiusInit:number, 
                             marksConfig:TCfMarksConfig): Line2d[] {

        const countmarks:number = Math.floor(
            marksConfig.countSectors *
            marksConfig.countDiv *
            marksConfig.countSubdiv);

        const lev2ValCalc = Math.floor(countmarks/marksConfig.countSectors);   
        const lev2ListIndex:number[] = [];
        for(let lev2idx=0;lev2idx<countmarks;lev2idx+=lev2ValCalc) {    
            lev2ListIndex.push(lev2idx);
        }

        //const lev1ValCalc = Math.floor(countmarks/ (countSectors*countSectorDiv));    
        const lev1ListIndex:number[] = [];
        for(let lev1idx=0;lev1idx<countmarks;lev1idx+=marksConfig.countDiv) { 
            if(!lev2ListIndex.includes(lev1idx)) {
                lev1ListIndex.push(lev1idx);
            }
        }

        /*
        const lev0ListIndex:number[] = [];
        for(let lev0idx=0;lev0idx<countmarks;lev0idx++) { 
            if(!lev2ListIndex.includes(lev0idx)) {
                if(!lev1ListIndex.includes(lev0idx)) {
                    lev0ListIndex.push(lev0idx);
                } 
            }            
        }
        */
        function getMarkLevel(markIndex:number):number{        
            if(lev2ListIndex.includes(markIndex)) {return 2;}
            if(lev1ListIndex.includes(markIndex)) {return 1;}
            return 0;
        }

        const radiusLevel_2 = marksConfig.radiusLen;
        const radiusLevel_0 = radiusLevel_2/3.0;
        const radiusLevel_1 = (radiusLevel_2/3.0) * 2;

        const angleUnit = (Math.PI * 2) / countmarks;
        const coordsBase: Point2d[] = CircunfUtil
                    .getCfPoints(center,radiusInit,countmarks);
        
        const marks:Line2d[] = [];            
        let angle:number = 0;
        for(let idx=0;idx<countmarks;idx++) {            
            let radiusLen:number=0;
            let lineWidth:number = 1;
            switch(getMarkLevel(idx)) {
                case 0:radiusLen = radiusLevel_0;break;
                case 1:radiusLen = radiusLevel_1;break;//lineWidth = 2
                case 2:radiusLen = radiusLevel_2;lineWidth = 2;break;
            }
            const radius = radiusInit - radiusLen;
            const intPoint:Point2d = CircunfUtil.getCfPoint(center,radius,angle);
            marks.push(new Line2d(coordsBase[idx],intPoint,marksConfig.color));
            angle = XMath2d.getAngleInc(angle, angleUnit);
        }

        return marks;    
    };//end

}//end

/*
    XMath2dCircf.getCfPoints
    public static drawMark(ctx: CanvasRenderingContext2D, point: Point2d, color: string) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
        ctx.fill();
    }
*/