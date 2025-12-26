//src\app_front\appconfig.ts

import { Option } from "@/common/option";


/**
 * AppConfig.MOD_UNIVERSO
 */
export class AppConfig {
    
    public static readonly INDEX: Option = new Option("./","Home");

    // list modules
    public static readonly MOD_IDE:      Option = new Option("./ide","IDE"); 
    public static readonly MOD_CHARACTERS: Option = new Option("./characters","Characters");


    public static readonly MODULES: Option[] = [
        AppConfig.MOD_IDE,
        AppConfig.MOD_CHARACTERS    
    ]
    
}//export class AppConfig

