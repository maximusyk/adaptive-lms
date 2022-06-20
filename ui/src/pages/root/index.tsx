import { useAuth } from '@hooks/useAuth.hook';
import { useEffect, useState } from 'react';
import { RouteObject, useNavigate, useRoutes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../../router';

export const Root = () => {
    const [actualRoutes, setActualRoutes] = useState<RouteObject[]>([]);
    const { isAuthenticated } = useAuth();
    const routeElement = useRoutes(actualRoutes);

    const navigate = useNavigate();

    useEffect(() => navigate(isAuthenticated ? '/' : '/login'), []);
    useEffect(
        () => setActualRoutes(isAuthenticated ? privateRoutes : publicRoutes),
        [isAuthenticated],
    );

    return <div>{routeElement}</div>;
};
