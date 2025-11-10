'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun, Globe, Monitor, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTheme, useNetworkStatus, colorPalettes } from '@/lib/theme-provider';
import { Language, ColorPalette } from '@/types';
import { getTranslation, getLanguageLabel } from '@/lib/translations';
import { cn } from '@/lib/utils';

interface NavbarProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
}

export function Navbar({ language, onLanguageChange }: NavbarProps) {
  const { theme, setTheme, actualTheme, colorPalette, setColorPalette } = useTheme();
  const isOnline = useNetworkStatus();
  const pathname = usePathname();
  const t = getTranslation(language);

  const navigation = [
    { name: t.jsonToToon, href: '/' },
    { name: t.toon, href: '/toon' },
    { name: t.features, href: '/features' },
    { name: t.api, href: '/api' },
    { name: t.contactUs, href: '/contact' },
  ];

  const languages: Language[] = ['en', 'ja', 'de', 'es', 'zh', 'ko', 'fr'];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left side navigation */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-foreground">
              ToonLint
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <Select value={language} onValueChange={onLanguageChange}>
              <SelectTrigger className="w-[160px] bg-background text-foreground">
                <Globe className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                {languages.map((lang) => (
                  <SelectItem key={lang} value={lang} className="text-foreground hover:bg-accent">
                    {getLanguageLabel(lang)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Color Palette Selector */}
            <Select value={colorPalette} onValueChange={setColorPalette}>
              <SelectTrigger className="w-[140px] bg-background text-foreground">
                <Palette className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                {(Object.keys(colorPalettes) as ColorPalette[]).map((palette) => (
                  <SelectItem key={palette} value={palette} className="text-foreground hover:bg-accent">
                    {colorPalettes[palette].name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Theme Toggle */}
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4 text-foreground" />
              <Switch
                checked={actualTheme === 'dark'}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
              />
              <Moon className="h-4 w-4 text-foreground" />
            </div>

            {/* Online/Offline Status */}
            <div className="flex items-center space-x-2">
              <div
                className={cn(
                  "h-2 w-2 rounded-full",
                  isOnline ? "bg-green-500 animate-pulse" : "bg-red-500"
                )}
              />
              <span className="text-xs text-muted-foreground">
                {isOnline ? t.online : t.offline}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t px-4 py-2 bg-background">
        <div className="flex flex-wrap gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
