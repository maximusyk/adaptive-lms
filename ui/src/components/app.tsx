import { unauthorizeUser } from '@features/auth.feature';
import { useAppDispatch } from '@hooks/redux.hook';
import { useAuth } from '@hooks/useAuth.hook';
import { userAPI } from '@services/user.service';
import { Layout } from 'antd';
import { useEffect } from 'react';
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ReloadPrompt from '../ReloadPrompt';
import { privateRoutes, publicRoutes } from '../router';
import './App.scss';

export const App = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { authUser, isAuthenticated } = useAuth();
    const routeElement = useRoutes(
        isAuthenticated ? privateRoutes : publicRoutes,
    );
    const [ verifyUser ] = userAPI.useLazyVerifyQuery();

    const handleVerify = async () => {
        if ( !authUser ) {
            dispatch(unauthorizeUser());
            navigate('/login');
            return;
        }
        await verifyUser(authUser);
        if ( pathname === '/login' ) {
            navigate('/');
        }
    };

    useEffect(() => {
        if ( isAuthenticated ) {
            handleVerify();
        } else {
            navigate('/login');
        }
    }, []);

    return (
        <Layout className="max-h-screen overflow-hidden">
            { routeElement }
            <ReloadPrompt />
            <ToastContainer
                position="bottom-right"
                autoClose={ 5000 }
                hideProgressBar={ false }
                newestOnTop={ true }
                closeOnClick
                rtl={ false }
                pauseOnFocusLoss={ false }
                limit={ 3 }
                draggable
                pauseOnHover
            />
        </Layout>
    );
};
