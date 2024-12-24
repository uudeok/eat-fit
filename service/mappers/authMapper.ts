import { DATE_FORMAT } from '@/constants';
import { Session } from '@supabase/supabase-js';
import dayjs from 'dayjs';

export type DecodeAuth = {
    id: string;
    createdAt: string;
    provider: string;
    lastSignIn: string;
};

export const decodeAuth = (init: Session): DecodeAuth => ({
    id: init.user.id,
    createdAt: dayjs(init.user.created_at).format(DATE_FORMAT['YYYY-MM-DD']),
    provider: init.user.app_metadata.provider || '',
    lastSignIn: init.user.last_sign_in_at || new Date().toString(),
});
