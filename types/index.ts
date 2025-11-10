export type Language = 'en' | 'ja' | 'de' | 'es' | 'zh' | 'ko' | 'fr';

export type TokenProvider = 'openai' | 'claude' | 'deepseek' | 'gemini';

export type ViewMode = 'text' | 'tree' | 'table';

export type DataFormat = 'json' | 'toon';

export type ColorPalette = 'default' | 'warm' | 'nature';

export interface ColorPaletteTheme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
  };
}

export interface TokenInfo {
  count: number;
  provider: TokenProvider;
}

export interface EditorData {
  content: string;
  format: DataFormat;
  isValid: boolean;
  error?: string;
  tokens?: TokenInfo;
}

export interface ConversionResult {
  success: boolean;
  data?: string;
  error?: string;
  tokensSaved?: number;
}

export interface LanguageStrings {
  // Navigation
  jsonToToon: string;
  toon: string;
  features: string;
  api: string;
  contactUs: string;
  language: string;
  theme: string;
  online: string;
  offline: string;

  // Main Interface
  jsonEditor: string;
  toonEditor: string;
  convertToToon: string;
  convertToJson: string;
  format: string;
  find: string;
  viewAsText: string;
  viewAsTree: string;
  viewAsTable: string;
  tokens: string;
  tokensSaved: string;
  
  // File operations
  dropFile: string;
  pasteText: string;
  loadFromUrl: string;
  selectFile: string;
  enterUrl: string;
  load: string;
  
  // Validation
  valid: string;
  invalid: string;
  error: string;
  
  // Contact form
  name: string;
  email: string;
  description: string;
  submit: string;
  messageSent: string;
  
  // Token providers
  tokenProvider: string;
  
  // Errors
  invalidJson: string;
  invalidToon: string;
  conversionError: string;
  fileError: string;
  urlError: string;
  fileSizeError: string;
}

export interface Translations {
  [key: string]: LanguageStrings;
}
