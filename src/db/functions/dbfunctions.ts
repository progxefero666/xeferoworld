//src\db\dbfuncions.ts

import { Tasktype } from "@/db/model/tasktype";
import { GenerateKeys } from "@/db/functions/generatekeys";
import { DbTables } from "@/db/dbcatalog";
import { DbConstants } from "@/lib/xdatabase/dbkernel";


/**
 * Database utility functions
 */
export class DbFunctions {

    /**
     * Get all task types as array of ItemValue
     * @param tasktypes 
     * @returns 
     */
    public static getNew_Tasktype(): Tasktype {
        const item: Tasktype = new Tasktype(
            GenerateKeys.genAlphaNum16(),
            DbConstants.EMPTY_VALUE,
            DbConstants.EMPTY_VALUE);
        return item;
    }

};//end class