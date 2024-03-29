import { FC } from 'react';
import useNewTransactionModalController from './useNewTransactionModalController';
import Modal from '../../../../components/Modal';
import { Controller } from 'react-hook-form';
import InputCurrency from '../../../../components/InputCurrency';
import Input from '../../../../components/Input';
import Select from '../../../../components/Select';
import Button from '../../../../components/Button';
import DatePickerInput from '../../../../components/DatePickerInput';

const NewTransactionModal: FC = () => {
    const {
        closeNewTransactionModal,
        isNewTransactionModalOpen,
        newTransactionType,
        control,
        errors,
        handleSubmit,
        register,
        accounts,
        categories,
        isLoading,
    } = useNewTransactionModalController();

    const isExpense = newTransactionType === 'EXPENSE';

    return (
        <Modal
            title={isExpense ? 'Nova Despesa' : 'Nova Receita'}
            open={isNewTransactionModalOpen}
            onClose={closeNewTransactionModal}
        >
            <form onSubmit={handleSubmit}>
                <div>
                    <span className="text-gray-600 tracking-[-0.5px] text-xs">
                        Valor da {isExpense ? 'despesa' : 'receita'}
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600 tracking-[-0.5px] text-lg">
                            €
                        </span>

                        <Controller
                            control={control}
                            name="value"
                            render={({ field: { onChange, value } }) => (
                                <InputCurrency
                                    defaultValue={0}
                                    error={errors.value?.message}
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
                        placeholder={
                            isExpense ? 'Nome da Despesa' : 'Nome da Receita'
                        }
                        error={errors.name?.message}
                        {...register('name')}
                    />

                    <Controller
                        control={control}
                        name="categoryId"
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <Select
                                placeholder="Categoria"
                                onChange={onChange}
                                value={value}
                                error={errors.categoryId?.message}
                                options={categories.map((category: any) => ({
                                    value: category.id,
                                    label: category.name,
                                }))}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="bankAccountId"
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <Select
                                placeholder={
                                    isExpense ? 'Pagar com' : 'Receber com'
                                }
                                onChange={onChange}
                                value={value}
                                error={errors.bankAccountId?.message}
                                options={accounts.map((account: any) => ({
                                    value: account.id,
                                    label: account.name,
                                }))}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="date"
                        render={({ field: { value, onChange } }) => (
                            <DatePickerInput
                                value={value}
                                onChange={onChange}
                                error={errors.date?.message}
                            />
                        )}
                    />

                    <Button type="submit" loading={isLoading}>
                        Criar
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default NewTransactionModal;
