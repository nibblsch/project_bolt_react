export const config = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  stripePublishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '',
  posthogKey: import.meta.env.VITE_POSTHOG_KEY || '',
  posthogHost: import.meta.env.VITE_POSTHOG_HOST || '',
  environment: import.meta.env.MODE,
  isDevelopment: import.meta.env.MODE === 'development',
  isProduction: import.meta.env.MODE === 'production',
};