import { API_ENDPOINTS } from '../api/config';
import { sendErrorMail } from '../api/mailApi';
import { returnFetch } from './createFetch';

export const chatGPTFetch = returnFetch({
    baseUrl: `${API_ENDPOINTS.CHAT_GPT}`,
    defaultHeaders: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GPT_API_KEY}`,
    },
    interceptors: {
        request: async (args: [string, RequestInit]) => {
            return args;
        },
        response: async (response: Response, requestArgs: [string, RequestInit]) => {
            if (!response.ok) {
                const errorMessage = `Fetch ChatGPT request failed with status: ${response.status}`;
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
