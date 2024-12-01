import { CookieKeys } from '@/hooks/useCache';
import { BaseStorage } from './BaseStorage';
import dayjs from 'dayjs';

export type CookieOptions = {
    sameSite?: 'lax' | 'strict' | 'none';
    expires?: Date | string;
    secure?: boolean;
    path?: string;
    httpOnly?: boolean;
    maxAge?: number;
    domain?: string;
};

// 쿠키 스토리지
export class CookieStorage extends BaseStorage<CookieKeys> {
    private cookies: Record<string, string>;
    private setCookie: (key: CookieKeys, value: string, options?: CookieOptions) => void;
    private removeCookie: (key: CookieKeys) => void;

    constructor(
        cookies: Record<CookieKeys, string>,
        setCookie: (key: CookieKeys, value: string, options?: CookieOptions) => void,
        removeCookie: (key: CookieKeys) => void
    ) {
        super();
        this.cookies = cookies;
        this.setCookie = setCookie;
        this.removeCookie = removeCookie;
    }

    setRawItem(key: CookieKeys, value: string, options: CookieOptions = {}) {
        // console.log('setRawItem 에서의 value', value);
        const { expires, path = '/', secure = true, sameSite = 'lax' } = options;
        const expireDate = dayjs(expires).toDate();
        this.setCookie(key, value, { expires: expireDate, path, secure, sameSite });
    }

    getRawItem(key: CookieKeys) {
        return this.cookies[key] || null;
    }

    removeRawItem(key: CookieKeys) {
        this.removeCookie(key);
    }

    clearAll() {
        console.warn('쿠키를 모두 삭제하는 기능을 지원하지 않습니다.');
    }

    isCookieValid(key: CookieKeys): boolean {
        const cookie: any = this.getRawItem(key);

        if (!cookie) return false;

        try {
            const expirationDate = cookie?.deadline;

            return expirationDate ? dayjs().isBefore(dayjs(expirationDate)) : false;
        } catch {
            return false;
        }
    }
}
