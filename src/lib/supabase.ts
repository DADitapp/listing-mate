import { createClient } from '@supabase/supabase-js';

let supabaseInstance: any = null;

export const getSupabaseClient = () => {
    if (!supabaseInstance) {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co';
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy-key';

        supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
    }
    return supabaseInstance;
};

// Deprecated: Remove the top-level instantiation that crashes the worker on startup.
// Use getSupabaseClient() instead.
// export const supabase = createClient(...);
