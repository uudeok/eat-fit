'use client';

import { COOKIE_KEYS, LOCAL_KEYS, SESSION_KEYS } from '@/constants';
import { useCookies } from 'react-cookie';
import dayjs from 'dayjs';
import { valueOf } from '@/@types';

export type CookieKeys = valueOf<typeof COOKIE_KEYS>;
export type LocalKeys = valueOf<typeof LOCAL_KEYS>;
export type SessionKeys = valueOf<typeof SESSION_KEYS>;

interface CacheInterface<KeyType extends string = string> {
    setItem(key: KeyType, value: any, options?: any): void;
    getItem<T>(key: KeyType): T | null;
    removeItem(key: KeyType): void;
    clear(): void;
}

// 추상 클래스: 공통 로직 처리
abstract class BaseStorage<KeyType extends string = string> implements CacheInterface<KeyType> {
    abstract setRawItem(key: KeyType, value: string, options?: any): void;
    abstract getRawItem(key: KeyType): string | null;
    abstract removeRawItem(key: KeyType): void;
    abstract clearAll(): void;

    setItem(key: KeyType, value: any, options?: any) {
        const serializedValue = JSON.stringify(value);
        this.setRawItem(key, serializedValue, options);
    }

    getItem<T>(key: KeyType): T | null {
        const rawValue = this.getRawItem(key);
        return rawValue ? JSON.parse(rawValue) : null;
    }

    removeItem(key: KeyType) {
        this.removeRawItem(key);
    }

    clear() {
        this.clearAll();
    }
}

// 쿠키 스토리지
class CookieStorage extends BaseStorage<CookieKeys> {
    private cookies: Record<string, string>;
    private setCookie: (key: CookieKeys, value: string, options?: any) => void;
    private removeCookie: (key: CookieKeys, options?: any) => void;

    constructor(cookies: any, setCookie: any, removeCookie: any) {
        super();
        this.cookies = cookies;
        this.setCookie = setCookie;
        this.removeCookie = removeCookie;
    }

    setRawItem(key: CookieKeys, value: string, options: any = {}) {
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
        console.warn('Clearing all cookies is not directly supported via this API.');
    }
}

// 로컬스토리지
class LocalStorage extends BaseStorage<LocalKeys> {
    setRawItem(key: LocalKeys, value: string) {
        localStorage.setItem(key, value);
    }

    getRawItem(key: LocalKeys) {
        return localStorage.getItem(key);
    }

    removeRawItem(key: LocalKeys) {
        localStorage.removeItem(key);
    }

    clearAll() {
        localStorage.clear();
    }
}

// 세션스토리지
class SessionStorage extends BaseStorage<SessionKeys> {
    setRawItem(key: SessionKeys, value: string) {
        sessionStorage.setItem(key, value);
    }

    getRawItem(key: SessionKeys) {
        return sessionStorage.getItem(key);
    }

    removeRawItem(key: SessionKeys) {
        sessionStorage.removeItem(key);
    }

    clearAll() {
        sessionStorage.clear();
    }
}

class CacheFactory {
    static createCache(storageType: 'cookie', cookies: any): CookieStorage;
    static createCache(storageType: 'local'): LocalStorage;
    static createCache(storageType: 'session'): SessionStorage;
    static createCache(storageType: 'cookie' | 'local' | 'session', cookies?: any): CacheInterface {
        switch (storageType) {
            case 'cookie':
                if (!cookies) throw new Error('Cookies context is required for cookie storage');
                return new CookieStorage(cookies[0], cookies[1], cookies[2]);
            case 'local':
                return new LocalStorage();
            case 'session':
                return new SessionStorage();
            default:
                throw new Error(`Invalid storage type: ${storageType}`);
        }
    }
}

// 훅 정의
export const useCache = <T extends 'cookie' | 'local' | 'session'>(
    storageType: T
): T extends 'cookie' ? CookieStorage : T extends 'local' ? LocalStorage : SessionStorage => {
    const cookies = useCookies();

    switch (storageType) {
        case 'cookie':
            if (!cookies) {
                throw new Error('Cookies context is required for cookie storage');
            }
            return CacheFactory.createCache('cookie', cookies) as any;

        case 'local':
            return CacheFactory.createCache('local') as any;

        case 'session':
            return CacheFactory.createCache('session') as any;

        default:
            throw new Error(`Invalid storage type: ${storageType}`);
    }
};
