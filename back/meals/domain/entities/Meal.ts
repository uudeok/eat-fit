import { MealsKeysType } from '@/constants';

export class Meal {
    constructor(
        public id: number,
        public created_at: Date,
        public daily_id: number,
        public user_id: string,
        public serving_time: Date,
        public meal_type: MealsKeysType,
        public entry_date: Date,
        public meal: JSON[],
        public photo_url?: string
    ) {}
}
