import { removeLeadingZero, removeNonNumeric } from './validationUtils';
import { z } from 'zod';

export const exerciseFormValidation = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;

    input.value = removeLeadingZero(input.value);

    input.value = removeNonNumeric(input.value);

    const valueAsNumber = Number(input.value);

    return valueAsNumber;
};

export const exerciseFormSchema = z.object({
    exerciseName: z.string().min(1, { message: '운동 이름은 필수입니다' }),
    durationMin: z.preprocess((value) => {
        const parsedValue = Number(value);
        return isNaN(parsedValue) ? undefined : parsedValue;
    }, z.number().min(1, { message: '운동 시간은 1분 이상이어야 합니다' })),
    caloriesBurned: z.preprocess((value) => {
        const parsedValue = Number(value);
        return isNaN(parsedValue) ? 0 : parsedValue;
    }, z.number()),
    exerciseIntensity: z.enum(['light', 'moderate', 'intense']),
    content: z.string().optional(),
    id: z.number(),
});
