import { UserType } from '../@types';
import { API_ENDPOINTS } from './config';

export async function fetchUsersData(): Promise<UserType> {
    const data = await fetch(`${API_ENDPOINTS.USERS}`);

    if (!data.ok) {
        throw new Error('Failed to fetch Users Data');
    }

    const result = await data.json();

    return result;
}
