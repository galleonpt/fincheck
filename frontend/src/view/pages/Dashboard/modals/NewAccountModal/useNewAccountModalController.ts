import { z } from 'zod';
import useDashboard from '../../components/DashboardContext/useDashboard';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { bankAccountsService } from '../../../../../app/services/bankAccountsService/bankAccountsService';
import { ICreateAccountPayload } from '../../../../../app/services/bankAccountsService/types';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';

const schema = z.object({
    initialBalance: z.string().min(1, 'Saldo inicial é obrigatório'),
    name: z.string().min(1, 'Nome é obrigatório'),
    type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
    color: z.string().min(1, 'Cor é obrigatória'),
});

type FormData = z.infer<typeof schema>;

const useNewAccountModalController = () => {
    const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard();
    const {
        register,
        handleSubmit: hookFormSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            initialBalance: '0',
        },
    });

    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (data: ICreateAccountPayload) =>
            bankAccountsService.create(data),
    });

    const handleSubmit = hookFormSubmit(async (data) => {
        try {
            await mutateAsync({
                ...data,
                initialBalance: currencyStringToNumber(data.initialBalance),
            });

            queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
            toast.success('Conta criada com sucesso!');
            closeNewAccountModal();
            reset();
        } catch {
            toast.error('Erro ao criar conta!');
        }
    });

    return {
        isNewAccountModalOpen,
        closeNewAccountModal,
        register,
        control,
        errors,
        handleSubmit,
        isLoading: isPending,
    };
};

export default useNewAccountModalController;
