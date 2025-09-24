import { ThemeStyle } from "./rdxtheme";

/**
 * class RdxThContainers.PRIMARY_CONTENT
 */
export class RdxThContainers {

    public static MAIN_CONTENT = {
        backgroundColor: ThemeStyle.APP_BACK_COLOR,
    };

    public static PRIMARY_CONTENT = {
        backgroundColor: ThemeStyle.MAIN_BACK_COLOR,
        borderRight: '1px solid rgba(126, 131, 126, 0.9)',
    };

    public static SECONDARY_CONTENT = {
        backgroundColor: ThemeStyle.MAIN_BACK_COLOR
    };
    public static PRIMARY_BAR = {
        background: 'rgb(30, 40, 63)',
    };

    public static SECONDARY_BAR = {
        background: 'rgba(13, 20, 38, 1)',
    };

    public static BORDER_SIMPLE = { border: '1px solid rgb(167, 176, 188)' };

    public static BORDER_RED = { border: '1px solid rgba(172, 0, 40, 1)' };

    public static CODE_MONITOR = {
        background: 'rgb(35, 35, 39)',
        border: "1px solidrgb(75, 75, 75)"
    };

    public static readonly LAYOUT_DEF = {
        background: 'rgba(0, 0, 0, 1)'
    };
   
    public static HEADER_MAIN = {
        height: 'auto',
        background: 'rgb(29, 30, 32)',
        borderBottom: '2px solid rgba(126, 131, 126, 0.9)',
    };

    public static HEADER_LEFT = {
        height: 'auto',
    };

    public static HEADER_CENTER = {
        borderTop: 'none',
        borderBottom: 'none',
        borderLeft: '1px solid rgb(167, 176, 188)',
        borderRight: '1px solid rgb(125, 134, 145)',
    };
    
    public static HEADER_RIGHT = {
        height: 'auto',
    };

    public static CRUD_BAR = {
        borderBottom: '1px solid rgb(98, 97, 98)',
        borderTop: '1px solid rgb(98, 97, 98)',
    };

    public static MONITOR_CONTENT = {
        backgroundColor: 'rgba(0, 0, 0, 1)',
        border: '1px solid rgba(0, 0, 0, 1)',
    };

    public static OUTPUT_TEXT = {
        backgroundColor: 'rgba(34, 34, 34, 1)',
        border: '1px solid rgba(122, 122, 122, 1)',
        objectRadius: '6px',
    };    

    public static INPUT_FILE = {
        backgroundColor: 'rgba(34, 34, 34, 1)',
        border: '1px solid rgb(98, 97, 98)',
        objectRadius: '6px',
    };

}//end class

    /*
       public static SECONDARY_CONTENT = {
        backgroundColor: 'rgba(45, 45, 45, 1)',
    };
    */