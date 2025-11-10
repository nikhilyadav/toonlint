'use client';

import React from 'react';
import { useTheme, colorPalettes } from '@/lib/theme-provider';
import { ColorPalette } from '@/types';

const paletteColors: Record<ColorPalette, string> = {
    default: '#6366f1', // blue
    warm: '#e76f51',    // warm orange
    nature: '#2a9d8f',  // green
};

export function ColorPaletteSelector() {
    const { colorPalette, setColorPalette } = useTheme();

    return (
        <div className="flex gap-2 items-center">
      <span className="text-sm font-medium text-muted-foreground hidden sm:inline">
        Palette:
      </span>
            <div className="flex gap-1">
                {Object.entries(colorPalettes).map(([key, palette]) => {
                    const typedKey = key as ColorPalette;
                    return (
                        <button
                            key={key}
                            onClick={() => setColorPalette(typedKey)}
                            className={`w-6 h-6 rounded-full border-2 palette-button ${
                                colorPalette === key ? 'active' : ''
                            }`}
                            style={{
                                backgroundColor: paletteColors[typedKey],
                                borderColor: colorPalette === key ? 'white' : 'transparent',
                            }}
                            title={palette.name}
                            aria-label={`Select ${palette.name} color palette`}
                        />
                    );
                })}
            </div>
        </div>
    );
}
