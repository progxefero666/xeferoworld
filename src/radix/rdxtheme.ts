//src\radix\radixcolors.ts

import { RadixConf } from "@/radix/rdxconf";
import { RADIX_COLORS } from '@/radix/rdxconf';
import { XCompStyle, XContStyle, XTextCompStyle, XTextStyle } from "@/radix/rdxtypes";

/**
 * class ThemeStyle.MAIN_BACK_COLOR
 */
export class ThemeStyle {

    public static APP_BACK_COLOR: any = "#9d0238ff";
    public static MAIN_BACK_COLOR: any = "rgba(28, 28, 30, 1.0)";

};//end 

// Icons Style
//......................................................................................................
export class IconsStyle {
    //'rgba(28, 28, 30, 1.0)'
    public static readonly DEF_WIDTH = "20px";
    public static readonly DEF_HEIGHT = "20px";
    public static readonly DEF_SIZE = RadixConf.SIZES.size_2;
    public static readonly DEF_INBAR_SIZE = RadixConf.SIZES.size_2;
    public static readonly DEF_COLOR: any = "#EEEEEE";

    public static readonly DEF_WIDTHN:number = 20;
    public static readonly DEF_HEIGHTN:number = 20;

};//end class


// Buttons Style
//.............................................................................................
//class ButtonsStyle.COLOR_ADD
export class ButtonsStyle {

    // buttons colors
    //.........................................................................................    
    public static readonly COLOR_ADD = RADIX_COLORS.green;
    public static readonly COLOR_INSERT = RADIX_COLORS.plum;
    public static readonly COLOR_OPEN = RADIX_COLORS.blue;
    public static readonly COLOR_DELETE = RADIX_COLORS.orange;
    public static readonly COLOR_EDIT = RADIX_COLORS.green;
    public static readonly COLOR_CLEAR = RADIX_COLORS.blue;
    public static readonly COLOR_CANCEL = RADIX_COLORS.yellow;
    public static readonly COLOR_SAVE = RADIX_COLORS.green;
    public static readonly COLOR_IMPORT = RADIX_COLORS.blue;
    public static readonly COLOR_EXPORT = RADIX_COLORS.iris;
    public static readonly COLOR_RUN = RADIX_COLORS.green;
    public static readonly COLOR_COPY = RADIX_COLORS.jade;
    public static readonly COLOR_DOWNLOAD = RADIX_COLORS.orange;
    public static readonly COLOR_CLOSE = RADIX_COLORS.tomato;
    public static readonly COLOR_EXPAND = RADIX_COLORS.mauve;

    public static readonly COLOR_MOVEUP = RADIX_COLORS.mauve;
    public static readonly COLOR_MOVEDOWN = RADIX_COLORS.indigo;

    public static readonly COLOR_APICALL = RADIX_COLORS.green;
    public static readonly COLOR_HOME: any = "gray";
    public static readonly HOME_STYLE: any = "w-full justify-start";
    public static readonly COLOR_GENERATE: any = RADIX_COLORS.green;
    public static readonly COLOR_ALEATORY: any = RADIX_COLORS.orange;
    public static readonly COLOR_RESET = RADIX_COLORS.yellow;

    public static readonly COLOR_ARROWLEFT = RADIX_COLORS.orange;
    public static readonly COLOR_ARROWRIGHT = RADIX_COLORS.orange;

    // buttons style
    //.........................................................................................
    public static readonly BUTTON_SIZE: any = RadixConf.SIZES.size_2;
    public static readonly BUTTON_VAR: any = RadixConf.VARIANTS.solid;
    public static readonly BUTTON_RADIUS: any = RadixConf.RADIUS.medium;
    public static readonly BUTTON_COLOR: any = "gray";

    public static readonly TEXT_SIZE: any = RadixConf.SIZES.size_3;
    public static readonly TEXT_COLOR: any = "#EEEEEE";
    
    public static readonly TEXT_STYLE = { fontshadow: "0 0 0.5px #000000" };

    public static BUTTON_STYLE: XTextCompStyle = {
        size: ButtonsStyle.BUTTON_SIZE,
        color: ButtonsStyle.BUTTON_COLOR,
        radius: ButtonsStyle.BUTTON_RADIUS,
        variant: ButtonsStyle.BUTTON_VAR,
        text_color: ButtonsStyle.TEXT_COLOR,
        text_size: ButtonsStyle.TEXT_SIZE,
        text_style: ButtonsStyle.TEXT_STYLE
    };

    // icon buttons style
    //.........................................................................................
    public static readonly ICONBUTTON_COLOR: any = RADIX_COLORS.green;
    public static readonly ICONBUTTON_SIZE: any = RadixConf.SIZES.size_2;
    public static readonly ICONBUTTON_RADIUS: any = RadixConf.RADIUS.medium;
    public static readonly ICONBUTTON_VAR: any = RadixConf.VARIANTS.solid;

    public static readonly ICONBUTTON_SMALL_SIZE: any = RadixConf.SIZES.size_1;
    public static readonly ICONBUTTON_SMALL_COLOR: any = RADIX_COLORS.green;
    public static readonly ICONBUTTON_SMALL_RADIUS: any = RadixConf.RADIUS.small;
    public static readonly ICONBUTTON_SMALL_VAR: any = RadixConf.VARIANTS.solid;

    public static ICONBUTTON_STYLE: XCompStyle = {
        size: ButtonsStyle.ICONBUTTON_SIZE,
        color: RADIX_COLORS.green,
        radius: ButtonsStyle.ICONBUTTON_RADIUS,
        variant: ButtonsStyle.ICONBUTTON_VAR
    };

    public static ICONBUTTON_SMALL_STYLE: XCompStyle = {
        size: ButtonsStyle.ICONBUTTON_SMALL_SIZE,
        color: ButtonsStyle.ICONBUTTON_SMALL_COLOR,
        radius: ButtonsStyle.ICONBUTTON_SMALL_RADIUS,
        variant: ButtonsStyle.ICONBUTTON_SMALL_VAR
    };    

    public static ICONPLAYER_STYLE: XCompStyle = {
        size: ButtonsStyle.ICONBUTTON_SIZE,
        color: RADIX_COLORS.gray,
        radius: RadixConf.RADIUS.none,
        variant: RadixConf.VARIANTS.solid
    };

};//end


// Text Style
// class TextStyle.ST_CONT_HEADER_COLOR
//.............................................................................................
export class TextStyle {

    public static readonly SIZE_DEF: any = RadixConf.SIZES.size_2;
    public static readonly SIZE_MEDIUM: any = RadixConf.SIZES.size_3;
    public static readonly SIZE_BIG: any = RadixConf.SIZES.size_4;
    public static readonly SIZE_TITLE_DIALOG: any = RadixConf.SIZES.size_2;

    public static readonly COLOR_DEF: any = "#EEEEEE";
    public static readonly COLOR_HEADER: any = "#ffffffff";
    public static readonly COLOR_SPECIAL = { color: "#ff7300ff" };
    
    public static ST_DEF: XTextStyle = {
        align: "left",
        size: RadixConf.SIZES.size_2,
        color: RADIX_COLORS.gray,
        style: { fontshadow: "0 0 0.5px #000000",with:"200px" }
    }
    
    public static ST_LABEL: XTextStyle = {
        align: "left",
        size: RadixConf.SIZES.size_2,
        color: RADIX_COLORS.blue,
        style: { with:"auto" }
    }

    public static ST_GRAY: XTextStyle = {
        align: "left",
        size: RadixConf.SIZES.size_2,
        color: RADIX_COLORS.gray
    } 

    public static ST_CONT_HEADER: XTextStyle = {
        align: "left",
        size: RadixConf.SIZES.size_3,
        color: "amber9",
        style: { fontshadow: "1.0px 1.0px 1.0px #000000" }
    } 

    public static ST_CONT_HEADER_COLOR: XTextStyle = {
        align: "left",
        size: RadixConf.SIZES.size_3,
        color: RADIX_COLORS.gray,
        style: { fontshadow: "1.0px 1.0px 1.0px #000000" }
    }    

    public static ST_TIME: XTextStyle = {
        align: "left",
        size: RadixConf.SIZES.size_2,
        color: RADIX_COLORS.green,
        style: { fontshadow: "1.0px 1.0px 1.0px #000000" }
    }

};//end class


// Comp Style
//.............................................................................................
// class CompStyle.INPUT_FILE
export class CompStyle {

    public static readonly SIZE_DEF: any = RadixConf.SIZES.size_2;
    public static readonly RADIUS_DEF: any = RadixConf.RADIUS.medium;
    public static readonly VARIANT_DEF: any = RadixConf.VARIANTS.soft;
    public static readonly COLOR_DEF: any = RADIX_COLORS.gray;

    public static readonly DEFAULT: XContStyle = {
        size: CompStyle.SIZE_DEF,
        color: CompStyle.COLOR_DEF,
        border_radius: CompStyle.RADIUS_DEF,
        border_color: RADIX_COLORS.blue,
        variant: CompStyle.VARIANT_DEF,
    };
    public static readonly CONT_CSS_STYLE = {
        borderRadius: "var(--radius-3)",
    };


};//end class


// Tables Style  TablesStyle.AUDIO_PARTS_STYLE
//.............................................................................................
export class TablesStyle {

    public static MAINCONT_STYLE = {width:"100%",height:'500px',paddingRight:"10px"};
    
    public static AUDIO_PARTS_STYLE = {width:"100%",height:'300px',paddingRight:"10px"};

    public static readonly HEADER_CELL_TEXT_SIZE: any = RadixConf.SIZES.size_2;
    public static readonly HEADER_CELL_TEXT_COLOR: any = "#ffa845ff";
    public static readonly HEADER_CELL_STYLE = {
        fontshadow: "0 0 0.5px #000000",
        fontWeight: "bold"
    };

    public static readonly CELL_TEXT_SIZE: any = RadixConf.SIZES.size_2;
    public static readonly CELL_TEXT_COLOR: any = "#ffffffff";

};//end class


// Data Style
//......................................................................................................
export class DataStyle {

    public static readonly TABLE_DEF_SIZE: any = RadixConf.SIZES.size_2;

};//end class


// Menus Style
//......................................................................................................
export class MenusStyle {

    public static readonly OPT_ACT_COLOR: any = RADIX_COLORS.indigo;
    public static readonly OPT_COLOR: any = RADIX_COLORS.blue;

    public static readonly OPT_SIZE: any = RadixConf.SIZES.size_2;

    public static readonly OPT_CSS = {
        width: '100%',
        backgroundColor: "var(--blue-9)",
        borderRadius: "var(--radius-3)"
    };

    public static readonly OPT_ACT_CSS = {
        width: '100%',
        variant: "soft",
        backgroundColor: "var(--red-9)",
        borderRadius: "var(--radius-3)"
    };

};//end class