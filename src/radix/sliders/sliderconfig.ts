//src\common\paramslider.ts

import { TRange } from "@/common/types";


/**
 * class ParamSlider
 */
export class SliderConfig {

    public id:    string;
    public label: string;
    public range: TRange;
    public step?: number;

    constructor(id:string,label:string,range:TRange,step?:number) {
        this.id       = id;
        this.label    = label;
        this.range    = range;
        this.step     = step??1;        
    };//end constructor

    public toJsonString(): string {
        return JSON.stringify(this, null, 4);
    };//end

};//end class