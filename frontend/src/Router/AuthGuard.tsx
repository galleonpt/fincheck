import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { IAuthGuardProps } from './types';

const AuthGuard: FC<IAuthGuardProps> = ({ isPrivate }) => {
    const signedIn = false;

    if (!signedIn && isPrivate) {
        return <Navigate to="/login" replace />;
    }

    if (signedIn && !isPrivate) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default AuthGuard;
