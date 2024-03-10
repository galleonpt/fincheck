import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { IAuthGuardProps } from './types';
import useAuth from '../app/hooks/useAuth';

const AuthGuard: FC<IAuthGuardProps> = ({ isPrivate }) => {
    const { signedIn } = useAuth();

    if (!signedIn && isPrivate) {
        return <Navigate to="/login" replace />;
    }

    if (signedIn && !isPrivate) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default AuthGuard;
