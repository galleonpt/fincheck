import { FC } from 'react';
import Modal from '../../../../components/Modal';
import useNewAccountModalController from './useNewAccountModalController';
import { Controller } from 'react-hook-form';
import Input from '../../../../components/Input';
import ColorsDropdownInput from '../../../../components/ColorsDropdownInput';
import Button from '../../../../components/Button';
import Select from '../../../../components/Select';
import InputCurrency from '../../../../components/InputCurrency';

const NewAccountModal: FC = () => {
    const {
        closeNewAccountModal,
        isNewAccountModalOpen,
        errors,
        handleSubmit,
        register,
        control,
        isLoading,
    } = useNewAccountModalController();

    return (
        <Modal
            title="Nova Conta"
            open={isNewAccountModalOpen}
            onClose={closeNewAccountModal}
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
                            render={({ field: { onChange, value } }) => (
                                <InputCurrency
                                    defaultValue={0}
                                    error={errors.initialBalance?.message}
                                    value={value}
                                    onChange={onChange}
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
                        Criar
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default NewAccountModal;
