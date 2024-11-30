'use client';

import { COOKIE_KEYS, LOCAL_KEYS, SESSION_KEYS } from '@/constants';
import { useCookies } from 'react-cookie';
import { valueOf } from '@/@types';
import dayjs from 'dayjs';

export type CookieKeys = valueOf<typeof COOKIE_KEYS>;
export type LocalKeys = valueOf<typeof LOCAL_KEYS>;
export type SessionKeys = valueOf<typeof SESSION_KEYS>;

type StorageKeyMap = {
    cookie: CookieKeys;
    local: LocalKeys;
    session: SessionKeys;
};

type CacheTypes = keyof StorageKeyMap;
type CacheKeys = StorageKeyMap[CacheTypes];

type CookieOptions = {
    sameSite?: 'lax' | 'strict' | 'none';
    expires?: Date | string;
    secure?: boolean;
    path?: string;
    httpOnly?: boolean;
    maxAge?: number;
    domain?: string;
};

interface CacheInterface<KeyType extends CacheKeys = CacheKeys, ValueType = unknown> {
    setItem(key: KeyType, value: ValueType, options?: KeyType extends CookieKeys ? CookieOptions : undefined): void;
    getItem<T = ValueType>(key: KeyType): T | null;
    removeItem(key: KeyType): void;
    clear(): void;
}

// 추상 클래스: 공통 로직 처리
abstract class BaseStorage<KeyType extends CacheKeys = CacheKeys, ValueType = unknown>
    implements CacheInterface<KeyType, ValueType>
{
    abstract setRawItem(key: KeyType, value: string, options?: CookieOptions): void;
    abstract getRawItem(key: KeyType): string | null;
    abstract removeRawItem(key: KeyType): void;
    abstract clearAll(): void;

    setItem(key: KeyType, value: ValueType, options?: CookieOptions) {
        // 객체나 배열만 JSON.stringify로 직렬화
        const serializedValue = typeof value === 'object' && value !== null ? JSON.stringify(value) : value;
        this.setRawItem(key, serializedValue as string, options);
    }

    getItem<T>(key: KeyType): T | null {
        const rawValue = this.getRawItem(key);

        if (!rawValue) return null;

        // 이미 객체인 경우 그대로 반환
        if (typeof rawValue === 'object') {
            return rawValue as T;
        }

        return JSON.parse(rawValue) as T;
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

// 로컬스토리지
class LocalStorage extends BaseStorage<LocalKeys> {
    setRawItem(key: LocalKeys, value: string) {
        localStorage.setItem(key, value);
    }

    override getRawItem(key: LocalKeys) {
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
export const useCache = <T extends CacheTypes>(
    storageType: T
): StorageKeyMap[T] extends CookieKeys
    ? CookieStorage
    : StorageKeyMap[T] extends LocalKeys
    ? LocalStorage
    : SessionStorage => {
    const cookies = useCookies();

    switch (storageType) {
        case 'cookie':
            return CacheFactory.createCache('cookie', cookies) as any;

        case 'local':
            return CacheFactory.createCache('local') as any;

        case 'session':
            return CacheFactory.createCache('session') as any;

        default:
            throw new Error(`Invalid storage type: ${storageType}`);
    }
};

// 'use client';

// import { COOKIE_KEYS, LOCAL_KEYS, SESSION_KEYS } from '@/constants';
// import { useCookies } from 'react-cookie';
// import dayjs from 'dayjs';
// import { valueOf } from '@/@types';

// export type CookieKeys = valueOf<typeof COOKIE_KEYS>;
// export type LocalKeys = valueOf<typeof LOCAL_KEYS>;
// export type SessionKeys = valueOf<typeof SESSION_KEYS>;

// type CacheKeys = CookieKeys | LocalKeys | SessionKeys;

// type CacheTypes = 'cookie' | 'local' | 'session';

// type CookieOptions = {
//     sameSite?: 'lax' | 'strict' | 'none';
//     expires?: Date | string;
//     secure?: boolean;
//     path?: string;
//     httpOnly?: boolean;
//     maxAge?: number;
//     domain?: string;
// };

// interface CacheInterface<KeyType extends CacheKeys = CacheKeys, ValueType = unknown> {
//     setItem(key: KeyType, value: ValueType, options?: KeyType extends CookieKeys ? CookieOptions : undefined): void;
//     getItem<T = ValueType>(key: KeyType): T | null;
//     removeItem(key: KeyType): void;
//     clear(): void;
// }

// // 추상 클래스: 공통 로직 처리
// abstract class BaseStorage<KeyType extends CacheKeys = CacheKeys, ValueType = unknown>
//     implements CacheInterface<KeyType, ValueType>
// {
//     abstract setRawItem(key: KeyType, value: string, options?: CookieOptions): void;
//     abstract getRawItem(key: KeyType): string | null;
//     abstract removeRawItem(key: KeyType): void;
//     abstract clearAll(): void;

//     setItem(key: KeyType, value: ValueType, options?: CookieOptions) {
//         const serializedValue = JSON.stringify(value);
//         this.setRawItem(key, serializedValue, options);
//     }

//     getItem<T>(key: KeyType): T | null {
//         const rawValue = this.getRawItem(key);
//         return rawValue ? JSON.parse(rawValue) : null;
//     }

//     removeItem(key: KeyType) {
//         this.removeRawItem(key);
//     }

//     clear() {
//         this.clearAll();
//     }
// }

// // 쿠키 스토리지
// class CookieStorage extends BaseStorage<CookieKeys> {
//     private cookies: Record<string, string>;
//     private setCookie: (key: CookieKeys, value: string, options?: CookieOptions) => void;
//     private removeCookie: (key: CookieKeys) => void;

//     constructor(
//         cookies: Record<CookieKeys, string>,
//         setCookie: (key: CookieKeys, value: string, options?: CookieOptions) => void,
//         removeCookie: (key: CookieKeys) => void
//     ) {
//         super();
//         this.cookies = cookies;
//         this.setCookie = setCookie;
//         this.removeCookie = removeCookie;
//     }

//     setRawItem(key: CookieKeys, value: string, options: CookieOptions = {}) {
//         const serializedValue = JSON.stringify(value); // JSON 직렬화
//         const { expires, path = '/', secure = true, sameSite = 'lax' } = options;
//         const expireDate = dayjs(expires).toDate();
//         this.setCookie(key, serializedValue, { expires: expireDate, path, secure, sameSite });
//     }

//     getRawItem(key: CookieKeys) {
//         return this.cookies[key] || null;
//     }

//     removeRawItem(key: CookieKeys) {
//         this.removeCookie(key);
//     }

//     clearAll() {
//         console.warn('쿠키를 모두 삭제하는 기능을 지원하지 않습니다.');
//     }

//     isCookieValid(key: CookieKeys): boolean {
//         const cookie = this.getRawItem(key);
//         if (!cookie) return false;

//         try {
//             const parsedCookie = JSON.parse(cookie);
//             const expirationDate = parsedCookie?.expireDate;

//             return expirationDate ? dayjs().isBefore(dayjs(expirationDate)) : false;
//         } catch {
//             return false;
//         }
//     }
// }

// // 로컬스토리지
// class LocalStorage extends BaseStorage<LocalKeys> {
//     setRawItem(key: LocalKeys, value: string) {
//         localStorage.setItem(key, value);
//     }

//     override getRawItem(key: LocalKeys) {
//         return localStorage.getItem(key);
//     }

//     removeRawItem(key: LocalKeys) {
//         localStorage.removeItem(key);
//     }

//     clearAll() {
//         localStorage.clear();
//     }
// }

// // 세션스토리지
// class SessionStorage extends BaseStorage<SessionKeys> {
//     setRawItem(key: SessionKeys, value: string) {
//         sessionStorage.setItem(key, value);
//     }

//     getRawItem(key: SessionKeys) {
//         return sessionStorage.getItem(key);
//     }

//     removeRawItem(key: SessionKeys) {
//         sessionStorage.removeItem(key);
//     }

//     clearAll() {
//         sessionStorage.clear();
//     }
// }

// class CacheFactory {
//     static createCache(storageType: 'cookie', cookies: any): CookieStorage;
//     static createCache(storageType: 'local'): LocalStorage;
//     static createCache(storageType: 'session'): SessionStorage;
//     static createCache(storageType: 'cookie' | 'local' | 'session', cookies?: any): CacheInterface {
//         switch (storageType) {
//             case 'cookie':
//                 return new CookieStorage(cookies[0], cookies[1], cookies[2]);
//             case 'local':
//                 return new LocalStorage();
//             case 'session':
//                 return new SessionStorage();
//             default:
//                 throw new Error(`Invalid storage type: ${storageType}`);
//         }
//     }
// }

// // 훅 정의
// export const useCache = <T extends CacheTypes>(
//     storageType: T
// ): T extends 'cookie' ? CookieStorage : T extends 'local' ? LocalStorage : SessionStorage => {
//     const cookies = useCookies();

//     switch (storageType) {
//         case 'cookie':
//             return CacheFactory.createCache('cookie', cookies) as any;

//         case 'local':
//             return CacheFactory.createCache('local') as any;

//         case 'session':
//             return CacheFactory.createCache('session') as any;

//         default:
//             throw new Error(`Invalid storage type: ${storageType}`);
//     }
// };
