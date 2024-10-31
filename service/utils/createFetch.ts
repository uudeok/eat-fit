type FetchOptions = {
    baseUrl: string;
    headers: Record<string, string>;
    interceptors: {
        request?: any;
        response?: any;
    };
};

type OptionsType = Omit<RequestInit, 'headers'> & {
    headers?: Record<string, string>;
};

function returnFetch({ baseUrl = '', headers = {}, interceptors = {} }: FetchOptions) {
    const { request: requestInterceptor, response: responseInterceptor } = interceptors;

    return async (url: string, options: OptionsType = {}) => {
        const finalUrl = `${baseUrl}${url}`;
        const finalOptions: RequestInit = {
            ...options,
            headers: {
                ...headers,
                ...(options.headers || {}),
            },
        };

        let requestArgs: [string, RequestInit] = [finalUrl, finalOptions];

        if (requestInterceptor) {
            requestArgs = await requestInterceptor(requestArgs);
        }

        let response: Response;

        response = await fetch(...requestArgs);

        if (!response.ok) {
            console.error('Fetch request failed, Error Status : ', response.status);
            throw new Error('Fetch request failed');
        }

        if (responseInterceptor) {
            response = await responseInterceptor(response, requestArgs);
        }

        return response;
    };
}

export const defaultFetch = returnFetch({
    baseUrl: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
    interceptors: {
        request: async (args: any) => {
            // 요청을 가로채서 어떠한 로직을 실행할 수 있다.
            console.log('args', args);
            console.log('헤더에 토큰을 넣거나 할 수 있다');
            return args;
        },
        response: async (response: any, requestArgs: any) => {
            // 응답을 가로채서 어떠한 로직을 실행할 수 있다.
            console.log('response', response);
            console.log('requestArgs', requestArgs);
            console.log('에러 처리를 할 수 있따');

            return response;
        },
    },
});
