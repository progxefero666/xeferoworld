//src\app_front\appconfig.ts

import { Option } from "@/common/option";


/**
 * AppConfig.MOD_UNIVERSO
 */
export class AppConfig {
    
    public static readonly DBSQUEMA_FPATH: string 
        = "C:\claudeapps\nextapps\aigenerator\public\data\dbsquema.sql";

    public static readonly INDEX: Option = new Option("./","Home");

    // list modules
    public static readonly MOD_IDE:      Option = new Option("./ide","IDE");
    public static readonly MOD_WORLD:      Option = new Option("./world","World");
    public static readonly MOD_UNIVERSO:   Option = new Option("./universo","Universo");
    public static readonly MOD_TERRAINS:   Option = new Option("./terrains","Terrains");   
    public static readonly MOD_CHARACTERS: Option = new Option("./characters","Characters");
    public static readonly AUDIO_TOOLS:    Option = new Option("./audiozone","Audio Tools");
    public static readonly IMAGE_TOOLS:    Option = new Option("./genimages","Image Tools");

    public static readonly MODULES: Option[] = [
        AppConfig.MOD_IDE,
        AppConfig.MOD_WORLD,
        AppConfig.MOD_UNIVERSO,
        AppConfig.MOD_TERRAINS,
        AppConfig.MOD_CHARACTERS,
        AppConfig.AUDIO_TOOLS,
        AppConfig.IMAGE_TOOLS,           
    ]
    
}//export class AppConfig

