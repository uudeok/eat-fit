import { ToastContainer, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const defaultOptions: ToastOptions = {
    autoClose: 2000,
    position: 'top-center',
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnFocusLoss: false,
    draggable: true,
    pauseOnHover: false,
    theme: 'light',
};

export const Toast = () => <ToastContainer {...defaultOptions} />;

export default Toast;
