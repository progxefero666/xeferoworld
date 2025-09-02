//src\common\util\modelhelper.ts

import { Option } from "@/common/option";
import { TOption, TSelection } from "@/radix/rdxtypes";
import { Keyvalue } from "../keyvalue";

/**
 *  class CollectionHelper.getKeyvaluesIndex
 */
export class CollectionHelper {

    //Keyvalue
    public static getKeyvaluesIndex(collection: Keyvalue[],findValue:string): number {
        let index:number = -1;
        if (collection == null || collection.length === 0) {
            return index;
        }
        for (let itemIdx=0;itemIdx<collection.length;itemIdx++) {
            if (collection[itemIdx].key == findValue) {
                index = itemIdx;
                break;
            }
        }
        return index;
    };//end
    public static getKeyvaluesIds(collection: Keyvalue[]): string[] {
        const options: string[] = [];

        for (const item of collection) {
            const option = item.key; 
            options.push(option);
        }
        return options;
    };//end


    public static getTOptionsNames(collection: TOption[]): string[] {
        const options: string[] = [];

        for (const item of collection) {
            const option = item.name; 
            options.push(option);
        }
        return options;
    };//end     

    public static getOptionsFromList(collection: string[]): Option[] {
        const options: Option[] = [];

        for (const item of collection) {
            const option = new Option(item,item);
            options.push(option);
        }
        return options;
    };//end

    public static getListFromOptions(collection: Option[]): string[] {
        const options: string[] = [];

        for (const item of collection) {
            const option = item.text; 
            options.push(option);
        }
        return options;
    };//end    


    public static getElementIndex(collection: Option[],findValue:string): number {
        let index:number = -1;
        if (collection == null || collection.length === 0) {
            return index;
        }
        for (let itemIdx=0;itemIdx<collection.length;itemIdx++) {
            if (collection[itemIdx].id == findValue) {
                index = itemIdx;
                break;
            }
        }
        return index;
    };//end

    public static getTOptionIndex(collection: TOption[],findValue:string): number {
        let index:number = -1;
        if (collection == null || collection.length === 0) {
            return index;
        }
        for (let itemIdx=0;itemIdx<collection.length;itemIdx++) {
            if (collection[itemIdx].name == findValue) {
                index = itemIdx;
                break;
            }
        }
        return index;
    };//end    
    

    public static getListFromTSelection(tselection:TSelection): string[] {
        const list: string[] = [];
        for (const item of tselection.items) {
            list.push(item.id);
        }
        return list;
    };//end    

    
}// end class