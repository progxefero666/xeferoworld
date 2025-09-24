//src\libcomp\model\barbuttonscfg.ts

/**
 * class BarButtonsCfg 
 */
export class BarButtonsCfg {

    public operations:string[];
    public texts:string[];
    public color:any[]=[];
    public icons:string[];
    public visibled:boolean[]=[];
    public disabled:boolean[]=[];
    
    constructor(operations:string[],texts:string[],color:any[],icons:string[],disabled?:boolean[],visibled?:boolean[]){
        this.operations = operations;
        this.texts = texts;
        this.color = color;
        this.icons = icons;
        this.disabled = disabled ?? [];
        this.visibled = visibled ?? [];
    }

}//end class