import { defaultFetch } from '../utils/defaultFetch';
import { API_ENDPOINTS } from './config';

export type ErrorOptions = {
    errorLocation: string;
    errorMessage: string;
};

export async function sendErrorMail(errorOptions: ErrorOptions) {
    const data = await defaultFetch(`${API_ENDPOINTS.MAIL}`, { method: 'POST', body: JSON.stringify(errorOptions) });

    const result = await data.json();

    return result;
}
