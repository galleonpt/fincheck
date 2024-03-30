import { useQuery } from '@tanstack/react-query';
import { transactionsService } from '../services/transactionsService/transactionsService';
import { ITransactionsFilters } from '../services/transactionsService/types';

const useTransactions = (filters: ITransactionsFilters) => {
    const { data, isFetching, isInitialLoading, refetch } = useQuery({
        queryKey: ['transactions'],
        queryFn: () => transactionsService.getAll(filters),
    });

    return {
        transactions: data ?? [],
        isLoading: isFetching,
        isInitialLoading,
        refetchTransactions: refetch,
    };
};

export default useTransactions;
