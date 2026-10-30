// ============================================================================
// SUPABASE CLIENT CONFIGURATION
// ============================================================================
// This file initializes the official Supabase JavaScript client for the
// Student Portal System.
//
// HOW TO SET UP YOUR SUPABASE CREDENTIALS:
// 1. Visit https://supabase.com and log in to your account.
// 2. Open your project dashboard (or create a new project).
// 3. In the left navigation bar, click on "Project Settings" (gear icon) -> "API".
// 4. Under "Project URL", copy your URL and paste it below into SUPABASE_URL.
// 5. Under "Project API keys", copy the "anon" (public) key and paste it below
//    into SUPABASE_ANON_KEY.
//
// ⚠️ IMPORTANT SECURITY RULES:
// - ONLY use your Supabase Project URL and "anon" (publishable) key here.
// - NEVER expose your "service_role" or secret key in any frontend file!
// - Passwords are NEVER stored in localStorage. Supabase handles secure
//   JWT session tokens automatically.
// ============================================================================

// Replace these placeholders with your actual Supabase credentials:
const SUPABASE_URL = "https://ydtotpqhmlhwmxeaekcs.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_FPSmOcs8bWXuMMpu9PMbJQ_fbmvkbTz";

/**
 * Helper function to verify if the developer has configured their credentials.
 * Returns true if valid credentials are provided, false if placeholders remain.
 */
function isSupabaseConfigured() {
  return (
    typeof SUPABASE_URL === "string" &&
    typeof SUPABASE_ANON_KEY === "string" &&
    SUPABASE_URL.trim() !== "" &&
    SUPABASE_ANON_KEY.trim() !== "" &&
    !SUPABASE_URL.includes("YOUR_SUPABASE_PROJECT_URL") &&
    !SUPABASE_ANON_KEY.includes("YOUR_SUPABASE_ANON_KEY")
  );
}

// Ensure the Supabase library from CDN has loaded before initializing
if (!window.supabase) {
  console.error(
    "Supabase JavaScript library is not loaded. Ensure the CDN script tag is placed before supabase-config.js in your HTML.",
  );
}

// Initialize the official Supabase client
// Session persistence is enabled by default in Supabase (persisting JWT tokens, not passwords).
const supabaseClient =
  window.supabase && isSupabaseConfigured()
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
          persistSession: true, // Persists user login across browser refreshes and tabs
          autoRefreshToken: true, // Automatically refreshes access tokens before expiration
          detectSessionInUrl: true, // Automatically parses tokens from URL (e.g. for password resets)
        },
      })
    : window.supabase
      ? window.supabase.createClient(
          "https://placeholder.supabase.co",
          "placeholder-key",
          {
            auth: {
              persistSession: false,
              autoRefreshToken: false,
              detectSessionInUrl: true,
            },
          },
        )
      : null;

// Expose supabaseClient and helper globally for all scripts to use
window.supabaseClient = supabaseClient;
window.isSupabaseConfigured = isSupabaseConfigured;
