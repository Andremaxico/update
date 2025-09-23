import { createClient } from "./client";

// Create a single supabase client for interacting with your database
// export const serverSupabase = createServerClient();

export const supabase = createClient()