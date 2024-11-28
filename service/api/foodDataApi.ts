import { decodeFoodDataList } from '../mappers/foodDataMapper';
import { returnFetchWithLoadingIndicator } from '../utils/returnFetchWithLoadingIndicator';
import { API_ENDPOINTS } from './config';

export type FoodDataArgs = {
    pageSize?: number;
    pageNum?: number;
    keyword?: string;
};

export async function fetchFoodSearchResults(args: FoodDataArgs) {
    const { pageSize, pageNum, keyword } = args;

    const response = await returnFetchWithLoadingIndicator(
        `${API_ENDPOINTS.FOOD_DATA}?pageNum=${pageNum}&pageSize=${pageSize}&keyword=${keyword}`
    );

    const result = await response.json();

    return decodeFoodDataList(result);
}
