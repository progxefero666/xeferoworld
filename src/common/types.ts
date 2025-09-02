//src\common\types.ts


export type FieldType = "text" |"textarea" | "check" | "number" | "decimal" | 
                        "date" | "datetime" | "collection" | "hidden" |  "file";
                        
//"url" | "email"  | "password" | "tel"  
export type TDimension = {
    width:  number;
    height: number;
};
export interface TTableRow {
	col1: string;
	col2: string;
	col3: string;
};

export interface TTable {
    name: string;
    rows: TTableRow[];
};

export type TRange = {
    min:  number;
    max: number;
};
export type Vector2d = {
    x: number;
    y: number;
};
export type Line2d = {
    start: Vector2d;
    end: Vector2d;
};

export type Vector3d = {
    x: number;
    y: number;
    z: number;
};

export type Rotation3d = {
    x: number;
    y: number;
    z: number;
};

export type TDimension3d = {
    width:  number;
    height: number;
    depth: number;
};

export type TParameter = {
    id: string
    range: TRange
    value: number
}

export type TGroupParameter = {
    id: string
    parameters: TParameter[]
}

// Additional types for texture processing
export type TTextureData = {
    imageData: ImageData
    dimensions: TDimension
}

export type TEditionParams = {
    baseColor: TGroupParameter
    materialProperties: TGroupParameter
}

export type TSkyboxFace = "front" | "back" | "left" | "right" | "top" | "bottom"

export type TSkyboxData = {
    faces: Map<TSkyboxFace, ImageData | null>
    dimensions: TDimension
    isComplete: boolean
}


export type TKeyvalue = {
    key: string;
    value: any;
};


//types
export type TLengthRange = {
    min: number;
    max: number;
};

export type TNumeric = {
    cntint: number;
    cntdec: number;
};
