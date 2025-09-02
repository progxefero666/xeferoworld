//src\lib\graph2d\util\colorutil.ts

/**
 * class ColorUtil.convertToStringRgb
 */
export class ColorUtil {


    public static convertToStringRgb(color:any): string {
        return `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
    }



    public static toRgbArray(colorRgb: string): number[] {
        const parts = colorRgb.replace('rgb(', '').replace(')', '').split(', ');
        return parts.map(Number);
    }

    public static toRgbaArray(colorRgb: string): number[] {
        const parts = colorRgb.replace('rgba(', '').replace(')', '').split(', ');
        return parts.map(Number);
    }

}//end

/*
    public static convertToArrayRgb(object:{r:number,g:number,b:number}): number[] {
        return [object.r, object.g, object.b];
    }
*/