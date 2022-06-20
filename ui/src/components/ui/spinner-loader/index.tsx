import { useAppSelector } from '@hooks/redux.hook';
import './index.scss';

export const SpinnerLoader = () => {
    const isLoading = useAppSelector((state) => state.globalLoaderState.status);

    return isLoading ? (
        <div className='spinner-container'>
            <div className='loading'>
                <div className='arc' />
                <div className='arc' />
                <div className='arc' />
            </div>
        </div>
    ) : null;
};
