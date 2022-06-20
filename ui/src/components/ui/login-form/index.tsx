import { authAPI } from '@services/auth.service';
import { Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { IAuthRequest } from '../../../common/types/auth.type';
import './index.scss';

export const LoginForm = () => {
    const navigate = useNavigate();
    const [ handleLogin, { error: loginError } ] = authAPI.useLoginMutation();

    const submitLogin = async (values: IAuthRequest) => {
        await handleLogin(values);
        if ( !loginError ) {
            navigate('/', { replace: true });
        }
    };

    return (
        <Form
            name="basic"
            className="mt-8 space-y-6"
            onFinish={ submitLogin }
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <div className="rounded-md -space-y-px">
                <Form.Item
                    name="username"
                    className="mb-0"
                    // help={loginError ? loginError : null}
                    rules={ [ { required: true, message: 'Username required' } ] }
                >
                    <Input
                        className="shadow-sm appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Username/E-mail"
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    className="mb-0"
                    // help={loginError ? loginError : null}
                    rules={ [ { required: true, message: 'Password required' } ] }
                >
                    <Input.Password
                        className="shadow-sm appearance-none rounded-none relative w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Password"
                    />
                </Form.Item>
            </div>

            <div>
                <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Sign in
                </button>
            </div>
        </Form>
        // <form className='mt-8 space-y-6' onSubmit={submitLogin}>
        //     <input type='hidden' name='remember' defaultValue='true' />
        //     <div className='rounded-md shadow-sm -space-y-px'>
        //         <div>
        //             <label htmlFor='email-address' className='sr-only'>
        //                 Email address
        //             </label>
        //             <input
        //                 id='username'
        //                 name='username'
        //                 type='text'
        //                 onChange={changeHandler}
        //                 required
        //                 className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
        //                 placeholder='Username/E-mail'
        //             />
        //         </div>
        //         <div>
        //             <label htmlFor='password' className='sr-only'>
        //                 Password
        //             </label>
        //             <input
        //                 id='password'
        //                 name='password'
        //                 type='password'
        //                 onChange={changeHandler}
        //                 required
        //                 className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
        //                 placeholder='Password'
        //             />
        //         </div>
        //     </div>

        //     <div className='flex items-center justify-end'>
        //         <div className='text-sm'>
        //             <a
        //                 href='#'
        //                 className='font-medium text-indigo-600 hover:text-indigo-500'
        //             >
        //                 Forgot your password?
        //             </a>
        //         </div>
        //     </div>

        //     <div>
        //         <button
        //             type='submit'
        //             className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        //         >
        //             Sign in
        //         </button>
        //     </div>
        // </form>
    );
};
