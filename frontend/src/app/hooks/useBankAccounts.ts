import { useQuery } from '@tanstack/react-query';
import { bankAccountsService } from '../services/bankAccountsService/bankAccountsService';

const useBankAccounts = () => {
    const { data, isFetching } = useQuery({
        queryKey: ['bankAccounts'],
        queryFn: bankAccountsService.getAll,
        staleTime: Infinity,
    });

    return { accounts: data ?? [], isFetching };
};

export default useBankAccounts;
