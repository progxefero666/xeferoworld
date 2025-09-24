
//src\terrains\datamodel\dmtexture.ts

/**
 *  Defines a data model for storing colored texture data.
 */
export class DataModelTexture {
        public width: number;
        public height: number;
        public pixels: number[];

    constructor(width: number, height: number, pixels: number[]) {
        this.width = width;
        this.height = height;
        this.pixels = pixels;
    };

    public toJsonString(): string {
        return JSON.stringify(this);
    };

};//end 
