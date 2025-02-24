import posthog from 'posthog-js';
import { config } from './config';

// Initialize PostHog
posthog.init(config.posthogKey, {
  api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://app.posthog.com',
  capture_pageview: true,
  disable_session_recording: false
});

// Create a wrapper for analytics to handle production/development logging
export const analytics = {
  capture: (event: string, properties?: Record<string, any>) => {
    if (config.isProduction) {
      posthog.capture(event, properties);
    } else {
      console.log('Analytics Event:', event, properties);
    }
  },
  identify: (userId: string, traits?: Record<string, any>) => {
    if (config.isProduction) {
      posthog.identify(userId, traits);
    } else {
      console.log('Analytics Identify:', userId, traits);
    }
  }
};