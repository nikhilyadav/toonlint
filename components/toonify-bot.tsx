'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, ArrowLeft, Zap, Sparkles } from 'lucide-react';

interface ToonifyBotProps {
  state: 'idle' | 'transforming-right' | 'transforming-left' | 'celebrating';
  direction?: 'right' | 'left';
  onAnimationComplete?: () => void;
}

export function ToonifyBot({ state, direction, onAnimationComplete }: ToonifyBotProps) {
  const [showLightning, setShowLightning] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  useEffect(() => {
    if (state === 'transforming-right' || state === 'transforming-left') {
      setShowLightning(true);
      const timer = setTimeout(() => {
        setShowLightning(false);
        onAnimationComplete?.();
      }, 500);
      return () => clearTimeout(timer);
    } else if (state === 'celebrating') {
      setShowSparkles(true);
      const timer = setTimeout(() => {
        setShowSparkles(false);
        onAnimationComplete?.();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [state, onAnimationComplete]);

  return (
    <div className={`relative inline-flex items-center justify-center toonify-bot ${state}`}>
      {/* Main character body */}
      <div 
        className="w-16 h-16 rounded-full border-4 flex items-center justify-center relative overflow-hidden"
        style={{ 
          backgroundColor: 'hsl(var(--accent))',
          borderColor: 'var(--character-color)',
        }}
      >
        {/* Face */}
        <div className="flex flex-col items-center">
          {/* Eyes */}
          <div className="flex gap-1 mb-1 bot-eyes">
            <div className="w-2 h-2 bg-current rounded-full"></div>
            <div className="w-2 h-2 bg-current rounded-full"></div>
          </div>
          
          {/* Mouth - changes based on state */}
          <div className="w-3 h-1.5 border-b-2 border-current rounded-full"
               style={{
                 borderColor: state === 'celebrating' ? 'var(--character-color)' : 'currentColor'
               }}>
          </div>
        </div>

        {/* Direction indicator arrow when transforming */}
        {(state === 'transforming-right' || state === 'transforming-left') && (
          <div className="absolute inset-0 flex items-center justify-center">
            {direction === 'right' ? (
              <ArrowRight className="w-6 h-6" style={{ color: 'var(--character-color)' }} />
            ) : (
              <ArrowLeft className="w-6 h-6" style={{ color: 'var(--character-color)' }} />
            )}
          </div>
        )}
      </div>

      {/* Lightning effect for transforming */}
      {showLightning && (
        <div className="absolute inset-0 flex items-center justify-center lightning-effect">
          <Zap className="w-8 h-8 text-yellow-400" />
        </div>
      )}

      {/* Sparkles for celebrating */}
      {showSparkles && (
        <>
          <div className="absolute -top-2 -left-2 sparkle-effect">
            <Sparkles className="w-4 h-4" style={{ color: 'var(--character-color)' }} />
          </div>
          <div className="absolute -top-2 -right-2 sparkle-effect" style={{ animationDelay: '0.2s' }}>
            <Sparkles className="w-4 h-4" style={{ color: 'var(--character-color)' }} />
          </div>
          <div className="absolute -bottom-2 -left-2 sparkle-effect" style={{ animationDelay: '0.4s' }}>
            <Sparkles className="w-4 h-4" style={{ color: 'var(--character-color)' }} />
          </div>
          <div className="absolute -bottom-2 -right-2 sparkle-effect" style={{ animationDelay: '0.6s' }}>
            <Sparkles className="w-4 h-4" style={{ color: 'var(--character-color)' }} />
          </div>
        </>
      )}
    </div>
  );
}
