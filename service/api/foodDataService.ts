import { decodeFoodData, docodeFoodDataList } from '../mappers/foodDataMapper';
import { defaultFetch } from '../utils/defaultFetch';
import { API_ENDPOINTS } from './config';

export type FoodDataArgs = {
    startIdx?: number;
    endIdx?: number;
    keyword?: string;
};

export async function fetchFoodData(args: FoodDataArgs) {
    const { startIdx, endIdx, keyword } = args;
    const response = await defaultFetch(
        `${API_ENDPOINTS.FOODDATA}?startIdx=${startIdx}&endIdx=${endIdx}&DESC_KOR=${keyword}`
    );

    const result = await response.json();

    const rowData = result.I2790.row;

    return docodeFoodDataList(rowData);
}
