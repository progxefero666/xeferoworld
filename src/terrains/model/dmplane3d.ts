//src\terrains\datamodel\dmplane3d.ts

/**
 * Defines a data model for storing 3D plane geometry vertex data.
 */
export class DataModelPlane {

    public vertices: number[];

    constructor(vertices: number[]) {
        this.vertices = vertices;
    };//end

    public toJsonString(): string {
        return JSON.stringify(this);
    };

}//end
