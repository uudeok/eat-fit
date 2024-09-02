'use client';

import { useState, useRef, Dispatch, SetStateAction, useCallback } from 'react';
import { removeNonNumeric, removeNonNumericWithoutDot } from '@/shared/utils';

/* 간단한 유효성 검사 가능 type 에 따라 추가 로직 구현 가능 */

type Options = {
    type?: 'number' | 'string' | 'weight';
    initialValue?: string;
    maxLength?: number; // 숫자 및 문자열 최대 자리수
    minLength?: number; // 숫자 및 문자열 최소 자리수
    integerMaxLength?: number; // 정수 최대 자리수
    decimalMaxLength?: number; // 소수점 이하 최대 자리수
};

type returnType = [
    string,
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
    boolean,
    Dispatch<SetStateAction<string>>
];

export const useInput = (options?: Options): returnType => {
    const {
        initialValue = '',
        maxLength,
        minLength = 0,
        type = 'string',
        integerMaxLength = 2,
        decimalMaxLength = 2,
    } = options || {};
    const [value, setValue] = useState<string>(initialValue || '');
    const isValid = useRef<boolean>(true);

    const handleNumber = (receivedValue: string) => {
        let result: string = receivedValue;

        result = removeNonNumeric(result);

        if (maxLength && result.length > maxLength) {
            result = result.slice(0, maxLength);
        }

        isValid.current = result.length >= minLength;
        setValue(result);
    };

    const handleString = (receivedValue: string) => {
        let result: string = receivedValue;

        if (maxLength && result.length > maxLength) {
            result = result.slice(0, maxLength);
        }
        isValid.current = result.length >= minLength;
        setValue(result);
    };

    const handleWeight = (receivedValue: string) => {
        let result: string = receivedValue;

        result = removeNonNumericWithoutDot(result);

        // 정규식을 사용해 정수와 소숫점 이하 자릿수를 허용 (default : 각 2자리까지)
        const regex = new RegExp(`^\\d{0,${integerMaxLength}}(\\.\\d{0,${decimalMaxLength}})?$`);
        if (regex.test(result) || result === '') {
            setValue(`${result} kg`);
        }
    };

    /** 첫번째로 실행되어 type에 따라 함수 호출 */
    const onChangeInput = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            const targetValue: string = e.target.value || '';

            if (type === 'number') {
                handleNumber(targetValue);
            } else if (type === 'string') {
                handleString(targetValue);
            } else if (type === 'weight') {
                handleWeight(targetValue);
            }
        },
        [type]
    );

    return [value, onChangeInput, isValid.current, setValue];
};
