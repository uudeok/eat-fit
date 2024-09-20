import { createBrowserClient } from '@supabase/ssr';
import { supabaseUrl, supabaseKey } from '.';
import { Database } from '@/@types/supabase.type';

export function createClient() {
    return createBrowserClient<Database>(supabaseUrl, supabaseKey);
}
