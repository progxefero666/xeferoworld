//src\db\services\srvcatalog.ts
'use server';

import { JsonResponse }  from "@/common/jsonreponse";
import { PrismaClient,  } from "@generated/prisma";
import { DbTables } from "@//db/dbcatalog";

/**
 * Db Server Action for read all rows in catalog table.
 * @param tableName 
 * @returns 
 */
export async function getAllRows(tableName: string): Promise<string> {

    const prisma = new PrismaClient();
    let result = null;
    try {
        if (tableName === DbTables.proglanguage) {
            result = await prisma.proglanguage.findMany();
        }
        else if (tableName === DbTables.tasktype) {
            result = await prisma.tasktype.findMany();
        }
        else if (tableName === DbTables.workflow) {
            result = await prisma.workflow.findMany();
        }   
        else if (tableName === DbTables.template) {
            result = await prisma.template.findMany();
        }                       
    }
    catch (error) {
        //DpOpsUtil.consoleErr(error, DpOpsUtil.getOpName(tableName,DbOps.GET_ALL));
        //return JsonResponse.ERROR(DpOpsUtil.getErrMessage(error));
    }
    finally {
        await prisma.$disconnect();
    }
    if (result == null) {
        return JsonResponse.ERROR("Error reading table: " + tableName);
    }
    return JsonResponse.SUCCESS('get_all', result);

} //end function