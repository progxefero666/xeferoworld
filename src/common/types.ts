//src\common\types.ts


export type FieldType = "text" |"textarea" | "check" | "number" | "decimal" | 
                        "date" | "datetime" | "collection" | "hidden" |  "file";
                        
//"url" | "email"  | "password" | "tel"  

export type TPolyColor = {
    back:   string; 
    border: string;     
};

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

export type Point2d = {
    x: number;
    y: number;
};

export type Line2d = {
    start: Point2d;
    end: Point2d;
};
export type Circunf2d = {
    position: Point2d;
    radius: number;
};


export type Vector3d = {
    x: number;
    y: number;
    z: number;
};

export type Plane3dPoint = {
    x: number;
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

export type TCylinderConfig = {
    radius:  number;
    len: number;
    radialseg: number;
    lenseg: number;
    color:any;
};

export type TTimePosition = {
    time:  number;
    position: Vector3d;
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

export type TSliderConfig ={
    id?:    string;
    range: TRange;
    step?: number;
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
