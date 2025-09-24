//src\common\model\inputfield.ts


import { Option } from "@/common/option";

import { FieldType, TRange } from "../types";



export class InputField {

    public id: string|null;
    public itype: FieldType;
    public placeholder: string|null;
    public value: any|null;
    public label: string | null = null;
    public length: TRange | null = null;

    constructor(itype: FieldType, 
                id: string|null,
                placeholder: string|null,
                value: any|null,
                label: string | null, length?: TRange) {

        this.itype = itype;
        this.id = id;
        this.placeholder = placeholder;
        this.value = value;
        this.label = label;
        if (length) { this.length = length }
    }

    public toJsonString(): string {
        return JSON.stringify(this, null, 4);
    }

    public static build(jsonString: string): Option {
        const obj = JSON.parse(jsonString);
        return new Option(obj.name, obj.title, obj.icon);
    }

}//end class
