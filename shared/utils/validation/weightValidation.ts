import { formatDecimal, removeLeadingZero, removeNonNumericWithoutDot } from './validationUtils';
import { z } from 'zod';

const integerMax = 3;
const decimalMax = 1;

const validateWeightInput = (value: string): string => {
    const regex = /^(?!0\d)\d{0,3}(\.\d{0,1})?$/;

    return regex.test(value) ? value : value.slice(0, 3);
};

export const weightValidation = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;

    input.value = removeLeadingZero(input.value);
    input.value = removeNonNumericWithoutDot(input.value);
    input.value = formatDecimal(input.value, decimalMax);
    input.value = validateWeightInput(input.value);

    return Number(input.value);
};

export const weightSchema = z.object({
    todayWeight: z
        .string()
        .trim()
        .regex(/^(?!0\d)\d{1,3}(\.\d{1})?$/, { message: '몸무게를 입력해주세요' })
        .transform((value) => (value === '' ? 0 : parseFloat(value)))
        .refine((value) => value === undefined || value >= 30, { message: '30kg 이상 입력 가능합니다' })
        .refine((value) => value === undefined || value <= 200, { message: '200kg 이하로 입력 가능합니다' }),
});

export const createGoalWeightSchema = (minWeight: number, maxWeight: number) => {
    return z.object({
        weight: z.preprocess((value) => {
            const parsedValue = parseFloat(value as string);
            return isNaN(parsedValue) ? 0 : parsedValue;
        }, z.number().min(30, { message: '30kg 이상 입력 가능합니다' }).max(150, { message: '200kg 이하로 입력 가능합니다' })),

        targetWeight: z
            .preprocess((value) => {
                const parsedValue = parseFloat(value as string);
                return isNaN(parsedValue) ? 0 : parsedValue;
            }, z.number())
            .refine((value) => value >= minWeight, {
                message: `정상 체중 범위 내의 ${minWeight}kg 이상 입력 가능합니다`,
            })
            .refine((value) => value <= maxWeight, {
                message: `정상 체중 범위 내의 ${maxWeight}kg 이하로 입력 가능합니다`,
            }),
    });
};
