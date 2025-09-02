"use server";

//import * as fs from "fs/promises";
import path from "path";

import dotenv from 'dotenv';
dotenv.config();

import { GenerateKeys } from "@/common/generatekeys";



/*
const tasktypes: Tasktype[] = [
  {id: GenerateKeys.genAlphaNum16(), name: "create", description: "create files" },
  {id: GenerateKeys.genAlphaNum16(), name: "edit", description: "edit files" },
  {id: GenerateKeys.genAlphaNum16(), name: "delete", description: "delete files" },
  {id: GenerateKeys.genAlphaNum16(), name: "exec-scripts", description: "execute scripts" },
  {id: GenerateKeys.genAlphaNum16(), name: "gen-docs", description: "generate docs" },
  {id: GenerateKeys.genAlphaNum16(), name: "update-docs", description: "update docs" },
  {id: GenerateKeys.genAlphaNum16(), name: "exec-tests", description: "execute tests" },
  {id: GenerateKeys.genAlphaNum16(), name: "repository", description: "execute repository actions" },
];
*/
const proglanguages = [
    { id: GenerateKeys.genAlphaNum16(), name: "TypeScript" },
    { id: GenerateKeys.genAlphaNum16(), name: "Python" },
    { id: GenerateKeys.genAlphaNum16(), name: "SQL" },
    { id: GenerateKeys.genAlphaNum16(), name: "JavaScript" },
    { id: GenerateKeys.genAlphaNum16(), name: "CSS" },
    { id: GenerateKeys.genAlphaNum16(), name: "Java" },
    { id: GenerateKeys.genAlphaNum16(), name: "C++" }
];

const workflows = [
    { id: GenerateKeys.genAlphaNum16(), name: "Workflow 1", description: "First workflow" },
    { id: GenerateKeys.genAlphaNum16(), name: "Workflow 2", description: "Second workflow" },
    { id: GenerateKeys.genAlphaNum16(), name: "Workflow 3", description: "Third workflow" }
];

const taskcategories = [
    { id: GenerateKeys.genAlphaNum16(), workflow_id:"8l5irVS0IFwAzyAQ" ,name: "default", description: "First category" },
    { id: GenerateKeys.genAlphaNum16(), workflow_id:"gAZR3EaUWkibYqB8" ,name: "default", description: "Second category" },
    { id: GenerateKeys.genAlphaNum16(), workflow_id:"ieGutaNNYCIedTEW" ,name: "default", description: "Third category" }
];

/**
 * Action Server Init Database.
 *  - Excute al start session
 */
export async function initDatabase(): Promise<boolean> {

    //let res_proglanguages:boolean = await load_proglanguages();
    //let res_tasktype:boolean      = await load_tasktype();
    //let res_workflows:boolean    = await load_workflows();
    //let res_taskcategories:boolean = await load_taskcategories();
    return true;
};//end

/*
import { Tasktype }           from  "@/db/model/tasktype";

export async function load_proglanguages(): Promise<boolean> {
    let result:boolean = true;
    try {
        for (const lang of proglanguages) {
            const resultInsert = await insertProglanguage(JSON.stringify(lang));
            if (resultInsert == null) {result=false;break;}
        }
        if (!result) {result = false;}
    }
    catch (error) {result = false;}
    if(!result) {
        console.error("load_tasktype failed.");
    }
    return result;
};//


export async function load_tasktype(): Promise<boolean> {
    let result:boolean = true;
    try {
        for (const tasktype of tasktypes) {
            const resultInsert = await insertTasktype(JSON.stringify(tasktype));
            if (resultInsert == null) {result=false;break;}
        }
    }    
    catch (error) {result = false;}
    if (!result) {
        console.error("load_tasktype failed.");
    }
    return result;
};//end

export async function load_workflows(): Promise<boolean> {
    let result:boolean = true;
    try {
        for (const workflow of workflows) {
            const resultInsert = await insertWorkflow(JSON.stringify(workflow));
            if (resultInsert == null) {result=false;break;}
        }
    }    
    catch (error) {result = false;}
    if (!result) {
        console.error("load_workflows failed.");
    }
    return result;
};//end

export async function load_taskcategories(): Promise<boolean> {
    let result:boolean = true;
    try {
        for (const taskcategory of taskcategories) {
            const resultInsert = await insertTaskcategory(JSON.stringify(taskcategory));
            if (resultInsert == null) {
                console.log("resultInsert failed.");
                result=false;break;
            }
        }
    }    
    catch (error) {result = false;}
    if (!result) {
        console.log("load_taskcategories failed.");
    }
    else{
        console.log("load_taskcategories success.");
    }
    return result;
};//end
*/