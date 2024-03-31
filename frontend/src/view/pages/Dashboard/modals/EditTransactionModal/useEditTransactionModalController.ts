import { z } from 'zod';
import { Transaction } from '../../../../../app/entities/Transaction';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import useBankAccounts from '../../../../../app/hooks/useBankAccounts';
import useCategories from '../../../../../app/hooks/useCategories';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';
import { transactionsService } from '../../../../../app/services/transactionsService/transactionsService';
import { IUpdateTransactionPayload } from '../../../../../app/services/transactionsService/types';

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

const useEditTransactionModalController = (
    transaction: Transaction | null,
    onClose: () => void,
) => {
    const {
        register,
        handleSubmit: hookFormSubmit,
        formState: { errors },
        control,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: transaction?.name,
            value: transaction?.value,
            bankAccountId: transaction?.bankAccountId,
            categoryId: transaction?.categoryId,
            date: transaction ? new Date(transaction.date) : new Date(),
        },
    });

    const { accounts } = useBankAccounts();
    const { categories: categoriesList } = useCategories();
    const queryClient = useQueryClient();
    const { isPending, mutateAsync: updateTransaction } = useMutation({
        mutationFn: async (data: IUpdateTransactionPayload) =>
            transactionsService.update(data),
    });
    const { isPending: isLoadingDelete, mutateAsync: removeTransaction } =
        useMutation({
            mutationFn: async (transactionId: string) =>
                transactionsService.remove(transactionId),
        });

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleDeleteTransaction = async () => {
        try {
            await removeTransaction(transaction!.id);

            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
            toast.success('Transação apagada com sucesso!');
            onClose();
        } catch {
            toast.error('Erro ao apagar transação!');
        }
    };

    const handleOpenDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const handleSubmit = hookFormSubmit(async (data) => {
        try {
            await updateTransaction({
                ...data,
                id: transaction!.id,
                type: transaction!.type,
                value: currencyStringToNumber(data.value),
                date: data.date.toISOString(),
            });

            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });

            toast.success(
                transaction!.type === 'EXPENSE'
                    ? 'Despesa editada com sucesso!'
                    : 'Receita editada com sucesso!',
            );
            onClose();
        } catch {
            toast.success(
                transaction!.type === 'EXPENSE'
                    ? 'Erro ao editar despesa!'
                    : 'Erro ao editar receita!',
            );
        }
    });

    const categories = useMemo(
        () =>
            categoriesList.filter(
                (category) => category.type === transaction?.type,
            ),
        [categoriesList, transaction],
    );

    return {
        register,
        errors,
        control,
        handleSubmit,
        accounts,
        categories,
        isLoading: isPending,
        isDeleteModalOpen,
        isLoadingDelete,
        handleOpenDeleteModal,
        handleCloseDeleteModal,
        handleDeleteTransaction,
    };
};

export default useEditTransactionModalController;
