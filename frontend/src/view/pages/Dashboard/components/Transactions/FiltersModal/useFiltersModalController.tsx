import { useState } from 'react';

const useFiltersModalController = () => {
    const [selectedBankAccountId, setSelectedBankAccountId] = useState<
        undefined | string
    >();
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    //   const { accounts } = useBankAccounts()

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
        accounts: [
            { id: 1, name: 'name1' },
            { id: 2, name: 'name2' },
            { id: 3, name: 'name3' },
        ] as any[],
    };
};

export default useFiltersModalController;
