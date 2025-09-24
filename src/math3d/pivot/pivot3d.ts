// src/math3d/objects/pivot3d.ts Axis3d

import { XMath2dUtil } from "@/math2d/functions/xmath2dutil";
import { MVector3d,MathVector3dv,Matrix4x4,
		 MathMatrix3d, MathPivot3d,
		 Pivot3dUtil} from "@/math3d/pivot/mathpivot3d";

/**
 * class Pivot3d
 */
export class Pivot3d {

    public position: number[];
    public rotation: number[];
    public pivotAxis:Axis3d[] = [];

    constructor() {
        this.position = [0.0,0.0,0.0];
        this.rotation = [0.0,0.0,0.0];
		this.regeneratePivot();
    };//end

    public regeneratePivot(){
        this.pivotAxis = [];
		this.pivotAxis[0] = new Axis3d(
            [...this.position],
            [(this.position[0] + 1.0),this.position[1],this.position[2]]);
		this.pivotAxis[1] = new Axis3d(
			[...this.position],				
			[(this.position[0]),this.position[1]+ 1.0,this.position[2]]				
		);            
		this.pivotAxis[2] = new Axis3d(
			[...this.position],				
			[(this.position[0]),this.position[1],this.position[2]+ 1.0]				
		);
    };//end

	public move(targetCoords:number[]):void {
		var translation = Axis3d.getTranslation3d(this.position,targetCoords);	
		for(var axis_index=0;axis_index<3;axis_index++){
			this.pivotAxis[axis_index].move_3d(translation);
		}
		Axis3d.translateVertex3d(this.position,translation);				
	}//end

	public moveInAxis(axis:number,direction:number,translationDistance:number):void {
		if(direction==Axis3d.DIR_POSITIVE) {
			this.move(this.getDirecctionVertex(axis,translationDistance));
		}
		else {
			this.move(this.getDirecctionInverseVertex(axis,translationDistance));
		}
	};//end

    public rotate(rotation_axis:number, rotation_angle:number):void {
    	const rotationMatrix = this.pivotAxis[rotation_axis].getRotationMatrix(rotation_angle);

		for(let axis_index=0;axis_index<3;axis_index++){
			if(axis_index!=rotation_axis){	
				const vertexFirstElemIndex = 0;
				const vertexRotatedElements = [];
				vertexRotatedElements[0] = 
					(this.pivotAxis[axis_index].axis_vertex_1[vertexFirstElemIndex] * rotationMatrix.elements[0][0]) +
					(this.pivotAxis[axis_index].axis_vertex_1[vertexFirstElemIndex+1] * rotationMatrix.elements[1][0]) +
					(this.pivotAxis[axis_index].axis_vertex_1[vertexFirstElemIndex+2] * rotationMatrix.elements[2][0]) +
					(1.0 * rotationMatrix.elements[3][0]);
				vertexRotatedElements[1] = 
					(this.pivotAxis[axis_index].axis_vertex_1[vertexFirstElemIndex] * rotationMatrix.elements[0][1]) +
					(this.pivotAxis[axis_index].axis_vertex_1[vertexFirstElemIndex+1] * rotationMatrix.elements[1][1]) +
					(this.pivotAxis[axis_index].axis_vertex_1[vertexFirstElemIndex+2] * rotationMatrix.elements[2][1]) +
					(1.0 * rotationMatrix.elements[3][1]) ;
				
				vertexRotatedElements[2] = 
					(this.pivotAxis[axis_index].axis_vertex_1[vertexFirstElemIndex] * rotationMatrix.elements[0][2]) +
					(this.pivotAxis[axis_index].axis_vertex_1[vertexFirstElemIndex+1] * rotationMatrix.elements[1][2]) +
					(this.pivotAxis[axis_index].axis_vertex_1[vertexFirstElemIndex+2] * rotationMatrix.elements[2][2]) +
					(1.0 * rotationMatrix.elements[3][2]);
				this.pivotAxis[axis_index] = new Axis3d([...this.position],vertexRotatedElements);												
			}

			if(rotation_angle>=0){
				this.rotation[rotation_axis] = MathPivot3d
					.getAngleInc(this.rotation[rotation_axis],rotation_angle);						
			}
			else {
				this.rotation[rotation_axis] = MathPivot3d
				 	.getAngleDec(this.rotation[rotation_axis],rotation_angle*(-1))	
			}
		}//end for

    };//end

	public rotateArrayPointsInAxis(axisIndex:number,vertex:Float32Array,angle:number): Float32Array {
		const arrayPoints:number[] = Array.from(vertex);
		const newPoints: number[] = this.pivotAxis[axisIndex]
										.rotateArrayPoints(arrayPoints,angle);
		return new Float32Array(newPoints);
	};//end

	public rotateAroundWorldY(angle: number): void {
		const px = this.position[0], py = this.position[1], pz = this.position[2];
		const c = Math.cos(angle), s = Math.sin(angle);

		// rotate endpoint of each local axis around world Y (Rodrigues specialized for Y)
		for (let i = 0; i < 3; i++) {
			const ax = this.pivotAxis[i].axis_vertex_1[0] - px;
			const ay = this.pivotAxis[i].axis_vertex_1[1] - py;
			const az = this.pivotAxis[i].axis_vertex_1[2] - pz;

			// rotation around world Y: (x,z) → (x*c + z*s, z*c - x*s); y unchanged
			const rx =  ax * c + az * s;
			const ry =  ay;
			const rz =  az * c - ax * s;

			this.pivotAxis[i] = new Axis3d(
				[px, py, pz],
				[px + rx, py + ry, pz + rz]
			);
		}
		// optional: track world-yaw in rotation[1] for reference only
		this.rotation[1] = MathPivot3d.getAngleInc(this.rotation[1], angle);
	}//end

    public getPivotVector(axisIndex:number):number[] {
        const vectorCalc:MVector3d = this.pivotAxis[axisIndex].vectorDirecction!.clone();
        return [...vectorCalc.elements];
    };//end

	public getDirecctionVertex(axis:number, translationDistance:number){
		let vectorCalc = new MVector3d([
			this.pivotAxis[axis].vectorDirecction!.elements[0],
			this.pivotAxis[axis].vectorDirecction!.elements[1],	
			this.pivotAxis[axis].vectorDirecction!.elements[2]]
		);
		vectorCalc.multiplyByScalar(translationDistance);
		let positionCalc:number[] =[...this.position];
		Axis3d.translateVertex3d(positionCalc,vectorCalc.elements);
		return positionCalc;
	};//end

	public getDirecctionInverseVertex(axis:number, translationDistance:number):number[]{
		let vectorClone:MVector3d = this.pivotAxis[axis].vectorDirecction!.clone();
		let vectorCalc:MVector3d  = MathVector3dv.getVectorInverse(vectorClone);
		vectorCalc.multiplyByScalar(translationDistance);
		const positionCalc:number[] = [...this.position];
        Axis3d.translateVertex3d(positionCalc,vectorCalc.elements);
        return positionCalc;//vectorCalc.elements;
	};//end

	public getClone(): Pivot3d {
		const pivotClone:Pivot3d = new Pivot3d();
		pivotClone.position = [...this.position];
		pivotClone.rotation = [...this.rotation];
		pivotClone.pivotAxis[0] = Pivot3dUtil.cloneAxis3d(this.pivotAxis[0]);
		pivotClone.pivotAxis[1] = Pivot3dUtil.cloneAxis3d(this.pivotAxis[1]);
		pivotClone.pivotAxis[2] = Pivot3dUtil.cloneAxis3d(this.pivotAxis[2]);
		return pivotClone;
	};//end

	public toConsole(): void {
		const rotGrades_x:number = XMath2dUtil.toDegrees(this.rotation[0]);		
		const rotGrades_y:number = XMath2dUtil.toDegrees(this.rotation[1]);
		const rotGrades_z:number = XMath2dUtil.toDegrees(this.rotation[2]);
		console.log('Rotation x: '  + rotGrades_x.toString());
		console.log('Rotation y: ' + rotGrades_y.toString());
		console.log('Rotation z: '   + rotGrades_z.toString());
	}//end

};//end


/**
 * class Axis3d
 */
export class Axis3d {

	public static AXIS_CORR_VECTOR_MIN_VALUE:number = 0.00000001;
    public static DIR_POSITIVE:number=  1;
    public static DIR_NEGATIVE:number= -1;

    public axis_vertex_0: number[];
    public axis_vertex_1: number[];

    // axis rotation vectors
    public rot_vector_axis_0: number|null = null;
    public rot_vector_axis_1: number|null = null;
    public rot_vector_axis_2: number|null = null;
    public rot_vector_d1:     number|null = null;
    public rot_vector_d2:     number|null = null;

    // Vectors
    public vectorDirecction: MVector3d| null = null;
    public vectorPosition: MVector3d | null = null;

    constructor(axis_vertex_0: number[], axis_vertex_1: number[]) {
        this.axis_vertex_0 = axis_vertex_0;
        this.axis_vertex_1 = axis_vertex_1;
		this.update();
    };//end
	
    public update() { 
                
		//DataUtil.getArrayNumberOneDimClone(this.axis_vertex_0);
		const elemsClone:number[] =  [...this.axis_vertex_0];
        this.vectorPosition = new MVector3d(elemsClone);

        const translation: number[] = Axis3d.getTranslation3d(this.axis_vertex_0, this.axis_vertex_1);
        this.vectorDirecction = MathVector3dv.getVectorUnit(new MVector3d(translation));
        
		//......................................................................
		// init basic rotation vectors
		//......................................................................
		this.rot_vector_axis_0 = this.axis_vertex_1[0] - this.axis_vertex_0[0];		
		this.rot_vector_axis_1 = this.axis_vertex_1[1] - this.axis_vertex_0[1];
		this.rot_vector_axis_2 = this.axis_vertex_1[2] - this.axis_vertex_0[2];

		//......................................................................
		// 						!!! MUY IMPORTANTE !!!
		// Hay que comprobar que ninguno de los valores de los vectores base es
		// exactamente cero porque si no la matriz resultado de las 
		// transformaciones podria tener valor cero en una de las coordenadas
		//......................................................................		
		if(this.rot_vector_axis_0==0.0) {
			this.rot_vector_axis_0=Axis3d.AXIS_CORR_VECTOR_MIN_VALUE;
		}

		if(this.rot_vector_axis_1==0.0) {
			this.rot_vector_axis_1=Axis3d.AXIS_CORR_VECTOR_MIN_VALUE;
		}

		if(this.rot_vector_axis_2==0.0) {
			this.rot_vector_axis_2=Axis3d.AXIS_CORR_VECTOR_MIN_VALUE;
		}

		//......................................................................
		// una vez realizado los chequeos apropiados y ajustes necesarios se 
		// continua calculando los 2 ultimos vectoes de calculo d1 y d2
		//......................................................................		
		const value_base_d1: number = (this.rot_vector_axis_1 * this.rot_vector_axis_1) + 
						              (this.rot_vector_axis_2 * this.rot_vector_axis_2);
		this.rot_vector_d1 = Math.sqrt(value_base_d1);
		
        let value_base_d2:number = (this.rot_vector_axis_0 * this.rot_vector_axis_0) + 
                                   (this.rot_vector_d1*this.rot_vector_d1);
		this.rot_vector_d2 = Math.sqrt(value_base_d2);

    };//end

	public move_3d(translation: number[]): void { 
		Axis3d.translateVertex3d(this.axis_vertex_0,translation);
		Axis3d.translateVertex3d(this.axis_vertex_1,translation);
		this.update();
	}//end	

	//vectorDirecction
	public rotatePoint(point: number[], angle: number): number[] {
  		const cosAngle = Math.cos(angle);
  		const sinAngle = Math.sin(angle);
  		const oneMinusCos = 1 - cosAngle;

		// Producto punto entre el eje y el punto
		const dotProduct = point[0] * this.vectorDirecction!.elements[0] + 
						   point[1] * this.vectorDirecction!.elements[1] +
						   point[2] * this.vectorDirecction!.elements[2];

 		// Producto cruz entre el eje y el punto
		const crossProduct = {
			x: this.vectorDirecction!.elements[1] * point[2] - this.vectorDirecction!.elements[2] * point[1],
			y: this.vectorDirecction!.elements[2] * point[0] - this.vectorDirecction!.elements[0] * point[2],
			z: this.vectorDirecction!.elements[0] * point[1] - this.vectorDirecction!.elements[1] * point[0],
		};

		const rotPoint_x:number = point[0] * cosAngle + crossProduct.x * sinAngle +
      							  this.vectorDirecction!.elements[0] * dotProduct * oneMinusCos;

		const rotPoint_y:number = point[1] * cosAngle + crossProduct.y * sinAngle +
                                  this.vectorDirecction!.elements[1] * dotProduct * oneMinusCos;

		const rotPoint_z:number = point[2] * cosAngle + crossProduct.z * sinAngle +
                                  this.vectorDirecction!.elements[2] * dotProduct * oneMinusCos;

		return [rotPoint_x, rotPoint_y, rotPoint_z];
	};//end 

	public rotateArrayPoints(points:number[],angle:number): number[] {
		const newPoints: number[] = [];
        for (let idx=0;idx<points.length;idx+=3) {
			const currPoint = [points[idx], points[idx+1], points[idx+2]];
			const rotatedPoint = this.rotatePoint(currPoint, angle);
			newPoints.push(...rotatedPoint);
        }
		return newPoints;
	};//end

	public getmx_rot_axis_traslation_to_center():Matrix4x4 {
		let m_elem: number[][] = []; //[4][4]
		m_elem[0]= [];
		m_elem[1]= [];
		m_elem[2]= [];
		m_elem[3]= [];
		
		m_elem[0][0]=1.0;	m_elem[0][1]=0.0;	m_elem[0][2]=0.0;	m_elem[0][3]=0.0;		
		m_elem[1][0]=0.0; 	m_elem[1][1]=1.0;	m_elem[1][2]=0.0;	m_elem[1][3]=0.0;		
		m_elem[2][0]=0.0; 	m_elem[2][1]=0.0;	m_elem[2][2]=1.0;	m_elem[2][3]=0.0;		
		
		m_elem[3][0]=this.axis_vertex_0[0] * (-1.0); 	
		m_elem[3][1]=this.axis_vertex_0[1] * (-1.0);	
		m_elem[3][2]=this.axis_vertex_0[2] * (-1.0);	
		m_elem[3][3]=1.0;
		return new Matrix4x4(m_elem);
	};//end 

	public getmx_rot_axis_traslation_to_pivot():Matrix4x4 {
		let m_elem: number[][] = []; //[4][4]	
		m_elem[0]= [];
		m_elem[1]= [];
		m_elem[2]= [];
		m_elem[3]= [];
		
		m_elem[0][0]=1.0;	m_elem[0][1]=0.0;	m_elem[0][2]=0.0;	m_elem[0][3]=0.0;		
		m_elem[1][0]=0.0; 	m_elem[1][1]=1.0;	m_elem[1][2]=0.0;	m_elem[1][3]=0.0;		
		m_elem[2][0]=0.0; 	m_elem[2][1]=0.0;	m_elem[2][2]=1.0;	m_elem[2][3]=0.0;	
		
		m_elem[3][0]=this.axis_vertex_0[0]; 	
		m_elem[3][1]=this.axis_vertex_0[1];	
		m_elem[3][2]=this.axis_vertex_0[2];	
		m_elem[3][3]=1.0;
		return new Matrix4x4(m_elem);
	};//end

    public getRotationMatrix(rotation_angle:number):Matrix4x4  {
        

		//----------------------------------------------------------------------
		// STEP - ROTATION AXIS 0
		//----------------------------------------------------------------------
		if(this.rot_vector_d1==0){
			this.rot_vector_d1 = 0.00001
		}
		if(this.rot_vector_d2==0){
			this.rot_vector_d1 = 0.00001
		}

		let mm_rot_0_step2: number[][] = []; 
		mm_rot_0_step2[0] = [];
		mm_rot_0_step2[0][0]=1.0; 
		mm_rot_0_step2[0][1]=0.0;
		mm_rot_0_step2[0][2]=0.0;
		mm_rot_0_step2[0][3]=0.0;        
        
		mm_rot_0_step2[1] = [];
		mm_rot_0_step2[1][0]=0.0; 
		mm_rot_0_step2[1][1]= (this.rot_vector_axis_2!/this.rot_vector_d1!);		
		mm_rot_0_step2[1][2]= (this.rot_vector_axis_1!/this.rot_vector_d1!);	
		mm_rot_0_step2[1][3]=0.0;
		
		mm_rot_0_step2[2] = [];
		mm_rot_0_step2[2][0]=0.0; 
		mm_rot_0_step2[2][1]=(-1.0) * (this.rot_vector_axis_1!/this.rot_vector_d1!);	
		mm_rot_0_step2[2][2]= (this.rot_vector_axis_2!/this.rot_vector_d1!);	
		mm_rot_0_step2[2][3]=0.0;

		mm_rot_0_step2[3] = [];
		mm_rot_0_step2[3][0]=0.0; 
		mm_rot_0_step2[3][1]=0.0;
		mm_rot_0_step2[3][2]=0.0;
		mm_rot_0_step2[3][3]=1.0;				
		//----------------------------------------------------------------------

		//----------------------------------------------------------------------
		// STEP - ROTATION AXIS 0 INVERSE
		//----------------------------------------------------------------------	
		var mm_rot_axis_0_inverse_step6: number[][] = []; //[][]		
		
		mm_rot_axis_0_inverse_step6[0]=[]; 
		mm_rot_axis_0_inverse_step6[0][0]=1.0; 
		mm_rot_axis_0_inverse_step6[0][1]=0.0;
		mm_rot_axis_0_inverse_step6[0][2]=0.0;
		mm_rot_axis_0_inverse_step6[0][3]=0.0;

		mm_rot_axis_0_inverse_step6[1]=[]; 
		mm_rot_axis_0_inverse_step6[1][0]=0.0; 
		mm_rot_axis_0_inverse_step6[1][1]= (this.rot_vector_axis_2!/this.rot_vector_d1!);		
		mm_rot_axis_0_inverse_step6[1][2]= (-1.0) * (this.rot_vector_axis_1!/this.rot_vector_d1!);	
		mm_rot_axis_0_inverse_step6[1][3]=0.0;
		
		mm_rot_axis_0_inverse_step6[2]=[]; 
		mm_rot_axis_0_inverse_step6[2][0]=0.0; 
		mm_rot_axis_0_inverse_step6[2][1]= (this.rot_vector_axis_1!/this.rot_vector_d1!);
		mm_rot_axis_0_inverse_step6[2][2]= (this.rot_vector_axis_2!/this.rot_vector_d1!);	
		mm_rot_axis_0_inverse_step6[2][3]=0.0;
		
		mm_rot_axis_0_inverse_step6[3]=[]; 
		mm_rot_axis_0_inverse_step6[3][0]=0.0; 
		mm_rot_axis_0_inverse_step6[3][1]=0.0;
		mm_rot_axis_0_inverse_step6[3][2]=0.0;
		mm_rot_axis_0_inverse_step6[3][3]=1.0;		        
        //----------------------------------------------------------------------	
        
		//----------------------------------------------------------------------
		// STEP - ROTATION AXIS 1
		//----------------------------------------------------------------------
		let mm_rot_axis_1_step3: number[][] = []; //[][]

		mm_rot_axis_1_step3[0]=[]; 
		mm_rot_axis_1_step3[0][0]= (this.rot_vector_d1!/this.rot_vector_d2!);
		mm_rot_axis_1_step3[0][1]= 0.0;
		mm_rot_axis_1_step3[0][2]= (this.rot_vector_axis_0!/this.rot_vector_d2!);
		mm_rot_axis_1_step3[0][3]= 0.0;

		mm_rot_axis_1_step3[1]=[];
		mm_rot_axis_1_step3[1][0]= 0.0;
		mm_rot_axis_1_step3[1][1]= 1.0;
		mm_rot_axis_1_step3[1][2]= 0.0;
		mm_rot_axis_1_step3[1][3]= 0.0;		
		
		mm_rot_axis_1_step3[2]=[];
		mm_rot_axis_1_step3[2][0]= (-1.0) * (this.rot_vector_axis_0!/this.rot_vector_d2!);
		mm_rot_axis_1_step3[2][1]= 0.0;
		mm_rot_axis_1_step3[2][2]= (this.rot_vector_d1!/this.rot_vector_d2!);
		mm_rot_axis_1_step3[2][3]= 0.0;
		
		mm_rot_axis_1_step3[3]=[];
		mm_rot_axis_1_step3[3][0]= 0.0;
		mm_rot_axis_1_step3[3][1]= 0.0;
		mm_rot_axis_1_step3[3][2]= 0.0;
		mm_rot_axis_1_step3[3][3]= 1.0;        
        //----------------------------------------------------------------------
        
		
		//----------------------------------------------------------------------
		// STEP 5 - ROTATION AXIS 1 INVERSE
		//----------------------------------------------------------------------	
		var mm_rot_axis1_inverse_step5:number[][] = []; //[][]

		mm_rot_axis1_inverse_step5[0]=[];
		mm_rot_axis1_inverse_step5[0][0]= (this.rot_vector_d1!/this.rot_vector_d2!);
		mm_rot_axis1_inverse_step5[0][1]= 0.0;
		mm_rot_axis1_inverse_step5[0][2]= (-1.0)*(this.rot_vector_axis_0!/this.rot_vector_d2!);
		mm_rot_axis1_inverse_step5[0][3]= 0.0;

		mm_rot_axis1_inverse_step5[1]=[];
		mm_rot_axis1_inverse_step5[1][0]= 0.0;
		mm_rot_axis1_inverse_step5[1][1]= 1.0;
		mm_rot_axis1_inverse_step5[1][2]= 0.0;
		mm_rot_axis1_inverse_step5[1][3]= 0.0;
		
		mm_rot_axis1_inverse_step5[2]=[];
		mm_rot_axis1_inverse_step5[2][0]= (this.rot_vector_axis_0!/this.rot_vector_d2!);
		mm_rot_axis1_inverse_step5[2][1]= 0.0;
		mm_rot_axis1_inverse_step5[2][2]= (this.rot_vector_d1!/this.rot_vector_d2!);
		mm_rot_axis1_inverse_step5[2][3]= 0.0;
						
		mm_rot_axis1_inverse_step5[3]=[];
		mm_rot_axis1_inverse_step5[3][0]= 0.0;
		mm_rot_axis1_inverse_step5[3][1]= 0.0;
		mm_rot_axis1_inverse_step5[3][2]= 0.0;
		mm_rot_axis1_inverse_step5[3][3]= 1.0;		        
        //----------------------------------------------------------------------	

		//----------------------------------------------------------------------
		// STEP 8 - CALCULATE NEW COORDINATES - PROCCES MATRIXS
		//----------------------------------------------------------------------	
		let xmatrix_step1_tr:Matrix4x4 	= this.getmx_rot_axis_traslation_to_center(); //Matrix4x4
		let xmatrix_step2_rot_0:Matrix4x4 = new Matrix4x4(mm_rot_0_step2);
		let xmatrix_step3_rot_1:Matrix4x4 = new Matrix4x4(mm_rot_axis_1_step3);      
        
        let xmatrix_step4_rot_2:Matrix4x4 = Axis3d.get_axisxyz_matrix_rot_axis_2(rotation_angle);		
		let xmatrix_step5_rot_1_inverse:Matrix4x4	= new Matrix4x4(mm_rot_axis1_inverse_step5);		
		let xmatrix_step6_rot_0_inverse:Matrix4x4	= new Matrix4x4(mm_rot_axis_0_inverse_step6);		
		let xmatrix_step7_tr_inverse:Matrix4x4= this.getmx_rot_axis_traslation_to_pivot();

		let xm_step1_step2:Matrix4x4 = MathMatrix3d.get_mmatrix_mult(xmatrix_step1_tr,xmatrix_step2_rot_0);   
		let xm_step2_step3:Matrix4x4 = MathMatrix3d.get_mmatrix_mult(xm_step1_step2,xmatrix_step3_rot_1);
		let xm_step3_step4:Matrix4x4  = MathMatrix3d.get_mmatrix_mult(xm_step2_step3,xmatrix_step4_rot_2);    
        
		let xm_step4_step5:Matrix4x4 = MathMatrix3d.get_mmatrix_mult(xm_step3_step4,xmatrix_step5_rot_1_inverse);
		let xm_step5_step6:Matrix4x4 = MathMatrix3d.get_mmatrix_mult(xm_step4_step5,xmatrix_step6_rot_0_inverse);

		let xm_result:Matrix4x4 = MathMatrix3d.get_mmatrix_mult(xm_step5_step6,xmatrix_step7_tr_inverse);
		return xm_result;        

    };//end



	public static get_axisxyz_matrix_rot_axis_2(rotation_angle:number) {
		let m_elem: number[][] = []; //[4][4]

		m_elem[0] = [];
		m_elem[1] = [];
		m_elem[2] = [];
		m_elem[3] = [];
		
		m_elem[0][0] = Math.cos(rotation_angle);
		m_elem[0][1] = Math.sin(rotation_angle);
		m_elem[0][2] = 0.0;
		m_elem[0][3] = 0.0;		
		
		m_elem[1][0] = Math.sin(rotation_angle)* (-1.0);
		m_elem[1][1] = Math.cos(rotation_angle);
		m_elem[1][2] = 0.0;
		m_elem[1][3] = 0.0;
		
		m_elem[2][0] = 0.0;
		m_elem[2][1] = 0.0;
		m_elem[2][2] = 1.0;
		m_elem[2][3] = 0.0;		
		
		m_elem[3][0] = 0.0;
		m_elem[3][1] = 0.0;
		m_elem[3][2] = 0.0;
		m_elem[3][3] = 1.0;		
		return new Matrix4x4(m_elem);
	}//end

	public static getAxisRotation(axisIndex:number):Axis3d {  
		let axisPtEnd:number[] = [0.0,0.0,0.0];
		axisPtEnd[axisIndex] = 1.0;	
		return new Axis3d([0.0,0.0,0.0],axisPtEnd);
	}//end 

	public static translateVertex3d(vertex3d:number[],trans3d:number[]):void{ 
		for(let idx:number=0;idx<vertex3d.length;idx++){
			vertex3d[idx]+= trans3d[idx];				
		}//end for
		
	}//end 	

	
	static getTranslation3d(vertex_0:number[],vertex_1:number[]){
		const trans3d:number[] = [];
		trans3d[0] = vertex_1[0]-vertex_0[0];
		trans3d[1] = vertex_1[1]-vertex_0[1];
		trans3d[2] = vertex_1[2]-vertex_0[2];		
		return trans3d;
	}//end    

};//end class