import { Meal } from './entities/Meal';
import { CreateMealInput } from './value-objects/CreateMeal';

export interface MealsRepository {
    createMeal(meal: CreateMealInput): Promise<Meal>;
}
