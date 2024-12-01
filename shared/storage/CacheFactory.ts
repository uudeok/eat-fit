import { CacheInterface } from './BaseStorage';
import { CookieStorage } from './CookieStorage';
import { LocalStorage } from './LocalStorage';
import { SessionStorage } from './SessionStorage';

export class CacheFactory {
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
