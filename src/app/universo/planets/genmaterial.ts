
/**
 * class GenMaterial
 */
export class GenMaterial {
    
    public id: string;
    public name: string = "Untitled Material";
    public baseColorHue: string= "15";
    public baseColorSaturation: number= 54;
    public baseColorLightness: number= 42;
    public metallicness: number= 50;
    public roughness: number= 30;
    public createdAt: Date;

    constructor(name:string,
                baseColorHue:string,
                baseColorSaturation:number,
                baseColorLightness:number,
                metallicness:number,
                roughness:number) {

        this.id = this.generateId();
        this.name = name;
        this.baseColorHue = baseColorHue;
        this.baseColorSaturation = baseColorSaturation;
        this.baseColorLightness = baseColorLightness;
        this.metallicness = metallicness;
        this.roughness = roughness;
        this.createdAt = new Date();
    };

    private generateId(): string {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    };

    public toJsonString(): string {
        return JSON.stringify({
            id: this.id,
            name: this.name,
            baseColorHue: this.baseColorHue,
            baseColorSaturation: this.baseColorSaturation,
            baseColorLightness: this.baseColorLightness,
            metallicness: this.metallicness,
            roughness: this.roughness,
            createdAt: this.createdAt.toISOString(),
        })
    };
    
}//end
