import { decodeHealthMetList } from '../mappers/healthMetMapper';
import { defaultFetch } from '../utils/defaultFetch';
import { API_ENDPOINTS } from './config';

export async function fetchHealthMetDatas(keyword: string) {
    const response = await defaultFetch(`${API_ENDPOINTS.MET}?keyword=${keyword}`);

    const result = await response.json();

    return decodeHealthMetList(result);
}
