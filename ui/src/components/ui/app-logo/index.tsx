import { BiBookReader, FaBookReader } from 'react-icons/all';

interface IAppLogo {
    collapsed?: boolean;
}

export const AppLogo = ({ collapsed }: IAppLogo) => {
    return (
        <div
            className={ `app-logo ${
                collapsed === undefined &&
                'text-7xl absolute top-16 left-1/2 -translate-x-1/2'
            } flex flex-row justify-center items-end` }
        >
            <span>{ collapsed ? '' : 'C' }</span>
            { collapsed ? (
                <FaBookReader className={ 'pb-2 text-3xl' } />
            ) : (
                <BiBookReader
                    className={ `${ collapsed === undefined ? 'text-6xl' : 'text-3xl' }` }
                />
            ) }
            {/*<AppLogoIcon className='app-icon'/>*/ }
            <span>{ collapsed ? '' : 'ursuch' }</span>
        </div>
    );
};
