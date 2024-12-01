import { LocalKeys } from '@/hooks/useCache';
import { BaseStorage } from './BaseStorage';

// 로컬스토리지
export class LocalStorage extends BaseStorage<LocalKeys> {
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
