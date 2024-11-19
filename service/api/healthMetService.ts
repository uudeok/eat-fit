import { decodeHealthMetList } from '../mappers/healthMetMapper';
import { returnFetchWithLoadingIndicator } from '../utils/returnFetchWithLoadingIndicator';
import { API_ENDPOINTS } from './config';

export async function fetchHealthMetDatas(keyword: string) {
    const response = await returnFetchWithLoadingIndicator(`${API_ENDPOINTS.MET}?keyword=${keyword}`);

    const result = await response.json();

    return decodeHealthMetList(result);
}
