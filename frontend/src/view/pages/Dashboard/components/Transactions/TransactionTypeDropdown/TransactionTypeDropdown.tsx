import { FC } from 'react';
import { ITransactionTypeDropdownProps } from './types';
import { ExpensesIcon } from '../../../../../components/icons/ExpensesIcon';
import { IncomeIcon } from '../../../../../components/icons/IncomeIcon';
import { TransactionsIcon } from '../../../../../components/icons/TransactionsIcon';
import DropdownMenu from '../../../../../components/DropdownMenu';
import { ChevronDownIcon } from '@radix-ui/react-icons';

const TransactionTypeDropdown: FC<ITransactionTypeDropdownProps> = ({
    selectedType,
    onSelect,
}) => {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <div className="flex items-center gap-2">
                    {selectedType === 'EXPENSE' && <ExpensesIcon />}
                    {selectedType === 'INCOME' && <IncomeIcon />}
                    {selectedType === undefined && <TransactionsIcon />}

                    <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">
                        {selectedType === 'EXPENSE' && 'Despesas'}
                        {selectedType === 'INCOME' && 'Receitas'}
                        {selectedType === undefined && 'Transações'}
                    </span>

                    <ChevronDownIcon className="text-gray-900" />
                </div>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content className="w-[276px]">
                <DropdownMenu.Item
                    className="gap-2"
                    onSelect={() => onSelect('INCOME')}
                >
                    <IncomeIcon />
                    Receitas
                </DropdownMenu.Item>
                <DropdownMenu.Item
                    className="gap-2"
                    onSelect={() => onSelect('EXPENSE')}
                >
                    <ExpensesIcon />
                    Despesas
                </DropdownMenu.Item>
                <DropdownMenu.Item
                    className="gap-2"
                    onSelect={() => onSelect(undefined)}
                >
                    <TransactionsIcon />
                    Transações
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
};

export default TransactionTypeDropdown;
