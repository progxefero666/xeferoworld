//src\terrains\functions\genrivers.ts

import { Line2d } from "@/lib/graph2d/model/line2d";
import { Vector2d } from "@/math2d/math2dtypes";
import { XMath2d } from "@/math2d/xmath2d";
import { CircunfUtil } from "@/math2d/functions/circunfutil";
import { XMath2dUtil } from "@/math2d/functions/xmath2dutil";
import { TRiverConfig } from "@/terrains/terraintypes";

/*
Cómo ajustar los parámetros:
    numSubdivisions: 
        Es el parámetro más importante para el detalle. 
        Cada subdivisión duplica (aproximadamente) el número de puntos.
        5: Un arroyo con pocas curvas.
        7: Un río bien definido (genera 129 puntos).
        9: Un río muy detallado y sinuoso (genera 513 puntos).

    maxDisplacement:
        - Controla la amplitud de las curvas principales. 
        - Un valor grande hará que el río se aleje mucho de la línea recta 
        imaginaria que une el inicio y el fin.

    roughness: Controla la apariencia de las curvas.
        - Un valor cercano a 1 (ej: 0.9) significa que las curvas pequeñas 
        son casi tan pronunciadas como las grandes, dando un aspecto muy "ruidoso" o irregular.
        - Un valor cercano a 0.5 hace que las curvas se suavicen muy rápido,
        resultando en una línea con unas pocas curvas grandes y el resto casi recto.
        - Un valor entre 0.6 y 0.75 suele dar los resultados más naturales.    
    */
export class RiversGenerator {

    public static generateRiverPoints(pointStart:Vector2d,pointEnd:Vector2d,
                                   numSubdiv: number,
                                   maxDisp: number,
                                   roughness: number): Vector2d[] {

        let points: Vector2d[] = [pointStart, pointEnd];
        let displacement = maxDisp;

        for (let i = 0; i < numSubdiv; i++) {
            const newPoints: Vector2d[] = [];            
            // Añadimos el primer punto de la iteración anterior
            newPoints.push(points[0]);
            for (let j = 0; j < points.length - 1; j++) {
                const p1  = points[j];
                const p2  = points[j + 1];
                const mid = XMath2d.getCenterPoint(p1, p2);
                // Calcular un vector normal (perpendicular) al segmento p1-p2
                const dx = p2.x - p1.x;
                const dy = p2.y - p1.y;
                const normal = { x: -dy, y: dx };
                // Normalizar el vector
                const length = Math.sqrt(normal.x * normal.x + normal.y * normal.y);
                if (length > 0) {
                    normal.x /= length;
                    normal.y /= length;
                }                
                // Generar un desplazamiento aleatorio entre -displacement y +displacement
                const randomDisplacement = (Math.random() - 0.5) * 2 * displacement;
                // Aplicar el desplazamiento al punto medio
                const displacedMidpoint = {
                    x: mid.x + normal.x * randomDisplacement,
                    y: mid.y + normal.y * randomDisplacement
                };
                newPoints.push(displacedMidpoint);
                newPoints.push(p2); // Añadir el punto final del segmento
            }//end for

            points = newPoints;
            
            // Reducir el desplazamiento para la siguiente iteración
            displacement *= roughness;
        }
        return points;
    };//end

    public static generateLineRiverPoints(line:Line2d,
                             numSubdiv: number,
                             maxDisp: number,
                             roughness: number):Vector2d[]{
        const points: Vector2d[] = RiversGenerator
            .generateRiverPoints(line.start,line.end,numSubdiv,maxDisp,roughness);
        return points;
    };//end


    public static getBranchEndA(parentStart:Vector2d,
                               parentEnd:Vector2d,
                               subBranchStart:Vector2d,
                               length:number):Vector2d  {
        const currentAngle:number = XMath2d.getPointsAngleInPlain(parentStart,parentEnd);                        


        const angleInc:number = XMath2dUtil
                .getAleatNumberInRange(XMath2d.RAD*20,XMath2d.RAD*70);
        const rotDirCcw:boolean = XMath2dUtil.getAleatBoolean();
        let angleToEnd:number = 0;
        if(rotDirCcw){angleToEnd = XMath2d.getAngleInc(currentAngle,angleInc);}
        else {angleToEnd = XMath2d.getAngleDec(currentAngle,angleInc);}

        const subBranchEnd:Vector2d = CircunfUtil
            .getCfPoint(subBranchStart,length,angleToEnd);                                
        return subBranchEnd;
    };//end

    public static getRiverAleatoryPoints(riverPoints:Vector2d[]):Vector2d[] {
        const riverLength: number = XMath2d
            .getPointsDistance(riverPoints[0], riverPoints[riverPoints.length - 1]);

        let selectPoints:Vector2d[] = [];
        return selectPoints;
    };//end

    public static generateComplexRiverA(pointStart:Vector2d,pointEnd:Vector2d,
                                      config:TRiverConfig,
                                      maxDisp:number,
                                      countSubdiv:number,
                                      roughness: number,
                                      maxSubBranchs: number,
                                      maxLevels:number): Vector2d[][] {
        
        const riverPoints: Vector2d[][] = [];

        // Función interna recursiva
        function generateBranch(start:Vector2d,end:Vector2d,
                                level:number,
                                maxDisp:number,countSubdiv:number) {
            if (level > maxLevels) {return;}

            // Main Branch
            const currentPoints:Vector2d[] = RiversGenerator
                .generateRiverPoints(start,end,Math.round(countSubdiv),maxDisp,roughness);
            riverPoints.push(currentPoints);
            const currentLength:number = XMath2d.getPointsDistance(start,end);   

            //aub branch
            const newLength:number = currentLength * 0.63;
            const subBranch_start:Vector2d = XMath2dUtil
                .getPointAtDistance(currentPoints,newLength);            
            const subBranch_end:Vector2d = RiversGenerator
                .getBranchEndA(start,end,subBranch_start,newLength);
            const subBranch_maxDisp     = maxDisp * config.displacementReduction;
            const subBranch_countSubdiv = countSubdiv * config.subdivisionReduction;
            generateBranch(subBranch_start,subBranch_end,(level+1),subBranch_maxDisp,subBranch_countSubdiv);

        };//end kernel function

        generateBranch(pointStart,pointEnd,1,maxDisp,countSubdiv);        
        return riverPoints;
    };//end

};//end


/*
    public static getRiverEnd_modC(config:TRiverConfig,
                              branchStart:Vector2d,
                              branchNext:Vector2d,
                              branchEnd:Vector2d):Vector2d  {
    
        const segmentDirectionVec = { 
            x: branchNext.x - branchStart.x, 
            y: branchNext.y - branchStart.y };

        const segmentAngle = Math.atan2(segmentDirectionVec.y, segmentDirectionVec.x);                    
        const randomAngleOffset = (Math.random() - 0.5) * 2 * (config.maxBranchAngle * Math.PI / 180); 
        const newAngle = segmentAngle + randomAngleOffset;
        const branchStartDistance = XMath2d.getPointsDistance(branchStart,branchEnd);
        // Añadimos algo de azar
        const valueFactor = 0.8 + Math.random() * 0.4; // Entre 0.8 y 1.2                    
        const newLength = branchStartDistance * config.lengthReductionFactor * valueFactor;
        const end_x= branchStart.x + Math.cos(newAngle) * newLength;
        const end_y= branchStart.y + Math.sin(newAngle) * newLength;
        return {x:end_x,y:end_y};
    };//end

    public static generateComplexRiver_modC(pointStart:Vector2d,pointEnd:Vector2d,
                                      config:TRiverConfig,
                                      maxDisp:number,
                                      countSubdiv:number,
                                      roughness: number,
                                      maxLevels:number): Vector2d[][] {
        
        const riverPoints: Vector2d[][] = [];

        // Función interna recursiva
        function generateBranch(start:Vector2d,end:Vector2d,level:number,
                                maxDisp:number,countSubdiv:number) {
            if (level > maxLevels) {return;}

            // Main Branch
            const currentPoints:Vector2d[] = RiversGenerator
                .generateRiverPoints(start,end,Math.round(countSubdiv),maxDisp,roughness);
            riverPoints.push(currentPoints);

            // Sub Branchs
            for (let i = 0; i < currentPoints.length - 1; i++) {                
                // jump steps
                if (i % 5 !== 0) continue;        

                let genSubriver: boolean = false;
                const valueCompare: number = Math.random();
                if(valueCompare<config.branchingProbability) {
                    genSubriver=true;
                }
                // 4. Recursive call for new branch
                if (genSubriver) {
                    const branchStart = currentPoints[i];
                    const branchEnd:Vector2d = RiversGenerator
                        .getRiverEnd_modC(config,branchStart,currentPoints[i+1],end);
                    const new_maxDisp = maxDisp * config.displacementReduction;
                    const new_countSubdiv = countSubdiv * config.subdivisionReduction;
                    generateBranch(branchStart,branchEnd,(level+1),new_maxDisp,new_countSubdiv);
                }
            }//end loop

        };//end kernel function

        generateBranch(pointStart,pointEnd,1,maxDisp,countSubdiv);        
        return riverPoints;
    };//end

*/