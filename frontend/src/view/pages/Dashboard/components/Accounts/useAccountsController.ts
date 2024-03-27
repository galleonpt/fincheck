import { useState } from 'react';
import useWindowWidth from '../../../../../app/hooks/useWindowWidth';
import useDashboard from '../DashboardContext/useDashboard';

const useAccountsController = () => {
    const windowWidth = useWindowWidth();

    const { areValuesVisible, toggleValueVisibility, openNewAccountModal } =
        useDashboard();

    const [sliderState, setSliderState] = useState({
        isBeginning: true,
        isEnd: false,
    });

    return {
        sliderState,
        windowWidth,
        areValuesVisible,
        isLoading: false,
        accounts: [],

        toggleValueVisibility,
        openNewAccountModal,
        setSliderState,
    };
};

export default useAccountsController;
