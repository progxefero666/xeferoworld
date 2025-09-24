//src\math3d\pivot\mathpivot3d.ts

import { Vector3d } from "@/common/types";
import { Axis3d, Pivot3d } from "@/math3d/pivot/pivot3d";

/**
 * class Matrix4x4
 */
export class Matrix4x4 {
    public elements:number[][]= [];
    constructor(elements:number[][]) {
        this.elements = elements;
    };
};//end class

/**
 * class MVector3d
 * Represents a 3D vector with x, y, and z coordinates.
 */
export class MVector3d { 

    public elements:number[];

    constructor(elements:number[]) {
        this.elements = elements;
    };//end

    public clone(): MVector3d {
        return new MVector3d([...this.elements]);
    };//end

    public multiplyByScalar(factorMult: number): void {
        for (let axisIndex = 0; axisIndex < this.elements.length; axisIndex++) {
            this.elements[axisIndex] *= factorMult;
        }
    };//end

	public translate(vectorR_b:MVector3d){
		var values= [];
		for(var axisIndex=0;axisIndex<vectorR_b.elements.length;axisIndex++){
			values[axisIndex] = this.elements[axisIndex] + vectorR_b.elements[axisIndex];
		}
		this.elements = values;
	}//end
	
    public translate_neg(vectorR_b:MVector3d){
		var values= [];
		for(var axisIndex=0;axisIndex<vectorR_b.elements.length;axisIndex++){
			values[axisIndex] = this.elements[axisIndex] - vectorR_b.elements[axisIndex];
		}
		this.elements = values;
	}//end

	public dot(vectorDot:MVector3d){ 			
		const vectorDotElements:number[] = vectorDot.elements;
		let num_elements:number = this.elements.length;
	    if (num_elements != vectorDotElements.length) { return 0.0; }	    
	    let valueReturn:number = 0.0;
	    let valueInc:number = 0.0;
	    do {
	    	valueInc = this.elements[num_elements-1] * 
                       vectorDotElements[num_elements-1];
	    	valueReturn = valueReturn + valueInc;

	    	num_elements--;
	    } while(num_elements>0);	    
		return valueReturn;		
	}//end

	// modulus
	public modulus(): number {
		let dotValue:number = this.dot(this);
		return Math.sqrt(dotValue);
	}//end

	public toUnitVector(){
		const mod:number = this.modulus();
		const values:number[] = [];
		for(var axisIndex=0;axisIndex<this.elements.length;axisIndex++){
			values[axisIndex] = this.elements[axisIndex] / mod;
		}
		this.elements = values;	
	}//end

};//end class

/**
 * class Math Matrix3d
 */
export class MathMatrix3d {

	public static get_mmatrix_mult( matrix_a:Matrix4x4, matrix_b:Matrix4x4):Matrix4x4 { 
		let value_calc:number = 0;
		let m_elem:number[][] = [];
		
		for(let row_a_index:number = 0;row_a_index<4;row_a_index++){
			m_elem[row_a_index]=[];
			for(let col_b_index:number = 0;col_b_index<4;col_b_index++){
				value_calc = 0;
				for(let aux_index:number = 0;aux_index<4;aux_index++){
					let valueMult = matrix_a.elements[row_a_index][aux_index] 
					              * matrix_b.elements[aux_index][col_b_index]
					value_calc = value_calc + valueMult;					
				}
				m_elem[row_a_index][col_b_index] = value_calc;
			}
		}
		return new Matrix4x4(m_elem);
	}//end
    
};//end class


/**
 * class Math Pivot3d
 */
export class MathPivot3d {

	public static translateVertex3d(vertex3d:number[],trans3d:number[]):void{ 
		for(let idx:number=0;idx<vertex3d.length;idx++){
			vertex3d[idx]+= trans3d[idx];				
		}//end for
		
	}//end 
	 
	public static translateArrayVertex(grpVertex:number[][],trans3d:number[]):void{ 
		for(let idx=0;idx<grpVertex.length;idx++){
			MathPivot3d.translateVertex3d(grpVertex[idx],trans3d);
		}//end for
	}//end     

	public static getAngleInc(pAng_Init: number, pAng_Inc: number):number {
        let angRes = pAng_Init + pAng_Inc;
        if (angRes >= (Math.PI * 2)) {
            angRes = angRes - (Math.PI * 2);
        }
        return (angRes);
    }//end

	public static getAngleDec(pAng_Init: number, pAng_Inc: number):number  {
        let angRes = pAng_Init - pAng_Inc;
        if (angRes < ((Math.PI * 2) * (-1))) {
            angRes = angRes + (Math.PI * 2);
        }
        return (angRes);
    };//end		

};//end

/**
 * class Math Vector3d
 * Utility class for vector operations in 3D space.
 */
export class MathVector3dv {

	
    public static getVectorZero(): MVector3d {
        return new MVector3d([0.0, 0.0, 0.0]);
    };//end

	static createVector(elements: number[]): MVector3d {
		let els:number[] = [];
		for(var idxElem =0 ;idxElem<3;idxElem++){
			els[idxElem] = elements[idxElem];
		}
		return new MVector3d(els);
	}//end
	    
	static getVectorModulus(vector:MVector3d){
		let dot_value:number = MathVector3dv.dot(vector, vector);
		let modulus_value:number =  Math.sqrt(dot_value);
		return modulus_value;
	}//end

	static getVectorUnit(vector:MVector3d){ //XF_Veztor
		let modulus_value:number = MathVector3dv.getVectorModulus(vector);
		let new_values:number[]= [];
		for(var coord_index=0;coord_index<vector.elements.length;coord_index++){
			new_values[coord_index] = vector.elements[coord_index]/modulus_value;
		}
		return new MVector3d(new_values);				
	}//end

	static getVectorInverse(vector:MVector3d){
		let vectorReturn:MVector3d = vector.clone();	
		for(let elemIndex=0;elemIndex<vectorReturn.elements.length;elemIndex++){			
			vectorReturn.elements[elemIndex] = vectorReturn.elements[elemIndex] * (-1.0); 
		}		
		return vectorReturn;		
	}//end    

	static dot(vector_a:MVector3d,vector_b:MVector3d){		
		let value_coord:number = 0.0;
		let dot_return:number = 0.0; 		
		for(let elem_index=0;elem_index<3;elem_index++){
			value_coord = vector_a.elements[elem_index] * vector_b.elements[elem_index];
			dot_return = dot_return + value_coord;
		}		
		return dot_return;
	}//end
        
    public static normalize(vector: Vector3d): Vector3d {
        const length:number = Math.sqrt(vector.x ** 2 + vector.y ** 2 + vector.z ** 2);
        return {
            x: vector.x / length,
            y: vector.y / length,
            z: vector.z / length
        };
    }//end

};//end

/**
 * class Pivot3dUtil.clonePivot3d
 */
export class Pivot3dUtil {
	
	public static clonePivot3d(pivot:Pivot3d): Pivot3d {
		const pivotClone:Pivot3d = new Pivot3d();
		pivotClone.position = [...pivot.position];
		pivotClone.rotation = [...pivot.rotation];
		pivotClone.pivotAxis[0] = Pivot3dUtil.cloneAxis3d(pivot.pivotAxis[0]);
		pivotClone.pivotAxis[1] = Pivot3dUtil.cloneAxis3d(pivot.pivotAxis[1]);
		pivotClone.pivotAxis[2] = Pivot3dUtil.cloneAxis3d(pivot.pivotAxis[2]);
		return pivotClone;
	};//end

	public static cloneAxis3d(axis:Axis3d): Axis3d {
		const axisClone:Axis3d = new Axis3d(axis.axis_vertex_0,axis.axis_vertex_1);
		axisClone.rot_vector_axis_0 = axis.rot_vector_axis_0;
		axisClone.rot_vector_axis_1 = axis.rot_vector_axis_1;
		axisClone.rot_vector_axis_2 = axis.rot_vector_axis_2;
		axisClone.rot_vector_d1     = axis.rot_vector_d1;
		axisClone.rot_vector_d2     = axis.rot_vector_d2;
		if(axis.vectorDirecction!==null){
			axisClone.vectorDirecction = axis.vectorDirecction!.clone();
		}
		if(axis.vectorPosition!==null){
			axisClone.vectorPosition = axis.vectorPosition!.clone();
		}
		return axisClone;
	};//end

};//end