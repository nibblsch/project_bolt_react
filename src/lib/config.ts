const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;

export const config = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  stripePublishableKey: isDevelopment
    ? import.meta.env.VITE_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST
    : import.meta.env.VITE_PUBLIC_STRIPE_PUBLISHABLE_KEY_PROD,
  posthogKey: isDevelopment 
    ? import.meta.env.VITE_POSTHOG_KEY_DEV 
    : import.meta.env.VITE_POSTHOG_KEY_PROD,
  posthogHost: import.meta.env.VITE_POSTHOG_HOST || '',
  environment: import.meta.env.MODE,
  isDevelopment,
  isProduction,
};