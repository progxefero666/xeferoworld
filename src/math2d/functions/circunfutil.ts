//src\math2d\xmath2dcircf.ts


import { Line2d } from "@/common/types";
import { Point2d } from "@/lib/graph2d/types2d";
import { Vector2d } from "@/math2d/math2dtypes";
import { XMath2d } from "@/math2d/xmath2d";

/**
 * class CircunfUtil.getCfPoints
 */
export class CircunfUtil{

    public static getCfPoint(center:Point2d,radius:number,angle_y:number):Point2d{
		var coord_x = center.x + ( radius * Math.cos(angle_y));
		var  coord_y = center.y + ( radius * Math.sin(angle_y));		
		return {x:coord_x,y:coord_y};	
	}//end
    
	public static getCfPoints(center:Point2d,radius:number,countPoints:number):Point2d[]{
		const cfPoints: Point2d[] = [];
		const angleUnit:number = (Math.PI * 2) / countPoints;
		let angle:number = 0;
		for(let idx=0;idx<countPoints;idx++) {
			cfPoints.push(CircunfUtil.getCfPoint(center, radius, angle));
			angle = XMath2d.getAngleInc(angle, angleUnit);
		}
		return cfPoints;
	}//end

	public static getCfCoords(center:Vector2d,radius:number,angle_y:number):Vector2d{
		var coord_x = center.x + ( radius * Math.cos(angle_y));
		var  coord_y = center.y + ( radius * Math.sin(angle_y));		
		return {x:coord_x,y:coord_y};	
	}//end

    public static getCfDiameterLine(center:Vector2d,radius:number,angle:number):Line2d{
		const angleEnd:number = XMath2d.getAngleInc(angle,Math.PI);
		const start:Vector2d = CircunfUtil.getCfPoint(center,radius,angle);
		const end:Vector2d = CircunfUtil.getCfPoint(center,radius,angleEnd);

		return {start:start,end:end};
	}//end
    
	public static getCfArcPiLine(center:Vector2d,radius:number,angle:number):Line2d {
		const angleEnd =XMath2d.getAngleInc(angle,Math.PI);
		const pointStart:Vector2d = CircunfUtil.getCfPoint(center,radius,angle);
		const pointEnd:Vector2d = CircunfUtil.getCfPoint(center,radius,angleEnd);
		return {start:pointStart,end:pointEnd};
	}

	public static getCfArcPiPoints(center:Vector2d,radius:number,angle:number):Point2d[] {
		
		const countPoints:number = 180;
		const angleUnit:number = Math.PI/countPoints;
		
		const points:Point2d[] = [];
		let currAngle:number = angle;
		for(let idx=0;idx<countPoints;idx++) {
			const currPoint:Point2d = CircunfUtil.getCfPoint(center,radius,currAngle);
			points.push(currPoint);
			currAngle = XMath2d.getAngleInc(currAngle,angleUnit);
		}
		return points;
	};//end

};//end