import { useMemo, useState } from 'react';
import useWindowWidth from '../../../../../app/hooks/useWindowWidth';
import useDashboard from '../DashboardContext/useDashboard';
import useBankAccounts from '../../../../../app/hooks/useBankAccounts';

const useAccountsController = () => {
    const windowWidth = useWindowWidth();

    const { areValuesVisible, toggleValueVisibility, openNewAccountModal } =
        useDashboard();

    const [sliderState, setSliderState] = useState({
        isBeginning: true,
        isEnd: false,
    });

    const { accounts, isFetching } = useBankAccounts();

    const currentBalance = useMemo(() => {
        return accounts.reduce(
            (total, account) => total + account.currentBalance,
            0,
        );
    }, [accounts]);

    return {
        sliderState,
        windowWidth,
        areValuesVisible,
        isLoading: isFetching,
        accounts,
        currentBalance,

        toggleValueVisibility,
        openNewAccountModal,
        setSliderState,
    };
};

export default useAccountsController;
