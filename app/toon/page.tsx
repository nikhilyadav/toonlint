'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { Language } from '@/types';
import { getTranslation } from '@/lib/translations';

export default function ToonPage() {
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
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-6">
            TOON (Token-Oriented Object Notation)
          </h1>
          
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>Official TOON Format Specification:</strong> 
              <a 
                href="https://github.com/toon-format/toon" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-2 underline hover:text-blue-900 dark:hover:text-blue-100 transition-colors"
              >
                View on GitHub
              </a>
            </p>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mb-8">
            <p className="text-lg mb-0">
              TOON is a revolutionary data format designed specifically for AI and LLM optimization, 
              achieving 30-60% token reduction compared to JSON while maintaining full human readability.
            </p>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Why Choose TOON Format?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Dramatic Cost Savings</h3>
              <p>Reduce your LLM API expenses by 30-60% with efficient token usage. For applications using GPT-4 at $30 per million tokens, TOON conversion can save $14-18 per request, resulting in thousands of dollars saved monthly for high-volume applications.</p>
            </div>
            
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Enhanced Performance</h3>
              <p>Experience faster processing times and reduced latency. Fewer tokens mean quicker API responses, improved user experience, and more efficient resource utilization across your AI-powered applications.</p>
            </div>
            
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Better Context Utilization</h3>
              <p>Maximize your model's context window by fitting more meaningful data within token limits. This leads to richer context, better AI understanding, and more comprehensive responses from language models.</p>
            </div>
            
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Privacy-First Processing</h3>
              <p>All conversions happen locally in your browser with zero server communication. Your sensitive data never leaves your device, ensuring complete privacy and security for confidential information.</p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Token Efficient</h3>
              <p>Reduces token usage by 30-60% compared to JSON, directly saving on LLM API costs and improving response times.</p>
            </div>
            
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">📖 Human Readable</h3>
              <p>Uses indentation-based structure similar to YAML, making it easy to read and write manually.</p>
            </div>
            
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">🔧 Multiple Array Formats</h3>
              <p>Supports inline, tabular, and list-style array formats to optimize different data structures.</p>
            </div>
            
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">🛡️ Type Safe</h3>
              <p>Maintains type information and supports all JSON data types with proper validation.</p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Format Comparison</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">JSON Format</h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "name": "Alice Johnson",
  "age": 30,
  "active": true,
  "tags": ["developer", "toon", "efficient"],
  "preferences": {
    "theme": "dark",
    "language": "en"
  },
  "projects": [
    {
      "name": "ToonLint",
      "status": "active",
      "progress": 85
    }
  ]
}`}
              </pre>
              <p className="text-sm text-muted-foreground mt-2">Token count: ~45 tokens</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">TOON Format</h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`name: Alice Johnson
age: 30
active: true
tags[3]: developer,toon,efficient
preferences:
  theme: dark
  language: en
projects[1]{name,progress,status}:
  ToonLint,85,active`}
              </pre>
              <p className="text-sm text-green-600 mt-2">Token count: ~28 tokens (38% reduction)</p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Array Format Types</h2>

          <div className="space-y-6 mb-8">
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">1. Inline Arrays (Primitives)</h3>
              <p className="mb-3">Perfect for simple lists of strings, numbers, or booleans:</p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-2">JSON:</p>
                  <pre className="bg-muted p-3 rounded text-sm">{`"tags": ["red", "green", "blue"]`}</pre>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">TOON:</p>
                  <pre className="bg-muted p-3 rounded text-sm">{`tags[3]: red,green,blue`}</pre>
                </div>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">2. Tabular Arrays (Uniform Objects)</h3>
              <p className="mb-3">Highly efficient for arrays of objects with the same structure:</p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-2">JSON:</p>
                  <pre className="bg-muted p-3 rounded text-sm">{`"users": [
  {"name": "Alice", "age": 30},
  {"name": "Bob", "age": 25}
]`}</pre>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">TOON:</p>
                  <pre className="bg-muted p-3 rounded text-sm">{`users[2]{age,name}:
  30,Alice
  25,Bob`}</pre>
                </div>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">3. List-Style Arrays (Mixed/Nested)</h3>
              <p className="mb-3">For complex arrays with different object structures:</p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-2">JSON:</p>
                  <pre className="bg-muted p-3 rounded text-sm">{`"items": [
  {"type": "book", "title": "Guide"},
  {"type": "video", "duration": 120}
]`}</pre>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">TOON:</p>
                  <pre className="bg-muted p-3 rounded text-sm">{`items[2]:
  - type: book
    title: Guide
  - type: video
    duration: 120`}</pre>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Automatic Quoting Rules</h2>

          <p className="mb-4">
            TOON automatically quotes strings only when necessary, reducing visual clutter and token count:
          </p>

          <ul className="list-disc list-inside space-y-2 mb-6 ml-4">
            <li>Simple words and identifiers don't need quotes: <code>name: Alice</code></li>
            <li>Strings with spaces are quoted: <code>title: "Hello World"</code></li>
            <li>Number-like strings are quoted: <code>id: "123"</code></li>
            <li>Reserved words are quoted: <code>status: "null"</code></li>
            <li>Special characters trigger quoting: <code>path: "/home/user"</code></li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Why Use TOON?</h2>

          <div className="space-y-4 mb-8">
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Cost Savings</h3>
              <p>
                With LLM APIs charging per token, 30-60% reduction directly translates to significant cost savings, 
                especially for applications processing large datasets or high-volume requests.
              </p>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">⚡ Faster Processing</h3>
              <p>
                Fewer tokens mean faster processing times, lower latency, and better user experience. 
                This is especially important for real-time applications and interactive AI features.
              </p>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Better Context Utilization</h3>
              <p>
                With reduced token usage, you can fit more relevant context within model limits, 
                leading to better AI responses and more comprehensive data processing.
              </p>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">🔄 Bidirectional Conversion</h3>
              <p>
                Perfect compatibility with existing JSON workflows. Convert to TOON for AI processing, 
                then back to JSON for traditional applications seamlessly.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Use Cases</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">🤖 AI/LLM Integration</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Prompt optimization</li>
                <li>Training data preparation</li>
                <li>API request optimization</li>
                <li>Context window maximization</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">💻 Development</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Configuration files</li>
                <li>Data serialization</li>
                <li>API optimization</li>
                <li>Log format optimization</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">📊 Data Processing</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Large dataset optimization</li>
                <li>ETL pipeline efficiency</li>
                <li>Stream processing</li>
                <li>Data warehouse optimization</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">🌐 Web Applications</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>API response optimization</li>
                <li>Real-time data streaming</li>
                <li>Progressive web apps</li>
                <li>Mobile app optimization</li>
              </ul>
            </div>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Get Started Today</h3>
            <p className="mb-4">
              Ready to optimize your data for AI? Try our free online converter to see the immediate benefits 
              of TOON format for your specific use cases.
            </p>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Convert JSON to TOON Now →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
