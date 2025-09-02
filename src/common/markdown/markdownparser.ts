//src\db\functions\markdownutil.ts

import { MarkdownConfig } from "@/markdown/mkdconfig";
import { StringsHelper } from "@/markdown/mkdstrings";
import {MarkdownFunctions} from "@/markdown/mkdfunctions"


// ========================================
// FINAL MARKDOWN FORMATTING FUNCTIONS
// ========================================

/**
 * Converts a single object to Markdown format
 * Starting from level 2 headers, with field names in bold and dash separators
 * @param obj - Object to convert
 * @param title - Optional title for the object
 * @returns Markdown formatted string
 */
export function parseItem<T>(obj: T, title?: string): string {
    if (!obj) return "";
    
    let result = "";
    
    // Add title if provided (level 2 header)
    if (title) {
        result += MarkdownFunctions.createDefaultHeader(title);
        result += MarkdownFunctions.addNewlines(result, 2);
    }
    
    // Process each field of the object
    Object.entries(obj as Record<string, any>).forEach(([key, value]) => {
        const fieldName = StringsHelper.capitalize(key);
        const fieldSeparator = MarkdownFunctions.createFieldSeparator(fieldName);
        result += fieldSeparator;
        
        if (value !== null && value !== undefined) {
            result += ` ${value}`;
        }
        result += MarkdownFunctions.addNewlines("", 1);
    });
    
    return MarkdownFunctions.addParagraphBreak(result);
}

/**
 * Converts an array of objects to Markdown format
 * Each object numbered, starting from level 2 headers
 * @param objects - Array of objects to convert
 * @param title - Optional title for the collection
 * @returns Markdown formatted string
 */
export function parseCollection<T>(objects: T[], title?: string): string {
    if (!objects || objects.length === 0) return "";
    
    let result = "";
    
    // Add title if provided (level 2 header)
    if (title) {
        result += MarkdownFunctions.createDefaultHeader(title);
        result += MarkdownFunctions.addNewlines(result, 2);
    }
    
    // Process each object in the array
    objects.forEach((obj, index) => {
        const objectTitle = `${index + 1}`;
        const objectHeader = MarkdownFunctions.createHeader(objectTitle, 3);
        result += objectHeader;
        result += MarkdownFunctions.addNewlines("", 2);
        
        // Process each field of the object
        Object.entries(obj as Record<string, any>).forEach(([key, value]) => {
            const fieldName = StringsHelper.capitalize(key);
            const fieldSeparator = MarkdownFunctions.createFieldSeparator(fieldName);
            result += fieldSeparator;
            
            if (value !== null && value !== undefined) {
                result += ` ${value}`;
            }
            result += MarkdownFunctions.addNewlines("", 1);
        });
        
        result += MarkdownFunctions.addNewlines("", 1);
    });
    
    return MarkdownFunctions.addParagraphBreak(result);
}

/**
 * Converts an object with child relations/arrays to Markdown format
 * Main object fields first, then child arrays as separate sections
 * @param obj - Object with potential child arrays
 * @param relations - Object specifying which fields are child collections
 * @param title - Optional title for the object
 * @returns Markdown formatted string
 */
export function parseItemWithRelChildrens<T, R>(
    obj: T, 
    relations: Record<string, string>, 
    title?: string
): string {
    if (!obj) return "";
    
    let result = "";
    
    // Add title if provided (level 2 header)
    if (title) {
        result += MarkdownFunctions.createDefaultHeader(title);
        result += MarkdownFunctions.addNewlines(result, 2);
    }
    
    const objRecord = obj as Record<string, any>;
    const relationKeys = Object.keys(relations);
    
    // Process main object fields (non-relation fields first)
    Object.entries(objRecord).forEach(([key, value]) => {
        if (!relationKeys.includes(key)) {
            const fieldName = StringsHelper.capitalize(key);
            const fieldSeparator = MarkdownFunctions.createFieldSeparator(fieldName);
            result += fieldSeparator;
            
            if (value !== null && value !== undefined) {
                result += ` ${value}`;
            }
            result += MarkdownFunctions.addNewlines("", 1);
        }
    });
    
    result += MarkdownFunctions.addNewlines("", 1);
    
    // Process child relations/arrays
    relationKeys.forEach(relationKey => {
        const relationArray = objRecord[relationKey];
        if (relationArray && Array.isArray(relationArray) && relationArray.length > 0) {
            const relationTitle = relations[relationKey] || StringsHelper.capitalize(relationKey);
            const relationHeader = MarkdownFunctions.createHeader(relationTitle, 3);
            result += relationHeader;
            result += MarkdownFunctions.addNewlines("", 2);
            
            relationArray.forEach((childObj, index) => {
                const childTitle = `${index + 1}`;
                const childHeader = MarkdownFunctions.createHeader(childTitle, 4);
                result += childHeader;
                result += MarkdownFunctions.addNewlines("", 1);
                
                Object.entries(childObj as Record<string, any>).forEach(([childKey, childValue]) => {
                    const fieldName = StringsHelper.capitalize(childKey);
                    const fieldSeparator = MarkdownFunctions.createFieldSeparator(fieldName);
                    result += fieldSeparator;
                    
                    if (childValue !== null && childValue !== undefined) {
                        result += ` ${childValue}`;
                    }
                    result += MarkdownFunctions.addNewlines("", 1);
                });
                
                result += MarkdownFunctions.addNewlines("", 1);
            });
        }
    });
    
    return MarkdownFunctions.addParagraphBreak(result);
}

/**
 * Converts an array of objects with child relations to Markdown format
 * Each main object numbered, with their child arrays as subsections
 * @param objects - Array of objects with potential child arrays
 * @param relations - Object specifying which fields are child collections
 * @param title - Optional title for the collection
 * @returns Markdown formatted string
 */
export function parseCollectionWithRelChildrens<T, R>(
    objects: T[], 
    relations: Record<string, string>, 
    title?: string
): string {
    if (!objects || objects.length === 0) return "";
    
    let result = "";
    
    // Add title if provided (level 2 header)
    if (title) {
        result += MarkdownFunctions.createDefaultHeader(title);
        result += MarkdownFunctions.addNewlines(result, 2);
    }
    
    const relationKeys = Object.keys(relations);
    
    // Process each object in the array
    objects.forEach((obj, index) => {
        const objectTitle = `${index + 1}`;
        const objectHeader = MarkdownFunctions.createHeader(objectTitle, 3);
        result += objectHeader;
        result += MarkdownFunctions.addNewlines("", 2);
        
        const objRecord = obj as Record<string, any>;
        
        // Process main object fields (non-relation fields first)
        Object.entries(objRecord).forEach(([key, value]) => {
            if (!relationKeys.includes(key)) {
                const fieldName = StringsHelper.capitalize(key);
                const fieldSeparator = MarkdownFunctions.createFieldSeparator(fieldName);
                result += fieldSeparator;
                
                if (value !== null && value !== undefined) {
                    result += ` ${value}`;
                }
                result += MarkdownFunctions.addNewlines("", 1);
            }
        });
        
        result += MarkdownFunctions.addNewlines("", 1);
        
        // Process child relations/arrays for this object
        relationKeys.forEach(relationKey => {
            const relationArray = objRecord[relationKey];
            if (relationArray && Array.isArray(relationArray) && relationArray.length > 0) {
                const relationTitle = relations[relationKey] || StringsHelper.capitalize(relationKey);
                const relationHeader = MarkdownFunctions.createHeader(relationTitle, 4);
                result += relationHeader;
                result += MarkdownFunctions.addNewlines("", 2);
                
                relationArray.forEach((childObj, childIndex) => {
                    const childTitle = `${childIndex + 1}`;
                    const childHeader = MarkdownFunctions.createHeader(childTitle, 5);
                    result += childHeader;
                    result += MarkdownFunctions.addNewlines("", 1);
                    
                    Object.entries(childObj as Record<string, any>).forEach(([childKey, childValue]) => {
                        const fieldName = StringsHelper.capitalize(childKey);
                        const fieldSeparator = MarkdownFunctions.createFieldSeparator(fieldName);
                        result += fieldSeparator;
                        
                        if (childValue !== null && childValue !== undefined) {
                            result += ` ${childValue}`;
                        }
                        result += MarkdownFunctions.addNewlines("", 1);
                    });
                    
                    result += MarkdownFunctions.addNewlines("", 1);
                });
            }
        });
        
        result += MarkdownFunctions.addNewlines("", 1);
    });
    
    return MarkdownFunctions.addParagraphBreak(result);
}
