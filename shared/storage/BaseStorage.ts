import { CacheKeys, CookieKeys } from '@/hooks/useCache';
import { CookieOptions } from './CookieStorage';

export interface CacheInterface<KeyType extends CacheKeys = CacheKeys, ValueType = unknown> {
    setItem(key: KeyType, value: ValueType, options?: KeyType extends CookieKeys ? CookieOptions : undefined): void;
    getItem<T = ValueType>(key: KeyType): T | null;
    removeItem(key: KeyType): void;
    clear(): void;
}

// 추상 클래스: 공통 로직 처리
export abstract class BaseStorage<KeyType extends CacheKeys = CacheKeys, ValueType = unknown>
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