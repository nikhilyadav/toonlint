import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/lib/theme-provider';
import { ConsentBanner } from '@/components/consent-banner';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { AnalyticsTracker } from '@/components/analytics-tracker';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ToonLint: Free JSON to Toon Online Converter, Validator and Formatter',
  description: 'Convert JSON to TOON format and vice versa. TOON (Token-Oriented Object Notation) achieves 30-60% token reduction compared to JSON while maintaining readability. Free online converter with real-time validation and token counting.',
  keywords: [
    'JSON to TOON converter',
    'TOON format',
    'Token-Oriented Object Notation',
    'JSON validator',
    'JSON formatter',
    'TOON converter',
    'LLM optimization',
    'token reduction',
    'data format conversion',
    'online converter',
    'ToonLint'
  ],
  authors: [{ name: 'ToonLint Team' }],
  creator: 'ToonLint',
  publisher: 'ToonLint',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://toonlint.com',
    title: 'ToonLint: Free JSON to Toon Online Converter',
    description: 'Convert JSON to TOON format and reduce LLM token usage by 30-60%. Free online tool with real-time validation.',
    siteName: 'ToonLint',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'ToonLint - JSON to TOON Converter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ToonLint: Free JSON to Toon Online Converter',
    description: 'Convert JSON to TOON format and reduce LLM token usage by 30-60%',
    images: ['/logo.png'],
    creator: '@toonlint',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: 'verification-code-here',
  },
  alternates: {
    canonical: 'https://toonlint.com',
    languages: {
      'en-US': 'https://toonlint.com',
      'ja-JP': 'https://toonlint.com?lang=ja',
      'de-DE': 'https://toonlint.com?lang=de',
      'es-ES': 'https://toonlint.com?lang=es',
      'zh-CN': 'https://toonlint.com?lang=zh',
      'ko-KR': 'https://toonlint.com?lang=ko',
      'fr-FR': 'https://toonlint.com?lang=fr',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
  const analyticsEnabled = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true';

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="theme-color" content="#F2D464" />
        
        {/* Google Analytics - Only load if GA ID is provided and analytics is enabled */}
        {gaId && analyticsEnabled && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                
                // Initialize with denied consent (GDPR compliance)
                gtag('consent', 'default', {
                  'analytics_storage': 'denied',
                  'ad_storage': 'denied',
                  'functionality_storage': 'denied',
                  'personalization_storage': 'denied'
                });
                
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  'anonymize_ip': true,
                  'allow_google_signals': false,
                  'allow_ad_personalization_signals': false,
                  'cookie_flags': 'max-age=7200;secure;samesite=strict'
                });
              `}
            </Script>
          </>
        )}

        {/* Microsoft Clarity - Only load if Clarity ID is provided and analytics is enabled */}
        {clarityId && analyticsEnabled && (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityId}");
            `}
          </Script>
        )}
        
        {/* Hreflang Tags */}
        <link rel="alternate" hrefLang="en" href="https://toonlint.com" />
        <link rel="alternate" hrefLang="ja" href="https://toonlint.com?lang=ja" />
        <link rel="alternate" hrefLang="de" href="https://toonlint.com?lang=de" />
        <link rel="alternate" hrefLang="es" href="https://toonlint.com?lang=es" />
        <link rel="alternate" hrefLang="zh" href="https://toonlint.com?lang=zh" />
        <link rel="alternate" hrefLang="ko" href="https://toonlint.com?lang=ko" />
        <link rel="alternate" hrefLang="fr" href="https://toonlint.com?lang=fr" />
        <link rel="alternate" hrefLang="x-default" href="https://toonlint.com" />
        
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/_next/static/media/inter-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'ToonLint',
              description: 'Free JSON to TOON online converter and validator',
              url: 'https://toonlint.com',
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'Web',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              featureList: [
                'JSON to TOON conversion',
                'TOON to JSON conversion',
                'Real-time validation',
                'Token counting',
                'Multiple AI provider support',
                'File upload support',
                'URL loading',
                'Multi-language support',
              ],
              browserRequirements: 'Modern web browser with JavaScript enabled',
              author: {
                '@type': 'Organization',
                name: 'ToonLint Team',
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          defaultTheme="system"
          storageKey="toonlint-theme"
        >
          <AnalyticsTracker />
          {children}
          <ConsentBanner />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
