//src\app_server\xeferodb\sqlscripts.ts
"use server";

import path from "path";
import * as fs from "fs/promises";
import { promisify } from "util";

import { exec } from 'child_process';
import dotenv from 'dotenv';
dotenv.config();

const execAsync = promisify(exec);

export async function readDbConnectionSchema(): Promise<string|null> {

    //const command = `pg_dump -h localhost -U postgres -d xeferodb -s`;
    const command = "pg_dump -h "+ 
                     process.env.DB_HOST + " -U " + 
                     process.env.DB_USER + " -d " + 
                     process.env.DB_NAME + " -s";
    let content: string = "";
    try {
        const { stdout } = await execAsync(command, 
            {  env: { ...process.env, PGPASSWORD: process.env.DB_PASSWORD } });
        content = stdout; 
    } 
    catch (error) {
        return null;
    }
    return content;
}//end action

/**
 * Server action to get the content of a text file.
 * @param fname 
 * @returns file content as a string
 */
export async function readDbSchemaFromFile(): Promise<string | null> {
    const dbFolder:string|undefined = process.env.DB_DATA_FOLDER;

    const filePath: string = path.join(dbFolder!, "dbsquema.sql");
    let content: string = "";
    try {
        await fs.access(filePath, fs.constants.F_OK);
        content = await fs.readFile(filePath, { encoding: "utf-8" });
    }
    catch (error) {
        console.error("Error reading file dbsquema.sql - ", error);
        return null;
    }
    return content;
}//end action

/**
 * Server action to read a JSON db model file.
 */
export async function readJsonModel(tableName:string): Promise<string | null> {

    const fileFolder: string = process.env.DB_DATA_FOLDER || "";
    const fileName: string   = tableName + ".json";
    const filePath: string   = path.join(fileFolder,"catalog","metadata", fileName);

    let content: string = "";
    try {
        await fs.access(filePath, fs.constants.F_OK);
        content = await fs.readFile(filePath, { encoding: "utf-8" });
    }
    catch (error) {
        console.error("Error reading file dbsquema.sql - ", error);
        return null;
    }
    return content;
};//end action