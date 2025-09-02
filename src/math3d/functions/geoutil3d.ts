//src\math3d\functions\geomanager3d.ts

/**
 * class GeoManager3d
 */
export class GeoUtil3d {

	public static translateVertex3d(vertex3d:number[],trans3d:number[]):void{ 
		for(let idx:number=0;idx<vertex3d.length;idx++){
			vertex3d[idx]+= trans3d[idx];				
		}//end for
		
	}//end 
	 
	public static translateArrayVertex(grpVertex:number[][],trans3d:number[]):void{ 
		for(let idx=0;idx<grpVertex.length;idx++){
			GeoUtil3d.translateVertex3d(grpVertex[idx],trans3d);
		}//end for
	}//end     


};//end class