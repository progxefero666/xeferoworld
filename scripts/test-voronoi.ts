import { VoronoiCalculator } from '../src/terrains/functions/voronoifunct';
import { TDimension } from '@/common/types';
// Test Voronoi calculation with simple points
const dimension: TDimension = { width: 100, height: 100 };
const points = [
  { x: 10, y: 10 },
  { x: 90, y: 10 },
  { x: 50, y: 90 }
];

const cells = VoronoiCalculator.calculateVoronoi(points, dimension);
console.log('Cells:', JSON.stringify(cells, null, 2));
