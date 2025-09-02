//src\db\functions\objectsutil.ts

import { JsonResponse } from "@/common/jsonreponse";




/**
 * - Use por json server responses. 
 * - null case: If the response is null, return null
 * - desc: Parse a JSON response item or collection of class T objects.
 */

export const parseResponseItem = <T>(jsonResponse: string): T | null => {
    if (jsonResponse == null) {return null;}
    const jsonParsed:JsonResponse = JSON.parse(jsonResponse) as JsonResponse;
    if (jsonParsed.data == null) {return null;}
    return jsonParsed.data as T;
};

export const parseResponseCollection = <T>(jsonResponse: string|null): Array<T> | null => {
    if (jsonResponse == null) {return null;}
    const jsonParsed:JsonResponse = JSON.parse(jsonResponse) as JsonResponse;
    if (jsonParsed.data == null) {return null;}
    return jsonParsed.data as Array<T>;
};



/**
 * Normal parser functions for cast item and collection.
 */

export const parseCollection = <T>(coll: string): Array<T> | null => {
    if (coll == null) {
        return null;
    }
    const jsonParsed = JSON.parse(coll);
    return jsonParsed as Array<T>;
};

export const parseItem = <T>(obj: string): T | null => {
    if (obj == null) {
        return null;
    }
    const jsonParsed = JSON.parse(obj);
    return jsonParsed as T;
};


export const parseItemWithRelChildrens = <T, R>(obj: string): T & { [key: string]: R[] } | null => {
    if (obj == null) {
        return null;
    }
    const jsonParsed = JSON.parse(obj);
    return jsonParsed as T & { [key: string]: R[] };
};

export const parseCollectionWithRelChildrens = <T, R>(coll: string): Array<T & { [key: string]: R[] }> | null => {
    if (coll == null) {
        return null;
    }
    const jsonParsed = JSON.parse(coll);
    return jsonParsed as Array<T & { [key: string]: R[] }>;
};



