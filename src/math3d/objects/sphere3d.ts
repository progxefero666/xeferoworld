//src\lib\math3d\model\sphere3d.ts

import { Vector3d } from "@/common/types";


/**
 * class Sphere3d
 */
export class Sphere3d {

    public color: string;
    public center: Vector3d;
    public radius: number;

    constructor(center: Vector3d, radius: number, color?: string) {
        this.center = center;
        this.radius = radius;
        this.color = color ||  "#ffffff"; // Default color is white
    }

    // Method to calculate the volume of the sphere
    public volume(): number {
        return (4 / 3) * Math.PI * Math.pow(this.radius, 3);
    }

}//end class