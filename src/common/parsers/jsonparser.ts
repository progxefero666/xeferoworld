//src\db\functions\jsonutil.ts

/**
 * Utility functions for JSON string operations.
 *    - Convert parsed objects back to formatted JSON strings
 *    - Same logic as objectsutil.ts but returns JSON strings instead of JS objects
 */

export const parseItem = <T>(obj: string): string | null => {
    if (obj == null) {
        return null;
    }
    const jsonParsed = JSON.parse(obj);
    return JSON.stringify(jsonParsed as T, null, 4);
};

export const parseCollection = <T>(coll: string): string | null => {
    if (coll == null) {
        return null;
    }
    const jsonParsed = JSON.parse(coll);
    return JSON.stringify(jsonParsed as Array<T>, null, 4);
};

export const parseItemWithRelChildrens = <T, R>(obj: string): string | null => {
    if (obj == null) {
        return null;
    }
    const jsonParsed = JSON.parse(obj);
    return JSON.stringify(jsonParsed as T & { [key: string]: R[] }, null, 4);
};

export const parseCollectionWithRelChildrens = <T, R>(coll: string): string | null => {
    if (coll == null) {
        return null;
    }
    const jsonParsed = JSON.parse(coll);
    return JSON.stringify(jsonParsed as Array<T & { [key: string]: R[] }>, null, 4);
};