import { MealsKeysType } from '@/constants';

export class CreateMealInput {
    constructor(
        public readonly dailyId: number,
        public readonly entryDate: Date,
        public readonly mealType: MealsKeysType,
        public readonly meal: string[]
    ) {}
}
