//src\terrains\datamodel\dmheightmap.ts

/**
 * Defines a data model for storing heightmap data.
 */
export class DataModelHeightMap {

    public width: number;
    public height: number;
    public values: number[];

    constructor(width: number,height: number,values: number[]) { 
        this.width = width;
        this.height = height;
        this.values = values;
    };

    /**
     * Serializes the instance to a formatted JSON string.
     * @returns A JSON string representation of the object.
     */
    public toJsonString(): string {
        return JSON.stringify(this, null, 4);
    };

}//end
