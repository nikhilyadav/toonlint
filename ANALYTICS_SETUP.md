# 📊 Analytics Integration Guide

## 🎯 **Overview**

ToonLint comes with comprehensive analytics integration supporting:
- **Google Analytics 4 (GA4)** - Website traffic and user behavior
- **Microsoft Clarity** - Session recordings and heatmaps
- **Vercel Speed Insights** - Core Web Vitals and performance metrics

All analytics are GDPR/CCPA compliant with consent management.

---

## 🔧 **Setup Instructions**

### **1. Google Analytics 4 Setup**

#### **Create GA4 Property:**
1. Go to [Google Analytics](https://analytics.google.com)
2. Click "Admin" (gear icon)
3. Create Account/Property or select existing
4. Go to **Property > Data Streams**
5. Click "Add stream" > "Web"
6. Enter your website URL: `https://your-domain.com`
7. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)

#### **Configure Enhanced Ecommerce (Optional):**
1. In GA4, go to **Configure > Events**
2. Create custom events for:
   - `conversion` (JSON↔TOON conversions)
   - `file_upload` (File uploads)
   - `feature_usage` (Feature interactions)

### **2. Microsoft Clarity Setup**

#### **Create Clarity Project:**
1. Go to [Microsoft Clarity](https://clarity.microsoft.com)
2. Sign in with Microsoft account
3. Click "Create Project"
4. Enter project details:
   - **Name**: ToonLint
   - **Website URL**: `https://your-domain.com`
5. Copy the **Project ID** (alphanumeric string)

#### **Configure Recording Settings:**
- **Masking**: Auto-mask sensitive data
- **Recording limit**: Based on your needs
- **IP blocking**: Add your development IPs if needed

### **3. Environment Configuration**

#### **Setup .env.local:**
```bash
# Copy .env.example to .env.local
cp .env.example .env.local

# Edit .env.local with your IDs
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_ID=your-project-id
NEXT_PUBLIC_ANALYTICS_ENABLED=true
```

#### **Production Environment:**
Add the same variables to your deployment platform:

**Vercel:**
```bash
vercel env add NEXT_PUBLIC_GA_ID
vercel env add NEXT_PUBLIC_CLARITY_ID
vercel env add NEXT_PUBLIC_ANALYTICS_ENABLED
```

**Netlify:**
```bash
netlify env:set NEXT_PUBLIC_GA_ID G-XXXXXXXXXX
netlify env:set NEXT_PUBLIC_CLARITY_ID your-project-id
netlify env:set NEXT_PUBLIC_ANALYTICS_ENABLED true
```

---

## 📈 **Analytics Events Tracked**

### **Conversion Events:**
- **JSON to TOON conversion**
  - Event: `conversion`
  - Properties: `from_format`, `to_format`, `tokens_saved`

- **TOON to JSON conversion**
  - Event: `conversion` 
  - Properties: `from_format`, `to_format`, `tokens_saved`

### **User Interaction Events:**
- **File Upload**
  - Event: `file_upload`
  - Properties: `file_type`, `file_size`

- **Feature Usage**
  - Event: `feature_usage`
  - Properties: `feature`, `action`

- **Token Provider Change**
  - Event: `token_provider_change`
  - Properties: `provider`

- **Content Swap**
  - Event: `swap_contents`
  - Properties: `action`

### **Error Tracking:**
- **Conversion Errors**
  - Event: `application_error`
  - Properties: `error_type`, `error_message`, `url`

---

## 🛡️ **Privacy & Compliance**

### **GDPR Compliance:**
- ✅ Consent banner for EU users
- ✅ Cookie consent management
- ✅ Analytics disabled by default until consent
- ✅ Data anonymization (IP masking)

### **Data Collected:**
- **Anonymous user behavior**
- **Page views and navigation**
- **Conversion metrics**
- **Performance data**
- **Error logging**

### **Data NOT Collected:**
- ❌ Personal information
- ❌ Email addresses
- ❌ File contents
- ❌ User-generated content

---

## 🔍 **Analytics Dashboard**

### **Google Analytics 4:**
Monitor these key metrics:
- **User Engagement**: Session duration, page views
- **Conversions**: JSON↔TOON conversion rate
- **Feature Usage**: Most used features
- **Traffic Sources**: Where users come from
- **Device Types**: Mobile vs desktop usage

### **Microsoft Clarity:**
Analyze user behavior:
- **Session Recordings**: Watch user interactions
- **Heatmaps**: See where users click
- **Scroll Maps**: Understand content engagement
- **Error Tracking**: Identify UI issues

### **Vercel Speed Insights:**
Monitor performance:
- **Core Web Vitals**: LCP, FID, CLS
- **Page Load Times**: Performance metrics
- **User Experience**: Real user data

---

## 🧪 **Testing Analytics**

### **Development Testing:**
```bash
# Enable analytics in development
NEXT_PUBLIC_ANALYTICS_ENABLED=true
NEXT_PUBLIC_DEBUG_ANALYTICS=true

# Check browser console for analytics events
npm run dev
```

### **Production Testing:**
1. **GA4 Real-time Reports**: Check real-time users
2. **Clarity Live Sessions**: Watch live recordings
3. **Browser DevTools**: Check network requests

### **Debug Commands:**
```javascript
// In browser console
window.gtag('event', 'test', {event_category: 'debug'});
window.clarity('event', 'test', {debug: true});
```

---

## 🚀 **Deployment Checklist**

- [ ] GA4 Measurement ID configured
- [ ] Clarity Project ID configured
- [ ] Environment variables set in production
- [ ] HTTPS enabled (required for analytics)
- [ ] Domain added to GA4 and Clarity
- [ ] Test analytics events in production
- [ ] Consent banner working properly
- [ ] Privacy policy updated

---

## 🛠️ **Troubleshooting**

### **Analytics Not Loading:**
1. Check environment variables are set
2. Verify HTTPS is enabled
3. Check browser console for errors
4. Ensure ad blockers aren't blocking scripts

### **Events Not Tracking:**
1. Verify GA4 Measurement ID format
2. Check Clarity Project ID is correct
3. Ensure analytics consent is granted
4. Test in incognito mode

### **Console Errors:**
```javascript
// Check if analytics are loaded
console.log('GA loaded:', typeof window.gtag);
console.log('Clarity loaded:', typeof window.clarity);
```

---

## 📞 **Support**

For analytics setup issues:
- **GA4**: [Google Analytics Help](https://support.google.com/analytics/)
- **Clarity**: [Microsoft Clarity Support](https://clarity.microsoft.com/support)
- **ToonLint**: Create an issue on GitHub

**Your analytics are now ready to track user engagement and conversions!** 🎉
