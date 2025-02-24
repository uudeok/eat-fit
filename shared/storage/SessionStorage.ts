import { SessionKeys } from '@/hooks/useCache';
import { BaseStorage } from './BaseStorage';

// 세션스토리지
export class SessionStorage extends BaseStorage<SessionKeys> {
    setRawItem(key: SessionKeys, value: string) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    getRawItem(key: SessionKeys) {
        const rawValue = sessionStorage.getItem(key);
        return rawValue ? JSON.parse(rawValue) : null;
    }

    removeRawItem(key: SessionKeys) {
        sessionStorage.removeItem(key);
    }

    clearAll() {
        sessionStorage.clear();
    }
}
