//src\common\reflection\reflection.ts


/**
 * class Reflection
 */
export class Reflex {

    

}//end class

/**
 * class ReflexMessage.getErrorMsgNotRegister
 */
export class ReflexMessage {

    public static readonly ERROR: string = "Error";
    public static readonly WARNING: string = "Warning";
    public static readonly INFO: string = "Info";

    public static getErrorMsgNotRegister(name: string): string {
        return `Not register class: ${name}`;
    }

}//end class