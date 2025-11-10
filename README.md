# ToonLint - JSON to TOON Converter

A modern, feature-rich web application for converting between JSON and TOON (Token-Oriented Object Notation) formats with real-time validation, token counting, and optimization analytics.

## Features

### Core Functionality
- **Bidirectional Conversion**: Convert JSON to TOON and TOON to JSON with full data integrity
- **Real-time Validation**: Instant syntax validation and error detection for both formats
- **Token Optimization**: Achieve 30-60% token reduction compared to JSON for AI/LLM workflows
- **Multi-Provider Token Counting**: Support for OpenAI, Claude, DeepSeek, and Gemini token calculation

### Editor Features
- **Advanced Code Editor**: Monaco Editor with syntax highlighting and auto-completion
- **Multiple View Modes**: Text, tree, and table views for better data visualization
- **Smart Formatting**: Automatic code formatting with proper indentation
- **Find & Replace**: Powerful search functionality across content
- **File Upload**: Drag-and-drop support for JSON, TOON, and text files (up to 50MB)
- **URL Loading**: Load data directly from remote URLs

### User Experience
- **Multi-language Support**: Full internationalization in 7 languages (English, Japanese, German, Spanish, Mandarin, Korean, French)
- **Theme Support**: Dark and light themes with automatic system detection
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Network Status**: Real-time connectivity indicator
- **Privacy-First**: All processing happens client-side in your browser

## TOON Format

TOON (Token-Oriented Object Notation) is a compact data format optimized for LLM token efficiency:

### Key Benefits
- **30-60% token reduction** compared to JSON
- **Human readable** indentation-based structure
- **Three array formats**: inline, tabular, and list-style
- **Smart quoting rules** - quotes only when necessary
- **Type safe** with full JSON compatibility

### Example Conversion

**JSON Input:**
```json
{
  "name": "Alice Johnson",
  "age": 30,
  "active": true,
  "tags": ["developer", "toon", "efficient"],
  "preferences": {
    "theme": "dark",
    "language": "en"
  }
}
```

**TOON Output:**
```
name: Alice Johnson
age: 30
active: true
tags[3]: developer,toon,efficient
preferences:
  theme: dark
  language: en
```

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom components
- **Editor**: Monaco Editor (@monaco-editor/react)
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **File Handling**: react-dropzone

## Project Structure

```
toonlint/
├── app/                    # Next.js app router pages
│   ├── layout.tsx         # Root layout with SEO metadata
│   ├── page.tsx           # Home page with main editor
│   ├── toon/page.tsx      # TOON format information
│   ├── features/page.tsx  # Feature showcase
│   ├── api/page.tsx       # API documentation (coming soon)
│   ├── contact/page.tsx   # Contact form
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── navbar.tsx        # Navigation header
│   └── main-editor.tsx   # Split-pane editor component
├── lib/                  # Utilities and libraries
│   ├── toon-converter.ts # JSON↔TOON conversion logic
│   ├── token-counter.ts  # Multi-provider token counting
│   ├── translations.ts   # Internationalization
│   ├── theme-provider.tsx # Theme management
│   └── utils.ts          # Common utilities
├── types/               # TypeScript type definitions
└── package.json         # Dependencies and scripts
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

## Build for Production

```bash
npm run build
npm start
```

## Key Components

### MainEditor Component
- Split-pane interface with resizable panels
- Real-time validation and token counting
- File upload and URL loading functionality
- Format conversion with error handling

### ToonConverter Class
- Comprehensive JSON to TOON conversion
- TOON to JSON reverse conversion
- Format validation for both types
- Smart formatting and optimization

### TokenCounter Class
- Multi-provider token estimation
- Cost savings calculation
- Performance metrics
- Provider comparison

### Internationalization
- Complete translation system
- Language persistence
- Browser language detection
- 7 supported languages

## SEO & Performance

- **Complete SEO metadata** with Open Graph and Twitter cards
- **Responsive design** with mobile-first approach
- **Performance optimized** with Next.js app router
- **Accessibility focused** with semantic HTML and ARIA labels
- **Fast loading** with optimized assets and fonts

## Browser Support

- Chrome/Chromium 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## License

MIT License - see LICENSE file for details

## Contributing

We welcome contributions! Please see our contributing guidelines and feel free to submit issues and pull requests.

## Support

- **Email**: support@toonlint.com
- **General Inquiries**: hello@toonlint.com
- **Documentation**: Visit /toon for detailed format information
- **Features**: Visit /features for comprehensive feature list

## Roadmap

- [ ] API development for programmatic access
- [ ] Advanced view modes (tree, table implementations)
- [ ] Batch processing capabilities
- [ ] Plugin system for custom formats
- [ ] Advanced token optimization algorithms
- [ ] Real-time collaboration features

---

**ToonLint** - Optimizing data formats for the AI age.
