import { API_ENDPOINTS } from './config';

export type ErrorOptions = {
    errorLocation: string;
    errorMessage: string;
};

export async function sendErrorMail(errorOptions: ErrorOptions) {
    const data = await fetch(API_ENDPOINTS.MAIL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorOptions),
    });

    if (!data.ok) {
        throw new Error('Failed to fetch Mail');
    }

    const result = await data.json();

    return result;
}
