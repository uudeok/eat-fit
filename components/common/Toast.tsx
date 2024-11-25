import { Flip, ToastContainer, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const defaultOptions: ToastOptions = {
    autoClose: 1200,
    position: 'bottom-center',
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnFocusLoss: false,
    draggable: true,
    pauseOnHover: true,
    theme: 'light',
    transition: Flip,
};

export const Toast = () => <ToastContainer {...defaultOptions} limit={1} style={{ height: '20px' }} />;

export default Toast;
