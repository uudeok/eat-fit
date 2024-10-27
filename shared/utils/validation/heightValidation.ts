import { removeLeadingZero } from './validationUtils';

export const heightValidation = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;

    input.value = removeLeadingZero(input.value);

    return Number(input.value);
};
