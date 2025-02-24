import { LocalKeys } from '@/hooks/useCache';
import { BaseStorage } from './BaseStorage';

// 로컬스토리지
export class LocalStorage extends BaseStorage<LocalKeys> {
    setRawItem(key: LocalKeys, value: string) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    override getRawItem(key: LocalKeys) {
        const rawValue = localStorage.getItem(key);
        return rawValue ? JSON.parse(rawValue) : null;
    }

    removeRawItem(key: LocalKeys) {
        localStorage.removeItem(key);
    }

    clearAll() {
        localStorage.clear();
    }
}
