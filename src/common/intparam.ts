//src\common\paramslider.ts

import { TRange } from "./types";


/**
 * class ParamSlider
 */
export class IntParameter {

    public id:       string|null;
    public range:    TRange;
    public step?:    number;
    public defaul:   number;    
    public label:    string|null;
    public value:    number = 0;
    public enabled?: boolean;

    constructor(id:string|null,range:TRange,defaul:number,
                label:string|null,enabled:boolean,step?:number) {
        this.id       = id;
        this.range    = range;
        this.defaul    = defaul;
        this.label    = label;
        this.enabled = enabled;
        this.step     = step ?? 1;
        this.value    = defaul;
    };//end constructor

    public toJsonString(): string {
        return JSON.stringify(this, null, 4);
    };//end

};//end class