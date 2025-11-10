'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Language } from '@/types';
import { getTranslation } from '@/lib/translations';
import { Home, ArrowLeft, Search, FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function NotFound() {
  const [language, setLanguage] = useState<Language>('en');
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleSearch = () => {
    if (searchTerm.trim()) {
      window.location.href = `/?search=${encodeURIComponent(searchTerm)}`;
    }
  };

  const popularPages = [
    { name: 'JSON to TOON Converter', href: '/', description: 'Convert JSON to TOON format online' },
    { name: 'TOON Format Guide', href: '/toon', description: 'Learn about TOON format specification' },
    { name: 'Features Overview', href: '/features', description: 'Explore all converter features' },
    { name: 'API Documentation', href: '/api', description: 'API integration guide' },
    { name: 'Contact Support', href: '/contact', description: 'Get help and support' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar language={language} onLanguageChange={handleLanguageChange} />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Hero Section */}
          <div className="mb-12">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <FileQuestion className="h-24 w-24 text-muted-foreground" />
                <div className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  !
                </div>
              </div>
            </div>
            
            <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Page Not Found</h2>
            <p className="text-lg text-muted-foreground mb-8">
              The page you're looking for doesn't exist or has been moved. 
              Let's help you find what you need.
            </p>
          </div>

          {/* Search Section */}
          <div className="mb-12">
            <h3 className="text-lg font-medium mb-4 text-foreground">Search for something specific:</h3>
            <div className="flex gap-2 max-w-md mx-auto">
              <Input
                type="text"
                placeholder="Search converter, features, API..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1"
              />
              <Button onClick={handleSearch} variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="default" className="flex items-center gap-2">
                <Link href="/">
                  <Home className="h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Button>
            </div>
          </div>

          {/* Popular Pages */}
          <div className="text-left">
            <h3 className="text-lg font-medium mb-6 text-center text-foreground">Popular Pages</h3>
            <div className="grid gap-4">
              {popularPages.map((page, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-accent transition-colors">
                  <Link href={page.href} className="block">
                    <h4 className="font-medium text-foreground mb-1">{page.name}</h4>
                    <p className="text-sm text-muted-foreground">{page.description}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-12 p-6 bg-muted/50 rounded-lg">
            <h3 className="text-lg font-medium mb-2 text-foreground">Still can't find what you're looking for?</h3>
            <p className="text-muted-foreground mb-4">
              Contact our support team or check our documentation for comprehensive help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild variant="outline">
                <Link href="/contact">Contact Support</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/toon">Documentation</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
