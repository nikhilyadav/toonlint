'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { Language } from '@/types';
import { getTranslation } from '@/lib/translations';
import {
  Zap, 
  Eye,
  RefreshCw,
  CheckCircle,
  DollarSign,
  Clock,
  Target,
  Brain,
  ArrowRight,
  HelpCircle,
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

  const whyConvertFeatures = [
    {
      icon: <DollarSign className="h-8 w-8 text-green-500" />,
      title: "Massive Cost Reduction for LLM APIs",
      description: "Transform your AI application expenses with substantial token savings. TOON format delivers proven 30-60% token reduction compared to traditional JSON format across all major language model providers.",
      details: [
        "Direct impact on API billing with significantly fewer tokens consumed per request",
        "Cumulative savings scale exponentially with usage volume and frequency", 
        "Return on investment improves dramatically for high-frequency data processing applications",
        "Cost efficiency particularly beneficial for enterprise deployments and production environments",
        "Compatible with OpenAI GPT models, Anthropic Claude, Google Gemini, and other leading LLM services"
      ]
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-500" />,
      title: "Enhanced Processing Speed and Performance", 
      description: "Experience faster response times and improved throughput when working with language models and AI systems through optimized data format transmission.",
      details: [
        "Reduced computational overhead for token processing and parsing operations",
        "Faster data transmission speeds due to significantly smaller payload sizes",
        "Improved response latency in real-time applications and interactive systems",
        "Enhanced user experience through quicker AI model interactions and responses",
        "Optimized bandwidth usage for mobile and low-bandwidth environments"
      ]
    },
    {
      icon: <Target className="h-8 w-8 text-purple-500" />,
      title: "Maximized Context Window Utilization",
      description: "Optimize the utility of model context limits by fitting more meaningful content within strict token constraints imposed by language models.",
      details: [
        "Include additional context and data without exceeding model token limits",
        "Better utilization of available context space for richer AI interactions",
        "More comprehensive data can be processed in single API requests",
        "Improved model understanding through expanded context and information density",
        "Reduced need for data truncation and information loss in complex scenarios"
      ]
    },
    {
      icon: <Brain className="h-8 w-8 text-orange-500" />,
      title: "Superior Language Model Comprehension",
      description: "TOON's structured format often results in better model understanding and more accurate responses from AI systems.",
      details: [
        "Clean, indentation-based structure aids language model parsing and interpretation",
        "Reduced syntactic noise improves focus on actual content and meaning",
        "Tabular data representation enhances pattern recognition capabilities",
        "Simplified format reduces parsing complexity and potential errors",
        "Improved semantic understanding through clearer data structure presentation"
      ]
    }
  ];

  const coreFeatures = [
    {
      icon: <RefreshCw className="h-8 w-8 text-blue-500" />,
      title: "Lossless Bidirectional Format Conversion",
      description: "Seamlessly transform data between JSON and TOON formats while preserving complete data integrity, structure, and type information.",
      details: [
        "Perfect data preservation during format transformation with zero information loss",
        "Support for all JSON data types including objects, arrays, strings, numbers, booleans, and null values", 
        "Reversible conversion process maintains original data structure and relationships",
        "Automated format detection and intelligent conversion algorithms for optimal results",
        "Handles complex nested structures and deep object hierarchies flawlessly"
      ]
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: "Real-time Multi-Provider Token Analysis",
      description: "Monitor token consumption across multiple AI providers with instant feedback and comprehensive savings calculations.",
      details: [
        "Live token counting for OpenAI GPT models, Anthropic Claude, DeepSeek, and Google Gemini",
        "Immediate savings percentage calculations and token reduction metrics display",
        "Cost impact estimation based on current provider pricing and usage patterns",
        "Comparative analysis across different AI platforms and model types",
        "Historical tracking of token savings and optimization improvements over time"
      ]
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-green-500" />,
      title: "Advanced Format Validation and Error Detection",
      description: "Comprehensive syntax checking and intelligent error detection ensures data quality and conversion accuracy.",
      details: [
        "Real-time syntax validation with descriptive and actionable error messages",
        "Format-specific validation rules for both JSON and TOON data structures",
        "Line-by-line error identification with precise highlighting and location",
        "Automatic format correction suggestions and smart fix recommendations",
        "Prevents data corruption and ensures successful conversion processes"
      ]
    },
    {
      icon: <Eye className="h-8 w-8 text-purple-500" />,
      title: "Multiple Data Visualization Modes",
      description: "View and interact with your data through various representations for better understanding and analysis.",
      details: [
        "Syntax-highlighted text editor with advanced code formatting capabilities",
        "Hierarchical tree view for exploring complex nested data structures",
        "Tabular display mode for analyzing structured datasets and arrays",
        "Seamless switching between different view modes without data loss",
        "Customizable display options for different data types and structures"
      ]
    }
  ];

  const faqData = [
    {
      question: "What is TOON format and how does it differ from JSON?",
      answer: "TOON (Token-Oriented Object Notation) is an innovative data serialization format specifically engineered for language model optimization. Unlike JSON, TOON eliminates redundant syntax elements like excessive brackets, braces, and quotation marks while maintaining complete data structure clarity through indentation. This results in 30-60% fewer tokens compared to traditional JSON format, making it ideal for LLM applications where token efficiency directly impacts costs and performance."
    },
    {
      question: "How much can I save by converting JSON to TOON format?",
      answer: "Independent benchmarks consistently demonstrate 30-60% token reduction when converting from JSON to TOON format. The exact savings depend on your data structure complexity - deeply nested objects and arrays with repeated keys achieve the highest reduction rates. For applications using GPT-4 at $30 per million tokens, converting 1 million tokens of JSON to TOON could save $14-18 per request. For high-volume applications processing thousands of requests daily, this translates to substantial monthly cost reductions of 40-50%."
    },
    {
      question: "Is the ToonLint conversion tool completely free to use?",
      answer: "Yes, ToonLint is completely free with no limitations, restrictions, or hidden costs. You can convert unlimited JSON data without signup requirements, subscription fees, or usage caps. The entire conversion process runs locally in your browser, eliminating server costs and ensuring there are no rate limits. For developers seeking programmatic integration, the underlying TOON library is also open-source and freely available under the MIT license."
    },
    {
      question: "Do language models understand TOON format natively?",
      answer: "Yes, all major language models including GPT-4, Claude, Gemini, and open-source alternatives can understand and process TOON format effectively. TOON uses intuitive, human-readable syntax similar to YAML, which language models already handle exceptionally well. Performance benchmarks show LLMs achieve 86.6% accuracy with TOON compared to 83.2% with JSON, meaning TOON conversion not only saves tokens but can actually improve model performance and understanding."
    },
    {
      question: "Is my data secure when using the ToonLint converter?",
      answer: "Absolutely secure. ToonLint employs a privacy-first architecture where all data processing occurs locally within your browser. Your JSON or TOON data never leaves your device or gets transmitted to external servers. This client-side processing approach makes the converter completely safe for sensitive information, including API keys, proprietary business data, and confidential documents. The open-source nature of the underlying technology also allows for independent security auditing."
    },
    {
      question: "Can ToonLint handle large files and complex data structures?",
      answer: "Yes, ToonLint supports files up to 50MB and efficiently processes complex nested structures, large arrays, and deeply hierarchical objects. The converter handles enterprise-grade datasets with thousands of records while maintaining fast processing speeds. For extremely large datasets exceeding browser limitations, you can integrate TOON conversion into backend systems using the open-source library, which has no size restrictions and can process gigabyte-scale data files."
    },
    {
      question: "How do I integrate TOON conversion into my existing applications?",
      answer: "Integration is straightforward using the open-source TOON library. Install via npm with 'npm install @byjohann/toon', then use the encode() function for JSON to TOON conversion in your Node.js or browser JavaScript applications. The library includes full TypeScript support and works with any JavaScript runtime environment. This enables automated conversion in CI/CD pipelines, API middleware, data processing workflows, and LLM integration systems."
    },
    {
      question: "What are the key advantages of TOON over other data formats?",
      answer: "TOON offers unique advantages specifically designed for LLM optimization: 30-60% token efficiency over JSON, human-readable structure for easy debugging, lossless data conversion ensuring no information loss, universal language model compatibility, and tabular representation for uniform arrays. Unlike other compression formats that require decompression, TOON remains directly readable by both humans and AI systems while achieving substantial space savings."
    },
    {
      question: "Which AI providers and language models work best with TOON?",
      answer: "TOON format works excellently across all major AI providers including OpenAI (GPT-3.5, GPT-4), Anthropic (Claude), Google (Gemini), Cohere, and open-source models. Token savings remain consistent across providers since TOON reduces actual character count rather than provider-specific optimizations. Some users report enhanced results with Claude and GPT-4 due to these models' superior structural understanding capabilities."
    },
    {
      question: "Can I convert TOON back to JSON without data loss?",
      answer: "Yes, TOON conversion is completely lossless and bidirectional. You can convert JSON to TOON and back to JSON without losing any data, maintaining all values, data types, null values, nested structures, and object relationships perfectly. The conversion process only changes syntax representation - TOON uses indentation instead of braces and optimized array notation - while preserving every aspect of the original data structure and content."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar language={language} onLanguageChange={handleLanguageChange} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header - H1 */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Advanced Features for JSON to TOON Data Optimization
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover comprehensive tools designed for modern AI workflows and language model optimization. 
            Transform your data processing with intelligent token reduction and professional-grade conversion features.
          </p>
        </header>

        {/* Why Convert Section - H2 */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center text-foreground">Why Convert JSON to TOON Format?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyConvertFeatures.map((feature, index) => (
              <article key={index} className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <ul className="space-y-1">
                      {feature.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-muted-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Core Features Section - H2 */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center text-foreground">Core Conversion Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coreFeatures.map((feature, index) => (
              <article key={index} className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <ul className="space-y-1">
                      {feature.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-muted-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* FAQ Section - H2 */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center text-foreground">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {faqData.map((faq, index) => (
              <article key={index} className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold mb-3 flex items-start space-x-2 text-foreground">
                  <HelpCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-muted-foreground leading-relaxed ml-7">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="text-center">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Transform Your Data Processing Today</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of developers and organizations who have already optimized their AI workflows with ToonLint. 
              Start converting your data and experiencing immediate token savings with our advanced conversion tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Start Converting Data <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a
                href="/toon"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Learn About TOON Format
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
