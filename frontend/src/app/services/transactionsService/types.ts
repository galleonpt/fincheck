import { Transaction } from '../../entities/Transaction';

export interface ICreateTransactionPayload {
    bankAccountId: string;
    categoryId: string;
    name: string;
    value: number;
    type: 'INCOME' | 'EXPENSE';
    date: string;
}

export type TGetAllTransactionsResponse = Transaction[];

export interface ITransactionsFilters {
    month: number;
    year: number;
    bankAccountId?: string;
    type?: Transaction['type'];
}

export interface IUpdateTransactionPayload {
    id: string;
    bankAccountId: string;
    categoryId: string;
    name: string;
    value: number;
    type: 'INCOME' | 'EXPENSE';
    date: string;
}
