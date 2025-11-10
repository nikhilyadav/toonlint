'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Loader2, Maximize, Minimize, ArrowLeftRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ToonConverter } from '@/lib/toon-converter';
import { TokenCounter } from '@/lib/token-counter';
import { TokenProvider, DataFormat, Language } from '@/types';
import { getTranslation } from '@/lib/translations';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';

interface MainEditorProps {
  language: Language;
}

export function MainEditor({ language }: MainEditorProps) {
  const t = getTranslation(language);
  
  const [leftContent, setLeftContent] = useState('');
  const [rightContent, setRightContent] = useState('');
  const [leftFormat, setLeftFormat] = useState<DataFormat>('json');
  const [rightFormat, setRightFormat] = useState<DataFormat>('toon');
  const [tokenProvider, setTokenProvider] = useState<TokenProvider>('openai');
  const [isConverting, setIsConverting] = useState(false);
  const [leftTokens, setLeftTokens] = useState<number>(0);
  const [rightTokens, setRightTokens] = useState<number>(0);
  const [tokensSaved, setTokensSaved] = useState<number>(0);
  const [leftError, setLeftError] = useState<string | null>(null);
  const [rightError, setRightError] = useState<string | null>(null);
  const [leftFullscreen, setLeftFullscreen] = useState(false);
  const [rightFullscreen, setRightFullscreen] = useState(false);

  const sampleJson = `{
  "name": "Alice Johnson",
  "age": 30,
  "active": true,
  "score": 98.5,
  "email": "alice@example.com",
  "tags": ["developer", "toon", "efficient"],
  "preferences": {
    "theme": "dark",
    "language": "en",
    "notifications": true
  },
  "projects": [
    {
      "name": "ToonLint",
      "status": "active",
      "progress": 85
    },
    {
      "name": "DataConverter", 
      "status": "completed",
      "progress": 100
    }
  ]
}`;

  const sampleToon = `name: Alice Johnson
age: 30
active: true
score: 98.5
email: alice@example.com
tags[3]: developer,toon,efficient
preferences:
  theme: dark
  language: en
  notifications: true
projects[2]{name,progress,status}:
  ToonLint,85,active
  DataConverter,100,completed`;

  // Initialize with sample data
  useEffect(() => {
    setLeftContent(sampleJson);
    setRightContent(sampleToon);
  }, []);

  // Update token counts when content changes
  useEffect(() => {
    const updateTokenCounts = async () => {
      let leftCount = 0;
      let rightCount = 0;

      if (leftContent.trim()) {
        const leftTokenInfo = await TokenCounter.getTokenCount(leftContent, tokenProvider);
        leftCount = leftTokenInfo.count;
        setLeftTokens(leftCount);
      } else {
        setLeftTokens(0);
      }
      
      if (rightContent.trim()) {
        const rightTokenInfo = await TokenCounter.getTokenCount(rightContent, tokenProvider);
        rightCount = rightTokenInfo.count;
        setRightTokens(rightCount);
      } else {
        setRightTokens(0);
      }
      
      // Calculate tokens saved
      if (leftContent.trim() && rightContent.trim()) {
        if (leftFormat === 'json' && rightFormat === 'toon') {
          const savings = TokenCounter.calculateSavings(leftCount, rightCount);
          setTokensSaved(savings);
        } else if (leftFormat === 'toon' && rightFormat === 'json') {
          const savings = TokenCounter.calculateSavings(rightCount, leftCount);
          setTokensSaved(savings);
        } else {
          setTokensSaved(0);
        }
      } else {
        setTokensSaved(0);
      }
    };

        updateTokenCounts();
  }, [leftContent, rightContent, tokenProvider, leftFormat, rightFormat]);

  // Validation
  useEffect(() => {
    if (leftContent.trim()) {
      if (leftFormat === 'json') {
        const validation = ToonConverter.validateJson(leftContent);
        setLeftError(validation.isValid ? null : validation.error || 'Invalid JSON');
      } else {
        const validation = ToonConverter.validateToon(leftContent);
        setLeftError(validation.isValid ? null : validation.error || 'Invalid TOON');
      }
    } else {
      setLeftError(null);
    }

    if (rightContent.trim()) {
      if (rightFormat === 'json') {
        const validation = ToonConverter.validateJson(rightContent);
        setRightError(validation.isValid ? null : validation.error || 'Invalid JSON');
      } else {
        const validation = ToonConverter.validateToon(rightContent);
        setRightError(validation.isValid ? null : validation.error || 'Invalid TOON');
      }
    } else {
      setRightError(null);
    }
  }, [leftContent, rightContent, leftFormat, rightFormat]);

  const convertLeftToRight = useCallback(async () => {
    if (!leftContent.trim() || leftError) return;
    
    setIsConverting(true);
    
    try {
      let result;
      if (leftFormat === 'json' && rightFormat === 'toon') {
        result = ToonConverter.jsonToToon(leftContent);
      } else if (leftFormat === 'toon' && rightFormat === 'json') {
        result = ToonConverter.toonToJson(leftContent);
      }
      
      if (result?.success && result.data) {
        setRightContent(result.data);
        
        // Track successful conversion
        trackEvent.conversion(leftFormat, rightFormat, tokensSaved);
        
        // Track feature usage
        trackEvent.featureUsage('converter', `${leftFormat}_to_${rightFormat}`);
      }
    } catch (error) {
      console.error('Conversion error:', error);
      
      // Track conversion errors
      trackEvent.error(
        error instanceof Error ? error.message : 'Conversion failed',
        'conversion_error'
      );
    } finally {
      setIsConverting(false);
    }
  }, [leftContent, leftError, leftFormat, rightFormat, tokensSaved]);

  const swapContents = useCallback(() => {
    // Swap content
    const tempContent = leftContent;
    setLeftContent(rightContent);
    setRightContent(tempContent);
    
    // Swap formats
    const tempFormat = leftFormat;
    setLeftFormat(rightFormat);
    setRightFormat(tempFormat);
    
    // Track swap action
    trackEvent.featureUsage('swap_contents', 'button_click');
  }, [leftContent, rightContent, leftFormat, rightFormat]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 text-foreground">ToonLint</h1>
          <p className="text-muted-foreground">
            {t.jsonToToon}: Free JSON to TOON Online Converter, Validator and Formatter
          </p>
        </div>

        <div className="mb-4 flex items-center space-x-4">
          <label className="text-sm font-medium">{t.tokenProvider}:</label>
          <Select 
            value={tokenProvider} 
            onValueChange={(value) => {
              setTokenProvider(value as TokenProvider);
              // Track token provider change
              trackEvent.featureUsage('token_provider', `changed_to_${value}`);
            }}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="openai">OpenAI</SelectItem>
              <SelectItem value="claude">Claude</SelectItem>
              <SelectItem value="deepseek">DeepSeek</SelectItem>
              <SelectItem value="gemini">Gemini</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Dual Arrow Conversion Button - Above Boxes */}
        <div className="flex justify-center items-center space-x-4 mb-6">
          <Button
            onClick={convertLeftToRight}
            disabled={isConverting || !!leftError || !leftContent.trim()}
            size="lg"
            className="flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {isConverting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="font-medium">Converting...</span>
              </>
            ) : (
              <>
                <ArrowLeftRight className="h-5 w-5" />
                <span className="font-medium">
                  {leftFormat === 'json' && rightFormat === 'toon' 
                    ? 'Convert JSON ↔ TOON' 
                    : leftFormat === 'toon' && rightFormat === 'json'
                    ? 'Convert TOON ↔ JSON'
                    : 'Convert'}
                </span>
              </>
            )}
          </Button>
          
          <Button
            onClick={swapContents}
            variant="outline"
            size="lg"
            className="flex items-center space-x-2 border-2 border-gray-300 hover:border-gray-400 px-4 py-3 rounded-xl transition-all duration-200"
            title="Swap content between left and right panels"
          >
            <ArrowLeftRight className="h-4 w-4 rotate-90" />
            <span className="font-medium">Swap</span>
          </Button>
        </div>

        <div className={cn(
          "grid gap-6",
          leftFullscreen || rightFullscreen ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"
        )}>
          {/* Left Editor */}
          {(!rightFullscreen) && (
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-foreground">
                {leftFormat === 'json' ? t.jsonEditor : t.toonEditor}
              </h2>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setLeftFullscreen(!leftFullscreen);
                    setRightFullscreen(false);
                  }}
                  className="text-foreground"
                >
                  {leftFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                </Button>
                <Select value={leftFormat} onValueChange={(value) => setLeftFormat(value as DataFormat)}>
                  <SelectTrigger className="w-20 bg-background text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="json">JSON</SelectItem>
                    <SelectItem value="toon">TOON</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex-1 border rounded-lg">
              <textarea
                value={leftContent}
                onChange={(e) => setLeftContent(e.target.value)}
                className="w-full h-96 p-4 border-0 rounded-lg resize-none font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                placeholder={t.pasteText}
              />
            </div>
            
            {/* Left Status */}
            <div className="mt-2 flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <span className={cn(
                  "flex items-center space-x-1",
                  leftError ? "text-destructive" : "text-green-600"
                )}>
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    leftError ? "bg-destructive" : "bg-green-600"
                  )} />
                  <span>{leftError ? t.invalid : t.valid}</span>
                </span>
                
                <span className="text-muted-foreground">
                  {t.tokens}: {TokenCounter.formatTokenCount(leftTokens)}
                </span>
              </div>
            </div>

            {leftError && (
              <div className="mt-2 p-2 text-sm text-destructive bg-destructive/10 rounded">
                {leftError}
              </div>
            )}
          </div>
          )}

          {/* Right Editor */}
          {(!leftFullscreen) && (
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-foreground">
                {rightFormat === 'json' ? t.jsonEditor : t.toonEditor}
              </h2>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setRightFullscreen(!rightFullscreen);
                    setLeftFullscreen(false);
                  }}
                  className="text-foreground"
                >
                  {rightFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                </Button>
                <Select value={rightFormat} onValueChange={(value) => setRightFormat(value as DataFormat)}>
                  <SelectTrigger className="w-20 bg-background text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="json">JSON</SelectItem>
                    <SelectItem value="toon">TOON</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex-1 border rounded-lg">
              <textarea
                value={rightContent}
                onChange={(e) => setRightContent(e.target.value)}
                className="w-full h-96 p-4 border-0 rounded-lg resize-none font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                placeholder={t.pasteText}
              />
            </div>
            
            {/* Right Status */}
            <div className="mt-2 flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <span className={cn(
                  "flex items-center space-x-1",
                  rightError ? "text-destructive" : "text-green-600"
                )}>
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    rightError ? "bg-destructive" : "bg-green-600"
                  )} />
                  <span>{rightError ? t.invalid : t.valid}</span>
                </span>
                
                <span className="text-muted-foreground">
                  {t.tokens}: {TokenCounter.formatTokenCount(rightTokens)}
                </span>
              </div>
              
              {tokensSaved > 0 && (
                <span className="text-green-600 font-medium">
                  {t.tokensSaved}: {TokenCounter.formatTokenCount(tokensSaved)} tokens ({TokenCounter.getSavingsPercentage(leftTokens, rightTokens)}%)
                </span>
              )}
            </div>

            {rightError && (
              <div className="mt-2 p-2 text-sm text-destructive bg-destructive/10 rounded">
                {rightError}
              </div>
            )}
          </div>
          )}
        </div>
        
        {/* Footer */}
        <footer className="mt-16 border-t pt-8">
          <div className="text-center text-muted-foreground">
            <p className="mb-4">
              © 2024 ToonLint. Free JSON to TOON converter for optimizing LLM token usage.
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <a href="/toon" className="hover:text-primary transition-colors">TOON Format</a>
              <a href="/features" className="hover:text-primary transition-colors">Features</a>
              <a href="/api" className="hover:text-primary transition-colors">API</a>
              <a href="/contact" className="hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
