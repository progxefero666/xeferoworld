//src\graph2d\graphcolors.ts


/**
 * GraphColors class
 * This class defines a set of colors used in the graph rendering.
 */
export class GraphColors {

    
    public static readonly BACKGROUND = "#232327";
    public static readonly TEXT = "#ffffff";
    public static readonly GRID = "#cccccc";
    public static readonly AXIS_X = "#0f00e6";
    public static readonly AXIS_Y = "#00c94a";
    public static readonly POINT = "#ff0000";
    public static readonly LINE = "#ba03ba";

    public static readonly POLYGON_FILL = "#00ff00";
    public static readonly POLYGON_BORDER = "#ffffff";
    
    public static readonly COLOR_BLACK = "#000000";
    public static readonly COLOR_WHITE = "#ffffff";
    public static readonly COLOR_RED = "#ff0000";
    public static readonly COLOR_BLUE = "#0033ff";
    public static readonly COLOR_GREEN = "#00ea08";

}//end

/**
 * class GraphColoUtil.toHexadecimal
 */
export class GraphColoUtil {


    public static toHexadecimal(color: number): string {
        const hex = color.toString(16).padStart(2, '0');
        return `#${hex}${hex}${hex}`;
    }//end

    public static getAleatoryColor(): string {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }//end

}//end