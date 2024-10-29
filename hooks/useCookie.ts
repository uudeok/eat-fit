'use client';

import dayjs from 'dayjs';
import { CookieName } from '@/constants';
import { useCookies } from 'react-cookie';

interface CookieOptions {
    name: CookieName;
    value: any;
    expires?: string | Date | { days?: number; hours?: number; minutes?: number };
    path?: string;
    secure?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
}

export const useCookie = () => {
    const [cookies, setCookie, removeCookie] = useCookies();

    const calculateExpiryDate = (expires?: string | Date | { days?: number; hours?: number; minutes?: number }) => {
        if (!expires) return undefined;

        if (typeof expires === 'string') {
            return dayjs(expires).toDate();
        }

        if (expires instanceof Date) {
            return expires;
        }

        const now = dayjs();
        const newExpiry = now
            .add(expires.days || 0, 'day')
            .add(expires.hours || 0, 'hour')
            .add(expires.minutes || 0, 'minute')
            .toDate();

        return newExpiry;
    };

    const setCustomCookie = ({ name, value, expires, path = '/', secure = true, sameSite = 'lax' }: CookieOptions) => {
        if (!name || value === undefined) return;

        const expireDate = calculateExpiryDate(expires);

        // cookie 에 저장할때 값에 expireDate 도 넣어준다
        const serializedValue = JSON.stringify({ ...value, expireDate });

        setCookie(name, serializedValue, {
            expires: expireDate,
            path,
            secure,
            sameSite,
        });
    };

    const getCustomCookie = (name: string) => {
        const cookie = cookies[name];
        try {
            return cookie ? JSON.parse(cookie) : null;
        } catch {
            return cookie;
        }
    };

    const deleteCustomCookie = (name: CookieName, path = '/') => {
        removeCookie(name, { path });
        console.log(`Cookie '${name}' has been deleted.`);
    };

    const isCookieValid = (name: CookieName): boolean => {
        const cookie = cookies[name];
        if (!cookie) return false;

        try {
            const expirationDate = cookie?.expireDate;

            // 현재 날짜가 expirationDate 가 이전이라면 true
            return expirationDate ? dayjs().isBefore(dayjs(expirationDate)) : false;
        } catch {
            return false;
        }
    };

    return { setCustomCookie, getCustomCookie, isCookieValid, deleteCustomCookie };
};
