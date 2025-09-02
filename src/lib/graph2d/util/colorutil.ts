//src\lib\graph2d\util\colorutil.ts

/**
 * class ColorUtil.getGradient
 */
export class ColorUtil {

    public static convertToStringRgb(color:any): string {
        return `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
    }//end

    public static toRgbArray(colorRgb: string): number[] {
        const parts = colorRgb.replace('rgb(', '').replace(')', '').split(', ');
        return parts.map(Number);
    }//end

    public static toRgbaArray(colorRgb: string): number[] {
        const parts = colorRgb.replace('rgba(', '').replace(')', '').split(', ');
        return parts.map(Number);
    }//end

    /*
    Generate color gradient function
        Data Examples:
            linear-gradient(red, orange, yellow, green, blue);
            linear-gradient(red 0%, orange 25%, yellow 50%, green 75%, blue 100%);
    */
    public static getGradient(colors:string[],biases:number[]):string {
        let data: string = colors[0] + ' 0%,';
        data += (colors[1]+' 50%,');
        data += (colors[2]+' 100%');

        const result:string = 'linear-gradient(to right, '.concat(data).concat(')');
        return result;
    }//end

}//end

/*
    public static getGradient(colors:string[],biases:number[]):string {
        const stops: string[] = [];
        stops.push(`${colors[0]} 0%`);

        let currentPosition = 0;
        for (let i = 1; i < colors.length; i++) {

            //last color
            if (i === colors.length - 1) {
                stops.push(`${colors[i]} 100%`);
            } 
            else {
                const segmentLength = 100 / (colors.length - 1);
                const biasInfluence = (biases[i - 1] - 0.5) * segmentLength; 

                const prevColorPosition = i === 1 ? 0 : parseFloat(stops[stops.length - 1].split(' ')[1].replace('%', ''));
                const nextBasePosition = (i / (colors.length - 1)) * 100;
                const transitionPoint = prevColorPosition + ((nextBasePosition - prevColorPosition) * biasInfluence);
                currentPosition = Math.max(currentPosition, Math.min(100, transitionPoint));
                stops.push(`${colors[i]} ${currentPosition}%`);
            }
        }

        return `linear-gradient(to right, ${stops.join(', ')})`;
    }//end

    public static convertToArrayRgb(object:{r:number,g:number,b:number}): number[] {
        return [object.r, object.g, object.b];
    }
*/