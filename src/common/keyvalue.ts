//src\common\model\keyvalue.ts

/**
 * class KeyValue
 */
export class Keyvalue {

    public key: string;
    public value: any;

    constructor(key: string, value: any) {
        this.key = key;
        this.value = value;
    }

    public toJsonString(): string {
        return JSON.stringify(this, null, 4);
    }

    public static build(jsonString: string): Keyvalue {
        const obj = JSON.parse(jsonString);
        return new Keyvalue(obj.key, obj.value);
    }
    
}//end class

