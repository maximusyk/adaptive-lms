import { AppLogo } from '../../components/ui/app-logo';
import { LoginForm } from '../../components/ui/login-form';

export const LoginPage = () => {
    return (
        <div className='absolute top-0 left-0 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 w-screen h-screen'>
            <div className='max-w-md w-full space-y-8'>
                <div>
                    <AppLogo />
                    <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
                        Sign in to your account
                    </h2>
                </div>
                <LoginForm />
            </div>
        </div>
    );
};
