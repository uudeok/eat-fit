import { API_ENDPOINTS } from '../api/config';
import { sendErrorMail } from '../api/mailApi';
import { returnFetch } from './createFetch';

export const foodDataFetch = returnFetch({
    baseUrl: `${API_ENDPOINTS.FOOD_API}`,
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
                console.error(errorMessage);

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
