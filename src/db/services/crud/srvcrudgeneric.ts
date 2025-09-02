//src\db\services\generic\srvcrudgeneric.ts

"use server";

import { JsonResponse } from "@/common/jsonreponse";
import { PrismaClient, generic } from "@generated/prisma";
import { DB_ERROR, DbOps, DpOpsUtil } from "@/lib/xdatabase/dbkernel";
import { DbTables } from "@/db/dbcatalog";
import { parseItem } from "@/common/parsers/javascriptparser";

/**
 * Insert new Table row item
 * @param item_serial 
 * @returns 
 */
export async function insertGeneric(item_serial:string): Promise<string> {
    const item: generic|null = parseItem<generic>(item_serial);
    if(item===null){return JsonResponse.ERROR(DB_ERROR.BAD_FORMAT);}
    const prisma = new PrismaClient();
    let result: generic|null = null;
    try {
        result = await prisma.generic.create({data:item});
        if (result === null) {return JsonResponse.ERROR_ITEM_OP(DbTables.generic,DbOps.INSERT);}
    }
    catch (error) {return JsonResponse.ERROR(DpOpsUtil.getErrMessage(error));}
    finally {await prisma.$disconnect();}
    return JsonResponse.SUCCESS_ITEM_OP(DbTables.generic,DbOps.INSERT);
}//end

/**
 * Update Generic row item
 * @param item_serial 
 * @returns JsonResponse
 */
export async function updateGeneric(item_serial:string): Promise<string> { 
    const item: generic|null = parseItem<generic>(item_serial);
    if(item===null){return JsonResponse.ERROR(DB_ERROR.BAD_FORMAT);}
    const prisma = new PrismaClient();
    let result = null;
    try {
        result = await prisma.generic.update({where:{id:item.id!},data:item!});        
        if (result === null) {return JsonResponse.ERROR_ITEM_OP(DbTables.generic,DbOps.UPDATE);}    
    }
    catch (error) {return JsonResponse.ERROR(DpOpsUtil.getErrMessage(error));}
    finally {await prisma.$disconnect();}
    return JsonResponse.SUCCESS_ITEM_OP(DbTables.generic,DbOps.UPDATE);
}//end

/**
 * Delete Generic row item
 * @param item_serial 
 * @returns JsonResponse 
 */
export async function deleteGeneric(id: string): Promise<string> {
    const prisma = new PrismaClient();
    let result = null;
    try {
        result = await prisma.generic.delete({where:{id:id}});
        if (result === null) {return JsonResponse.ERROR_ITEM_OP(DbTables.generic,DbOps.DELETE);}          
    }
    catch (error) {return JsonResponse.ERROR(DpOpsUtil.getErrMessage(error));}
    finally {await prisma.$disconnect();}
    return JsonResponse.SUCCESS_ITEM_OP(DbTables.generic,DbOps.DELETE);
}//end