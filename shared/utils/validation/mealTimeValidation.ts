import { removeNonNumeric } from './validationUtils';

export const hourValidation = (e: React.ChangeEvent<HTMLInputElement>): number => {
    const input = e.target as HTMLInputElement;
    input.value = removeNonNumeric(input.value);

    let valueAsNumber = Number(input.value);

    if (valueAsNumber >= 13 && valueAsNumber <= 24) {
        valueAsNumber -= 12;
    } else if (valueAsNumber > 24) {
        valueAsNumber = 12;
    }

    input.value = valueAsNumber.toString().padStart(2, '0');

    return valueAsNumber;
};

export const minutesValidation = (e: React.ChangeEvent<HTMLInputElement>): number => {
    const input = e.target as HTMLInputElement;

    input.value = removeNonNumeric(input.value);

    let valueAsNumber = Number(input.value);

    if (valueAsNumber > 59) {
        valueAsNumber = 59;
    }

    input.value = valueAsNumber.toString().padStart(2, '0');

    return valueAsNumber;
};
