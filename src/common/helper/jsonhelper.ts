// File: src/common/util/jsonhelper.ts

import { TSelection } from "@/radix/rdxtypes";
import { TTableRow } from "@/common/types";


/**
 * class JsonHelper.getFieldsTableItems
 * Provides utility methods for JSON operations.
 */
export class JsonHelper {

    public static readonly TAB_SPACE: number = 4;

    public static getArrayFieldsNames(jsonObject: any): string[] {
        const result:string [] = [];
        for(let idx: number = 0; idx < jsonObject.fields.length; idx++) {
            result.push(jsonObject.fields[idx].name);
        }
        return result;
    };//end

    //TableItem
    public static toJavaScript(obj: any): string {
        return JSON.parse(obj);
    }//end

    public static toJsonString(obj: any): string {
        return JSON.stringify(obj, null,JsonHelper.TAB_SPACE);
    }//end

    public static fromJsonString(jsonString: string): any {
        try {
            return JSON.parse(jsonString);
        } 
        catch (error) {
            alert("Error parsing JSON string: ".concat );
            return null;
        }
    }//end

    public static isValidJson(jsonString: string): boolean {
        try {
            JSON.parse(jsonString);
            return true;
        } 
        catch (error) {
            return false;
        }
    }//end

    public static getTSelectionJsonString(tselection: TSelection): string| null {
        if (tselection == null) {
            return null;
        }
        return JSON.stringify(tselection, null, JsonHelper.TAB_SPACE);
    }//end

}//end class

/**
 * class JSonConsole.log(json);
 * Provides a console for JSON operations.
 */
export class JSonConsole {

    public static log(json:string): void {
        console.log(json);
    }//end
    
    public static logArray(elements:any[]): void {
        const json = JSON.stringify(elements, null, JsonHelper.TAB_SPACE);
        JSonConsole.log(json);

    }//end


}//end class 

// console.log("DB Squema loaded:", val);
/*
      public static logJson(obj: any): void {
        console.log(JsonHelper.toJsonString(obj));
    }//end
    public static logJson(json: string): void {
        if (JsonHelper.isValidJson(json)) {
            console.log(json);
        } else {
            console.error("Invalid JSON string");
        }
    }//end    
 */