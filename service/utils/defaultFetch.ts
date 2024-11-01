import { returnFetch } from './createFetch';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const defaultFetch = returnFetch({
    baseUrl: `${BASE_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
    interceptors: {
        request: async (args: [string, RequestInit]) => {
            // 요청을 가로채서 어떠한 로직을 실행할 수 있다.
            console.log('args', args);
            console.log('헤더에 토큰을 넣거나 할 수 있다');

            return args;
        },
        response: async (response: Response, requestArgs: [string, RequestInit]) => {
            // 응답을 가로채서 어떠한 로직을 실행할 수 있다.

            if (!response.ok) {
                const errorMessage = `Fetch request failed with status: ${response.status}`;
                console.error(errorMessage);
                throw new Error(errorMessage);
            }
            console.log('response', response);
            console.log('requestArgs', requestArgs);
            console.log('에러 처리를 할 수 있다');

            return response;
        },
    },
});
