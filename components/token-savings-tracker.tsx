'use client';

import React, { useEffect, useState } from 'react';
import { TrendingDown, Coins } from 'lucide-react';

interface TokenSavings {
  totalSavings: number;
  conversions: number;
  lastSaving: number;
  timestamp: string;
}

export function TokenSavingsTracker() {
  const [savings, setSavings] = useState<TokenSavings>({
    totalSavings: 0,
    conversions: 0,
    lastSaving: 0,
    timestamp: ''
  });

  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    // Load savings from localStorage
    const savedData = localStorage.getItem('toonlint-token-savings');
    if (savedData) {
      setSavings(JSON.parse(savedData));
    }

    // Listen for conversion events
    const handleConversion = (event: CustomEvent) => {
      const tokensSaved = event.detail.tokensSaved;
      if (tokensSaved > 0) {
        const newSavings = {
          totalSavings: savings.totalSavings + tokensSaved,
          conversions: savings.conversions + 1,
          lastSaving: tokensSaved,
          timestamp: new Date().toISOString()
        };
        
        setSavings(newSavings);
        localStorage.setItem('toonlint-token-savings', JSON.stringify(newSavings));
        
        // Show update animation
        setShowUpdate(true);
        setTimeout(() => setShowUpdate(false), 2000);
      }
    };

    window.addEventListener('toonConversion' as any, handleConversion);
    return () => window.removeEventListener('toonConversion' as any, handleConversion);
  }, [savings.totalSavings, savings.conversions]);

  if (savings.totalSavings === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div 
        className={`bg-card border rounded-lg p-3 shadow-lg transition-all duration-500 ${
          showUpdate ? 'scale-110 bg-green-50 dark:bg-green-900/20' : ''
        }`}
        style={{ backgroundColor: 'hsl(var(--card))' }}
      >
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1">
            <TrendingDown className="w-4 h-4 text-green-600" />
            <Coins className="w-4 h-4" style={{ color: 'var(--character-color)' }} />
          </div>
          <div className="flex flex-col">
            <div className="font-semibold text-foreground">
              {savings.totalSavings.toLocaleString()} tokens saved
            </div>
            <div className="text-xs text-muted-foreground">
              {savings.conversions} conversions
              {showUpdate && (
                <span className="ml-2 text-green-600 font-medium">
                  +{savings.lastSaving}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
