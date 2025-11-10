'use client';

import React, { useState, useEffect } from 'react';
import { X, Info, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { consent } from '@/lib/analytics';

export function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem('toonlint-consent');
    const consentDate = localStorage.getItem('toonlint-consent-date');
    
    // Show banner if no consent or consent is older than 1 year
    if (!consent || !consentDate || 
        (new Date().getTime() - new Date(consentDate).getTime()) > 365 * 24 * 60 * 60 * 1000) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('toonlint-consent', 'all');
    localStorage.setItem('toonlint-consent-date', new Date().toISOString());
    setShowBanner(false);
    
    // Enable analytics consent
    consent.grant();
  };

  const handleAcceptNecessary = () => {
    localStorage.setItem('toonlint-consent', 'necessary');
    localStorage.setItem('toonlint-consent-date', new Date().toISOString());
    setShowBanner(false);
    
    // Deny non-essential analytics
    consent.deny();
  };

  const handleReject = () => {
    localStorage.setItem('toonlint-consent', 'rejected');
    localStorage.setItem('toonlint-consent-date', new Date().toISOString());
    setShowBanner(false);
    
    // Reject all non-essential analytics
    consent.deny();
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 border-t shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-sm mb-1">Privacy & Cookie Notice</h3>
                <p className="text-sm text-muted-foreground">
                  We use cookies and analytics tools (Google Analytics & Microsoft Clarity) to enhance your experience, analyze site usage, and improve our service. 
                  By continuing to use our site, you consent to our use of analytics in accordance with our Privacy Policy.
                  {!showDetails && (
                    <button
                      onClick={() => setShowDetails(true)}
                      className="text-blue-600 hover:text-blue-800 underline ml-1"
                    >
                      Learn more
                    </button>
                  )}
                </p>
                
                {showDetails && (
                  <div className="mt-3 text-xs text-muted-foreground space-y-1">
                    <p><strong>Essential Cookies:</strong> Required for basic site functionality (theme, language preferences)</p>
                    <p><strong>Google Analytics:</strong> Tracks page views, user interactions, and site performance</p>
                    <p><strong>Microsoft Clarity:</strong> Records user sessions to help improve user experience</p>
                    <p><strong>Your Rights:</strong> You can withdraw consent anytime. EU residents have additional rights under GDPR.</p>
                    <p><strong>Data Location:</strong> Analytics data is processed by Google and Microsoft in accordance with their Privacy Policies.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 lg:ml-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleAcceptNecessary}
              className="text-xs"
            >
              Essential Only
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleReject}
              className="text-xs"
            >
              Reject All
            </Button>
            <Button 
              size="sm" 
              onClick={handleAcceptAll}
              className="text-xs"
            >
              Accept All
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowBanner(false)}
              className="p-1"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {showDetails && (
          <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
            <p>
              <strong>Legal Basis:</strong> GDPR Art. 6(1)(a) consent, CCPA/CPRA compliance. 
              <strong>Contact:</strong> For privacy inquiries, contact us through our contact page.
              <strong>More Info:</strong> See our full Privacy Policy for details on data processing, retention, and your rights.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
