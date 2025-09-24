//src\radix\radixconf.tsx


/*
| size | Uso común            | Equivalente visual aproximado |
| ---- | -------------------- | ----------------------------- |
| "1"  | pequeño              | \~12px font, \~4px padding    |
| "2"  | mediano (default)    | \~14px font, \~8px padding    |
| "3"  | grande               | \~16px font, \~12px padding   |
| "4"  | XL (solo en algunos) | \~18px+ font                  |*/

export enum RADIX_COLORS {
    gray= "gray",
    mauve= "mauve" ,
    slate= "slate" ,
    sage= "sage" ,
    olive= "olive" ,
    sand= "sand" ,
    tomato= "tomato" ,
    red= "red" ,
    ruby= "ruby" ,
    crimson= "crimson" ,
    pink= "pink" ,
    plum= "plum" ,
    purple= "purple" ,
    violet= "violet" ,
    iris= "iris" ,
    indigo= "indigo" ,
    blue= "blue" ,
    cyan= "cyan" ,
    teal= "teal" ,
    jade= "jade" ,
    green= "green" ,
    grass= "grass" ,
    lime= "lime" ,
    yellow= "yellow" ,
    amber= "amber" ,
    orange= "orange" ,
    brown= "brown" ,
    sky= "sky" , 
};

export class RadixConf {

    public static readonly SIZES = {
        size_1: "1" as any,
        size_2: "2" as any,
        size_3: "3" as any,
        size_4: "4" as any,
    };

    public static readonly RADIUS = {
        none:    "none" as any,
        small:   "small" as any,
        medium:  "medium" as any,
        large:   "large" as any,
        full:    "full" as any
    };
    
    public static readonly VARIANTS = {
        plain: "plain" as any,
        classic: "classic" as any,
        solid: "solid" as any,
        soft: "soft" as any,
        surface: "surface" as any,
        ghost: "ghost" as any,
        outlined: "outlined" as any,
        subtle: "subtle" as any,
    };

};//end class


/**
 * RadixConstants.KEY_INTRO
 */
export class RadixConstants {   

    public static readonly RADIX_VERSION: string = "0.1.0";
    public static readonly RADIX_NAME: string = "Radix UI";
    public static readonly RADIX_AUTHOR: string = "NextApps";
    public static readonly RADIX_URL: string = "https://nextapps.dev/radixui";
    public static readonly RADIX_LICENSE: string = "MIT License";

    public static readonly RADIX_THEME_LIGHT: string = "light";
    public static readonly RADIX_THEME_DARK: string = "dark";

    public static readonly ITEM_CHECKED: string = "1";
    public static readonly ITEM_UNCHECKED: string = "2";


}//end class 
