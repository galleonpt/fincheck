import { useEffect, useState } from 'react';
import useDashboard from '../DashboardContext/useDashboard';
import { Transaction } from '../../../../../app/entities/Transaction';
import { ITransactionsFilters } from '../../../../../app/services/transactionsService/types';
import useTransactions from '../../../../../app/hooks/useTransactions';

const useTransactionsController = () => {
    const { areValuesVisible } = useDashboard();

    const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [transactionBeingEdited, setTransactionBeingEdited] =
        useState<Transaction | null>(null);
    const [filters, setFilters] = useState<ITransactionsFilters>({
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
    });

    const { transactions, isLoading, isInitialLoading, refetchTransactions } =
        useTransactions(filters);

    useEffect(() => {
        refetchTransactions();
    }, [filters, refetchTransactions]);

    function handleChangeFilters<TFilter extends keyof ITransactionsFilters>(
        filter: TFilter,
    ) {
        return (value: ITransactionsFilters[TFilter]) => {
            if (value === filters[filter]) return;

            setFilters((prevState) => ({
                ...prevState,
                [filter]: value,
            }));
        };
    }

    const handleApplyFilters = ({
        bankAccountId,
        year,
    }: {
        bankAccountId?: string;
        year: number;
    }) => {
        handleChangeFilters('bankAccountId')(bankAccountId);
        handleChangeFilters('year')(year);
        handleCloseFiltersModal();
    };

    const handleOpenFiltersModal = () => {
        setIsFiltersModalOpen(true);
    };

    const handleCloseFiltersModal = () => {
        setIsFiltersModalOpen(false);
    };

    const handleOpenEditModal = (transaction: Transaction) => {
        setIsEditModalOpen(true);
        setTransactionBeingEdited(transaction);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setTransactionBeingEdited(null);
    };

    const hasTransactions = transactions.length > 0;

    return {
        areValuesVisible,
        transactions,
        hasTransactions,
        isInitialLoading,
        isLoading,
        isFiltersModalOpen,
        filters,
        handleOpenFiltersModal,
        handleCloseFiltersModal,
        handleChangeFilters,
        handleApplyFilters,
        isEditModalOpen,
        transactionBeingEdited,
        handleOpenEditModal,
        handleCloseEditModal,
    };
};

export default useTransactionsController;
