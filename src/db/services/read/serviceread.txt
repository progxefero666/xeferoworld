//src\db\services\generic\serviceread.ts
"use server";

import { JsonResponse } from "@/common/model/jsonreponse";
import { Prisma, PrismaClient } from "@generated/prisma";
import { DB_COLL_CMD, DpOpsUtil } from "@/common/database/dbkernel";
import { DB_TABLES, DbTables } from "@/db/dbcatalog";

/*
Códigos de error Prisma más comunes:

    P1000: Authentication failed
    P1001: Can't reach database server
    P1002: Database server timeout
    P1003: Database does not exist
    P2000: Value too long
    P2001: Record not found
    P2002: Unique constraint failed
    P2003: Foreign key constraint failed
    P2025: Record to delete/update not found
*/

export async function getCountAllRows(table: string,rowName:string): Promise<string> {

    const prisma = new PrismaClient();
    let count = 0;
    try {
        if (table === DbTables.codelang) {
            count = await prisma.codelang.count({where:{name:rowName}});
        }        
        else if (table === DbTables.apptype) {
            count = await prisma.apptype.count({where:{name:rowName}});
        }     
        else if (table === DbTables.application) {
            count = await prisma.application.count({where:{name:rowName}});
        }                       
    }
    catch (error) {
        console.error(DpOpsUtil.getErrMessage(error));
        return JsonResponse.ERROR(DpOpsUtil.getErrMessage(error));
    }
    finally {
        await prisma.$disconnect();
    }
    return JsonResponse.SUCCESS(DpOpsUtil.getOpName(DB_TABLES.workflow, DB_COLL_CMD.COUNT_ROWS),count.toString());

};//end 


/**
 * Server Action for Read Commom Tables
 *    desc: get all rows from table passed in parameter.
 */
export async function getAllRows(table: string): Promise<string> {
    const prisma = new PrismaClient();
    let result = null;
    
    try {
        if (table === DbTables.codelang) {
            result = await prisma.codelang.findMany();
        }
        else if (table === DbTables.apptype) {
            result = await prisma.apptype.findMany();
        }
        else if (table === DbTables.application) {
            result = await prisma.application.findMany();
        }
    }
    catch (error) {
        await prisma.$disconnect();
        if (error instanceof Prisma.PrismaClientKnownRequestError) {        
            console.error(`Prisma Error Code: ${error.code}`);
            console.error(`Error Message: ${error.message}`);
            console.error(`Meta: ${JSON.stringify(error.meta)}`);            
            switch (error.code) {
                case 'P2002': return JsonResponse.ERROR('Violación de constraint único');
                case 'P2025': return JsonResponse.ERROR('Registro no encontrado');
                case 'P2003': return JsonResponse.ERROR('Violación de foreign key');
                default:      return JsonResponse.ERROR(`DB Error: ${error.message}`);
            }
        }
        else if (error instanceof Prisma.PrismaClientInitializationError) {
            console.error('Prisma Init Error:', error.message);
            return JsonResponse.ERROR('Error de conexión a BD');
        }
        else if (error instanceof Prisma.PrismaClientValidationError) {
            console.error('Prisma Validation Error:', error.message);
            return JsonResponse.ERROR('Error de validación de datos');
        }
        else {
            console.error('Generic Error:', error);
            const errorMsg = error instanceof Error ? error.message : 'Error desconocido';            
            return JsonResponse.ERROR(errorMsg);
        }
        
    }
    finally {
        await prisma.$disconnect();
    }
    
    return JsonResponse.SUCCESS(
        DpOpsUtil.getOpName(table, DB_COLL_CMD.GET_ALL), 
        result
    );
}



export async function executeReadQuery(commandSql: string, params: any[] = []): Promise<string> {

    const prisma = new PrismaClient();
    let result = null;
    try {
        result = await prisma.$queryRaw(Prisma.sql`${commandSql}`, ...params);
    }
    catch (error) {
        return JsonResponse.ERROR(DpOpsUtil.getErrMessage(error));
    }
    finally {
        await prisma.$disconnect();
    }
    return JsonResponse.SUCCESS(DpOpsUtil.getOpName("task", DB_COLL_CMD.GET_ALL), result);
}//end function



// Método 2: Ordenar descendente y tomar el primero
export async function getMaxCodelangIdAlt(): Promise<number> {
    const prisma = new PrismaClient();
    
    try {
        const result = await prisma.codelang.findFirst({
            orderBy: {
                id: 'desc'
            },
            select: {
                id: true
            }
        });
        
        return result?.id ?? 0;
    }
    catch (error) {
        console.error('Error getting max ID:', error);
        throw error;
    }
    finally {
        await prisma.$disconnect();
    }
}

// Método 3: Raw query (si necesitas más control)
export async function getMaxCodelangIdRaw(): Promise<number> {
    const prisma = new PrismaClient();
    
    try {
        const result = await prisma.$queryRaw<[{max: number}]>`
            SELECT MAX(id) as max FROM codelang
        `;
        
        return result[0]?.max ?? 0;
    }
    catch (error) {
        console.error('Error getting max ID:', error);
        throw error;
    }
    finally {
        await prisma.$disconnect();
    }
}

