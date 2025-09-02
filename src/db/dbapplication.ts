//src\front\app.ts


import { initDatabase } from "@/db/functions/dbinit";

import { DbAppMemmory } from "./functions/dbappmemory";
import { getAllProglanguage } from "@/db/services/read/srvproglanguage";


/**
 * Main AppGenerator.initDatabase();
 */
export class AppGenerator {

    public static async initDatabase(): Promise<boolean> {
        const result = await initDatabase();
        if(result == false){alert}
        return result;
    };//end

    public static async saveInMemoryProglanguages(): Promise<void> {
        const response = await getAllProglanguage();
        if (response==null) {
            console.error("Failed to fetch programming languages");
            return;
        }
        //const proglanguages: Proglanguage[]|null = parseResponseCollection<Proglanguage>(response);
        //console.log( proglanguages);
        DbAppMemmory.saveProglanguages(response);    
    };//end

}//end class