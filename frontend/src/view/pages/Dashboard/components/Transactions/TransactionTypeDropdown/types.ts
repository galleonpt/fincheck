type TTransactionType = 'INCOME' | 'EXPENSE';

export interface ITransactionTypeDropdownProps {
    onSelect(type?: TTransactionType): void;
    selectedType?: TTransactionType;
}
