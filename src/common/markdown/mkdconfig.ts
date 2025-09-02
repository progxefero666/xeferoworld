//src\markdown\mkdconfig.ts

/**
 * MarkdownConfig class
 * Provides comprehensive static configuration constants for Markdown formatting.
 * All constants are designed to be used by future Markdown string formatting functions.
 */
export class MarkdownConfig {
    
    
    // ========================================
    // BASIC FORMATTING MARKS
    // ========================================
    
    // Headers (H1-H6)
    public static readonly HEADER_1: string = "#";
    public static readonly HEADER_2: string = "##";
    public static readonly HEADER_3: string = "###";
    public static readonly HEADER_4: string = "####";
    public static readonly HEADER_5: string = "#####";
    public static readonly HEADER_6: string = "######";
    
    // Text formatting
    public static readonly BOLD: string = "**";
    public static readonly ITALIC: string = "*";
    public static readonly BOLD_ITALIC: string = "***";
    public static readonly STRIKETHROUGH: string = "~~";
    public static readonly UNDERLINE: string = "<u>";
    public static readonly UNDERLINE_CLOSE: string = "</u>";
    public static readonly HIGHLIGHT: string = "==";
    public static readonly SUBSCRIPT: string = "<sub>";
    public static readonly SUBSCRIPT_CLOSE: string = "</sub>";
    public static readonly SUPERSCRIPT: string = "<sup>";
    public static readonly SUPERSCRIPT_CLOSE: string = "</sup>";
    
    // ========================================
    // CODE FORMATTING
    // ========================================
    
    public static readonly INLINE_CODE: string = "`";
    public static readonly CODE_BLOCK: string = "```";
    public static readonly CODE_BLOCK_TYPESCRIPT: string = "```typescript";
    public static readonly CODE_BLOCK_JAVASCRIPT: string = "```javascript";
    public static readonly CODE_BLOCK_JSON: string = "```json";
    public static readonly CODE_BLOCK_BASH: string = "```bash";
    public static readonly CODE_BLOCK_SQL: string = "```sql";
    public static readonly CODE_BLOCK_PYTHON: string = "```python";
    public static readonly CODE_BLOCK_HTML: string = "```html";
    public static readonly CODE_BLOCK_CSS: string = "```css";
    
    // ========================================
    // LISTS
    // ========================================
    
    // Unordered lists
    public static readonly LIST_UNORDERED_DASH: string = "-";
    public static readonly LIST_UNORDERED_ASTERISK: string = "*";
    public static readonly LIST_UNORDERED_PLUS: string = "+";
    
    // Ordered lists
    public static readonly LIST_ORDERED_DOT: string = ".";
    public static readonly LIST_ORDERED_PAREN: string = ")";
    
    // Task lists
    public static readonly TASK_LIST_UNCHECKED: string = "- [ ]";
    public static readonly TASK_LIST_CHECKED: string = "- [x]";
    
    // ========================================
    // LINKS AND REFERENCES
    // ========================================
    
    public static readonly LINK_OPEN: string = "[";
    public static readonly LINK_CLOSE: string = "]";
    public static readonly LINK_URL_OPEN: string = "(";
    public static readonly LINK_URL_CLOSE: string = ")";
    public static readonly LINK_REF_OPEN: string = "[";
    public static readonly LINK_REF_CLOSE: string = "]:";
    
    // Images
    public static readonly IMAGE_PREFIX: string = "!";
    
    // ========================================
    // TABLES
    // ========================================
    
    public static readonly TABLE_SEPARATOR: string = "|";
    public static readonly TABLE_HEADER_SEPARATOR: string = "---";
    public static readonly TABLE_ALIGN_LEFT: string = ":---";
    public static readonly TABLE_ALIGN_CENTER: string = ":---:";
    public static readonly TABLE_ALIGN_RIGHT: string = "---:";
    
    // ========================================
    // BLOCK ELEMENTS
    // ========================================
    
    public static readonly BLOCKQUOTE: string = ">";
    public static readonly HORIZONTAL_RULE_DASHES: string = "---";
    public static readonly HORIZONTAL_RULE_ASTERISKS: string = "***";
    public static readonly HORIZONTAL_RULE_UNDERSCORES: string = "___";
    
    // Line breaks
    public static readonly LINE_BREAK_DOUBLE_SPACE: string = "  ";
    public static readonly LINE_BREAK_BACKSLASH: string = "\\";
    
    // ========================================
    // WHITESPACE AND FORMATTING
    // ========================================
    
    public static readonly TAB_4: string = "    ";
    public static readonly TAB_2: string = "  ";
    public static readonly NEWLINE: string = "\n";
    public static readonly DOUBLE_NEWLINE: string = "\n\n";
    public static readonly SPACE: string = " ";
    public static readonly EMPTY_STRING: string = "";
    
    // ========================================
    // INDENTATION LEVELS
    // ========================================
    
    public static readonly INDENT_LEVEL_1: number = 1;
    public static readonly INDENT_LEVEL_2: number = 2;
    public static readonly INDENT_LEVEL_3: number = 3;
    public static readonly INDENT_LEVEL_4: number = 4;
    public static readonly INDENT_LEVEL_5: number = 5;
    public static readonly INDENT_LEVEL_6: number = 6;
    
    // ========================================
    // SEPARATORS AND DELIMITERS
    // ========================================
    
    public static readonly SEP_COLON: string = ":";
    public static readonly SEP_COLON_SPACE: string = ": ";
    public static readonly SEP_DASH: string = "-";
    public static readonly SEP_DASH_SPACE: string = "- ";
    public static readonly SEP_EQUAL: string = "=";
    public static readonly SEP_PIPE: string = "|";
    public static readonly SEP_COMMA: string = ",";
    public static readonly SEP_COMMA_SPACE: string = ", ";
    public static readonly SEP_SEMICOLON: string = ";";
    public static readonly SEP_DOT: string = ".";
    
    // ========================================
    // SPECIAL CHARACTERS AND ESCAPE SEQUENCES
    // ========================================
    
    public static readonly ESCAPE_CHAR: string = "\\";
    public static readonly ASTERISK: string = "*";
    public static readonly UNDERSCORE: string = "_";
    public static readonly HASH: string = "#";
    public static readonly BACKTICK: string = "`";
    public static readonly TILDE: string = "~";
    public static readonly CARET: string = "^";
    public static readonly SQUARE_BRACKET_OPEN: string = "[";
    public static readonly SQUARE_BRACKET_CLOSE: string = "]";
    public static readonly PAREN_OPEN: string = "(";
    public static readonly PAREN_CLOSE: string = ")";
    public static readonly CURLY_BRACE_OPEN: string = "{";
    public static readonly CURLY_BRACE_CLOSE: string = "}";
    public static readonly ANGLE_BRACKET_OPEN: string = "<";
    public static readonly ANGLE_BRACKET_CLOSE: string = ">";
    
    // ========================================
    // HTML ENTITIES AND SPECIAL SYMBOLS
    // ========================================
    
    public static readonly HTML_AMPERSAND: string = "&amp;";
    public static readonly HTML_LESS_THAN: string = "&lt;";
    public static readonly HTML_GREATER_THAN: string = "&gt;";
    public static readonly HTML_QUOTE: string = "&quot;";
    public static readonly HTML_APOSTROPHE: string = "&#39;";
    public static readonly HTML_NON_BREAKING_SPACE: string = "&nbsp;";
    
    // ========================================
    // FRONTMATTER AND METADATA
    // ========================================
    
    public static readonly FRONTMATTER_YAML: string = "---";
    public static readonly FRONTMATTER_TOML: string = "+++";
    public static readonly FRONTMATTER_JSON: string = "{";
    
    // ========================================
    // MATHEMATICAL EXPRESSIONS
    // ========================================
    
    public static readonly MATH_INLINE: string = "$";
    public static readonly MATH_BLOCK: string = "$$";
    
    // ========================================
    // FOOTNOTES
    // ========================================
    
    public static readonly FOOTNOTE_REF_OPEN: string = "[^";
    public static readonly FOOTNOTE_REF_CLOSE: string = "]";
    public static readonly FOOTNOTE_DEF_SUFFIX: string = "]:";
    
    // ========================================
    // COMMON TEMPLATE PATTERNS
    // ========================================
    
    public static readonly TEMPLATE_TITLE_UNDERLINE_EQUAL: string = "===";
    public static readonly TEMPLATE_TITLE_UNDERLINE_DASH: string = "---";
    public static readonly DEFAULT_CLASS_SUFFIX: string = "Def";
    
    // ========================================
    // UTILITY CONSTANTS FOR FORMATTING
    // ========================================
    
    // Common list prefixes for different nesting levels
    public static readonly LIST_PREFIX_LEVEL_0: string = "";
    public static readonly LIST_PREFIX_LEVEL_1: string = "    ";
    public static readonly LIST_PREFIX_LEVEL_2: string = "        ";
    public static readonly LIST_PREFIX_LEVEL_3: string = "            ";
    
    // Common header patterns
    public static readonly HEADER_PATTERN_SETEXT_1: string = "=";
    public static readonly HEADER_PATTERN_SETEXT_2: string = "-";
    
    // Status indicators for documentation
    public static readonly STATUS_TODO: string = "TODO";
    public static readonly STATUS_DONE: string = "DONE";
    public static readonly STATUS_IN_PROGRESS: string = "IN_PROGRESS";
    public static readonly STATUS_DEPRECATED: string = "DEPRECATED";
    
}//end class