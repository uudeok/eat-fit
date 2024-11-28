import { formatDecimal, removeNonNumericWithoutDot } from './validationUtils';
import { z } from 'zod';

export const mealsFormValidation = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;

    input.value = removeNonNumericWithoutDot(input.value);
    input.value = formatDecimal(input.value, 2);

    const valueAsNumber = Number(input.value);

    return valueAsNumber;
};

export const mealsFormSchema = z.object({
    calories: z.preprocess((value) => {
        const parsedValue = parseFloat(value as string);
        return isNaN(parsedValue) ? 0 : parsedValue;
    }, z.number().min(0).max(2000, { message: '2000kcal 이하로 입력 가능합니다' })),
    carbohydrate: z.preprocess((value) => {
        const parsedValue = parseFloat(value as string);
        return isNaN(parsedValue) ? 0 : parsedValue;
    }, z.number().min(0).max(2000, { message: '2000 이하로 입력 가능합니다' })),
    protein: z.preprocess((value) => {
        const parsedValue = parseFloat(value as string);
        return isNaN(parsedValue) ? 0 : parsedValue;
    }, z.number().min(0).max(2000, { message: '2000 이하로 입력 가능합니다' })),
    fat: z.preprocess((value) => {
        const parsedValue = parseFloat(value as string);
        return isNaN(parsedValue) ? 0 : parsedValue;
    }, z.number().min(0).max(2000, { message: '2000 이하로 입력 가능합니다' })),
    foodName: z.string().min(1, { message: '음식 이름은 필수입니다' }),
    content: z.string().optional(),
    id: z.number(),
    servingSize: z.preprocess((value) => {
        const parsedValue = parseFloat(value as string);
        return isNaN(parsedValue) ? 0 : parsedValue;
    }, z.number()),
});
