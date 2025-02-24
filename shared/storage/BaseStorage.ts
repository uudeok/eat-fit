import { CacheKeys, CookieKeys } from '@/hooks/useCache';
import { CookieOptions } from './CookieStorage';

export interface CacheInterface<KeyType extends CacheKeys = CacheKeys, ValueType = unknown> {
    setItem(key: KeyType, value: ValueType, options?: KeyType extends CookieKeys ? CookieOptions : undefined): void;
    getItem<T = ValueType>(key: KeyType): T | null;
    removeItem(key: KeyType): void;
    clear(): void;
}

export abstract class BaseStorage<KeyType extends CacheKeys = CacheKeys, ValueType = unknown>
    implements CacheInterface<KeyType, ValueType>
{
    abstract setRawItem(key: KeyType, value: string, options?: CookieOptions): void;
    abstract getRawItem(key: KeyType): string | null;
    abstract removeRawItem(key: KeyType): void;
    abstract clearAll(): void;

    setItem(key: KeyType, value: ValueType, options?: CookieOptions) {
        this.setRawItem(key, value as string, options);
    }

    getItem<T>(key: KeyType): T | null {
        return this.getRawItem(key) as unknown as T;
    }

    removeItem(key: KeyType) {
        this.removeRawItem(key);
    }

    clear() {
        this.clearAll();
    }
}
