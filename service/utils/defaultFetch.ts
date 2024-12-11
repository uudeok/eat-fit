import { sendErrorMail } from '../api/mailApi';
import { returnFetch } from './createFetch';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const defaultFetch = returnFetch({
    baseUrl: `${BASE_URL}/api`,
    defaultHeaders: {
        'Content-Type': 'application/json',
    },
    interceptors: {
        request: async (args: [string, RequestInit]) => {
            const [url, options] = args;

            return args;
        },
        response: async (response: Response, requestArgs: [string, RequestInit]) => {
            if (!response.ok) {
                const errorMessage = `Fetch request failed with status: ${response.status}`;

                const errorOptions = {
                    errorLocation: requestArgs[0],
                    errorMessage: errorMessage,
                };
                await sendErrorMail(errorOptions);

                throw new Error(errorMessage);
            }

            return response;
        },
    },
});
