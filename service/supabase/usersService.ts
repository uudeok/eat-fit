import { UpdateUserArgs, UserType } from '../@types';
import { DecodeUser, decodeUser } from '../mappers/userMapper';
import { API_ENDPOINTS } from './config';

export async function fetchUsersData(): Promise<DecodeUser> {
    const data = await fetch(`${API_ENDPOINTS.USERS}`);

    if (!data.ok) {
        throw new Error('Failed to fetch Users Data');
    }

    const result = await data.json();

    return decodeUser(result);
}

export async function updateUser(updateData: UpdateUserArgs): Promise<UserType> {
    const data = await fetch(`${API_ENDPOINTS.USERS}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
    });
    if (!data.ok) {
        throw new Error('Failed to update Users Data');
    }

    const result = await data.json();

    return result;
}
