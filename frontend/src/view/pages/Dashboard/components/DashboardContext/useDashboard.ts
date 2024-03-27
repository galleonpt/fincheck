import { useContext } from 'react';
import { DashboardContext } from './DashboardContext';

const useDashboard = () => {
    return useContext(DashboardContext);
};

export default useDashboard;
