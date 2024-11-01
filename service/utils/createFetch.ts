import { displayLoadingIndicator, hideLoadingIndicator } from '@/shared/utils';

type FetchOptions<ReqType = unknown, ResType = Response> = {
    baseUrl: string;
    headers: Record<string, string>;
    interceptors?: {
        request?: (args: [string, RequestInit]) => Promise<[string, RequestInit]> | [string, RequestInit];
        response?: (response: ResType, requestArgs: [string, RequestInit]) => Promise<ResType> | ResType;
    };
    timer?: number;
};
type OptionsType = Omit<RequestInit, 'headers'> & {
    headers?: Record<string, string>;
};

export const setLoading = (isLoading: boolean) => {
    if (isLoading) {
        displayLoadingIndicator();
    } else {
        hideLoadingIndicator();
    }
};

export function returnFetch({ baseUrl = '', headers = {}, interceptors = {}, timer }: FetchOptions) {
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

        let loadingTimer: NodeJS.Timeout | undefined;

        if (requestInterceptor) {
            requestArgs = await requestInterceptor(requestArgs);

            if (timer !== undefined) {
                loadingTimer = setTimeout(() => {
                    setLoading(true);
                }, timer);
            }
        }

        let response: Response;

        response = await fetch(...requestArgs);

        if (responseInterceptor) {
            response = await responseInterceptor(response, requestArgs);
        }

        if (loadingTimer) {
            clearTimeout(loadingTimer);
        }
        setLoading(false);

        return response;
    };
}
