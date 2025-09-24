//src\db\dbcatalog.ts

export const getDbUrl = (name: string, motor: string,
    host: string, port: number,
    username: string, userpassword: string): string => {
    let url: string = motor + "://"
        .concat(username).concat(":").concat(userpassword)
        .concat("@").concat(host).concat(":").concat(String(port))
        .concat("/").concat(name);
    return url;
}

export enum DbTables {
    proglanguage    = "proglanguage",
    tasktype        = "tasktype",
    workflow        = "workflow",
    taskcategory    = "taskcategory",
    task            = "task",
    generic         = "generic",
    template        = "template",
};

export type TDbTable = keyof typeof DbTables; 

//.................................................................................................
// Database Catalog
//.................................................................................................
/**
 * class DbCatalog.getAllTableNames();
 */
export class DbCatalog {

    public static getAllTableNames(): string[] {
        let tableNames: string[] = [];
        tableNames.push(DbTables.proglanguage);
        tableNames.push(DbTables.tasktype);
        tableNames.push(DbTables.workflow);
        tableNames.push(DbTables.taskcategory);
        tableNames.push(DbTables.task);
        //tableNames.push(DbTables.generic);
        return tableNames;
    };//end

};//end class