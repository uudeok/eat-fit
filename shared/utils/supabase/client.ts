import { createBrowserClient } from '@supabase/ssr';

import { Database } from '@/@types/supabase.type';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export function createClient() {
    return createBrowserClient<Database>(supabaseUrl, supabaseKey);
}
