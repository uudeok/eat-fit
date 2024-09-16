import { createBrowserClient } from '@supabase/ssr';
import { supabaseUrl, supabaseKey } from '.';

export function createClient() {
    return createBrowserClient(supabaseUrl, supabaseKey);
}
