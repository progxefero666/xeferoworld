//src\graphic\graphtypes.ts

// System 2D Types
// ..........................................................
export type Point2d = {
    x: number;
    y: number;
};

export type Scale2d = {
    x: number;
    y: number;
};


export type Dim2d = {
    width: number;
    height: number;
};

export type TCfMarksConfig = {
    color: any;
    radiusLen: number;
    countSectors: number;
    countDiv: number;
    countSubdiv: number;
}


export type TRegionX = {
    start: number;
    end: number;
    color: any;
};
