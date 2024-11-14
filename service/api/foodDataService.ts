import { docodeFoodDataList } from '../mappers/foodDataMapper';
import { returnFetchWithLoadingIndicator } from '../utils/returnFetchWithLoadingIndicator';
import { API_ENDPOINTS } from './config';

export type FoodDataArgs = {
    startIdx?: number;
    endIdx?: number;
    keyword?: string;
};

export async function fetchFoodSearchResults(args: FoodDataArgs) {
    const { startIdx, endIdx, keyword } = args;

    const response = await returnFetchWithLoadingIndicator(
        `${API_ENDPOINTS.FOOD_DATA}?startIdx=${startIdx}&endIdx=${endIdx}&DESC_KOR=${keyword}`
    );

    const result = await response.json();

    const rowData = result.I2790.row;

    return docodeFoodDataList(rowData);
}
