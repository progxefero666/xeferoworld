//src\db\dbmodelutil.ts

import { Option } from "@/common/option";
import { Proglanguage } from "@/db/model/proglanguage";
import { Tasktype } from "@/db/model/tasktype";
import { ItemValue } from "@/common/model/itemvalue";


export const getProglanguagesAsOptions = (codelangs: Proglanguage[]): Option[] =>{
    const options: Option[] = [];
    for (const item of codelangs) {
        const option = new Option(item.id!, item.name!);
        options.push(option);
    }
    return options;
}//end class


/**
 * class DbModelUtil.getAllTasktypeAsArrItemValue
 */
export class DbModelUtil {

    public static getAllTasktypeAsArrItemValue(tasktypes: Tasktype[]): ItemValue[] {
        const options: ItemValue[] = [];
        for (const item of tasktypes) {
            const option = new ItemValue(item.id, item.name);
            options.push(option);
        }
        return options;
    }
};//end class