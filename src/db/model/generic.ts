import { field, defaultValue } from "@/common/decorators";

export class Generic {

    @field({ftype:"text",name:"id",pk:true})
    public id: string | null = null;
    
    @field({ftype:"text",name:"name",required:true,length:{min:2,max:16}})
    public name: string | null = null;
    
    @field({ftype:"text",name:"foreign_id",fk:true,fxattrs:{table:"proglanguage",id:"id",name:"name"}})
    public foreign_id: string | null = null;
    
    @field({ftype:"text",name:"description",length:{min:0,max:100}})
    public description: string | null = null;
    
    constructor(
        id: string | null,
        name: string | null,
        foreign_id: string | null,
        description: string | null) {
            this.id = id;
            this.name = name;
            this.foreign_id = foreign_id;
            this.description = description;
    };//end
    
    public minlen(fieldName: string): number | null {
        if (fieldName === "name") {
            return 2;
        }
        return null;
    };//end

    public maxlen(fieldName: string): number | null {
        if (fieldName === "id") {
            return 16;
        }
        if (fieldName === "name") {
            return 16;
        }
        if (fieldName === "foreign_id") {
            return 16;
        }
        if (fieldName === "description") {
            return 100;
        }
        return null;
    };//end
    
    public toJsonString(): string {return JSON.stringify(this, null, 4);};//end

}//end class

