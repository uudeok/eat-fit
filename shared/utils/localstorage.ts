// 로컬 스토리지에 데이터 저장
export const setLocalStorageItem = (key: string, value: any) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Error : 로컬스토리지에 ${key} 데이터 저장 실패`);
    }
};

// 로컬 스토리지에서 데이터 가져오기
export const getLocalStorageItem = <T>(key: string): T | null => {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.error(`Error : 로컬스토리지에 ${key} 데이터 가져오기 실패`);
        return null;
    }
};

// 로컬 스토리지에서 데이터 삭제
export const removeLocalStorageItem = (key: string) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`Error : 로컬스토리지에 ${key} 데이터 삭제 실패`);
    }
};

// 로컬 스토리지 전체 초기화
export const clearLocalStorage = () => {
    try {
        localStorage.clear();
    } catch (error) {
        console.error(`Error clearing localStorage: ${error}`);
    }
};
