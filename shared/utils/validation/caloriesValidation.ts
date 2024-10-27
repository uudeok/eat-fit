import { removeLeadingZero, removeNonNumericWithoutDot } from './validationUtils';

export const caloriesValidation = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;

    input.value = removeLeadingZero(input.value);
    input.value = removeNonNumericWithoutDot(input.value);

    return Number(input.value);
};
