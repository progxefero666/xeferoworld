//src\common\helper\modelhelper.ts

import { Keyvalue } from "../keyvalue";


/**
 * class ModelHelper.getAsKeyvalueArray
 */
export class ModelHelper {
  
    static getAsKeyvalueArray(list:string[]): Keyvalue[]{
        const result: Keyvalue[] = [];
        for (let idx=0;idx<list.length;idx++) {
            result.push(new Keyvalue(idx.toString(),list[idx]));
        }
        return result;
    }

}//end class ModelHelper