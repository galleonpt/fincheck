import { FC } from 'react';
import useAuth from '../../../app/hooks/useAuth';

const Dashboard: FC = () => {
    const { logout } = useAuth();

    return <button onClick={logout}>logout</button>;
};

export default Dashboard;
