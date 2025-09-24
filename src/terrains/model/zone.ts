//src\terrains\model\zone.ts

import { XMath2dPoly } from "@/math2d/polygons/mathpoly";
import { Circunf2d, TPolyColor, Point2d } from "@/common/types";
import { WorldPlaneCfg } from "@/app/world/worldconfig";
import { XMath2dPolyZones } from "@/math2d/polygons/mathpolyzones";
import { Plane2dCell } from "@/math2d/model/planecell";
import { GraphColoUtil } from "@/lib/graph2d/graphcolors";


/**
 * class Zone2d
 * colorback?:string,colorborder?:string
 */
export class Zone2d {
    
    public color:   TPolyColor;
    public id:      string;
    public mean:    Point2d;
    public points:  Point2d[];
    public area:    number;
    public intCirc: Circunf2d;
    public gridFaces: Plane2dCell[] = [];

    constructor(id:string,mean:Point2d,points:Point2d[]) {
        this.id = id;
        this.mean = mean;
        this.points = points;
        this.intCirc = XMath2dPolyZones.getBiggerIntCircunf(points);
        this.area    = XMath2dPoly.getArea(points);       
        this.color   =   {
            back:   GraphColoUtil.getAleatoryColor(), 
            border: "#44ff00ff"
        };
    }//end 

    public addGridFace(gridFace:Plane2dCell):void {
        this.gridFaces.push(gridFace); 
    }//end
    
    public setGridFaces(gridFaces:Plane2dCell[]):void {
        this.gridFaces = gridFaces; 
    }//end 
}//end 