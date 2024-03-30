import { useMemo } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import useDashboard from '../../components/DashboardContext/useDashboard';
import useBankAccounts from '../../../../../app/hooks/useBankAccounts';
import useCategories from '../../../../../app/hooks/useCategories';
import { transactionsService } from '../../../../../app/services/transactionsService/transactionsService';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';

const schema = z.object({
    value: z
        .union([z.string().min(1, 'Informe o valor'), z.number()])
        .transform((val, ctx) => {
            if (val === 0 || val === '0' || val === '0,00') {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'A transação precisa ter um valor',
                });
                return z.NEVER;
            }

            return val;
        }),
    name: z.string().min(1, 'Informe o nome'),
    categoryId: z.string().min(1, 'Informe a categoria'),
    bankAccountId: z.string().min(1, 'Informe a conta'),
    date: z.date(),
});

type FormData = z.infer<typeof schema>;

const useNewTransactionModalController = () => {
    const {
        isNewTransactionModalOpen,
        closeNewTransactionModal,
        newTransactionType,
    } = useDashboard();

    const {
        register,
        handleSubmit: hookFormSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            value: '0',
            date: new Date(),
        },
    });

    const queryClient = useQueryClient();
    const { accounts } = useBankAccounts();
    const { categories: categoriesList } = useCategories();
    const { isPending, mutateAsync } = useMutation({
        mutationFn: async (data: any) => transactionsService.create(data),
    });

    const handleSubmit = hookFormSubmit(async (data) => {
        try {
            await mutateAsync({
                ...data,
                value: currencyStringToNumber(data.value),
                type: newTransactionType!,
                date: data.date.toISOString(),
            });

            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });

            toast.success(
                newTransactionType === 'EXPENSE'
                    ? 'Despesa criada com sucesso!'
                    : 'Receita criada com sucesso!',
            );
            closeNewTransactionModal();
            reset();
        } catch {
            toast.success(
                newTransactionType === 'EXPENSE'
                    ? 'Erro ao criar despesa!'
                    : 'Erro ao criar receita!',
            );
        }
    });

    const categories = useMemo(
        () =>
            categoriesList.filter(
                (category) => category.type === newTransactionType,
            ),
        [categoriesList, newTransactionType],
    );

    return {
        isNewTransactionModalOpen,
        closeNewTransactionModal,
        newTransactionType,
        register,
        errors,
        control,
        handleSubmit,
        accounts,
        categories,
        isLoading: isPending,
    };
};

export default useNewTransactionModalController;
