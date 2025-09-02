//src\common\json\models\jsonresponse.ts

import { DB_CONSTANTS, DbConstants, DbOps, DpOpsUtil } from "@/lib/xdatabase/dbkernel";



/**
 * Model: JsonResponse
 *    for back services responses.
 */
export class JsonResponse {
    

    public result: string;
    public message: string | null = null;
    public data: any | null = null;

    constructor(status:string,message:string|null,data?:any) {
        this.result = status;
        if(message !== null) {this.message = message;}
        if(data !== null) {this.data = data;}
    }

    public toJson(): string {
        return JSON.stringify(this,null,4);
    };//end

    public isSuccess(): boolean {
        return this.result === DB_CONSTANTS.SUCCESS;
    };//end

    public isError(): boolean {
        return this.result === DB_CONSTANTS.ERROR;
    };//end

    public static SUCCESS(message:string|null,data?:any): string {
        const jsonResponse:JsonResponse = new JsonResponse(DB_CONSTANTS.SUCCESS, message,( data?? null));
        return jsonResponse.toJson();
    };//end

    public static ERROR(message:string|null): string {
        const jsonResponse:JsonResponse = new JsonResponse(DB_CONSTANTS.ERROR, message, null);
        return jsonResponse.toJson();
    };//end


    public static SUCCESS_EXIST(tableName:string): string {
        const opName: string = DpOpsUtil.getOpName(tableName, DbOps.CHECK_EXIST);
        const jsonResponse:JsonResponse = 
            new JsonResponse(DB_CONSTANTS.SUCCESS, opName,DbConstants.EXIST_ROW);
        return jsonResponse.toJson();
    };//end

    public static SUCCESS_ITEM_OP(tableName:string,opName:string): string {
        const opMessage: string = "success crud op: "+ opName +" in table: " + tableName;
        const jsonResponse:JsonResponse = new JsonResponse(DB_CONSTANTS.ERROR,opMessage);
        return jsonResponse.toJson();
    };//end

    public static ERROR_ITEM_OP(tableName:string,opName:string): string {
        const opMessage: string = "error item "+ tableName +" in crud op: " + opName;
        const jsonResponse:JsonResponse = new JsonResponse(DB_CONSTANTS.ERROR,opMessage);
        return jsonResponse.toJson();
    };//end
    

}//end class