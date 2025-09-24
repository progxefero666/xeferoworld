//src\app_front\ui\appbars.ts


import { BarButtonsCfg } from "@/radix/models/barbuttonscfg";
import { DB_ITEM_CMD_TEXT, DB_ITEM_CMD } from "@/lib/xdatabase/dbkernel";
import { ButtonsStyle } from "./rdxtheme";
import { RadixConf } from "./rdxconf";
import { OpConstants } from "@/common/constants";

//const MODE_EDITION:string = "edit";
export const BARCFG_SAVE_CLOSE: BarButtonsCfg = new BarButtonsCfg(
    [DB_ITEM_CMD.UPDATE,OpConstants.OP_CLOSE],
    [DB_ITEM_CMD_TEXT.UPDATE,OpConstants.OP_TEXT_CLOSE],
    [ButtonsStyle.COLOR_SAVE,ButtonsStyle.COLOR_CLOSE],
    [RadixConf.ICON_SAVE,RadixConf.ICON_OPEN],
    [false,false],
    [true,true]
);

export const BARCFG_ADD_IMPORT: BarButtonsCfg = new BarButtonsCfg(
    [DB_ITEM_CMD.INSERT,DB_ITEM_CMD.IMPORT],
    [DB_ITEM_CMD_TEXT.INSERT,DB_ITEM_CMD_TEXT.IMPORT],
    [ButtonsStyle.COLOR_DELETE,ButtonsStyle.COLOR_OPEN],
    [RadixConf.ICON_DELETE,RadixConf.ICON_OPEN],
    [false,false],
    [true,true]
);

export const BARCFG_DOS: BarButtonsCfg = new BarButtonsCfg(
    [DB_ITEM_CMD.DELETE,DB_ITEM_CMD.OPEN,DB_ITEM_CMD.SELECT],
    [DB_ITEM_CMD_TEXT.DELETE,DB_ITEM_CMD_TEXT.OPEN,DB_ITEM_CMD_TEXT.SELECT],
    [ButtonsStyle.COLOR_DELETE,ButtonsStyle.COLOR_OPEN,ButtonsStyle.COLOR_EXPORT],
    [RadixConf.ICON_DELETE,RadixConf.ICON_OPEN,RadixConf.ICON_RUN],
    [false,false,false],
    [true,true,true]
);

export const BARCFG_DELETE_OPEN: BarButtonsCfg = new BarButtonsCfg(
    [DB_ITEM_CMD.DELETE,DB_ITEM_CMD.OPEN],
    [DB_ITEM_CMD_TEXT.DELETE,DB_ITEM_CMD_TEXT.OPEN],
    [ButtonsStyle.COLOR_DELETE,ButtonsStyle.COLOR_OPEN],
    [RadixConf.ICON_DELETE,RadixConf.ICON_OPEN],
    [false,false],
    [true,true]
);

export const BARCFG_EXPORT: BarButtonsCfg = new BarButtonsCfg(
    [DB_ITEM_CMD.EXPORT],
    [DB_ITEM_CMD_TEXT.EXPORT],
    [ButtonsStyle.COLOR_EXPORT],
    [RadixConf.ICON_EXPORT],
    [false],
    [true]
);
export const BARCFG_EXPORT_COPY: BarButtonsCfg = new BarButtonsCfg(
    [DB_ITEM_CMD.EXPORT,DB_ITEM_CMD.COPY],
    [DB_ITEM_CMD_TEXT.EXPORT,DB_ITEM_CMD_TEXT.COPY],
    [ButtonsStyle.COLOR_EXPORT,ButtonsStyle.COLOR_COPY],
    [RadixConf.ICON_EXPORT,RadixConf.ICON_COPY],
    [false,false],
    [true, true]
);

