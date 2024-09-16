import { FooterPathValues } from '@/constants';

export const getFooterPath = (path: FooterPathValues) => `/${path}`;

export const getMealPath = (id: number) => `/meals/${id}`;
export const getMealAddPath = () => '/meals/add';

export const getExercisePath = (id: number) => `/exercise/${id}`;
export const getExerciseAddPage = () => '/exercise/add';

// const Foodroute = {

// }

// const userRoutes = {

// }

// const routes = [
//     ...Foodroute,
//     ...userRoutes
// ]
