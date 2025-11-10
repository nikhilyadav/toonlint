'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { Language } from '@/types';
import { getTranslation } from '@/lib/translations';
import { 
  Zap, 
  Shield, 
  Globe, 
  FileText, 
  Upload, 
  Link as LinkIcon, 
  Search, 
  Format, 
  Eye,
  Smartphone,
  Download,
  Palette,
  Wifi,
  Code,
  BarChart3,
  RefreshCw,
  CheckCircle
} from 'lucide-react';

export default function FeaturesPage() {
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

  const coreFeatures = [
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: "Token Optimization",
      description: "Achieve 30-60% token reduction compared to JSON, saving costs and improving performance.",
      details: [
        "Real-time token counting for multiple AI providers",
        "Instant savings calculation",
        "Cost estimation for different LLM services",
        "Provider comparison (OpenAI, Claude, DeepSeek, Gemini)"
      ]
    },
    {
      icon: <RefreshCw className="h-8 w-8 text-blue-500" />,
      title: "Bidirectional Conversion",
      description: "Seamlessly convert between JSON and TOON formats with full data integrity.",
      details: [
        "JSON to TOON conversion with format optimization",
        "TOON to JSON conversion with structure preservation",
        "Automatic format detection and validation",
        "Lossless conversion maintaining all data types"
      ]
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-green-500" />,
      title: "Real-time Validation",
      description: "Instant validation and error detection for both JSON and TOON formats.",
      details: [
        "Syntax highlighting and error detection",
        "Detailed error messages with line numbers",
        "Format-specific validation rules",
        "Visual indicators for valid/invalid content"
      ]
    },
    {
      icon: <Eye className="h-8 w-8 text-purple-500" />,
      title: "Multiple View Modes",
      description: "View your data in text, tree, or table format for better understanding.",
      details: [
        "Text mode with syntax highlighting",
        "Tree view for hierarchical data exploration",
        "Table view for structured data analysis",
        "Seamless switching between view modes"
      ]
    }
  ];

  const editorFeatures = [
    {
      icon: <FileText className="h-8 w-8 text-indigo-500" />,
      title: "Advanced Code Editor",
      description: "Monaco Editor with syntax highlighting, auto-completion, and error detection.",
    },
    {
      icon: <Format className="h-8 w-8 text-teal-500" />,
      title: "Smart Formatting",
      description: "Automatic code formatting with proper indentation and structure optimization.",
    },
    {
      icon: <Search className="h-8 w-8 text-orange-500" />,
      title: "Find & Replace",
      description: "Powerful search functionality to quickly locate and modify specific content.",
    },
    {
      icon: <Upload className="h-8 w-8 text-pink-500" />,
      title: "File Upload Support",
      description: "Drag-and-drop file uploads with support for JSON, TOON, and text files (up to 50MB).",
    },
    {
      icon: <LinkIcon className="h-8 w-8 text-cyan-500" />,
      title: "URL Loading",
      description: "Load data directly from URLs for quick processing of remote JSON/TOON files.",
    },
    {
      icon: <Download className="h-8 w-8 text-emerald-500" />,
      title: "Export Options",
      description: "Download converted files or copy formatted content to clipboard.",
    }
  ];

  const interfaceFeatures = [
    {
      icon: <Globe className="h-8 w-8 text-blue-600" />,
      title: "Multi-language Support",
      description: "Full internationalization with support for 7 languages including English, Japanese, German, Spanish, Mandarin, Korean, and French.",
    },
    {
      icon: <Palette className="h-8 w-8 text-violet-500" />,
      title: "Theme Support",
      description: "Dark and light themes with automatic detection based on system preferences and time.",
    },
    {
      icon: <Smartphone className="h-8 w-8 text-rose-500" />,
      title: "Responsive Design",
      description: "Optimized for all devices - desktop, tablet, and mobile with adaptive layouts.",
    },
    {
      icon: <Wifi className="h-8 w-8 text-amber-500" />,
      title: "Network Status",
      description: "Real-time network connectivity indicator to ensure reliable file operations.",
    }
  ];

  const technicalFeatures = [
    {
      icon: <Code className="h-8 w-8 text-slate-500" />,
      title: "Developer Friendly",
      description: "Clean, intuitive interface designed for developers with keyboard shortcuts and efficient workflows.",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-lime-500" />,
      title: "Performance Metrics",
      description: "Real-time performance indicators including token counts, savings calculations, and conversion statistics.",
    },
    {
      icon: <Shield className="h-8 w-8 text-red-500" />,
      title: "Privacy First",
      description: "Client-side processing ensures your data never leaves your browser. No server uploads or storage.",
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar language={language} onLanguageChange={handleLanguageChange} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Powerful Features for Data Optimization
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            ToonLint provides a comprehensive suite of tools for converting, validating, and optimizing 
            your data formats. Built for developers, optimized for AI workflows.
          </p>
        </div>

        {/* Core Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coreFeatures.map((feature, index) => (
              <div key={index} className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <ul className="space-y-1">
                      {feature.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Editor Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Editor Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {editorFeatures.map((feature, index) => (
              <div key={index} className="bg-card border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Interface Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">User Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {interfaceFeatures.map((feature, index) => (
              <div key={index} className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Technical Excellence</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {technicalFeatures.map((feature, index) => (
              <div key={index} className="bg-card border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Why Choose ToonLint?</h2>
          <div className="bg-card border rounded-lg p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-green-600">✅ ToonLint Advantages</h3>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>30-60% token reduction</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Real-time validation and error detection</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Multiple AI provider token counting</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Advanced code editor with Monaco</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Multiple view modes (text, tree, table)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>File upload and URL loading</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Multi-language support (7 languages)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Client-side processing (privacy-first)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Free to use with no limits</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 text-muted-foreground">Other Tools</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center space-x-2">
                    <span className="h-4 w-4 text-center">❌</span>
                    <span>No token optimization</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="h-4 w-4 text-center">❌</span>
                    <span>Basic validation only</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="h-4 w-4 text-center">❌</span>
                    <span>Single provider token counting</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="h-4 w-4 text-center">❌</span>
                    <span>Simple text areas</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="h-4 w-4 text-center">❌</span>
                    <span>Text view only</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="h-4 w-4 text-center">❌</span>
                    <span>Copy-paste only</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="h-4 w-4 text-center">❌</span>
                    <span>English only</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="h-4 w-4 text-center">❌</span>
                    <span>Server-side processing</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="h-4 w-4 text-center">❌</span>
                    <span>Limited free usage</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Ready to Optimize Your Data?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Experience the power of TOON format with our comprehensive online converter. 
              Start saving tokens and costs today with no registration required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Try the Converter →
              </a>
              <a
                href="/toon"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Learn About TOON
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
