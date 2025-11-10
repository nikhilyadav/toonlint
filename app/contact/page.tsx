'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Language } from '@/types';
import { getTranslation } from '@/lib/translations';
import { Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [language, setLanguage] = useState<Language>('en');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (replace with actual submission logic)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', description: '' });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const t = getTranslation(language);

  return (
    <div className="min-h-screen bg-background">
      <Navbar language={language} onLanguageChange={handleLanguageChange} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              {t.contactUs}
            </h1>
            <p className="text-xl text-muted-foreground">
              Have questions, feedback, or suggestions? We'd love to hear from you!
            </p>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card border rounded-lg p-6 text-center">
              <Mail className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Email Support</h3>
              <p className="text-muted-foreground mb-3">
                Get in touch with our team for technical support and inquiries.
              </p>
              <a 
                href="mailto:support@toonlint.com" 
                className="text-primary hover:underline"
              >
                support@toonlint.com
              </a>
            </div>
            
            <div className="bg-card border rounded-lg p-6 text-center">
              <MessageSquare className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">General Inquiries</h3>
              <p className="text-muted-foreground mb-3">
                Questions about TOON format, partnerships, or collaboration opportunities.
              </p>
              <a 
                href="mailto:support@toonlint.com"
                className="text-primary hover:underline"
              >
                support@toonlint.com
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card border rounded-lg p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold mb-2">Send us a Message</h2>
              <p className="text-muted-foreground">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>

            {isSubmitted && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <p className="text-green-800 dark:text-green-200 font-medium">
                    {t.messageSent}
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    {t.name} *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your full name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    {t.email} *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  {t.description} *
                </label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  placeholder="Tell us about your question, feedback, or how we can help you..."
                />
              </div>

              <div className="flex justify-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-w-32"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      {t.submit}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* FAQ Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">
                  What is TOON format and how does it save tokens?
                </h3>
                <p className="text-muted-foreground">
                  TOON (Token-Oriented Object Notation) is a data format specifically designed for AI and LLM optimization. 
                  It reduces token usage by 30-60% compared to JSON through optimized syntax, smart quoting rules, 
                  and efficient array representations while maintaining full human readability.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">
                  Is ToonLint free to use?
                </h3>
                <p className="text-muted-foreground">
                  Yes! ToonLint is completely free to use with no registration required. All processing happens 
                  client-side in your browser, ensuring privacy and unlimited usage. We plan to offer additional 
                  API services for developers in the future.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">
                  How accurate is the token counting for different AI providers?
                </h3>
                <p className="text-muted-foreground">
                  Our token counting uses approximation algorithms based on each provider's documented tokenization 
                  methods. While not 100% exact, the estimates are typically within 5-10% of actual counts and 
                  provide reliable comparisons for optimization purposes.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">
                  Can I use ToonLint for commercial projects?
                </h3>
                <p className="text-muted-foreground">
                  Absolutely! ToonLint is free for both personal and commercial use. The TOON format itself is 
                  open and can be implemented in any project. We encourage its adoption for AI optimization workflows.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">
                  When will the API be available?
                </h3>
                <p className="text-muted-foreground">
                  We're actively developing the ToonLint API for programmatic access. Sign up for our newsletter 
                  on the API page to be notified when it launches. We expect to release it in the coming months 
                  with comprehensive documentation and examples.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="mt-8 text-center">
            <h3 className="text-lg font-semibold mb-4">
              Looking for more information?
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/toon"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Learn About TOON Format
              </a>
              <a
                href="/features"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Explore Features
              </a>
              <a
                href="/"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Try the Converter
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
