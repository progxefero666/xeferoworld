//src\terrains\functions\genvoronoi.ts

import { TerrainZone } from "@/terrains/model/terrainzone";
import { VoronoiCalculator } from "@/terrains/functions/voronoi";
import { XMath2dPoly } from "@/math2d/polygons/math2dpoly";
import { TDimension } from "@/common/types";

/*
const terrainWidth = 10000; // 10km
const terrainHeight = 8000; // 8km
const numberOfZones = 50;

// Generar las zonas del terreno
const terrainZones = TerrainGenerator.generateTerrainZones(
  terrainWidth,
  terrainHeight,
  numberOfZones
);

// Ahora tienes todas las zonas con sus polígonos, áreas, etc.
// Puedes usarlas para colocar objetos, generar colisiones, etc.

console.log('Zonas generadas:', terrainZones.length);
console.log('Área total:', terrainZones.reduce((sum, zone) => sum + zone.area, 0));
*/
/**
 * class GenVoronoi
 * 
 */
export class GenVoronoi {

    static generateTerrainZones(dimension:TDimension,zoneCount:number):TerrainZone[] {

        // 1. Generar puntos aleatorios
        //0.6 // Más agrupamiento natural
        const points = VoronoiCalculator.generateRandomPoints(zoneCount,dimension,0.6);

        // 2. Calcular celdas de Voronoi
        const voronoiCells = VoronoiCalculator.calculateVoronoi(points,dimension);

        // 3. Convertir a zonas de terreno
        const zones: TerrainZone[] = [];

        for (let cellIndex=0;cellIndex<voronoiCells.length;cellIndex++) {
            const cell = voronoiCells[cellIndex];
            const cellId:string = 'zone_'+ cellIndex;
            const zone: TerrainZone = {
                id: cellId,
                center: cell.site,
                polygon: cell.polygon,
                area: XMath2dPoly.getArea(cell.polygon)
            };
            zones.push(zone);
        }

        return zones;
    }//end


}//end

/*
export const useVoronoi = (points: Point[], width: number, height: number) => {
  return useMemo(() => {
    if (!points.length || width <= 0 || height <= 0) return null;

    try {
      const flatPoints = points.flatMap(p => [p.x, p.y]);
      const delaunay = Delaunay.from(flatPoints);
      return delaunay.voronoi([0, 0, width, height]);
    } catch (error) {
      console.error('Error generating Voronoi diagram:', error);
      return null;
    }
  }, [points, width, height]);
};

// Generador de puntos para terrenos grandes
const generateTerrainPoints = (
  width: number, 
  height: number, 
  count: number,
  clustering = 0.7 // 0-1: más bajo = más agrupado
): Point[] => {
  const points: Point[] = [];
  
  for (let i = 0; i < count; i++) {
    // Puntos semi-aleatorios con cierta agrupación
    const x = width * (Math.random() * clustering + (1 - clustering) * Math.random());
    const y = height * (Math.random() * clustering + (1 - clustering) * Math.random());
    
    points.push({ x, y });
  }
  
  return points;
};
const VoronoiDiagram: React.FC<VoronoiDiagramProps> = ({ 
  width, 
  height, 
  points 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generar diagrama de Voronoi
  const voronoi = useMemo(() => {
    if (!points.length) return null;

    // Convertir puntos a formato [x, y, x, y, ...]
    const flatPoints = points.flatMap(p => [p.x, p.y]);
    
    // Crear triangulación de Delaunay
    const delaunay = Delaunay.from(flatPoints);
    
    // Generar diagrama de Voronoi con límites
    return delaunay.voronoi([0, 0, width, height]);
  }, [points, width, height]);

  // Dibujar en el canvas
  useEffect(() => {
    if (!voronoi || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    // Limpiar canvas
    context.clearRect(0, 0, width, height);

    // Dibujar celdas de Voronoi
    context.strokeStyle = '#ccc';
    context.lineWidth = 1;
    
    for (let i = 0; i < points.length; i++) {
      const path = voronoi.renderCell(i);
      if (!path) continue;

      // Dibujar celda
      context.beginPath();
      const path2D = new Path2D(path);
      context.stroke(path2D);

      // Opcional: rellenar celdas con colores aleatorios
      context.fillStyle = `hsl(${Math.random() * 360}, 50%, 80%)`;
      context.fill(path2D);
    }

    // Dibujar puntos originales
    context.fillStyle = 'black';
    for (const point of points) {
      context.beginPath();
      context.arc(point.x, point.y, 2, 0, 2 * Math.PI);
      context.fill();
    }
  }, [voronoi, width, height, points]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ border: '1px solid #ddd' }}
    />
  );
};

// Componente contenedor con puntos aleatorios
const RandomVoronoi: React.FC = () => {
  const [width, height] = [800, 600];
  
  // Generar puntos aleatorios
  const randomPoints = useMemo(() => {
    const points: Point[] = [];
    for (let i = 0; i < 50; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height
      });
    }
    return points;
  }, [width, height]);

  return (
    <div>
      <h2>Diagrama de Voronoi con TypeScript</h2>
      <VoronoiDiagram 
        width={width} 
        height={height} 
        points={randomPoints} 
      />
    </div>
  );
};

export default RandomVoronoi;
*/