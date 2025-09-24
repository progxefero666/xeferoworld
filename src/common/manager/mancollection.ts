//src\lib\common\collection\ctrlcollectionbyid.ts

import { TIdtext } from "@/radix/rdxtypes";

/**
 * class ManCollection<T>
 */
export class ManCrudCollection<T> {

    public elements: Array<T> = [];

    constructor(elements: Array<T>) {
        this.elements = elements;
    };//end

    //.......................................................................................... 
    // read operations
    //..........................................................................................

    public getRowId = (rowIndex:number): string => {
        const typedItem = this.elements[rowIndex] as TIdtext;
        return typedItem.id!;
    };//end

    public getAll(): Array<T> {
        return this.elements;
    };//end

    public findIndexById(id: string): number {
        return this.elements.findIndex((element) => (element as any).id === id);
    };//end

    public getById(id: string): T {
        const index = this.findIndexById(id);
        return this.elements[index]; 
    };//end

    //.......................................................................................... 
    // crud operations
    //..........................................................................................

    public add(element:T): boolean {
        this.elements.push(element);
        return true;
    };//end

    public update(element:T): boolean {
        const typedItem = element as TIdtext;
        const index = this.findIndexById(typedItem.id!);
        if (index !== -1) {
            this.elements[index] = element;
            return true;
        }
        return false;
    };//end

    public delete(id:string): boolean {
        const index = this.findIndexById(id);
        if (index !== -1) {
            this.elements.splice(index, 1);
            return true;
        }
        return false;
    };//end

    public deleteAll(): boolean {
        this.elements = [];
        return true;
    };//end

    //.......................................................................................... 
    // for ordered collections
    //.......................................................................................... 

    public insertById(idPrevious:string,element:T): boolean {
        const index = this.findIndexById(idPrevious);
        this.elements.splice(index, 0, element);
        return true;
    };//end

    public moveUpByPreviousId(id:string): boolean {
        const index = this.findIndexById(id);
        [this.elements[index], this.elements[index - 1]] = 
            [this.elements[index - 1], this.elements[index]];
        return true;
    };//end   

    public moveDownByNextId(id:string): boolean {
        const index = this.findIndexById(id);
        [this.elements[index], this.elements[index + 1]] = 
            [this.elements[index + 1], this.elements[index]];
        return true;
    };//end   

    public insertByIndex(indexPrevious:number,element:T): boolean {
        this.elements.splice(indexPrevious, 0, element);
        return true;
    };//end

    public moveUpByPreviousIndex(index:number): boolean {
        [this.elements[index], this.elements[index - 1]] = 
            [this.elements[index - 1], this.elements[index]];
        return true;
    };//end

    public moveDownByNextIndex(index:number): boolean {
        [this.elements[index], this.elements[index + 1]] = 
            [this.elements[index + 1], this.elements[index]];
        return true;
    };//end

 
}//end class


/*

    // Adds new elements to the end of the collection
    public addElements(newElements: Array<T>): boolean {
        if (newElements && newElements.length > 0) {
            this.elements.push(...newElements);
            return true;
        }
        return false;
    }
    // Inserts new elements at a specific position in the collection
    public insertElements(newElements: Array<T>, insertIndex: number): boolean {
        if (!newElements || newElements.length === 0) return false;

        // Adjust the index if it's out of range
        if (insertIndex < 0) {
            insertIndex = 0;
        } else if (insertIndex > this.elements.length) {
            insertIndex = this.elements.length;
        }

        this.elements.splice(insertIndex, 0, ...newElements);
        return true;
    }        
*/