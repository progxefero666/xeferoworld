//src\codegen\filesystem\fsconstants.ts

import { Keyvalue } from "@/common/keyvalue";
import { TKeyvalue } from "@/common/types";

/**
 * class DocFormats.getMimetype
 */
export class DocFormats{
    
    public static readonly FORM_URLENCODED: string = "application/x-www-form-urlencoded";
    
    public static WEBGL_OBJECT_GLS:TKeyvalue    = {key: "application/octet-stream", value: "glb"};

    public static FORMAT_ZIP:TKeyvalue          = {key: "application/zip", value: "zip"};
    public static FORMAT_TEXTPLAIN:TKeyvalue    = {key: "text/plain", value: "txt"};
    public static FORMAT_TYPESCRIPT:TKeyvalue   = {key: "text/typescript", value: "ts"};
    public static FORMAT_JSON:TKeyvalue         = {key: "application/json", value: "json"};
    public static FORMAT_JSX:TKeyvalue          = {key: "text/jsx", value: "tsx"};
    public static FORMAT_SQL:TKeyvalue          = {key: "text/x-sql", value: "sql"};
    public static FORMAT_JAVASCRIPT:TKeyvalue   = {key: "text/javascript", value: "js"};   
    public static FORMAT_PYTHON:TKeyvalue       = { key: "text/python", value: "py"};
    public static FORMAT_MARKDOWN:TKeyvalue     = { key: "text/plain", value: "md"};
    public static FORMAT_HTML:TKeyvalue         = { key: "text/html", value: "html"};
    public static FORMAT_CSS:TKeyvalue          = { key: "text/css", value: "css"};
    public static FORMAT_PDF:TKeyvalue          = { key: "application/pdf", value: "pdf"};

    public static FORMAT_JPG:TKeyvalue          = { key: "image/jpeg", value: "jpg"};
    public static FORMAT_PNG:TKeyvalue          = { key: "image/png", value: "png"};
    public static FORMAT_JPEG:TKeyvalue          = { key: "image/jpeg", value: "jpg"};

    public static getMimetype(extension:string): string {
        let mimetype: string = "";
        if(extension === DocFormats.FORMAT_TYPESCRIPT.value) {
            mimetype = DocFormats.FORMAT_TYPESCRIPT.key;
        }
        else if(extension === DocFormats.FORMAT_JSX.value) {
            mimetype = DocFormats.FORMAT_JSX.key;
        }
        else if(extension === DocFormats.FORMAT_JSON.value) {
            mimetype = DocFormats.FORMAT_JSON.key;
        }
        else if(extension === DocFormats.FORMAT_SQL.value) {
            mimetype = DocFormats.FORMAT_SQL.key;
        }
        else if(extension === DocFormats.FORMAT_JAVASCRIPT.value) {
            mimetype = DocFormats.FORMAT_JAVASCRIPT.key;
        }
        else if(extension === DocFormats.FORMAT_PYTHON.value) {
            mimetype = DocFormats.FORMAT_PYTHON.key;
        }
        else if(extension === DocFormats.FORMAT_MARKDOWN.value) {
            mimetype = DocFormats.FORMAT_MARKDOWN.key;
        }
        else if(extension === DocFormats.FORMAT_HTML.value) {
            mimetype = DocFormats.FORMAT_HTML.key;
        }
        else if(extension === DocFormats.FORMAT_CSS.value) {
            mimetype = DocFormats.FORMAT_CSS.key;
        }
        else if(extension === DocFormats.FORMAT_PDF.value) {
            mimetype = DocFormats.FORMAT_PDF.key;
        }
        else if(extension === DocFormats.FORMAT_JPG.value) {
            mimetype = DocFormats.FORMAT_JPG.key;
        }
        else if(extension === DocFormats.FORMAT_PNG.value) {
            mimetype = DocFormats.FORMAT_PNG.key;
        }
        else if(extension === DocFormats.FORMAT_JPEG.value) {
            mimetype = DocFormats.FORMAT_JPEG.key;
        }
        return mimetype;
    };

    public static getMimetypeFileExtension(format:string): string {
        let mimetype: string = "";
        if(format === DocFormats.FORMAT_TYPESCRIPT.key) {
            mimetype = DocFormats.FORMAT_TYPESCRIPT.value;
        }
        else if(format === DocFormats.FORMAT_JSX.key) {
            console.log(DocFormats.FORMAT_JSX.value);
            console.log(DocFormats.FORMAT_JSX.value);
            mimetype = DocFormats.FORMAT_JSX.value;
        }        
        else if(format === DocFormats.FORMAT_JSON.key) {
            mimetype = DocFormats.FORMAT_JSON.value;
        }
        else if(format === DocFormats.FORMAT_SQL.key) {
            mimetype = DocFormats.FORMAT_SQL.value;
        }
        else if(format === DocFormats.FORMAT_JAVASCRIPT.key) {
            mimetype = DocFormats.FORMAT_JAVASCRIPT.value;
        }
        else if(format === DocFormats.FORMAT_PYTHON.key) {
            mimetype = DocFormats.FORMAT_PYTHON.value;
        }
        else if(format === DocFormats.FORMAT_MARKDOWN.key) {
            mimetype = DocFormats.FORMAT_MARKDOWN.value;
        }
        else if(format === DocFormats.FORMAT_HTML.key) {
            mimetype = DocFormats.FORMAT_HTML.value;
        }
        else if(format === DocFormats.FORMAT_CSS.key) {
            mimetype = DocFormats.FORMAT_CSS.value;
        }
        else if(format === DocFormats.FORMAT_PDF.key) {
            mimetype = DocFormats.FORMAT_PDF.value;
        }
        
        return mimetype;
    };    

    public static readonly LIST_FORMATS: Keyvalue[] = [                
        new Keyvalue(DocFormats.FORMAT_TYPESCRIPT.key, "TypeScript"),  
        new Keyvalue(DocFormats.FORMAT_JSON.key, "JSON"),      
        new Keyvalue(DocFormats.FORMAT_JSX.key, "JSX"),  
        new Keyvalue(DocFormats.FORMAT_SQL.key, "SQL"),
        new Keyvalue(DocFormats.FORMAT_JAVASCRIPT.key, "JavaScript")
    ]; 
};//end class