import { SessionKeys } from '@/hooks/useCache';
import { BaseStorage } from './BaseStorage';

// 세션스토리지
export class SessionStorage extends BaseStorage<SessionKeys> {
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
