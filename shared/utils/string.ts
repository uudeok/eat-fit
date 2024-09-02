export const removeNonNumeric = (value: string): string => {
    // 숫자 외 모두 제거
    return value.replace(/\D/g, '');
};

export const removeNonNumericWithoutDot = (value: string): string => {
    // 숫자와 소수점 외의 모든 문자 제거
    return value.replace(/[^0-9.]/g, '');
};
