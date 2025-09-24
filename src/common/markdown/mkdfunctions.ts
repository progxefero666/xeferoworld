//src\markdown\utils\mkdutils.ts

import { MarkdownConfig } from "@/markdown/mkdconfig";
import { StringsHelper } from "@/markdown/mkdstrings";

/**
* class MarkdownUtils 
* use MarkdownConfig in:
*    src\common\markdown\mkdconfig.ts
*/
export class MarkdownFunctions {

    // ========================================
    // BASIC TEXT FORMATTING UTILITIES
    // ========================================

    /**
     * Wraps text with the specified markdown marks (bold, italic, etc.)
     */
    public static wrapWithMarks(text: string, markOpen: string, markClose?: string): string {
        const closeMark = markClose || markOpen;
        return `${markOpen}${text}${closeMark}`;
    }

    /**
     * Creates a bold text
     */
    public static makeBold(text: string): string {
        return this.wrapWithMarks(text, MarkdownConfig.BOLD);
    }

    /**
     * Creates italic text
     */
    public static makeItalic(text: string): string {
        return this.wrapWithMarks(text, MarkdownConfig.ITALIC);
    }

    /**
     * Creates inline code
     */
    public static makeInlineCode(text: string): string {
        return this.wrapWithMarks(text, MarkdownConfig.INLINE_CODE);
    }

    // ========================================
    // HEADER UTILITIES
    // ========================================

    /**
     * Creates a header with the specified level
     */
    public static createHeader(text: string, level: number): string {
        const levels = [
            MarkdownConfig.HEADER_1,
            MarkdownConfig.HEADER_2,
            MarkdownConfig.HEADER_3,
            MarkdownConfig.HEADER_4,
            MarkdownConfig.HEADER_5,
            MarkdownConfig.HEADER_6
        ];
        
        const headerLevel = Math.max(1, Math.min(6, level)) - 1;
        return `${levels[headerLevel]} ${text}`;
    }

    /**
     * Creates a level 2 header (default starting level as per requirements)
     */
    public static createDefaultHeader(text: string): string {
        return this.createHeader(text, 2);
    }

    // ========================================
    // LIST UTILITIES
    // ========================================

    /**
     * Creates a list item with the specified prefix and indentation
     */
    public static createListItem(text: string, prefix: string, indentLevel: number = 0): string {
        const indent = StringsHelper.getTabsSpace(indentLevel);
        return `${indent}${prefix} ${text}`;
    }

    /**
     * Creates an unordered list item with dash
     */
    public static createUnorderedItem(text: string, indentLevel: number = 0): string {
        return this.createListItem(text, MarkdownConfig.LIST_UNORDERED_DASH, indentLevel);
    }

    /**
     * Creates an ordered list item with number
     */
    public static createOrderedItem(text: string, number: number, indentLevel: number = 0): string {
        const prefix = `${number}${MarkdownConfig.LIST_ORDERED_DOT}`;
        return this.createListItem(text, prefix, indentLevel);
    }

    // ========================================
    // SEPARATOR AND SPACING UTILITIES
    // ========================================

    /**
     * Creates a field separator with dash and optional bold field name
     */
    public static createFieldSeparator(fieldName: string, makeBold: boolean = true): string {
        const formattedName = makeBold ? this.makeBold(fieldName) : fieldName;
        return `${MarkdownConfig.SEP_DASH_SPACE}${formattedName}`;
    }

    /**
     * Adds newlines to text
     */
    public static addNewlines(text: string, count: number = 1): string {
        const newlines = MarkdownConfig.NEWLINE.repeat(count);
        return `${text}${newlines}`;
    }

    /**
     * Adds double newline (paragraph break)
     */
    public static addParagraphBreak(text: string): string {
        return `${text}${MarkdownConfig.DOUBLE_NEWLINE}`;
    }

    // ========================================
    // INDENTATION AND BLOCK UTILITIES
    // ========================================

    /**
     * Applies indentation to a text block
     */
    public static indentTextBlock(text: string, indentLevel: number): string {
        return StringsHelper.applyTabsToStringBlock(text, indentLevel);
    }

    /**
     * Creates a code block with specified language
     */
    public static createCodeBlock(code: string, language?: string): string {
        const openTag = language ? `${MarkdownConfig.CODE_BLOCK}${language}` : MarkdownConfig.CODE_BLOCK;
        return `${openTag}${MarkdownConfig.NEWLINE}${code}${MarkdownConfig.NEWLINE}${MarkdownConfig.CODE_BLOCK}`;
    }

    // ========================================
    // COLLECTION UTILITIES
    // ========================================

    /**
     * Joins multiple markdown elements with specified separator
     */
    public static joinElements(elements: string[], separator: string = MarkdownConfig.NEWLINE): string {
        return elements.filter(element => element.trim() !== '').join(separator);
    }

    /**
     * Creates a list from array of strings
     */
    public static createListFromArray(items: string[], ordered: boolean = false, indentLevel: number = 0): string {
        const listItems = items.map((item, index) => {
            if (ordered) {
                return this.createOrderedItem(item, index + 1, indentLevel);
            } else {
                return this.createUnorderedItem(item, indentLevel);
            }
        });

        return this.joinElements(listItems);
    }

}//end class
