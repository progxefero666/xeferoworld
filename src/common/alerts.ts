//src\common\util\showalerts.ts

import { TSelection } from "../radix/rdxtypes";
import { JsonHelper } from "./helper/jsonhelper";

/**
 * class ShowAlerts.showTSelection
 */
export class ShowAlerts {
    
    public static readonly SEPARATOR: string = " : ";

    static show(message: string): void {
        alert(message);
    }
    
    static showCouple(valueA:string,valueB:string): void {
        alert(valueA.concat(ShowAlerts.SEPARATOR).concat(valueB));
    }

    static showError(message: string): void {
        alert("Error: ".concat(message));
    }    

    static showSuccess(message: string): void {
        alert(message);
    }

    static showJson(json: string): void {       
        alert( JsonHelper.toJsonString(json));
    }
    /*
    static showTSelection(tselection: TSelection): void {     
        const json: string | null = JsonHelper.getTSelectionJsonString(tselection);  
        alert( JsonHelper.toJsonString(json));
    }
    */

}//end class