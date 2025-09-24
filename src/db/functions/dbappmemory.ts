// File: src/app/appstorage.service.ts

import { Option } from "@/common/option";
import { parseResponseCollection } from "@/common/parsers/javascriptparser";
import { Proglanguage } from "@/db/model/proglanguage";
import { getProglanguagesAsOptions } from "@/db/functions/dbmodelutil";


/**
 * class AppMemmory.saveProglanguages
 */

import { StorageService } from "@/common/storage";

export class DbAppMemmory {

    static NOT_FOUND:string  = "not_found";
    static DB_ESQUEMA:string  = "dbsquema";
    static PROGLANGUAGES:string  = "proglanguages";

    
    public static saveDbSquema(sql_script: string): void {
        StorageService.save(DbAppMemmory.DB_ESQUEMA,sql_script);
    }

    public static readDbSquema(): string {
        if(!StorageService.exist(DbAppMemmory.DB_ESQUEMA)){
            return DbAppMemmory.NOT_FOUND; 
        }
        return StorageService.read(DbAppMemmory.DB_ESQUEMA)!;
    }

    public static saveProglanguages(proglanguages:string): void {
        StorageService.save(DbAppMemmory.PROGLANGUAGES,proglanguages);
    }


    public static readProglanguages(): Option[]  {
        if(!StorageService.exist(DbAppMemmory.PROGLANGUAGES)){
            return []; 
        }
        const json = StorageService.read(DbAppMemmory.PROGLANGUAGES);
        const proglanguages:Proglanguage[] = parseResponseCollection<Proglanguage>(json)!;
        return getProglanguagesAsOptions(proglanguages);
    }   

} //end class

/*
Option[]
    public static readProglanguages(): string|null {
        if(!StorageService.exist(AppMemmory.PROGLANGUAGES)){
            return null; 
        }
        return StorageService.read(AppMemmory.PROGLANGUAGES)!;
    }

*/