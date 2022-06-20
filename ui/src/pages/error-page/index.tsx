import { Button, Result } from 'antd';
import { ResultStatusType } from 'antd/lib/result';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface IErrorPage {
    statusCode: number;
}

export const ErrorPage: FC<IErrorPage> = ({ statusCode }) => (
    <Result
        className='w-full h-screen grid place-content-center'
        status={statusCode as ResultStatusType}
        title={statusCode === 404 ? 'Page not found' : 'Something went wrong'}
        extra={
            <Button type='primary'>
                <Link to='/'>Home</Link>
            </Button>
        }
    />
);
