//src\common\helper\texthelper.ts

import { FileCode } from "@/lib/filesystem/fsmodels";


/**
 * class TextParser.getMultipleFilesCode
 */
export class TextParser {

    //const chargeMultipleFileCode = (filescode: FileCode[]) => {

    public static getMultipleFilesCode(filescode: FileCode[]): string {
        let result: string = "";
        for (const file of filescode) {
            result += file.code + "\n\n";
        }
        return result;
    };//end
    
    public static replaceAll(content: string, searchValue: string, replaceValue: string): string {
        let found: boolean = true;
        while (found) {
            const position: number = content.indexOf(searchValue);
            if (position >= 0) {
                content = content.replace(searchValue, replaceValue);
            }
            else { found = false; }
        }
        return content;
    };//end

    public static deleteEmptyLines(value: string): string {
        const lines: string[] = value.split('\n');
        const result: string[] = [];
        let prevEmpty = false;
        for (const line of lines) {
            const isEmpty = line.trim() === '';
            if (isEmpty) {if (!prevEmpty) {result.push('');}} 
            else {result.push(line);}
            prevEmpty = isEmpty;
        }
        return result.join('\n');
    }


    static isEmpty(value: string | undefined | null): boolean {
        return !value || value.trim().length === 0;
    }

    static isNotEmpty(value: string | undefined | null): boolean {
        return !this.isEmpty(value);
    }

    static toLowerCase(value: string): string {
        return value.toLowerCase();
    }
    public static capitalize(value: string): string {
        if (this.isEmpty(value)) {
            return value;
        }
        return value.charAt(0).toUpperCase() + value.slice(1);
    }

    public static uncapitalize(value: string): string {
        if (this.isEmpty(value)) {
            return value;
        }
        return value.charAt(0).toLowerCase() + value.slice(1);
    }

    public static toCamelCase(value: string): string {
        if (this.isEmpty(value)) {
            return value;
        }
        const words = value.split(' ');
        return words.map((word, index) => {
            return index === 0 ? this.uncapitalize(word) : this.capitalize(word);
        }).join('');
    }

    public static toSnakeCase(value: string): string {
        if (this.isEmpty(value)) {
            return value;
        }
        return value.replace(/\s+/g, '_').toLowerCase();
    }

    public static toKebabCase(value: string): string {
        if (this.isEmpty(value)) {
            return value;
        }
        return value.replace(/\s+/g, '-').toLowerCase();
    }

    public static toPascalCase(value: string): string {
        if (this.isEmpty(value)) {
            return value;
        }
        const words = value.split(' ');
        return words.map(word => this.capitalize(word)).join('');
    }

}//end class