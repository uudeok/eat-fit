import { defaultOptions } from '@/components/common/Toast';
import { toast, ToastOptions } from 'react-toastify';

type ToastType = 'success' | 'error' | 'info' | 'warn';

const createToast =
    (type: ToastType) =>
    (message: string, options: ToastOptions = {}) =>
        toast[type](message, { ...defaultOptions, ...options });

const toastNotify = {
    success: createToast('success'),
    error: createToast('error'),
    info: createToast('info'),
    warn: createToast('warn'),
    promise: <T>(
        promise: Promise<T>,
        messages: {
            pending: string;
            success: string;
            error: string;
        },
        options: ToastOptions = {}
    ) =>
        toast.promise(
            promise,
            {
                pending: messages.pending,
                success: messages.success,
                error: messages.error,
            },
            { ...defaultOptions, ...options }
        ),
};

export default toastNotify;

// import { defaultOptions } from '@/components/common/Toast';
// import { toast, ToastOptions } from 'react-toastify';

// const toastNotify = {
//     success: (message: string, options: ToastOptions = {}) => toast.success(message, { ...defaultOptions, ...options }),

//     error: (message: string, options: ToastOptions = {}) => toast.error(message, { ...defaultOptions, ...options }),

//     info: (message: string, options: ToastOptions = {}) => toast.info(message, { ...defaultOptions, ...options }),

//     warn: (message: string, options: ToastOptions = {}) => toast.warn(message, { ...defaultOptions, ...options }),

//     promise: <T>(
//         promise: Promise<T>,
//         messages: {
//             pending: string;
//             success: string;
//             error: string;
//         },
//         options: ToastOptions = {}
//     ) =>
//         toast.promise(
//             promise,
//             {
//                 pending: messages.pending,
//                 success: messages.success,
//                 error: messages.error,
//             },
//             { ...defaultOptions, ...options }
//         ),
// };

// export default toastNotify;
