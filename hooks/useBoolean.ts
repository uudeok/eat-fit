'use client';

import { useCallback, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

type UseBooleanReturn = {
    value: boolean;
    setValue: Dispatch<SetStateAction<boolean>>;
    setTrue: () => void;
    setFalse: () => void;
    toggle: () => void;
};

export const useBoolean = (defaultValue = false): UseBooleanReturn => {
    if (typeof defaultValue !== 'boolean') {
        throw new Error('defaultValue 는 boolean 값이 필수입니다');
    }
    const [value, setValue] = useState(defaultValue);

    const setTrue = useCallback(() => {
        setValue(true);
    }, []);

    const setFalse = useCallback(() => {
        setValue(false);
    }, []);

    const toggle = useCallback(() => {
        setValue((prev) => !prev);
    }, []);

    return { value, setValue, setTrue, setFalse, toggle };
};
