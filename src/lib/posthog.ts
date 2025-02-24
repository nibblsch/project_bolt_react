import posthog from 'posthog-js';
import { config } from './config';

if (config.isProduction) {
  posthog.init(config.posthogKey, {
    api_host: config.posthogHost,
    capture_pageview: false,
  });
}

export const analytics = {
  track: (event: string, properties?: Record<string, any>) => {
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
  },
};