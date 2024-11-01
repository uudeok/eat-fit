import { UpdateUserArgs, UserType } from '../@types';
import { DecodeUser, decodeUser } from '../mappers/userMapper';
import { defaultFetch } from '../utils/defaultFetch';
import { API_ENDPOINTS } from './config';

export async function fetchUsersData(): Promise<DecodeUser> {
    const data = await defaultFetch('/users');

    const result = await data.json();

    return decodeUser(result);
}

export async function updateUser(updateData: UpdateUserArgs): Promise<UserType> {
    const data = await defaultFetch('/users', { method: 'PUT', body: JSON.stringify(updateData) });

    const result = await data.json();

    return result;
}
