//src\common\reflection\entitymtdata.ts

import "reflect-metadata";
import { ReflexMessage } from "./reflection";

/**
 * class ReflexEntityMetadata
 */
export class ReflexEntity {

    public static getFieldsMetadata<T>(classConstructor: new (...args: any[]) => T): any[] {
        const prototype = classConstructor.prototype;

        const fieldsMetadata: any[] = Object.getOwnPropertyNames(prototype)
            .map(prop => ({
                name: prop,
                ...Reflect.getMetadata("field", prototype, prop)
            }));

            return fieldsMetadata;
    }

}//end class
