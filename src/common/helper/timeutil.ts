
/**
 * class TimeUtil.formatDigitalTime
 */
export class TimeUtil {

    static getFillNumberString(value:number){
        return value.toString().padStart(2, '0')
    }

    static getObjMinAndSec(seconds: number): number[] {
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        return [m,s];
    }
    static getObjHourAndMinAndSec(seconds: number): number[] {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        return [h,m,s];
    }

    static formatDigitalTime(seconds: number, showHours: boolean = false): string[] {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        return showHours
            ? [h, m, s].map(n => n.toString().padStart(2, '0'))
            : [m, s].map(n => n.toString().padStart(2, '0'));
    }


    static formatTimeMinSec(totalSeconds: number): string {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60);
        //const str= minutes.toString();
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    /**
     * Convierte segundos a una cadena con formato "1 h 23 min 23 s".
     * @param seconds - Los segundos a convertir.
     * @returns La cadena con el formato deseado.
     */
    static secondsToHms(seconds: number): string {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        let result = "";
        if (hours > 0) {
            result += `${hours} h `;
        }
        if (minutes > 0) {
            result += `${minutes} min `;
        }
        if (remainingSeconds > 0 || (hours === 0 && minutes === 0)) {
            result += `${remainingSeconds} s`;
        }
        return result.trim();
    }

    /**
      * Redondea segundos al entero superior y los convierte a milisegundos.
      * @param seconds - Los segundos a redondear y convertir.
      * @returns Los milisegundos equivalentes, redondeados al entero superior.
      */
    static roundedSecondsToMilliseconds(seconds: number): number {
        return Math.ceil(seconds) * 1000;
    }

    /**
     * Redondea segundos al entero superior.
     * @param seconds - Los segundos a redondear.
     * @returns Los segundos redondeados al entero superior.
     */
    static roundedSeconds(seconds: number): number {
        return Math.ceil(seconds);
    }

    static roundedSecondsToString(seconds: number): string {
        return TimeUtil.secondsToHms(seconds);
    }

    /**
     * Converts seconds to milliseconds.
     * @param seconds - The seconds to convert.
     * @returns The equivalent milliseconds.
     */
    static secondsToMilliseconds(seconds: number): number {
        return seconds * 1000;
    }

    /**
     * Converts milliseconds to seconds.
     * @param milliseconds - The milliseconds to convert.
     * @returns The equivalent seconds.
     */
    static milisecToSeconds(milliseconds: number): number {
        return milliseconds / 1000;
    }

    /**
     * Converts minutes to seconds.
     * @param minutes - The minutes to convert.
     * @returns The equivalent seconds.
     */
    static minutesToSeconds(minutes: number): number {
        return minutes * 60;
    }

    /**
     * Converts seconds to minutes.
     * @param seconds - The seconds to convert.
     * @returns The equivalent minutes.
     */
    static secondsToMinutes(seconds: number): number {
        return seconds / 60;
    }

    /**
     * Converts minutes to milliseconds.
     * @param minutes - The minutes to convert.
     * @returns The equivalent milliseconds.
     */
    static minutesToMilliseconds(minutes: number): number {
        return minutes * 60 * 1000;
    }

    /**
     * Converts milliseconds to minutes.
     * @param milliseconds - The milliseconds to convert.
     * @returns The equivalent minutes.
     */
    static millisecondsToMinutes(milliseconds: number): number {
        return milliseconds / (60 * 1000);
    }


}//end