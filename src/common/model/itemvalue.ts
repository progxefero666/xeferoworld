// EditableOptionId


/**
 * class CollectionItem
 */
export class ItemValue {

    public id: any;
    public value: any;

    constructor( id: any, value: any) {
        this.id     = id;
        this.value  = value;
    }

    public toJsonString(): string {
        return JSON.stringify(this, null, 4);
    }

}//end class