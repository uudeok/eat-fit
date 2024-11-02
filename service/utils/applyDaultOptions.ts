export const applyDefaultHeaders = (
    defaultHeaders: Record<string, string> | Headers,
    haders?: Record<string, string> | Headers
) => {
    const headers = new Headers(haders);
    if (haders) {
        new Headers(haders).forEach((value, key) => {
            headers.set(key, value);
        });
    }
    return Object.fromEntries(headers);
};
