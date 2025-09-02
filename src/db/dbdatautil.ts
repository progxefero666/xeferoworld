//src\app\diagrams\db\dbdatautil.ts

import { TTable, TTableRow } from '@/common/types';

import * as model_proglanguage  from "@/db/model_metada/proglanguage.json";
import * as model_tasktype from "@/db/model_metada/tasktype.json";
import * as model_task from "@/db/model_metada/task.json";
import * as model_taskcategory from "@/db/model_metada/taskcategory.json";
import * as model_workflow from "@/db/model_metada/workflow.json";
import { DbCatalog, DbTables } from '@/db/dbcatalog';

/**
 * class DbDataUtil.getAllDbTableObjects 
 *  - provides utility functions to handle database metadata.
 */
export class DbDataUtil {   

    public static getAllDbTableObjects(): TTable[] {
        const db_tablenames: string[] = DbCatalog.getAllTableNames();
        const db_tableobjects: TTable[] = [];
        for (const name of db_tablenames) {
            const obj: TTable = DbDataUtil.getDbTableObject(name);
            db_tableobjects.push(obj);
        } 
        return db_tableobjects;
    };//end

    public static getDbTableObject(name:string): TTable {
        switch (name) {
            case DbTables.proglanguage:
                return this.getTableObject(model_proglanguage);
            case DbTables.tasktype:
                return this.getTableObject(model_tasktype);
            case DbTables.task:
                return this.getTableObject(model_task);
            case DbTables.taskcategory:
                return this.getTableObject(model_taskcategory);
            case DbTables.workflow:
                return this.getTableObject(model_workflow);
            default:
                throw new Error(`Unknown table name: ${name}`);
        }
    };//end

    public static getTableObject(jsonObject: any): TTable {
        const obj: TTable = {
            name: jsonObject.name,
            rows: this.getTableRows(jsonObject)
        };
        return obj;
    } // end

    public static getTableRows(jsonObject: any): TTableRow[] {
        const result: TTableRow[] = [];
        for (let i = 0; i < jsonObject.fields.length; i++) {
            let col3value: string = '';
            if (jsonObject.fields[i].pk) {
                col3value = 'pk';
            } else if (jsonObject.fields[i].fk) {
                col3value = 'fk';
            } else {
                if (jsonObject.fields[i].generated) {
                    col3value = 'gen.';
                }
            }
            result.push({
                col1: jsonObject.fields[i].name,
                col2: jsonObject.fields[i].type,
                col3: col3value
            });
        }
        return result;
    } // end

};//end