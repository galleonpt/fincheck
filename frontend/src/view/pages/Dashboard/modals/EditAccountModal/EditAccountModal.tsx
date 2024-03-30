import { FC } from 'react';
import useEditAccountModalController from './useEditAccountModalController';
import ConfirmDeleteModal from '../../../../components/ConfirmDeleteModal';
import Modal from '../../../../components/Modal';
import { TrashIcon } from '../../../../components/icons/TrashIcon';
import { Controller } from 'react-hook-form';
import InputCurrency from '../../../../components/InputCurrency';
import Input from '../../../../components/Input';
import Select from '../../../../components/Select';
import ColorsDropdownInput from '../../../../components/ColorsDropdownInput';
import Button from '../../../../components/Button';

const EditAccountModal: FC = () => {
    const {
        closeEditAccountModal,
        isEditAccountModalOpen,
        errors,
        handleSubmit,
        register,
        control,
        isLoading,
        isDeleteModalOpen,
        handleOpenDeleteModal,
        handleCloseDeleteModal,
        handleDeleteAccount,
        isLoadingDelete,
    } = useEditAccountModalController();

    if (isDeleteModalOpen)
        return (
            <ConfirmDeleteModal
                title="Tem a certeza que deseja apagar esta conta?"
                description="Ao apagar a conta, também serão apagados todos os registros de
            receitas e despesas relacionados."
                isLoading={isLoadingDelete}
                onClose={handleCloseDeleteModal}
                onConfirm={handleDeleteAccount}
            />
        );

    return (
        <Modal
            title="Editar Conta"
            open={isEditAccountModalOpen}
            onClose={closeEditAccountModal}
            rightAction={
                <button onClick={handleOpenDeleteModal}>
                    <TrashIcon className="w-6 h-6 text-red-900" />
                </button>
            }
        >
            <form onSubmit={handleSubmit}>
                <div>
                    <span className="text-gray-600 tracking-[-0.5px] text-xs">
                        Saldo inicial
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600 tracking-[-0.5px] text-lg">
                            €
                        </span>

                        <Controller
                            control={control}
                            name="initialBalance"
                            defaultValue="0"
                            render={({ field: { onChange, value } }) => (
                                <InputCurrency
                                    error={errors.initialBalance?.message}
                                    onChange={onChange}
                                    defaultValue="0"
                                    value={value}
                                />
                            )}
                        />
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-4">
                    <Input
                        type="text"
                        placeholder="Nome da Conta"
                        error={errors.name?.message}
                        {...register('name')}
                    />

                    <Controller
                        control={control}
                        name="type"
                        defaultValue="CHECKING"
                        render={({ field: { onChange, value } }) => (
                            <Select
                                placeholder="Tipo"
                                error={errors.type?.message}
                                onChange={onChange}
                                value={value}
                                options={[
                                    {
                                        label: 'Conta Corrente',
                                        value: 'CHECKING',
                                    },
                                    {
                                        label: 'Investimentos',
                                        value: 'INVESTMENT',
                                    },
                                    {
                                        label: 'Dinheiro Físico',
                                        value: 'CASH',
                                    },
                                ]}
                            />
                        )}
                    />

                    <Controller
                        name="color"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <ColorsDropdownInput
                                error={errors.color?.message}
                                onChange={onChange}
                                value={value}
                            />
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full mt-6"
                        loading={isLoading}
                    >
                        Guardar
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default EditAccountModal;
