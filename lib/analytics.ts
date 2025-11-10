// Analytics utilities for Google Analytics and Microsoft Clarity
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
    clarity: (...args: any[]) => void;
  }
}

// Analytics configuration
export const analytics = {
  gaId: process.env.NEXT_PUBLIC_GA_ID,
  clarityId: process.env.NEXT_PUBLIC_CLARITY_ID,
  enabled: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true' && typeof window !== 'undefined',
  isProduction: process.env.NODE_ENV === 'production'
};

// Google Analytics functions
export const GA = {
  // Initialize Google Analytics
  init: () => {
    if (!analytics.gaId || !analytics.enabled) return;
    
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    
    window.gtag('js', new Date());
    window.gtag('config', analytics.gaId, {
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
  },

  // Track page views
  pageview: (url: string) => {
    if (!analytics.gaId || !analytics.enabled || typeof window.gtag !== 'function') return;
    
    window.gtag('config', analytics.gaId, {
      page_path: url,
    });
  },

  // Track custom events
  event: (action: string, category: string, label?: string, value?: number) => {
    if (!analytics.gaId || !analytics.enabled || typeof window.gtag !== 'function') return;
    
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  },

  // Track conversions
  conversion: (eventName: string, parameters?: Record<string, any>) => {
    if (!analytics.gaId || !analytics.enabled || typeof window.gtag !== 'function') return;
    
    window.gtag('event', eventName, parameters);
  }
};

// Microsoft Clarity functions
export const Clarity = {
  // Track custom events
  event: (eventName: string, properties?: Record<string, any>) => {
    if (!analytics.clarityId || !analytics.enabled || typeof window.clarity !== 'function') return;
    
    window.clarity('event', eventName, properties);
  },

  // Identify user
  identify: (userId: string, properties?: Record<string, any>) => {
    if (!analytics.clarityId || !analytics.enabled || typeof window.clarity !== 'function') return;
    
    window.clarity('identify', userId, properties);
  },

  // Set custom tags
  set: (key: string, value: string) => {
    if (!analytics.clarityId || !analytics.enabled || typeof window.clarity !== 'function') return;
    
    window.clarity('set', key, value);
  }
};

// Combined analytics tracking functions for common events
export const trackEvent = {
  // Track JSON to TOON conversion
  conversion: (fromFormat: string, toFormat: string, tokensSaved: number) => {
    GA.event('conversion', 'toon_converter', `${fromFormat}_to_${toFormat}`, tokensSaved);
    Clarity.event('conversion', {
      from_format: fromFormat,
      to_format: toFormat,
      tokens_saved: tokensSaved
    });
  },

  // Track file upload
  fileUpload: (fileType: string, fileSize: number) => {
    GA.event('file_upload', 'user_action', fileType, fileSize);
    Clarity.event('file_upload', {
      file_type: fileType,
      file_size: fileSize
    });
  },

  // Track feature usage
  featureUsage: (feature: string, action: string) => {
    GA.event(action, 'feature_usage', feature);
    Clarity.event('feature_usage', {
      feature: feature,
      action: action
    });
  },

  // Track page views
  pageView: (pageName: string) => {
    GA.pageview(window.location.pathname);
    Clarity.event('page_view', {
      page_name: pageName,
      url: window.location.href
    });
  },

  // Track errors
  error: (errorMessage: string, errorType: string) => {
    GA.event('error', 'application_error', errorType);
    Clarity.event('application_error', {
      error_message: errorMessage,
      error_type: errorType,
      url: window.location.href
    });
  }
};

// Consent management
export const consent = {
  // Grant analytics consent
  grant: () => {
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        functionality_storage: 'granted'
      });
    }
  },

  // Deny analytics consent  
  deny: () => {
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        functionality_storage: 'denied'
      });
    }
  }
};

// Debug function for development
export const debugAnalytics = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics Configuration:', {
      gaId: analytics.gaId,
      clarityId: analytics.clarityId,
      enabled: analytics.enabled,
      isProduction: analytics.isProduction
    });
  }
};
