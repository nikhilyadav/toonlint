# ToonLint - JSON to TOON Converter

Free online converter for JSON to TOON format with analytics integration, token counting, and bidirectional conversion.

## 🚀 Quick Start

1. **Clone and Install**:
   ```bash
   git clone https://github.com/nikhilyadav/toonlint.git
   cd toonlint
   npm install
   ```

2. **Environment Setup**:
   ```bash
   # Copy environment template
   cp .env.example .env.local
   
   # Edit .env.local with your analytics IDs
   nano .env.local
   ```

3. **Configure Analytics** (Optional but recommended):
   - **Google Analytics**: Get your GA4 ID from [Google Analytics](https://analytics.google.com/)
   - **Microsoft Clarity**: Get your project ID from [Microsoft Clarity](https://clarity.microsoft.com/)
   
   Update `.env.local`:
   ```env
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   NEXT_PUBLIC_CLARITY_ID=your-clarity-project-id
   NEXT_PUBLIC_ANALYTICS_ENABLED=true
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

5. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

## 📊 Analytics Integration

### Features Included:
- ✅ **Google Analytics 4**: Page views, conversions, custom events
- ✅ **Microsoft Clarity**: Session recordings, heatmaps, user behavior
- ✅ **Vercel Speed Insights**: Core Web Vitals, performance monitoring
- ✅ **GDPR Compliant**: Consent banner with granular controls
- ✅ **Event Tracking**: Conversion tracking, feature usage, error monitoring

### Analytics Events Tracked:
- **Conversions**: JSON↔TOON conversions with token savings
- **Feature Usage**: Swap content, format changes, file uploads
- **User Behavior**: Page views, click events, error tracking
- **Performance**: Load times, conversion success rates

### Setting Up Analytics:

#### Google Analytics 4:
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property
3. Get your Measurement ID (G-XXXXXXXXXX)
4. Add it to `.env.local` as `NEXT_PUBLIC_GA_ID`

#### Microsoft Clarity:
1. Go to [Microsoft Clarity](https://clarity.microsoft.com/)
2. Create a new project
3. Get your Project ID
4. Add it to `.env.local` as `NEXT_PUBLIC_CLARITY_ID`

## 🎨 Features

- **Dual-sided Arrow Conversion**: Beautiful ↔ button above editor boxes
- **Bidirectional Support**: JSON ↔ TOON conversion
- **Token Counting**: Real-time token analysis for multiple AI providers
- **Multi-language Support**: 9+ languages supported
- **Dark/Light Themes**: Automatic and manual theme switching
- **File Upload/Download**: Drag & drop or browse file support
- **Real-time Validation**: Live JSON/TOON format validation
- **Responsive Design**: Works on all devices
- **Privacy Compliant**: GDPR-ready consent management

## 🛠 Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Analytics**: Google Analytics 4 + Microsoft Clarity
- **Performance**: Vercel Speed Insights
- **Icons**: Lucide React

## 📁 Project Structure

```
toonlint/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with analytics
│   ├── page.tsx          # Home page
│   ├── globals.css       # Global styles
│   ├── contact/          # Contact page
│   ├── features/         # Features page
│   ├── api/              # API documentation
│   └── toon/             # TOON format info
├── components/             # React components
│   ├── main-editor.tsx   # Main conversion interface
│   ├── navbar.tsx        # Navigation
│   ├── consent-banner.tsx # GDPR consent
│   ├── analytics-tracker.tsx # Page tracking
│   └── ui/               # UI components
├── lib/                   # Utilities and logic
│   ├── analytics.ts      # Analytics utilities
│   ├── toon-converter.ts # Conversion logic
│   ├── token-counter.ts  # Token counting
│   ├── translations.ts   # Internationalization
│   └── utils.ts          # General utilities
├── types/                 # TypeScript definitions
├── public/               # Static assets
├── .env.example          # Environment template
├── .env.local            # Your local config (not committed)
└── .gitignore            # Git ignore rules
```

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 Measurement ID | Optional |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity Project ID | Optional |
| `NEXT_PUBLIC_ANALYTICS_ENABLED` | Enable/disable analytics | Optional |

## 🚀 Deployment

### Vercel (Recommended):
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Other Platforms:
1. Build the project: `npm run build`
2. Deploy the `out/` folder (if using `output: 'export'`)
3. Set environment variables in your hosting platform

## 📈 Analytics Dashboard

After deployment, monitor your analytics:

- **Google Analytics**: [analytics.google.com](https://analytics.google.com)
- **Microsoft Clarity**: [clarity.microsoft.com](https://clarity.microsoft.com)
- **Vercel Insights**: Vercel Dashboard → Your Project → Analytics

## 🔒 Privacy & Compliance

- **GDPR Compliant**: Consent banner with granular controls
- **Cookie Management**: Essential vs. analytics cookies
- **Data Minimization**: Only collect necessary analytics data
- **User Rights**: Easy consent withdrawal
- **Transparent**: Clear privacy notices and data usage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make changes and test
4. Commit with clear messages
5. Push and create a Pull Request

## 📝 License

MIT License - see LICENSE file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/nikhilyadav/toonlint/issues)
- **Discussions**: [GitHub Discussions](https://github.com/nikhilyadav/toonlint/discussions)
- **Email**: Through the contact form on the website

---

**Built with ❤️ for optimizing AI token usage**
