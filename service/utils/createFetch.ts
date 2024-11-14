import { displayLoadingIndicator, hideLoadingIndicator } from '@/shared/utils';
import { applyDefaultHeaders } from './applyDaultOptions';

type FetchOptions<ReqType = unknown, ResType = Response> = {
    baseUrl: string;
    defaultHeaders: Record<string, string> | Headers;
    interceptors?: {
        request?: (args: [string, RequestInit]) => Promise<[string, RequestInit]> | [string, RequestInit];
        response?: (response: ResType, requestArgs: [string, RequestInit]) => Promise<ResType> | ResType;
    };
    timeout?: number;
    showLoading?: boolean;
};
type OptionsType = Omit<RequestInit, 'headers'> & {
    headers?: Record<string, string> | Headers;
};

export const setLoading = (isLoading: boolean) => {
    if (isLoading) {
        displayLoadingIndicator();
    } else {
        hideLoadingIndicator();
    }
};

export function returnFetch({
    baseUrl = '',
    defaultHeaders = {},
    interceptors = {},
    timeout,
    showLoading = false,
}: FetchOptions) {
    const { request: requestInterceptor, response: responseInterceptor } = interceptors;

    return async (url?: string, options: OptionsType = {}) => {
        const finalUrl = url ? `${baseUrl}${url}` : baseUrl;

        let mergedHeader;

        if (options.headers) {
            mergedHeader = applyDefaultHeaders(defaultHeaders, options.headers);
        }

        const finalOptions: RequestInit = {
            ...options,
            headers: {
                ...defaultHeaders,
                ...mergedHeader,
            },
        };

        let requestArgs: [string, RequestInit] = [finalUrl, finalOptions];

        let loadingTimer: NodeJS.Timeout | undefined;

        if (requestInterceptor) {
            requestArgs = await requestInterceptor(requestArgs);

            if (showLoading) {
                loadingTimer = setTimeout(() => {
                    setLoading(true);
                }, 200);
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

/** 정리
 *  returnFetch 를 사용하는 경우는 아래 중 한가지 사항이라도 추가되어야 할때 custom fetch 함수를 만든다.
 * 1. baseUrl 이 다르다
 * 2. header 옵션이 다르다
 * 3. interceptor 설정을 추가해야 한다
 */

// import { displayLoadingIndicator, hideLoadingIndicator } from '@/shared/utils';
// import { applyDefaultHeaders } from './applyDaultOptions';

// type FetchOptions<ReqType = unknown, ResType = Response> = {
//     baseUrl: string;
//     defaultHeaders: Record<string, string> | Headers;
//     interceptors?: {
//         request?: (args: [string, RequestInit]) => Promise<[string, RequestInit]> | [string, RequestInit];
//         response?: (response: ResType, requestArgs: [string, RequestInit]) => Promise<ResType> | ResType;
//     };
//     timeout?: number;
// };
// type OptionsType = Omit<RequestInit, 'headers'> & {
//     headers?: Record<string, string> | Headers;
// };

// export const setLoading = (isLoading: boolean) => {
//     if (isLoading) {
//         displayLoadingIndicator();
//     } else {
//         hideLoadingIndicator();
//     }
// };

// export function returnFetch({ baseUrl = '', defaultHeaders = {}, interceptors = {}, timeout }: FetchOptions) {
//     const { request: requestInterceptor, response: responseInterceptor } = interceptors;

//     return async (url?: string, options: OptionsType = {}) => {
//         const finalUrl = url ? `${baseUrl}${url}` : baseUrl;

//         let mergedHeader;

//         if (options.headers) {
//             mergedHeader = applyDefaultHeaders(defaultHeaders, options.headers);
//         }

//         const finalOptions: RequestInit = {
//             ...options,
//             headers: {
//                 ...defaultHeaders,
//                 ...mergedHeader,
//             },
//         };

//         let requestArgs: [string, RequestInit] = [finalUrl, finalOptions];

//         let loadingTimer: NodeJS.Timeout | undefined;

//         if (requestInterceptor) {
//             requestArgs = await requestInterceptor(requestArgs);

//             if (timeout) {
//                 loadingTimer = setTimeout(() => {
//                     setLoading(true);
//                 }, timeout);
//             }
//         }

//         let response: Response;

//         response = await fetch(...requestArgs);

//         if (responseInterceptor) {
//             response = await responseInterceptor(response, requestArgs);
//         }

//         if (loadingTimer) {
//             clearTimeout(loadingTimer);
//         }
//         setLoading(false);

//         return response;
//     };
// }
