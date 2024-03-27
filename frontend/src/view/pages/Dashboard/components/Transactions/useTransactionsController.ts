import { useState } from 'react';
import useDashboard from '../DashboardContext/useDashboard';

const useTransactionsController = () => {
    const { areValuesVisible } = useDashboard();

    const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [transactionBeingEdited, setTransactionBeingEdited] = useState<
        any | null
    >(null);

    function handleOpenFiltersModal() {
        setIsFiltersModalOpen(true);
    }

    function handleCloseFiltersModal() {
        setIsFiltersModalOpen(false);
    }

    function handleOpenEditModal(transaction: any) {
        setIsEditModalOpen(true);
        setTransactionBeingEdited(transaction);
    }

    function handleCloseEditModal() {
        setIsEditModalOpen(false);
        setTransactionBeingEdited(null);
    }

    const transactions: any[] = [];
    const hasTransactions = transactions.length > 0;

    return {
        areValuesVisible,
        transactions,
        hasTransactions,
        isInitialLoading: false,
        isLoading: false,
        isFiltersModalOpen,
        // filters,
        handleOpenFiltersModal,
        handleCloseFiltersModal,
        // handleChangeFilters,
        // handleApplyFilters,
        isEditModalOpen,
        transactionBeingEdited,
        handleOpenEditModal,
        handleCloseEditModal,
    };
};

export default useTransactionsController;
