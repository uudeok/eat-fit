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

/*  소수점 이하가 5 이상이면 반올림, 그렇지 않으면 내림 */
export function roundNumber(value: number): number {
    return value % 1 >= 0.5 ? Math.ceil(value) : Math.floor(value);
}

export const ageValidation = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;

    input.value = removeLeadingZero(input.value);

    return input.value;
};

export const heightValidation = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;

    input.value = removeLeadingZero(input.value);

    return input.value;
};

export const weightValidation = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;

    input.value = removeLeadingZero(input.value);

    input.value = removeNonNumericWithoutDot(input.value);

    input.value = formatDecimal(input.value, 1);

    return input.value;
};

export const calorieValidation = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;

    input.value = removeLeadingZero(input.value);
};
