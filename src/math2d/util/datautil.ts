//src\math2d\datautil.ts


/**
 * class DataUtil.getArrayNumberOneDimClone
 */
export class DataUtil {

    // Clonación profunda de array 1D de números
    public static getArrayNumberOneDimClone(arrayOrigin: number[]): number[] {
        return [...arrayOrigin];
    };//end

    // Clonación profunda de array 2D de números
    public static getArrayNumberTwoDimClone(arrayOrigin: number[][]): number[][] {
        return arrayOrigin.map(subArray => [...subArray]);
    };// end

	static getArrayOneDimension(arrayTwoDimension:number[][]): number[] {
		let arrayOne:number[] = [];
		let indElem =0;
		for(let indFila:number=0;indFila<arrayTwoDimension.length;indFila++){
			for(let indCol:number=0;indCol<arrayTwoDimension[indFila].length;indCol++){
				arrayOne[indElem] =arrayTwoDimension[indFila][indCol];
				indElem++;
			}
		}
		return arrayOne;
	}//end 
    
	public static getArrayTwoDimension(arrayOneDim:number[]): number[][] {
		let arrayTwoDim:number[][] = [];
		let countVertex:number = arrayOneDim.length/2;		
		let indElem:number=0;
		for(let vIdx=0;vIdx<countVertex;vIdx++){			
			arrayTwoDim[vIdx] =[];
			for(let indCol=0;indCol<2;indCol++){
				arrayTwoDim[vIdx][indCol] =arrayOneDim[indElem];
				indElem++;
			}			
		}//end for
		return arrayTwoDim;
	}//end 
	
    
}; //end class
