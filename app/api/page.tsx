'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { Language } from '@/types';
import { getTranslation } from '@/lib/translations';
import { Code, Zap, Shield, Globe2, CheckCircle, Clock } from 'lucide-react';

export default function ApiPage() {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('toonlint-language') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('toonlint-language', newLanguage);
  };

  const t = getTranslation(language);

  return (
    <div className="min-h-screen bg-background">
      <Navbar language={language} onLanguageChange={handleLanguageChange} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 px-4 py-2 rounded-full inline-flex items-center space-x-2 mb-6">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">Coming Soon</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">
              ToonLint API
            </h1>
            <p className="text-xl text-muted-foreground">
              Programmatic access to TOON conversion, validation, and optimization services
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-card border rounded-lg p-8 mb-8">
            <div className="text-center mb-8">
              <Code className="h-16 w-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-4">
                Developer API in Development
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We're building a comprehensive REST API that will allow developers to integrate 
                TOON conversion capabilities directly into their applications, workflows, and services.
              </p>
            </div>

            {/* Planned Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-3">Planned Features</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">JSON to TOON Conversion</p>
                      <p className="text-sm text-muted-foreground">High-performance conversion with optimization settings</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">TOON to JSON Conversion</p>
                      <p className="text-sm text-muted-foreground">Reverse conversion with full data integrity</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Batch Processing</p>
                      <p className="text-sm text-muted-foreground">Process multiple files or datasets in a single request</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Format Validation</p>
                      <p className="text-sm text-muted-foreground">Comprehensive validation for both JSON and TOON formats</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-3">⚡ Advanced Capabilities</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Token Counting</p>
                      <p className="text-sm text-muted-foreground">Multi-provider token analysis (OpenAI, Claude, etc.)</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Optimization Analytics</p>
                      <p className="text-sm text-muted-foreground">Detailed metrics on token savings and efficiency gains</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Custom Formatting Options</p>
                      <p className="text-sm text-muted-foreground">Configurable output formatting and optimization levels</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Webhook Support</p>
                      <p className="text-sm text-muted-foreground">Real-time notifications for batch processing completion</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* API Preview */}
            <div className="bg-muted rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4">API Preview</h3>
              <p className="text-sm text-muted-foreground mb-4">Here's a preview of what the API endpoints might look like:</p>
              
              <div className="space-y-4">
                <div className="bg-background border rounded p-4">
                  <code className="text-sm">
                    <span className="text-blue-600">POST</span> /api/v1/convert/json-to-toon
                  </code>
                  <p className="text-xs text-muted-foreground mt-1">Convert JSON data to TOON format</p>
                </div>
                
                <div className="bg-background border rounded p-4">
                  <code className="text-sm">
                    <span className="text-green-600">GET</span> /api/v1/analyze/tokens
                  </code>
                  <p className="text-xs text-muted-foreground mt-1">Get token count and optimization metrics</p>
                </div>
                
                <div className="bg-background border rounded p-4">
                  <code className="text-sm">
                    <span className="text-purple-600">POST</span> /api/v1/validate
                  </code>
                  <p className="text-xs text-muted-foreground mt-1">Validate JSON or TOON format</p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4">
                <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">High Performance</h3>
                <p className="text-sm text-muted-foreground">
                  Optimized for speed with low latency and high throughput
                </p>
              </div>
              
              <div className="text-center p-4">
                <Shield className="h-8 w-8 text-green-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Secure & Reliable</h3>
                <p className="text-sm text-muted-foreground">
                  Enterprise-grade security with 99.9% uptime guarantee
                </p>
              </div>
              
              <div className="text-center p-4">
                <Globe2 className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Global CDN</h3>
                <p className="text-sm text-muted-foreground">
                  Worldwide edge locations for minimal latency
                </p>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Be the First to Know</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Want to be notified when the ToonLint API launches? Sign up for our developer newsletter 
              to get early access, documentation, and integration examples.
            </p>
            
            <form className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-2 rounded-md border border-input bg-background"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  Notify Me
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                We'll only send you updates about the API launch. No spam, unsubscribe anytime.
              </p>
            </form>
          </div>

          {/* Current Alternative */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              In the meantime, you can use our web-based converter for all your TOON conversion needs:
            </p>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Try the Web Converter →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
