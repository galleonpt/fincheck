import { useState } from 'react';
import useBankAccounts from '../../../../../../app/hooks/useBankAccounts';

const useFiltersModalController = () => {
    const [selectedBankAccountId, setSelectedBankAccountId] = useState<
        undefined | string
    >();
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const { accounts } = useBankAccounts();

    const handleSelectBankAccount = (bankAccountId: string) => {
        setSelectedBankAccountId((prevState) =>
            prevState === bankAccountId ? undefined : bankAccountId,
        );
    };

    const handleChangeYear = (step: number) => {
        setSelectedYear((prevState) => prevState + step);
    };

    return {
        handleSelectBankAccount,
        selectedBankAccountId,
        selectedYear,
        handleChangeYear,
        accounts,
    };
};

export default useFiltersModalController;
