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

export const ageValidation = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;

    input.value = removeLeadingZero(input.value);

    return Number(input.value);
};

export const heightValidation = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;

    input.value = removeLeadingZero(input.value);

    return Number(input.value);
};

// const validateWeightInput = (value: string): string => {
//     // 정규 표현식을 사용하여 유효성 검사
//     const regex = /^(?!0\d)\d{0,3}(\.\d{0,1})?$/;

//     return regex.test(value) ? value : value.slice(0, 3); // 유효하지 않으면 빈 문자열 반환
// };

// export const weightValidation = (e: React.FormEvent<HTMLInputElement>) => {
//     const input = e.target as HTMLInputElement;

//     input.value = removeLeadingZero(input.value);
//     input.value = removeNonNumericWithoutDot(input.value);
//     input.value = formatDecimal(input.value, 1);
//     input.value = validateWeightInput(input.value);

//     return Number(input.value);
// };

export const calorieValidation = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;

    input.value = removeLeadingZero(input.value);

    return Number(input.value);
};

export const padStartToZero = (e: React.ChangeEvent<HTMLInputElement>, digits: number) => {
    let value = e.target.value;

    let numValue = Number(value);

    if (!isNaN(numValue)) {
        e.target.value = numValue.toString().padStart(digits, '0'); // 지정된 자리수로 표시
    }
};
