/*  첫 자리 0 제거  */
export const removeLeadingZero = (value: string) => {
    if (value.length > 1 && value[0] === '0') {
        return value.slice(1);
    }
    return value;
};

/*  숫자 외 모두 제거  */
export const removeNonNumeric = (value: string): string => {
    return value.replace(/\D/g, '');
};

/* 숫자와 소수점 외의 모든 문자 제거 */
export const removeNonNumericWithoutDot = (value: string): string => {
    return value.replace(/[^0-9.]/g, '');
};

/*  소숫점 이하 제거  */
export const formatDecimal = (value: string, decimalPlaces: number): string => {
    if (!value.includes('.')) return value;

    const [integer, decimal] = value.split('.');
    const trimmedDecimal = decimal.slice(0, decimalPlaces);

    return `${integer}.${trimmedDecimal}`;
};
