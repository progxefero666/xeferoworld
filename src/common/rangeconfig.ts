//src\common\rangeconfig.ts

import { TRange } from "@/common/types";


export class RangeConfig {

    public range:    TRange;
    public value:    number = 0;
    public step?:    number;

    constructor(range:TRange,value:number,step?:number) {        
        this.range    = range;
        this.value    = value;
        this.step     = step??1;        
    };//end constructor

    public toJsonString(): string {
        return JSON.stringify(this, null, 4);
    };//end

};//end class