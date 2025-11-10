'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { MainEditor } from '@/components/main-editor';
import { Language } from '@/types';

export default function HomePage() {
  const [language, setLanguage] = useState<Language>('en');

  // Initialize language from localStorage or browser preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('toonlint-language') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0] as Language;
      const supportedLanguages: Language[] = ['en', 'ja', 'de', 'es', 'zh', 'ko', 'fr'];
      if (supportedLanguages.includes(browserLang)) {
        setLanguage(browserLang);
      }
    }
  }, []);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('toonlint-language', newLanguage);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar language={language} onLanguageChange={handleLanguageChange} />
      <MainEditor language={language} />
    </div>
  );
}
