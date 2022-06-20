export const useAuth = () => {
    const isAuthenticated = !!localStorage.getItem('authData');
    const authData = isAuthenticated
        ? JSON.parse(localStorage.getItem('authData') as string)
        : null;

    return {
        authUser: authData?.user,
        authToken: authData?.accessToken,
        isAuthenticated,
    };
};
