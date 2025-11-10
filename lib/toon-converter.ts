import { ConversionResult } from '@/types';

export class ToonConverter {
  // Convert JSON to TOON format
  static jsonToToon(jsonString: string): ConversionResult {
    try {
      const json = JSON.parse(jsonString);
      const toon = this.encodeToToon(json, 0);
      return {
        success: true,
        data: toon,
        tokensSaved: this.calculateTokenSavings(jsonString, toon)
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Invalid JSON format'
      };
    }
  }

  // Convert TOON to JSON format
  static toonToJson(toonString: string): ConversionResult {
    try {
      const json = this.decodeFromToon(toonString);
      const jsonString = JSON.stringify(json, null, 2);
      return {
        success: true,
        data: jsonString,
        tokensSaved: this.calculateTokenSavings(toonString, jsonString)
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Invalid TOON format'
      };
    }
  }

  // Encode a value to TOON format with specified indentation
  private static encodeToToon(value: any, indent: number = 0): string {
    const indentStr = '  '.repeat(indent);
    
    if (value === null) {
      return 'null';
    }
    
    if (typeof value === 'boolean') {
      return value.toString();
    }
    
    if (typeof value === 'number') {
      return value.toString();
    }
    
    if (typeof value === 'string') {
      return this.quoteIfNeeded(value);
    }
    
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return '[]';
      }
      
      // Check if it's a simple array of primitives (inline format)
      if (this.isSimpleArray(value)) {
        return `${value.map(v => this.encodeToToon(v, 0)).join(',')}`;
      }
      
      // Check if it's a tabular array (uniform objects)
      if (this.isTabularArray(value)) {
        return this.encodeTabularArray(value);
      }
      
      // List-style array format
      return value.map(item => {
        const encoded = this.encodeToToon(item, indent + 1);
        if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
          return `- ${encoded.split('\n').join('\n  ')}`;
        }
        return `- ${encoded}`;
      }).join('\n');
    }
    
    if (typeof value === 'object') {
      const entries = Object.entries(value);
      
      if (entries.length === 0) {
        return '{}';
      }
      
      return entries.map(([key, val]) => {
        const encodedKey = this.quoteIfNeeded(key);
        const encodedValue = this.encodeToToon(val, indent + 1);
        
        if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
          return `${encodedKey}:\n${encodedValue.split('\n').map(line => '  ' + line).join('\n')}`;
        } else if (Array.isArray(val) && val.length > 0 && !this.isSimpleArray(val)) {
          const arrayStr = this.encodeArrayWithLength(val, encodedKey);
          return arrayStr;
        } else if (Array.isArray(val) && this.isSimpleArray(val)) {
          return `${encodedKey}[${val.length}]: ${encodedValue}`;
        } else {
          return `${encodedKey}: ${encodedValue}`;
        }
      }).join('\n');
    }
    
    return String(value);
  }

  // Check if array contains only primitives
  private static isSimpleArray(arr: any[]): boolean {
    return arr.every(item => 
      item === null || 
      typeof item === 'boolean' || 
      typeof item === 'number' || 
      typeof item === 'string'
    );
  }

  // Check if array is tabular (array of objects with same keys)
  private static isTabularArray(arr: any[]): boolean {
    if (arr.length === 0) return false;
    
    const firstItem = arr[0];
    if (typeof firstItem !== 'object' || firstItem === null || Array.isArray(firstItem)) {
      return false;
    }
    
    const firstKeys = Object.keys(firstItem).sort();
    
    return arr.every(item => {
      if (typeof item !== 'object' || item === null || Array.isArray(item)) {
        return false;
      }
      const keys = Object.keys(item).sort();
      return keys.length === firstKeys.length && keys.every((key, i) => key === firstKeys[i]);
    });
  }

  // Encode tabular array format
  private static encodeTabularArray(arr: any[]): string {
    if (arr.length === 0) return '[]';
    
    const keys = Object.keys(arr[0]).sort();
    const header = `[${arr.length}]{${keys.join(',')}}:`;
    
    const rows = arr.map(item => 
      keys.map(key => this.encodeToToon(item[key], 0)).join(',')
    );
    
    return header + '\n' + rows.join('\n');
  }

  // Encode array with length marker
  private static encodeArrayWithLength(arr: any[], key: string): string {
    return `${key}[${arr.length}]:\n${this.encodeToToon(arr, 1)}`;
  }

  // Quote string if it contains special characters or resembles reserved words
  private static quoteIfNeeded(str: string): string {
    // Check if the string needs quoting
    const needsQuoting = 
      str.trim() !== str || // leading/trailing whitespace
      str.includes(' ') || // internal spaces
      str === 'null' || str === 'true' || str === 'false' || // reserved words
      /^\d+(\.\d+)?$/.test(str) || // looks like a number
      /[{}[\]|:,-]/.test(str) || // special characters
      /[\x00-\x1F]/.test(str); // control characters
    
    return needsQuoting ? `"${str}"` : str;
  }

  // Decode TOON format to JavaScript object
  private static decodeFromToon(toonString: string): any {
    const lines = toonString.trim().split('\n').map(line => line.trimEnd());
    if (lines.length === 0) return null;
    
    // Handle simple values
    if (lines.length === 1) {
      const line = lines[0].trim();
      if (line === 'null') return null;
      if (line === 'true') return true;
      if (line === 'false') return false;
      if (/^-?\d+$/.test(line)) return parseInt(line, 10);
      if (/^-?\d+\.\d+$/.test(line)) return parseFloat(line);
      
      // Simple array check (comma-separated values)
      if (line.includes(',') && !line.includes(':')) {
        return line.split(',').map(item => this.parseValue(item.trim()));
      }
      
      return this.parseValue(line);
    }
    
    // Parse multi-line TOON
    return this.parseObject(lines, 0).value;
  }

  // Parse object from lines starting at given index
  private static parseObject(lines: string[], startIndex: number): { value: any; endIndex: number } {
    const obj: any = {};
    let i = startIndex;
    
    while (i < lines.length) {
      const line = lines[i];
      const trimmed = line.trim();
      
      if (trimmed === '' || trimmed.startsWith('#')) {
        i++;
        continue;
      }
      
      // Handle list item
      if (trimmed.startsWith('- ')) {
        // This is part of an array, break out
        break;
      }
      
      // Find the key-value separator
      const colonIndex = line.indexOf(':');
      if (colonIndex === -1) {
        i++;
        continue;
      }
      
      const key = line.substring(0, colonIndex).trim();
      const valueStart = line.substring(colonIndex + 1).trim();
      
      // Parse key (remove quotes if present)
      const parsedKey = this.parseValue(key);
      
      // Array with length marker
      const arrayMatch = key.match(/^(.+?)\[(\d+)\]$/);
      if (arrayMatch) {
        const arrayKey = arrayMatch[1];
        const arrayLength = parseInt(arrayMatch[2], 10);
        
        if (valueStart === '') {
          // Multi-line array
          const arrayResult = this.parseArray(lines, i + 1, arrayLength);
          obj[arrayKey] = arrayResult.value;
          i = arrayResult.endIndex;
        } else {
          // Inline array
          obj[arrayKey] = valueStart.split(',').map(item => this.parseValue(item.trim()));
          i++;
        }
        continue;
      }
      
      if (valueStart === '') {
        // Multi-line value (nested object)
        const nestedResult = this.parseObject(lines, i + 1);
        obj[parsedKey] = nestedResult.value;
        i = nestedResult.endIndex;
      } else {
        // Single-line value
        obj[parsedKey] = this.parseValue(valueStart);
        i++;
      }
    }
    
    return { value: obj, endIndex: i };
  }

  // Parse array from lines
  private static parseArray(lines: string[], startIndex: number, expectedLength?: number): { value: any[]; endIndex: number } {
    const arr: any[] = [];
    let i = startIndex;
    
    while (i < lines.length) {
      const line = lines[i];
      const trimmed = line.trim();
      
      if (trimmed === '' || trimmed.startsWith('#')) {
        i++;
        continue;
      }
      
      if (trimmed.startsWith('- ')) {
        // List item
        const itemContent = trimmed.substring(2);
        
        if (itemContent.includes(':')) {
          // Object item
          const objLines = [itemContent];
          let j = i + 1;
          
          // Collect indented lines for this object
          while (j < lines.length && (lines[j].startsWith('  ') || lines[j].trim() === '')) {
            if (lines[j].trim() !== '') {
              objLines.push(lines[j].substring(2)); // Remove 2-space indent
            }
            j++;
          }
          
          const objResult = this.parseObject(objLines, 0);
          arr.push(objResult.value);
          i = j;
        } else {
          // Simple item
          arr.push(this.parseValue(itemContent));
          i++;
        }
      } else if (line.includes(':')) {
        // End of array, start of next object property
        break;
      } else {
        i++;
      }
    }
    
    return { value: arr, endIndex: i };
  }

  // Parse individual value
  private static parseValue(value: string): any {
    const trimmed = value.trim();
    
    if (trimmed === 'null') return null;
    if (trimmed === 'true') return true;
    if (trimmed === 'false') return false;
    
    // Number check
    if (/^-?\d+$/.test(trimmed)) return parseInt(trimmed, 10);
    if (/^-?\d+\.\d+$/.test(trimmed)) return parseFloat(trimmed);
    
    // Quoted string
    if ((trimmed.startsWith('"') && trimmed.endsWith('"')) ||
        (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
      return trimmed.slice(1, -1);
    }
    
    return trimmed;
  }

  // Calculate approximate token savings
  private static calculateTokenSavings(original: string, converted: string): number {
    // Rough token estimation (assuming ~4 characters per token)
    const originalTokens = Math.ceil(original.length / 4);
    const convertedTokens = Math.ceil(converted.length / 4);
    return Math.max(0, originalTokens - convertedTokens);
  }

  // Validate JSON format
  static validateJson(jsonString: string): { isValid: boolean; error?: string } {
    try {
      JSON.parse(jsonString);
      return { isValid: true };
    } catch (error) {
      return {
        isValid: false,
        error: error instanceof Error ? error.message : 'Invalid JSON format'
      };
    }
  }

  // Validate TOON format (basic validation)
  static validateToon(toonString: string): { isValid: boolean; error?: string } {
    try {
      // Basic validation - try to parse
      this.decodeFromToon(toonString);
      return { isValid: true };
    } catch (error) {
      return {
        isValid: false,
        error: error instanceof Error ? error.message : 'Invalid TOON format'
      };
    }
  }

  // Format JSON with proper indentation
  static formatJson(jsonString: string): string {
    try {
      const parsed = JSON.parse(jsonString);
      return JSON.stringify(parsed, null, 2);
    } catch (error) {
      throw new Error('Cannot format invalid JSON');
    }
  }

  // Format TOON (basic formatting)
  static formatToon(toonString: string): string {
    try {
      const parsed = this.decodeFromToon(toonString);
      return this.encodeToToon(parsed);
    } catch (error) {
      throw new Error('Cannot format invalid TOON');
    }
  }
}
