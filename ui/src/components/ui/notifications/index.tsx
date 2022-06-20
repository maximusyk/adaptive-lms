import { FaRegBell } from 'react-icons/all';
import './index.scss';

export const Notifications = () => {
    return (
        <span className="relative inline-block p-2 rounded-xl mr-5 shadow">
            <FaRegBell className="w-6 h-6 text-gray-500 fill-current" />
            <span className="absolute top-0 right-0 inline-block w-2 h-2 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full" />
        </span>
    );
};
