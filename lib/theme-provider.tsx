'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { ColorPalette, ColorPaletteTheme } from '@/types';

type Theme = 'light' | 'dark' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  actualTheme: 'light' | 'dark';
  colorPalette: ColorPalette;
  setColorPalette: (palette: ColorPalette) => void;
};

const colorPalettes: Record<ColorPalette, ColorPaletteTheme> = {
  default: {
    name: 'Default',
    colors: {
      primary: '#222222',
      secondary: '#f1f5f9',
      accent: '#f1f5f9',
      background: '#ffffff',
      surface: '#ffffff',
    },
  },
  warm: {
    name: 'Warm Sunset',
    colors: {
      primary: '#E3D26F',
      secondary: '#CA895F',
      accent: '#fefae0',
      background: '#fefae0',
      surface: '#4E3822',
    },
  },
  nature: {
    name: 'Nature Green',
    colors: {
      primary: '#ccd5ae',
      secondary: '#e9edc9',
      accent: '#fefae0',
      background: '#fefae0',
      surface: '#d4a373',
    },
  },
};

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
  actualTheme: 'light',
  colorPalette: 'default',
  setColorPalette: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'toonlint-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');
  const [colorPalette, setColorPalette] = useState<ColorPalette>('default');

  useEffect(() => {
    // Load theme from localStorage
    const storedTheme = localStorage.getItem(storageKey) as Theme;
    const storedPalette = localStorage.getItem('toonlint-palette') as ColorPalette;
    
    if (storedTheme) {
      setTheme(storedTheme);
    }

    if (storedPalette && colorPalettes[storedPalette]) {
      setColorPalette(storedPalette);
    }
  }, [storageKey]);

  useEffect(() => {
    const root = window.document.documentElement;
    
    root.classList.remove('light', 'dark');
    
    let effectiveTheme: 'light' | 'dark';
    
    if (theme === 'system') {
      effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    } else {
      effectiveTheme = theme;
    }
    
    root.classList.add(effectiveTheme);
    setActualTheme(effectiveTheme);

    // Apply base theme colors - let CSS handle most of it, only override when needed
    const style = root.style;
    
    // Apply color palette overrides only for non-default palettes
    if (colorPalette !== 'default') {
      const palette = colorPalettes[colorPalette];
      style.setProperty('--accent', palette.colors.accent);
      // Only override primary color for non-default palettes
      style.setProperty('--primary', palette.colors.primary);
    } else {
      // Remove custom overrides for default palette
      style.removeProperty('--accent');
      style.removeProperty('--primary');
    }
  }, [theme, colorPalette]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
    actualTheme,
    colorPalette,
    setColorPalette: (newPalette: ColorPalette) => {
      localStorage.setItem('toonlint-palette', newPalette);
      setColorPalette(newPalette);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};

export { colorPalettes };

// Hook for checking online/offline status
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const updateNetworkStatus = () => setIsOnline(navigator.onLine);
    
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
    
    return () => {
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
    };
  }, []);

  return isOnline;
}
