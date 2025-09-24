//src\common\model\groupkeyvalues.ts

import { Keyvalue } from "@/common/keyvalue";


export class GroupKeyvalues {

    public name: string;
    public elements: Keyvalue[];

    constructor(name: string, elements: Keyvalue[]) {
        this.name = name;
        this.elements = elements;
    };//end 

    public toJsonString(): string {
        return JSON.stringify(this, null, 4);
    }

    public static build(jsonString: string): GroupKeyvalues {
        const obj = JSON.parse(jsonString);
        const elements = obj.elements.map((el: any) => new Keyvalue(el.key, el.value));
        return new GroupKeyvalues(obj.name, elements);
    }
}//end class