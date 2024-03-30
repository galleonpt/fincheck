import { useState } from 'react';
import toast from 'react-hot-toast';
import { z } from 'zod';
import useDashboard from '../../components/DashboardContext/useDashboard';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bankAccountsService } from '../../../../../app/services/bankAccountsService/bankAccountsService';
import { IUpdateBankAccountPayload } from '../../../../../app/services/bankAccountsService/types';

const schema = z.object({
    initialBalance: z.union([
        z.string().min(1, 'Saldo inicial é obrigatório'),
        z.number(),
    ]),
    name: z.string().min(1, 'Nome é obrigatório'),
    type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
    color: z.string().min(1, 'Cor é obrigatória'),
});

type FormData = z.infer<typeof schema>;

const useEditAccountModalController = () => {
    const {
        isEditAccountModalOpen,
        closeEditAccountModal,
        accountBeingEdited,
    } = useDashboard();

    const {
        register,
        handleSubmit: hookFormSubmit,
        formState: { errors },
        control,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            color: accountBeingEdited?.color,
            name: accountBeingEdited?.name,
            type: accountBeingEdited?.type,
            initialBalance: accountBeingEdited?.initialBalance,
        },
    });

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const queryClient = useQueryClient();

    const { isPending, mutateAsync: updateAccount } = useMutation({
        mutationFn: async (data: IUpdateBankAccountPayload) =>
            bankAccountsService.update(data),
    });

    const { isPending: isLoadingDelete, mutateAsync: removeAccount } =
        useMutation({
            mutationFn: async (accountId: string) =>
                bankAccountsService.remove(accountId),
        });

    const handleSubmit = hookFormSubmit(async (data) => {
        try {
            await updateAccount({
                ...data,
                initialBalance: currencyStringToNumber(data.initialBalance),
                id: accountBeingEdited!.id,
            });

            queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
            toast.success('Conta editada com sucesso!');
            closeEditAccountModal();
        } catch {
            toast.error('Erro ao guardar as alterações!');
        }
    });

    const handleOpenDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const handleDeleteAccount = async () => {
        try {
            await removeAccount(accountBeingEdited!.id);

            queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
            toast.success('Conta apagada com sucesso!');
            closeEditAccountModal();
        } catch {
            toast.error('Erro ao apagar conta!');
        }
    };

    return {
        isEditAccountModalOpen,
        closeEditAccountModal,
        register,
        control,
        errors,
        handleSubmit,
        isLoading: isPending,
        isDeleteModalOpen,
        handleOpenDeleteModal,
        handleCloseDeleteModal,
        handleDeleteAccount,
        isLoadingDelete,
    };
};

export default useEditAccountModalController;
