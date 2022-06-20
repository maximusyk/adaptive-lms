import Header from '@componentsLayout/header';
import Navbar from '@componentsLayout/navbar';
import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { SpinnerLoader } from '../../ui/spinner-loader';

export const AppLayout = () => (
    <Layout>
        <SpinnerLoader />
        <Navbar />
        <Layout className={'max-h-screen py-4 px-8'}>
            <Header />
            <Outlet />
        </Layout>
    </Layout>
);
