import { Database } from '@/@types/supabase.type';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const suabaseUrl = 'https://dzazdewfkkrstcfinble.supabase.co';
const subaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6YXpkZXdma2tyc3RjZmluYmxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ3NjgwNzQsImV4cCI6MjA0MDM0NDA3NH0.0KgzsHS28BxM2xUo33jNeCKKpi91VNSnAWl2vfLM2yQ';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export function createClient() {
    const cookieStore = cookies();
    // console.log(suabaseUrl, subaseKey);

    return createServerClient<Database>(
        suabaseUrl,
        subaseKey,

        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
                    } catch (error) {
                        console.error('Cookie set error:', error);
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    );
}
