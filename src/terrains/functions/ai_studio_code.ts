import { Vector2d } from "@/math2d/math2dtypes";
import { XMath2d } from "@/math2d/xmath2d";



/**
 * Clase para generar líneas procedurales.
 */
export class GeneratorLines {

    /**
     * Genera una línea de río con variaciones entre dos puntos.
     * 
     * @param pointStart El punto de inicio de la línea.
     * @param pointEnd El punto de destino de la línea.
     * @param numSubdivisions El número de veces que se subdividirá la línea. Controla el nivel de detalle. Un valor entre 5 y 8 da buenos resultados.
     * @param maxDisplacement La desviación máxima inicial respecto a la línea recta. Controla lo "salvaje" que es el río.
     * @param roughness Un factor (entre 0 y 1) que controla cómo de rápido disminuye la desviación. Un valor más alto (ej. 0.8) mantiene las curvas en subdivisiones pequeñas. Un valor más bajo (ej. 0.5) suaviza la línea rápidamente. Un buen valor para empezar es 0.7.
     * @returns Un array de puntos (Vector2D) que forman la línea del río.
     */
    public static genRayLinePoints(
        pointStart: Vector2d,
        pointEnd: Vector2d,
        numSubdivisions: number = 7,
        maxDisplacement: number = 50,
        roughness: number = 0.7
    ): Vector2d[] {

        let points: Vector2d[] = [pointStart, pointEnd];
        let displacement = maxDisplacement;

        for (let i = 0; i < numSubdivisions; i++) {
            const newPoints: Vector2d[] = [];
            
            // Añadimos el primer punto de la iteración anterior
            newPoints.push(points[0]);

            for (let j = 0; j < points.length - 1; j++) {
                const p1 = points[j];
                const p2 = points[j + 1];

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
            }

            points = newPoints;
            
            // Reducir el desplazamiento para la siguiente iteración
            displacement *= roughness;
        }
        return points;
    }

};//end

