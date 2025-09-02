//src\lib\math3d\model\circunf3d.ts


/**
 * class Circunf3d
 */
export class Circunf3d {

    public static readonly DEF: Circunf3d = new Circunf3d([0, 0, 0], 0);

    public color: string;
    public position: number[];
    public radius: number;

    constructor(position: number[], radius: number, color?: string) {
        this.position = position;
        this.radius = radius;
        this.color = color ||  "#000000"; // Default color is black
    }

} // end class Circunf3d