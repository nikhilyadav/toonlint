// 'use client';
//
// import React from 'react';
// import { useTheme, colorPalettes } from '@/lib/theme-provider';
// import { ColorPalette } from '@/types';
//
// export function ColorPaletteSelector() {
//   const { colorPalette, setColorPalette } = useTheme();
//
//   const paletteColors = {
//     default: '#6366f1',
//     ocean: '#0ea5e9',
//     sunset: '#f97316',
//     forest: '#22c55e',
//     lavender: '#a855f7',
//   };
//
//   return (
//     <div className="flex gap-2 items-center">
//       <span className="text-sm font-medium text-muted-foreground hidden sm:inline">
//         Palette:
//       </span>
//       <div className="flex gap-1">
//         {Object.entries(colorPalettes).map(([key, palette]) => (
//           <button
//             key={key}
//             onClick={() => setColorPalette(key as ColorPalette)}
//             className={`w-6 h-6 rounded-full border-2 palette-button ${
//               colorPalette === key ? 'active' : ''
//             }`}
//             style={{
//               backgroundColor: paletteColors[key as ColorPalette],
//               borderColor: colorPalette === key ? 'white' : 'transparent'
//             }}
//             title={palette.name}
//             aria-label={`Select ${palette.name} color palette`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

'use client';

import React from 'react';
import { useTheme, colorPalettes } from '@/lib/theme-provider';

// Define palettes + type safely in one place
export const paletteColors = {
    default: '#6366f1',  // Indigo
    ocean: '#0ea5e9',    // Sky Blue
    sunset: '#f97316',   // Orange
    forest: '#22c55e',   // Green
    lavender: '#a855f7', // Purple
} as const;

export type ColorPalette = keyof typeof paletteColors;

export function ColorPaletteSelector() {
    const { colorPalette, setColorPalette } = useTheme();

    return (
        <div className="flex gap-2 items-center">
      <span className="text-sm font-medium text-muted-foreground hidden sm:inline">
        Palette:
      </span>
            <div className="flex gap-1">
                {Object.entries(colorPalettes).map(([key, palette]) => (
                    <button
                        key={key}
                        onClick={() => setColorPalette(key as ColorPalette)}
                        className={`w-6 h-6 rounded-full border-2 palette-button ${
                            colorPalette === key ? 'active' : ''
                        }`}
                        style={{
                            backgroundColor:
                                paletteColors[key as ColorPalette] ?? '#6366f1',
                            borderColor: colorPalette === key ? 'white' : 'transparent',
                        }}
                        title={palette.name}
                        aria-label={`Select ${palette.name} color palette`}
                    />
                ))}
            </div>
        </div>
    );
}

