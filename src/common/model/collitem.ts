// EditableOptionId


/**
 * class CollectionItem
 */
export class CollectionItem {

    public id: any;
    public orden: number;
    public value: any;

    constructor(orden: number, id: any, value: any) {
       this.orden   = orden;
        this.id     = id;
        this.value  = value;
    }

    public toJsonString(): string {
        return JSON.stringify(this, null, 4);
    }

}//end class