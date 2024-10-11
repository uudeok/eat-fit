import { API_ENDPOINTS } from './config';

export async function fetchUsersData() {
    const data = await fetch(`${API_ENDPOINTS.USERS}`);

    if (!data.ok) {
        throw new Error('Failed to fetch Users Data');
    }

    const result = await data.json();

    return result;
}
