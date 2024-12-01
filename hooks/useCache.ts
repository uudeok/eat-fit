'use client';

import { COOKIE_KEYS, LOCAL_KEYS, SESSION_KEYS } from '@/constants';
import { useCookies } from 'react-cookie';
import { valueOf } from '@/@types';
import dayjs from 'dayjs';
import { CookieStorage } from '@/shared/storage/CookieStorage';
import { LocalStorage } from '@/shared/storage/LocalStorage';
import { SessionStorage } from '@/shared/storage/SessionStorage';
import { CacheFactory } from '@/shared/storage/CacheFactory';
export type CookieKeys = valueOf<typeof COOKIE_KEYS>;
export type LocalKeys = valueOf<typeof LOCAL_KEYS>;
export type SessionKeys = valueOf<typeof SESSION_KEYS>;

type StorageKeyMap = {
    cookie: CookieKeys;
    local: LocalKeys;
    session: SessionKeys;
};

export type CacheTypes = keyof StorageKeyMap;
export type CacheKeys = StorageKeyMap[CacheTypes];

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
