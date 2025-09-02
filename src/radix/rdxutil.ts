//src\radix\radixutil.ts


/*

export type radixTysspeComp = {
    color: any; 
    size: any;
    variant: any;
    radius: any;
}

*/
/**
 * RadixUtil is a utility class for Radix components.
 * RadixUtil.getArrayChar
 */
export class RadixUtil {

    public static getArrayChar(char:string, count:number): string[] {
        let arr: string[] = [];
        for(let i=0; i<count; i++) {
            arr.push(char);
        }   
        return arr;
    }
    
    public static getArrayBoolean(value:boolean, count:number): boolean[] {
        let arr: boolean[] = [];
        for(let i=0; i<count; i++) {
            arr.push(value);
        }   
        return arr;
    } 
    
    public static getArrayTrue( count:number): boolean[] {
        return RadixUtil.getArrayBoolean(true, count);
    }  
    
    public static getArrayFalse(count:number): boolean[] {
        return RadixUtil.getArrayBoolean(true, count);
    }   

}//end class