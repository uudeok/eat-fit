// import { createClient } from '@/shared/utils/supabase/server';
// import { Meal } from '../domain/entities/Meal';
// import { MealsRepository } from '../domain/MealsRepository';
// import { CreateMealInput } from '../domain/value-objects/CreateMeal';

// export class SbMealRepository implements MealsRepository {
//     async createMeal(inputMeal: CreateMealInput): Promise<Meal> {
//         try {
//             const supabase = createClient();

//             const { data } = await supabase
//                 .from('meals')
//                 .insert({
//                     meal: inputMeal.meal,
//                     meal_type: inputMeal.mealType,
//                     entry_date: inputMeal.entryDate,
//                     daily_id: inputMeal.dailyId,
//                 })
//                 .select()
//                 .throwOnError();

//                 return data;

//         } catch (error) {
//             console.error(error);
//             throw new Error('Unexpected error occurred while creating meal.');
//         }
//     }
// }
