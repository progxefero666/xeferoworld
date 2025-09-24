// src\common\decorators\decfield.ts

import "reflect-metadata";
import { TLengthRange, TNumeric } from "src/common/types";


export const DEC_KEY_field:string = "field";

type TFxDecorator = {
    table?: string;
    id?: string;
    name?: string;
};

type TFieldDecorator = {
    ftype: string ; 
	name: string;
    generated?: boolean;
    required?: boolean;
	length?: TLengthRange, 
    format?:TNumeric,
    pk?: boolean,
    fk?: boolean,
    fxattrs?:TFxDecorator;
} ;

//DEC_KEY_field
export const field = (options: TFieldDecorator) => {
    return (target: any, propertyKey: string) => {
        Reflect.defineMetadata(DEC_KEY_field, options, target, propertyKey);
    };
};

export const defaultValue = (value: any) =>{
    return function (target: any, propertyKey: string) {
        target[propertyKey] = value;
    };
}

/*
// FUNCIÓN SEPARADA - para extraer metadatos después
export const getFieldsMetadata = (instance: any): any[] => {
    const fieldsMetadata: any[] = Object.getOwnPropertyNames(instance).map(prop => ({
        name: prop,
        ...Reflect.getMetadata("field", instance, prop)
    }));
    return fieldsMetadata;
};
*/