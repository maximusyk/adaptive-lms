import { isRejected, isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const rtkQueryErrorHandler: Middleware = () => (next) => (action) => {
    if ( isRejectedWithValue(action) ) {
        toast.warn(action?.error?.data?.message);
    }
    if ( isRejected(action) ) {
        toast.error(action?.error?.message);
        // toast.error(action.payload?.data?.message || action?.error?.message || 'Something went wrong');
    }
    return next(action);
};
