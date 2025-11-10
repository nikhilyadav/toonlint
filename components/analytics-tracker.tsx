'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { GA, analytics } from '@/lib/analytics';

export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!analytics.enabled) return;

    const url = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    
    // Track page view in Google Analytics
    GA.pageview(url);
    
    // Debug log for development
    if (process.env.NODE_ENV === 'development') {
      console.log('Page tracked:', url);
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    // Initialize analytics on first load
    if (analytics.enabled) {
      GA.init();
    }
  }, []);

  return null;
}
