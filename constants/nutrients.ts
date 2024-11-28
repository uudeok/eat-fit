import { DecodeMealItemType } from '@/service/mappers/mealsMapper';

export const CALORIES_PER_GRAM = {
    CARBOHYDRATE: 4,
    PROTEIN: 4,
    FAT: 9,
};

export const NUTRIENTS: { label: string; key: keyof DecodeMealItemType; unit: string }[] = [
    { label: '칼로리', key: 'calories', unit: 'kcal' },
    { label: '탄수화물', key: 'carbohydrate', unit: 'g' },
    { label: '단백질', key: 'protein', unit: 'g' },
    { label: '지방', key: 'fat', unit: 'g' },
];
